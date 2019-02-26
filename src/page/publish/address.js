import React from 'react'
import { Button, NavBar ,List, TextareaItem,InputItem, Flex ,Icon } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { Map ,Marker,MouseTool } from 'react-amap';
import {ipaddress} from 'api/note'
import {connect} from 'react-redux'
import {writeNote} from 'redux/note.redux'
import 'scss/publish.scss'
// import '../../util/map'
const Item = List.Item

@connect(
 state=>state,
 {writeNote}
)
@withRouter
class addressMap extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            center:[]
        }
        const self = this
        this.toolEvents = {
            created: (tool) => {
              self.tool = tool;
              this.tool.marker()
            },
            draw({obj}) {
              self.drawWhat(obj);
            }
        }
        this.amapEvents = {
            created: (map) => {
                self.map = map
                console.log('高德地图 Map 实例创建成功!')
                map.plugin(['AMap.Geolocation'], function(){
                        let geolocation = new AMap.Geolocation({
                            enableHighAccuracy: true, //  是否使用高精度定位，默认:true
                            timeout: 10000, //  超过10秒后停止定位，默认：无穷大
                            maximumAge: 0, // 定位结果缓存0毫秒，默认：0
                            convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                            showButton: true, //  显示定位按钮，默认：true
                            buttonPosition: 'LB',  // 定位按钮停靠位置，默认：'LB'，左下角
                            buttonOffset: new AMap.Pixel(10, 20), //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                            showMarker: true, //  定位成功后在定位到的位置显示点标记，默认：true
                            showCircle: true, //  定位成功后用圆圈表示定位精度范围，默认：true
                            panToLocation: true,  //  定位成功后将定位到的位置作为地图中心点，默认：true
                            zoomToAccuracy: true  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                        })
                        map.addControl(geolocation)
                        geolocation.getCurrentPosition()
                        AMap.event.addListener(geolocation, 'complete', (result) => {
                            map.setCenter(result.position)
                        })  //  返回定位信息
                        AMap.event.addListener(geolocation, 'error', (result) => {
                            console.log(result)
                        })  //  返回定位出错信息
                });

                //设置初始坐标
                var marker = new AMap.Marker({
                    icon: "//webapi.amap.com/theme/v1.3/markers/b/loc_gray.png",
                    position: [this.map.getCenter().N,this.map.getCenter().Q],
                    offset: new AMap.Pixel(-13, -30),
                })
                marker.setMap(map)

                this.setState({center: [this.map.getCenter().N,this.map.getCenter().Q]})
                //两种模式选择位置 1种为锚点当前的地理位置 2种为移动地图 中心地点为当前地址坐标
                //两种方法都已完成 可能会造成冲突 暂时就用第二种
                map.on('moveend', ()=>{
                    this.logMapinfo(map,marker)
                })
            },
        }
    }
    componentDidMount(){
        console.log(this.state.center)
    }
    shouldComponentUpdate(nextProps,nextState){
        if (this.state.center === nextState.center) return true;
        // //return false 则不更新组件
        ipaddress(nextState.center.toString()).then((res)=>{
            this.setState({address:res.data.pois},()=>{
            })
        })
    }

    drawWhat(obj) {
        this.tool.close(true)
        this.tool.marker()
        this.setState({center: [obj.getPosition().N,obj.getPosition().Q]})
    }    
    logMapinfo(map,marker){
        var zoom = map.getZoom(); //获取当前地图级别
        var center = map.getCenter(); //获取当前地图中心位置
        //document.querySelector("#result").innerText = center.toString();
        // clearMarker()
        // addMarker(center)
        //this.updateMarker(center,marker)
    }
    updateMarker(centers,marker) {
        if (!marker) {
            return;
        }
        // 自定义点标记内容
        var markerContent = document.createElement("div"); 
        // 点标记中的图标
        var markerImg = document.createElement("img");
        markerImg.className = "markerlnglat";
        markerImg.src = "//webapi.amap.com/theme/v1.3/markers/b/loc_gray.png";
        markerContent.appendChild(markerImg); 
        // 点标记中的文本
        var markerSpan = document.createElement("span");
        markerContent.appendChild(markerSpan);
        marker.setContent(markerContent); //更新点标记内容
        marker.setPosition(centers); //更新点标记位置
    }
    select(e){
        $('.addressList .am-flexbox').removeClass('selected')
        $(e.currentTarget).addClass('selected')
        this.props.writeNote({...this.props.note,address:e.currentTarget.innerText}),
        this.props.history.push('/publish')
    }   
    render(){
        const {address} = this.state
        return (
            <div className="publishPage">
                    <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {this.props.history.goBack()}}
                    style={{height:'6%'}}
                    >              
                    </NavBar>
                    <div id="container">
                        <Map events={this.amapEvents} zoom= {16} amapkey='3a76f52821beaeb2671e91665db4c625' >
                            <MouseTool events={this.toolEvents}/>
                        </Map>  
                    </div>
                    <div  className='addressList'>
                        <Flex  direction='column' className='flex' justify='center' align="start" onClick={(e)=>this.select(e)}>
                            <p>{address!=[]&&address?address[0].pname+address[0].cityname+address[0].adname:null}</p>
                        </Flex>
                        {address!=[]&&address?address.map(v=>(
                            <Flex  direction='column' key={v.id} className='flex' justify='center' align="start" onClick={(e)=>this.select(e)}>
                                <p >{v.name||''}</p>
                                <p>{v.pname+v.cityname+v.adname+v.address||''}</p>
                            </Flex>
                        )):null}
  
                    </div>
            </div>
        )
    }
}
export default addressMap