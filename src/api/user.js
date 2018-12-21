import axios from 'axios'

const sendSerifly = ({mobile,code}) =>{
    axios.post('/user/send', {mobile,code})
} 

module.exports = {
    sendSerifly
}