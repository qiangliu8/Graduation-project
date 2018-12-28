const OSS = require('ali-oss')

let client = new OSS({
    region: 'oss-cn-hangzhou',
    //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
    accessKeyId: 'LTAI7CKFhXWNEw6n',
    accessKeySecret: 'MlndfURoruM89zq1ZOc7fIc6S0Ekgd',
    bucket: 'picture-upload'
  });

  //简单上传
// async function put (name,filePath) {
    function put (name,filePath) {
    return new Promise ((reslove,reject)=>{
        let result = client.put(name, filePath)
        if(result){
            reslove(result)
        }else{
            reject('上传失败')
        } 
    })
    // try {
    //   let result = await client.put(name, filePath);
    //   console.log(result);
    // } catch (e) {
    //     console.log(er);
    // }
}



function getBuffer (name) {
    return new Promise ((reslove,reject)=>{
        let url = client.signatureUrl(name);
             console.log(url)
        if(url){
            reslove(url)
        }else{
            reject('下载失败')
        } 
    })
    // try {
    //   let result = await client.get(name);
    //   console.log(result.content);
    // } catch (e) {
    //   console.log(e);
    // }
  }


  function putStream (name,path) {
    return new Promise ((reslove,reject)=>{
        let stream = fs.createReadStream(path);
        let result = client.putStream(name, stream);
        if(result){
            reslove(result)
        }else{
            reject('下载失败')
        } 
    })
    // try {
    // // use 'chunked encoding'
    // let stream = fs.createReadStream('local-file');
    // let result = await client.putStream('object-name', stream);
    // console.log(result);
  
    // // don't use 'chunked encoding'
    // let stream = fs.createReadStream('local-file');
    // let size = fs.statSync('local-file').size;
    // let result = await client.putStream(
    //   'object-name', stream, {contentLength: size});
    // console.log(result);
    // } catch (e) {
    //   console.log(e)
    // }
  }
  
//   putStream()
module.exports = {
    put,
    getBuffer,
    putStream
}