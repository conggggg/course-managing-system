var ipPool=["172.18.41.23:8080","172.18.43.143:8080"]
var ipPort=ipPool[0];

function addCookie(name, value, expiresHours) {
    var cookieString = name + "=" + escape(value)+"; path=/";
    //判断是否设置过期时间 
    if (expiresHours > 0) {
        var date = new Date();
        date.setTime(date.getTime + expiresHours * 3600 * 1000);
        cookieString = cookieString + "; expires=" + date.toGMTString();
    }
    document.cookie = cookieString;
    console.log("Cookie added")
}

function getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name) {
            console.log("Cookie got")
            console.log(arr[1])
            return arr[1];
        }
    }
    console.log("No such a Cookie")
    return "";
}

function deleteCookie(name) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = name + "="+getCookie(name)+"; expires=" + date.toGMTString()+"; path=/";
    console.log("Cookie deleted")
} 