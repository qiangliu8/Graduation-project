import React from 'react'
import { SearchBar,Icon, WingBlank,Flex,List , WhiteSpace,Carousel } from 'antd-mobile';
import {getNoteList} from 'api/note'
import Brief from 'component/briefCard'
import 'scss/home.scss'

const Item = List.Item

class Home extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            data: ['1', '2', '3'],
            imgHeight: 176,
        }
      }
      componentDidMount() {
        getNoteList()
        // simulate img loading
    //     setTimeout(() => {
    //       this.setState({
    //         data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
    //       });
    //     }, 100);
    //   }
    }
    render(){
        return (
            <div>
                <WhiteSpace/>
                <WingBlank>
                    <Flex justify="between">
                        <div className="icon-logo"></div>
                        <SearchBar placeholder="搜一搜" maxLength={8} style={{width:'70%'}} />
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
                            href="http://www.alipay.com"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                          >
                            <img
                              src={require(`../assets/scenery/view${val}.jpg`)}
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
                            <Flex justify="between">
                                <p onClick={(e)=>console.log(e.target.innerHTML)}>综合</p>
                                <p onClick={(e)=>console.log(e.target.innerHTML)}>最热</p>
                                <p onClick={(e)=>console.log(e.target.innerHTML)}>最新</p>
                                <div onClick={(e)=>console.log(e.target.innerHTML)}style={{height:'24px'}}><p style={{display:'inline-block',marginRight: '-2px'}}>筛选</p><div className="icon-sort"></div></div>
                            </Flex>
                            }>
                            {}1篇攻略
                    </Item>
                </List>
                <div className="breifList">
                    <Brief/>
                    <Brief/>
                    <Brief/>
                    <Brief/>
                </div>
            </div>
        )
    }
}
export default Home