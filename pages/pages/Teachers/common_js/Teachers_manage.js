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
function get_info() {
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

//教师修改密码
function change_password() {
	let teacher_id = getCookie("username");
	let newPassword = document.getElementById("change_Password1").value;
	let confirmInput = document.getElementById("change_Password2").value;
	if (newPassword == confirmInput) {
		let data = {
			username: teacher_id,
			newpassword: newPassword,
		}
		//创建AJAX对象
		var xmlhttp = new XMLHttpRequest();
		//服务器返回数据回调函数
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				//解析json对象
				let re = JSON.parse(xmlhttp.responseText);
				console.log(re);
				if (re.result) {
					alert("修改成功！");
					window.location.assign("../teachers_main/Teachers_main.html")
				} else {
					alert("修改失败！");
					document.getElementById("change_Password1").value = "";
					document.getElementById("change_Password2").value = "";
				}
			} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
				alert("网络错误！");
			}
		};
		//设置并提交申请
		xmlhttp.open("POST", "http://" + ipPort + "/testdoc/updatepassword", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
		xmlhttp.send("data=" + JSON.stringify(data));
	} else {
		alert("两次输入密码不一致！");
		document.getElementById("change_Password1").value = "";
		document.getElementById("change_Password2").value = "";
	}
}

//教师获取排课表
function get_course(){
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
			for (let x in re.course) {
				table.children[1].children[Number(re.course[x].courseLesson)].children[Number(re.course[x].courseDay)].innerHTML =
					re.course[x].courseName;
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://" + ipPort + "/testdoc/studentquerytimetable", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}