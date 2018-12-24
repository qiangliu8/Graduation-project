
function sendSerifly(SMSClient,tel,code){
    const accessKeyId = 'LTAI7CKFhXWNEw6n'
    const secretAccessKey = 'MlndfURoruM89zq1ZOc7fIc6S0Ekgd'
    let smsClient = new SMSClient({accessKeyId, secretAccessKey})
    smsClient.sendSMS({
        PhoneNumbers: tel,
        SignName: 'lyer创新APP',
        TemplateCode: 'SMS_153325562',
        TemplateParam:`{"code":"${code}"}`
    }).then(function (res) {
        let {Code}=res
        if (Code === 'OK') {
            console.log('发送成功')
            return true
        }
    }, function (err) {
        console.log('失败')
        return false
    })
}     

module.exports = {
    sendSerifly
}