function displayDate() {
	document.getElementById("demo").innerHTML = Date();
}

function loginfunc() {
	// window.location.href="../pages/main.html";//转跳（可以后退）
	// window.location.replace("../pages/main.html");//直接替换（无法后退）
	//创建AJAX对象
	var xmlhttp=new XMLHttpRequest();
	//打印用户输入信息
	console.log(document.getElementById("type").value);
	//服务器返回数据回调函数
	// xmlhttp.onreadystatechange=function()
    // {
    //     if (xmlhttp.readyState==4 && xmlhttp.status==200)
    //     {
    //         if(xmlhttp.responseText=="true"){
	// 			document.getElementById("t").innerHTML="登录成功";
	// 			window.location.href="../pages/login.html"; 
	// 		}
	// 		else{
	// 			document.getElementById("t").innerHTML="登录失败";
	// 		}
    //     }
    // }
	xmlhttp.open("POST", "http://172.18.41.15:8080/testdoc/managerquery", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("type="+document.getElementById("type").value);
}