//学生登出
function logout() {
	//删除cookie
	deleteCookie("username");
	deleteCookie("type");
	//转跳回主页面
	window.location.replace("../../login.html");
	alert("您已退出登录！")
}

//将字符串数字转为星期
function convertStringToWeekday(str) {
	if (str == "1") {
		return "星期一"
	} else if (str == "2") {
		return "星期二"
	} else if (str == "3") {
		return "星期三"
	} else if (str == "4") {
		return "星期四"
	} else if (str == "5") {
		return "星期五"
	} else if (str == "6") {
		return "星期六"
	} else if (str == "7") {
		return "星期日"
	}
}

//获取学生个人信息
function get_info() {
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
			let re = JSON.parse(xmlhttp.responseText).data;
			console.log(re);
			//显示对象
			document.getElementById("Sid").innerHTML = re.studentId;
			document.getElementById("Sname").innerHTML = re.studentName;
			document.getElementById("Ssex").innerHTML = re.studentSex;
			document.getElementById("Smajor").innerHTML = re.profession;
			document.getElementById("Sgrade").innerHTML = re.grade;
			document.getElementById("Sclass").innerHTML = re.className;

		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://" + ipPort + "/testdoc/studentqueryinformation", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

//学生修改密码
function change_password() {
	let student_id = getCookie("username");
	let newPassword = document.getElementById("password").value;
	let confirmInput = document.getElementById("again").value;
	if (newPassword == confirmInput) {
		let data = {
			username: student_id,
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
					window.location.assign("../main_html/Student_main.html")
				} else {
					alert("修改失败！");
					document.getElementById("password").value = "";
					document.getElementById("again").value = "";
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
		document.getElementById("password").value = "";
		document.getElementById("again").value = "";
	}
}

//加载选课表
function seleteCourseOnLoad() {
	//创建AJAX对象
	var xmlhttp = new XMLHttpRequest();
	//服务器返回数据回调函数
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//解析json对象
			let re = JSON.parse(xmlhttp.responseText);
			console.log(re);
			//获取表格DOM对象
			let element = document.getElementById("table");
			for (let x in re.data) {
				//表格栏DOM对象
				let tr = document.createElement("tr");
				//插入课程号
				let courseId = document.createElement("td");
				let courseIdNode = document.createTextNode(re.data[x].courseId);
				courseId.appendChild(courseIdNode);
				tr.appendChild(courseId)
				//插入课程名
				let courseName = document.createElement("td");
				let courseNameNode = document.createTextNode(re.data[x].courseName);
				courseName.appendChild(courseNameNode);
				tr.appendChild(courseName)
				//插入学分
				let courseCredit = document.createElement("td");
				let courseCreditNode = document.createTextNode(re.data[x].courseCredit);
				courseCredit.appendChild(courseCreditNode);
				tr.appendChild(courseCredit)
				//插入课时
				let coursePeriod = document.createElement("td");
				let coursePeriodNode = document.createTextNode(re.data[x].coursePeriod);
				coursePeriod.appendChild(coursePeriodNode);
				tr.appendChild(coursePeriod)
				//插入课程类型
				let courseType = document.createElement("td");
				let courseTypeNode = document.createTextNode(re.data[x].courseType);
				courseType.appendChild(courseTypeNode);
				tr.appendChild(courseType)
				//插入星期
				let courseDay = document.createElement("td");
				let courseDayNode = document.createTextNode(convertStringToWeekday(re.data[x].courseDay));
				courseDay.appendChild(courseDayNode);
				tr.appendChild(courseDay)
				//插入节次
				let courseLesson = document.createElement("td");
				let courseLessonNode = document.createTextNode("第" + re.data[x].courseLesson + "大节");
				courseLesson.appendChild(courseLessonNode);
				tr.appendChild(courseLesson)
				//插入执教老师
				let teacherName = document.createElement("td");
				let teacherNameNode = document.createTextNode(re.data[x].teacherName);
				teacherName.appendChild(teacherNameNode);
				tr.appendChild(teacherName)
				//插入执教老师编号
				let teacherId = document.createElement("td");
				let teacherIdNode = document.createTextNode(re.data[x].teacherId);
				teacherId.appendChild(teacherIdNode);
				tr.appendChild(teacherId)
				//添加删除按钮
				let opTd = document.createElement("td");
				let seleteButton = document.createElement("button");
				let seleteButtonNode = document.createTextNode("选课");
				seleteButton.appendChild(seleteButtonNode);
				seleteButton.setAttribute("onclick", "selete_course(this)");
				opTd.appendChild(seleteButton);
				tr.appendChild(opTd);
				//将当前栏插进表格
				element.appendChild(tr);
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("GET", "http://" + ipPort + "/testdoc/managerquerycourse", true);
	xmlhttp.send();
}

//学生选课
function selete_course(button) {
	console.log(button.parentNode.parentNode.children[0].innerHTML) //选中的课程号
	var data = {
		courseid: button.parentNode.parentNode.children[0].innerHTML,
		studentid: getCookie("username"),
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
				alert("选课成功！");
			} else {
				alert("选课失败！");
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://" + ipPort + "/testdoc/studentselectcourse", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
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

//获取学生成绩
function get_GPA(){
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
			let re = JSON.parse(xmlhttp.responseText).data;
			console.log(re);
			//获取表格DOM对象
			let element = document.getElementById("table").children[1];
			//如果有成绩信息
			if(re.data){
				element.removeChild(document.getElementById("emptyWarn"));
			}
			for (let x in re.data) {
				//表格栏DOM对象
				let tr = document.createElement("tr");
				//插入课程号
				let courseId = document.createElement("td");
				let courseIdNode = document.createTextNode(re.data[x].courseId);
				courseId.appendChild(courseIdNode);
				tr.appendChild(courseId);
				//插入课程名称
				let courseName = document.createElement("td");
				let courseNameNode = document.createTextNode(re.data[x].courseName);
				courseName.appendChild(courseNameNode);
				tr.appendChild(courseName);
				//插入成绩
				let score = document.createElement("td");
				let scoreNode = document.createTextNode(re.data[x].score);
				score.appendChild(scoreNode);
				tr.appendChild(score);
				//插入绩点
				let GPA = document.createElement("td");
				let GPANode = document.createTextNode(re.data[x].GPA);
				GPA.appendChild(GPANode);
				tr.appendChild(GPA);
				//将当前栏插进表格
				element.appendChild(tr);
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://" + ipPort + "/testdoc/studentqueryscore", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}