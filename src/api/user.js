import axios from 'axios'

const sendSerifly = ({mobile,serify}) =>{
   return  axios.post('/user/sendcode', {mobile,serify})
}
module.exports = {
    sendSerifly
}