const OSS = require('ali-oss')
let fs = require('fs');
let client = new OSS({
    region: 'oss-cn-hangzhou',
    //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
    accessKeyId: 'LTAI7CKFhXWNEw6n',
    accessKeySecret: 'MlndfURoruM89zq1ZOc7fIc6S0Ekgd',
    bucket: 'picture-upload'
});


//简单上传
function put (name,path) {
    return new Promise ((reslove,reject)=>{
        let result = client.put('portrait/' +name, path)
        if(result){
            reslove(result)
        }else{
            reject('上传失败')
        } 
    }) 
}

//多文件上传
function putnotes (files) {
    return Promise.all(files.map(v=>{
        return new Promise((resolve, reject) => {
            let result = client.put('noteImg/' +v.originalname, v.path)
            resolve(result)
        })
    }))
}
//文件上传
async function uploadlogo(name,path){
    const result1 = await client.put('noteImg/' +name, path)
    // const result2 = await client.signatureUrl(name);
    return result1
}

async function uploadlogo(name,path){
    const result1 = await put(name, path)
    // const result2 = await client.signatureUrl(name);
    return result1
}
//Buffer
function allBuffer (name,path) {
    return new Promise ((reslove,reject)=>{
        let result =  client.put(name, new Buffer(path))
        let url = client.signatureUrl(name);
        if(url){
            reslove(url)
        }else{
            reject('上传失败')
        } 
    }) 

}

//流式下载
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

async function putStream (name,path) {
    try {
    // use 'chunked encoding'
    let stream = fs.createReadStream(path);
    let result = await client.putStream(name, stream);
    console.log(result);
  
    // don't use 'chunked encoding'
    // let stream = fs.createReadStream('local-file');
    // let size = fs.statSync('local-file').size;
    // let result = await client.putStream(
    //   'object-name', stream, {contentLength: size});
    // console.log(result);
    } catch (e) {
      console.log(e)
    }
}

async function multipartUpload (name,path) {
    try {
      let result = await client.multipartUpload(name, path, {
      meta: {
        year: 2017,
        people: 'test'
      }
    });
    console.log(result);
    let head = await client.head(name);
    console.log(head);
    } catch (e) {
     // 捕获超时异常
      if (e.code === 'ConnectionTimeoutError') {
        console.log("Woops,超时啦!");
        // do ConnectionTimeoutError operation
      }
      console.log(e)
    }
}


function allBuffers (name,files) {
    let file = dataURLtoFile(files, '');
    client.multipartUpload(name, file).then( (res)=> {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      });
}
  
//http下载
function httpget (name) {
    return new Promise ((reslove,reject)=>{
        let url = client.signatureUrl(name);
        if(url){
            reslove(url)
        }else{
            reject('下载失败')
        } 
    }) 
}

//   putStream()
module.exports = {
    put,
    putnotes,
    allBuffer,
    multipartUpload,
    allBuffers,
    uploadlogo
}