

import React from 'react'
import moment from 'moment'
import { Toast } from 'antd-mobile'
//高阶组件
export function HocFrom(Comp){
    return class WrapperComp extends React.Component{
        constructor(props){
            super(props)
            this.state={}
        }
        handleChange(key,val){
            this.setState({[key]:val})
        }
        render(){
            return <Comp handleChange={(key,val)=>this.handleChange(key,val)}  state={this.state} {...this.props}></Comp>
        }
    }
}

//正则校验手机号
export function checkMobile(mobile){
    if(!(/^1[1-9][0-9]\d{8}$/).test(mobile)){
        Toast.info('不是完整的11位手机号或者正确的手机号', 1)
        return false;
    }
    return true;
}

//生成随机6位数字验证码
export function randomCode(){
   return  Math.random().toString().slice(-6)
}

//根据用户的权限
export function getRedirectPath({admin,isAuth}){
    let url = '/auth'
    if(isAuth){
        url = admin ? '/adminPage':'/home' 
    }
    return url
}
//格式化日期 获取日期
export function formatDate(date) {
    /* eslint no-confusing-arrow: 0 */
    const pad = n => n < 10 ? `0${n}` : n;
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    // const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    return `${dateStr}`;
}

//聊天显示以前时间的正确方式
export function monentDate(date){
    let diffDate = new Date().getTime() - date
    let days = Math.floor(diffDate/(1000*60*60*24))
    switch(true){
        case days>1:
            return moment(date).startOf('day').fromNow()
        case days>30:   
            return moment(new Date()).format('l')
        default:
            return moment(new Date(date)).format('ALT')
    }
}

//moment 中文化
export function monmentCN(){
    moment.locale('zh-cn', {
        months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY-MM-DD',
            LL: 'YYYY年MM月DD日',
            LLL: 'YYYY年MM月DD日Ah点mm分',
            LLLL: 'YYYY年MM月DD日ddddAh点mm分',
            l: 'YYYY-M-D',
            ll: 'YYYY年M月D日',
            lll: 'YYYY年M月D日 HH:mm',
            llll: 'YYYY年M月D日dddd HH:mm'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' ||
                meridiem === '上午') {
                return hour;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            } else {
                // '中午'
                return hour >= 11 ? hour : hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            const hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar: {
            sameDay: '[今天]LT',
            nextDay: '[明天]LT',
            nextWeek: '[下]ddddLT',
            lastDay: '[昨天]LT',
            lastWeek: '[上]ddddLT',
            sameElse: 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                case 'M':
                    return number + '月';
                case 'w':
                case 'W':
                    return number + '周';
                default:
                    return number;
            }
        },
        relativeTime: {
            future: '%s内',
            past: '%s前',
            s: '几秒',
            ss: '%d秒',
            m: '1分钟',
            mm: '%d分钟',
            h: '1小时',
            hh: '%d小时',
            d: '1天',
            dd: '%d天',
            M: '1个月',
            MM: '%d个月',
            y: '1年',
            yy: '%d年'
        },
        week: {
            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
            dow: 1, // Monday is the first day of the week.
            doy: 4  // The week that contains Jan 4th is the first week of the year.
        }
    })
}


export function address(){
    if (navigator.geolocation){ 
        navigator.geolocation.getCurrentPosition(showPosition,showError); 
      }else{ 
        alert("浏览器不支持地理定位。"); 
      } 
}
function showError(error){ 
    console.log(error)
    switch(error.code) { 
      case error.PERMISSION_DENIED: 
        alert("定位失败,用户拒绝请求地理定位"); 
        break; 
      case error.POSITION_UNAVAILABLE: 
        alert("定位失败,位置信息是不可用"); 
        break; 
      case error.TIMEOUT: 
        alert("定位失败,请求获取用户位置超时"); 
        break; 
      case error.UNKNOWN_ERROR: 
        alert("定位失败,定位系统失效"); 
        break; 
    } 
}
function showPosition(position){ 
    var lat = position.coords.latitude; //纬度 
    var lag = position.coords.longitude; //经度 
    console.log(lat)
    alert('纬度:'+lat+',经度:'+lag); 
}  