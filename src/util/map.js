
var map = new AMap.Map('container', {
    resizeEnable: true,
    resizeEnable: true, //是否监控地图容器尺寸变化
    zoom: 16, //初始地图级别
});
AMap.plugin('AMap.Geolocation', function() {
    var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：5s
        buttonPosition:'RB',    //定位按钮的停靠位置
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
    });
    map.addControl(geolocation);
    geolocation.getCurrentPosition(function(status,result){
        if(status=='complete'){
            onComplete(result)
        }else{
            onError(result)
        }
    });
});
//解析定位结果
function onComplete(data) {
    document.getElementById('status').innerHTML='定位成功'
    var str = [];
    str.push('定位结果：' + data.position);
    str.push('定位类别：' + data.location_type);
    if(data.accuracy){
         str.push('精度：' + data.accuracy + ' 米');
    }//如为IP精确定位结果则没有精度信息
    str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
    document.getElementById('result').innerHTML = str.join('<br>');
}
//解析定位错误信息
function onError(data) {
    document.getElementById('status').innerHTML='定位失败'
    document.getElementById('result').innerHTML = '失败原因排查信息:'+data.message;
}
//显示地图层级与中心点信息
function logMapinfo(){
  var zoom = map.getZoom(); //获取当前地图级别
  var center = map.getCenter(); //获取当前地图中心位置
  document.querySelector("#result").innerText = zoom;
  document.querySelector("#result").innerText = center.toString();
  // clearMarker()
  //addMarker(center)
  updateMarker(center)
};
 logMapinfo()
 console.log(map.getCenter())
 var marker = new AMap.Marker({
        icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
        position: map.getCenter(),
        offset: new AMap.Pixel(-13, -30)
});
marker.setMap(map);
// //绑定地图移动与缩放事件
map.on('moveend', logMapinfo);
map.on('zoomend', logMapinfo);

function updateMarker(centers) {

    if (!marker) {
        return;
    }

    // 自定义点标记内容
    var markerContent = document.createElement("div");

    // 点标记中的图标
    var markerImg = document.createElement("img");
    markerImg.className = "markerlnglat";
    markerImg.src = "https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png";
    markerContent.appendChild(markerImg);

    // 点标记中的文本
    var markerSpan = document.createElement("span");
    // markerSpan.className = 'marker';
    // markerSpan.innerHTML = "当前地点";
    markerContent.appendChild(markerSpan);

    marker.setContent(markerContent); //更新点标记内容
    marker.setPosition(centers); //更新点标记位置
}