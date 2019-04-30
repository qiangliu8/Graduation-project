import {
    Table, Input, Button, Icon,Tag
  } from 'antd'
  import React from 'react'
  import Highlighter from 'react-highlight-words';
  import {getUserList} from 'api/user'
  const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  }];
  
  class UserTable extends React.Component{
    constructor(props) {
      super(props)
      this.state={
        searchText: '',
      }
    }
    componentDidMount(){
      getUserList().then(res=>{
        this.setState({user:res.data.msg})
      })  
  }
    getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({
        setSelectedKeys, selectedKeys, confirm, clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => { this.searchInput = node; }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
      render: (text) => (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
    })
  
    handleSearch = (selectedKeys, confirm) => {
      confirm();
      this.setState({ searchText: selectedKeys[0] });
    }
  
    handleReset = (clearFilters) => {
      clearFilters();
      this.setState({ searchText: '' });
    }
    delete = (e)=>{
      console.log(e)
    }
    render() {
      let user =  this.state.user?this.state.user:null 
      user?user.map(v=>{
        v.key=v._id
        v.admin? null:v.action = '删除'
        v.admins = v.admin?'管理员':'用户'
       
      }):null
      console.log(user)
      let columns = [{
        title: '昵称',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        ...this.getColumnSearchProps('name'),
      },
       {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile',
        width: '20%',
        ...this.getColumnSearchProps('mobile'),
      }, 
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        ...this.getColumnSearchProps('sex'),
      },
      {
        title: '身份权限',
        dataIndex: 'admins',
        key: 'admins',
         ...this.getColumnSearchProps('admins'),
      }
      ]
      columns.push({
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: text => <Tag onClick={(e)=>this.delete(e.target)}>{text}</Tag>
      })
      return (
        <div>
          {user?(<Table columns={columns} dataSource={user||''} />):null}
        </div>
      );
    }
  }
  
  export default UserTable