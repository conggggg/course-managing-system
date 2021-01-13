//教师登出
function logout() {
	//删除cookie
	deleteCookie("username");
	deleteCookie("type");
	//转跳回主页面
	window.location.replace("../../login.html");
	alert("您已退出登录！")
}

//教师获取个人信息
function get_info(){
	var teacher_id = getCookie("username");
	var data = {
		teacherid: teacher_id,
	}
	//创建AJAX对象
	var xmlhttp = new XMLHttpRequest();
	//服务器返回数据回调函数
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//解析json对象
			let re = JSON.parse(xmlhttp.responseText).data;
			console.log(re);
			//显示对象
			document.getElementById("teacherId").innerHTML = re.teacherId;
			document.getElementById("teacherName").innerHTML = re.teacherName;
			document.getElementById("teacherSex").innerHTML = re.teacherSex;
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://" + ipPort + "/testdoc/teacherqueryinformation", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}