//学生登出
function logout() {
	//删除cookie
	deleteCookie("username");
	deleteCookie("type");
	//转跳回主页面
	window.location.replace("../../login.html");
	alert("您已退出登录！")
}

//获取学生课表
function get_course() {
	var student_id = getCookie("username");
	var data = {
		studentid: student_id,
	}
	//创建AJAX对象
	var xmlhttp = new XMLHttpRequest();
	//服务器返回数据回调函数
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//解析json对象
			let re = JSON.parse(xmlhttp.responseText);
			console.log(re);
			//获取表DOM对象
			let table = document.getElementById("table");
			//处理每一个课程
			for(let x in re.course){
				table.children[1].children[Number(re.course[x].courseLesson)].children[Number(re.course[x].courseDay)].innerHTML=re.course[x].courseName;
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://172.18.41.15:8080/testdoc/studentquerytimetable", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}
