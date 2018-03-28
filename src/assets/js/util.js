
export function formatDate(timeStamp) {
  timeStamp = timeStamp * 1000
  var time = new Date(timeStamp)
  var y = time.getFullYear()
  var M = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
  var d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
  var h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
  var m = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
  var s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
  return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
}

Date.prototype.format = function(fmt) {
  var o = {
    "Y+": this.getFullYear(),
    "M+": this.getMonth() + 1,
    // 月份
    "d+": this.getDate(),
    // 日
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
    // 小时
    "H+": this.getHours(),
    // 小时
    "m+": this.getMinutes(),
    // 分
    "s+": this.getSeconds(),
    // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3),
    // 季度
    "S": this.getMilliseconds()
    // 毫秒
  };
  var week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
  };
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
      .substr(4 - RegExp.$1.length));
  }
  if(/(E+)/.test(fmt)) {
    fmt = fmt
      .replace(
        RegExp.$1,
        ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" :
            "/u5468") :
          "") +
        week[this.getDay() + ""]);
  }
  for(var k in o) {
    if(new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :
        (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};

export function toArray(obj) {
  let arr = []
  for (let key in obj) {
    let info = {}
    info[key] = obj[key]
    arr.push(info)
  }
  return arr
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function getTimeFormer(stringTime) {
  var startTime = new Date(stringTime.replace(/-/g, '/'));
  var startTimeMills = startTime.getTime();
  var endTimeMills = new Date().getTime();
  var diff = parseInt((endTimeMills - startTimeMills) / 1000); //秒
  var day_diff = parseInt(Math.floor(diff / 86400)); //天
  var buffer = Array();
  if (day_diff < 0) {
    return "[error],时间越界...";
  } else {
    if (day_diff == 0 && diff < 60) {
      if (diff <= 0)
        diff = 1;
      buffer.push(diff + "秒前");
    } else if (day_diff == 0 && diff < 120) {
      buffer.push("1 分钟前");
    } else if (day_diff == 0 && diff < 3600) {
      buffer.push(Math.round(Math.floor(diff / 60)) + "分钟前");
    } else if (day_diff == 0 && diff < 7200) {
      buffer.push("1小时前");
    } else if (day_diff == 0 && diff < 86400) {
      buffer.push(Math.round(Math.floor(diff / 3600)) + "小时前");
    } else if (day_diff == 1) {
      buffer.push("1天前");
    } else if (day_diff < 7) {
      buffer.push(day_diff + "天前");
    } else if (day_diff < 30) {
      buffer.push(Math.round(Math.floor(day_diff / 7)) + " 星期前");
    } else if (day_diff >= 30 && day_diff <= 179) {
      buffer.push(Math.round(Math.floor(day_diff / 30)) + "月前");
    } else if (day_diff >= 180 && day_diff < 365) {
      buffer.push("半年前");
    } else if (day_diff >= 365) {
      buffer.push(Math.round(Math.floor(day_diff / 30 / 12)) + "年前");
    }
  }
  return buffer.toString();
}

export function setCookie(name, value,time,option) {
  var str = name+'='+value; 
  var date = new Date();
  date.setTime(date.getTime()+getCookieTime(time)); 
  str += "; expires=" + date.toGMTString();
  if(option){ 
      if(option.path) str+='; path='+option.path; 
      if(option.domain) str+='; domain='+option.domain; 
      if(option.secure) str+='; true'; 
  } 
  document.cookie=str; 
}

export function getCookie(name) {
  var tmp = [];
  var arr = document.cookie.split('; '); 
  if(arr.length==0) return ''; 
  for(var i=0; i <arr.length; i++){ 
      tmp = arr[i].split('='); 
      if(tmp[0]==name) return tmp[1]; 
  } 
  return '';
}

export function delCookie(name) {
  setCookie(name,'',-1); 
  var date=new Date();
      date.setTime(date.getTime()-10000);
  document.cookie=name+"=; expire="+date.toGMTString()+"; path=/";
}

export function getCookieTime(time) {
  if(time<=0)return time;
  var str1=time.substring(1,time.length)*1;
  var str2=time.substring(0,1);
  if (str2=="s"){
       return str1*1000;
  }
  else if (str2=="m"){
      return str1*60*1000;
  }
  else if (str2=="h"){
    return str1*60*60*1000;
  }
  else if (str2=="d"){
      return str1*24*60*60*1000;
  }
}

export function secondToDate(result) {
  var h = Math.floor(result / 3600);
  var m = Math.floor((result / 60 % 60));
  var s = Math.floor((result % 60));
  return result = h + ":" + m + ":" + s;
}

export function getRandomColor() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

export function toTwo ( n ) {
  return n < 10 ?  '0' + n : '' + n;
}


export function jsonToString(obj) {
	var THIS = this;
	switch (typeof (obj)) {
	case 'string':
		return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
	case 'array':
		return '[' + obj.map(THIS.jsonToString).join(',') + ']';
	case 'object':
		if (obj instanceof Array) {
			var strArr = [];
			var len = obj.length;
			for (var i = 0; i < len; i++) {
				strArr.push(THIS.jsonToString(obj[i]));
			}
			return '[' + strArr.join(',') + ']';
		} else if (obj == null) {
			return 'null';

		} else {
			var string = [];
			for ( var property in obj)
				string.push(THIS.jsonToString(property) + ':'
						+ THIS.jsonToString(obj[property]));
			return '{' + string.join(',') + '}';
		}
	case 'number':
		return obj;
	case false:
		return obj;
	}
}

export function systemTime (obj) {
	
		var myTime = new Date();
		
		// number
		var iYear = myTime.getFullYear();
		var iMonth = myTime.getMonth()+1;
		var iDate = myTime.getDate();
		var iWeek = myTime.getDay();
		var iHours = myTime.getHours();
		var iMin = myTime.getMinutes();
		var iSec = myTime.getSeconds();
		var str = '';
		
		if( iWeek === 0 ) iWeek = '星期日';
		if( iWeek === 1 ) iWeek = '星期一';
		if( iWeek === 2 ) iWeek = '星期二';
		if( iWeek === 3 ) iWeek = '星期三';
		if( iWeek === 4 ) iWeek = '星期四';
		if( iWeek === 5 ) iWeek = '星期五';
		if( iWeek === 6 ) iWeek = '星期六';
		
		str = '（更新时间： &nbsp;&nbsp;' + iYear+ '-' +toTwo(iMonth)+'-'+toTwo(iDate)+' '+ toTwo(iHours)+' : '+ toTwo(iMin)+' : '+ toTwo(iSec) + '）';
		
		obj.innerHTML = str; // 2018年1月19日 星期五 17 : 21 : 02
  }

export function sessionOperation() {
    var tempSession = JSON.parse(window.localStorage.getItem("estore"))
    var finalSession = []
    for( var key in tempSession) {
        finalSession.push(tempSession[key])
    }
    return finalSession
}