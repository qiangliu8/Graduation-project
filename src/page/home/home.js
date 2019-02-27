import React from 'react'
import { SearchBar,Icon, WingBlank,Flex,List ,Link, WhiteSpace,Carousel} from 'antd-mobile';
import {getNoteList,getNoteListf,getNoteListt,findNoteList} from 'api/note'
import {tarbarList} from 'config/data'
import Brief from 'component/briefCard'
import Footer from 'component/footer'
import 'scss/home.scss'

const Item = List.Item

class Home extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            data: ['5c370dbad98da8239c7de46e', '5c370e7dd98da8239c7de46f', '5c370f20d98da8239c7de470'],
            imgHeight: 176,
            dataList:[]
        }
      }
    componentDidMount() {
        this.getList()
    }

    getList(){
        getNoteList().then(result=>{
            this.setState({dataList:result.data.data})
        })
    }
    findNote(){
        if(this.state.key){
            findNoteList(this.state.key).then(result=>{
                this.setState({dataList:result.data.data})
            })
        }else{
            this.getList()
        }

    }
    selectSort(e){
        switch(e.currentTarget.innerText){
            case '最热':
                getNoteListf().then(result=>{
                    this.setState({dataList:result.data.data})
                })
                break
            case '最新':
                getNoteListt().then(result=>{
                    this.setState({dataList:result.data.data})
                })
                break
            default:
                this.getList()
                break
        }
        $('.pickList p').removeClass('selected')
        $(e.currentTarget).addClass('selected')
    }
    render(){
        const {dataList} = this.state
        return (
            <div>
                <WhiteSpace/>
                <WingBlank>
                    <Flex justify="between">
                        <div className="icon-logo"></div>
                        <SearchBar placeholder="搜一搜" maxLength={8} style={{width:'70%'}} 
                        onChange={(e)=>this.setState({key:e})}
                        onSubmit={()=>this.findNote()}
                        />
                        <div className="icon-notice"></div>
                    </Flex>
                </WingBlank>
                <Carousel className="space-carousel"
                    frameOverflow="visible"
                    autoplay
                     infinite
                    afterChange={index => this.setState({ slideIndex: index })}
                    >
                    {this.state.data.map((val, index) => (
                        <a
                            key={val}   
                  
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                          >
                            <img
                                onClick={()=>this.props.history.push(`/home/noteinfo/${val}`)}   
                              src={require(`../../assets/scenery/view${index}.jpg`)}
                              alt=""
                              style={{ width: '100%', verticalAlign: 'top',height:'11rem' }}
                              onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                this.setState({ imgHeight: 'auto' });
                              }}
                            />
                          </a>
                    ))}
                </Carousel>
                <List>
                    <Item extra={ 
                            <Flex justify="between" className='pickList'>
                                <p onClick={(e)=>this.selectSort(e)}  className='selected'>综合</p>
                                <p onClick={(e)=>this.selectSort(e)}>最热</p>
                                <p onClick={(e)=>this.selectSort(e)}>最新</p>
                                {/* <div onClick={(e)=>console.log(e.target.innerHTML)}style={{height:'24px'}}><p style={{display:'inline-block',marginRight: '-2px'}}>筛选</p><div className="icon-sort"></div></div> */}
                            </Flex>
                            }> 
                    </Item>
                </List>
                <div className="breifList">
                    {dataList?dataList.map(v=><Brief state={v} key={v._id}/>):null}
                </div>
                <Footer tarbarList={tarbarList}></Footer>
            </div>
        )
    }
}
export default Home