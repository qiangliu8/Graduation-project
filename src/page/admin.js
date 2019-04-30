import React from 'react'
import 'antd/dist/antd.css'
import {Layout, Menu, Breadcrumb, Icon,PageHeader,Table, Divider, Tag  } from 'antd'
import {getUserList} from 'api/user'
import UserTable from 'page/admin/user'
import NoteTable from 'page/admin/note'
const { Column, ColumnGroup } = Table
const { Header, Content, Footer, Sider} = Layout
const SubMenu = Menu.SubMenu
const data = [{
    id: '5c404a47c80e9f1430dc2154',
    name: '小强',
    sex: '男',
    mobile: '15755337162',
    tags: ['普通用户'],
  }, {
    id: '5c404a47c80e9f1430dc2233',
    key: '2',
    name: 'Green',
    sex: '女',
    mobile: '17333135980',
    tags: ['普通用户'],
  }, {
    id: '5c404a47c80e9f1430dc3124',
    key: '3',
    name: 'Joe',
    sex: '男',
    mobile: '13855127570',
    tags: ['管理员'],
  }];
const data1 = [{
    id: '5c404a47c8a88d8j19101',
    name: '潮汕攻略|吃货带你体验舌尖上的潮汕‼️(汕头篇)',
    address: '未设置',
    content: '离开牌坊街，我们往汕头出发，来到已经是下午🌆💖#广场正......',
    editor:'小强'
  }, {
    id: '5c404a47c8a88d8j19221',
    key: '2',
    name: '去西雅图应该这样玩 你不知道的三件事',
    address: '西雅图',
    content: '西雅图是一个适合居住的城市，却是一个不太适合旅游的城市......',
    editor:'Green'
  }, {
    id: '5c404a47c8a88d8j19784',
    key: '3',
    name: '⇒白羊背丨坐渡船才能到的老街',
    address: '重庆三番街',
    content: '重庆的老街（gai），就像是耐人寻味的黑白照片，保留了纯粹......',
    editor:'小强'
  }];
class AuthPage extends React.Component{
    // state = {
    //     collapsed: false,
    //   };
      constructor(props) {
        super(props)
        this.state={
          collapsed: false,
        }
      }
      onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
      }
      render() {
        return (
          <Layout style={{ minHeight: '100vh' }}>
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            >
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="2">
                  <span>后台中心</span>
                </Menu.Item>
                <Menu.Item key="1">
                  {<span><Icon type="user" /><span>用户管理</span></span>}
                </Menu.Item>
                <SubMenu
                  key="sub2"
                  title={<span><Icon type="file" /><span>攻略管理</span></span>}
                >
                  <Menu.Item key="6">添加热门攻略</Menu.Item>
                  <Menu.Item key="8">删除攻略</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout>
            <PageHeader
                title="好好工作，努力加班！"
            />
              <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>攻略管理</Breadcrumb.Item>
                  <Breadcrumb.Item>添加热门攻略</Breadcrumb.Item>
                </Breadcrumb>
                
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

                <UserTable></UserTable>
                {/* <NoteTable></NoteTable> */}
                </div>
              </Content>
            </Layout>
          </Layout>
        );
      }
    }

 
  
export default AuthPage

        {/* <Column
          title="权限"
          dataIndex="tags"
          key="tags"
          render={tags => (
            <span>
              {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
            </span>
          )}
        /> */}
                {/* <Column
            title="用户名"
            dataIndex="name"
            key="name"
          />
        <Column
          title="性别"
          dataIndex="sex"
          key="sex"
        />
        <Column
          title="手机号"
          dataIndex="mobile"
          key="address"
        />
        <Column
          title="权限"
          dataIndex="tags"
          key="tags"
          render={tags => (
            <span>
              {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
            </span>
          )}
        /> */}