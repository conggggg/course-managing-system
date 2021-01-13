//获得URL后的参数并转化为对象
function GetRequest() {
	if (location.search) {
		var url = location.search; //获取url中"?"符后的字串
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}
}

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
function get_course() {
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
			let re = JSON.parse(xmlhttp.responseText);
			console.log(re);
			//获取表DOM对象
			let table = document.getElementById("table");
			//处理每一个课程
			for (let x in re.course) {
				table.children[0].children[Number(re.course[x].courseLesson)].children[Number(re.course[x].courseDay)].innerHTML =
					re.course[x].courseName;
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://" + ipPort + "/testdoc/teacherquerytimetable", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

//教师获取课程选课情况
function get_selected_student() {
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
			let re = JSON.parse(xmlhttp.responseText);
			console.log(re);
			//获取表格区域DOM对象
			let area = document.getElementById("tableArea");
			//生成表
			for (let x in re) {
				area.appendChild(document.createElement("br"));
				//创建表对象
				let table = document.createElement("table");
				//设置表属性
				table.setAttribute("width", "100%");
				table.setAttribute("border", "0");
				table.setAttribute("cellspacing", "1");
				table.setAttribute("cellpadding", "4");
				table.setAttribute("bgcolor", "#cccccc");
				table.setAttribute("class", "tabtop13");
				table.setAttribute("align", "center");
				//添加表头（课程信息）
				let courseInfo = document.createElement("p");
				courseInfo.appendChild(document.createTextNode(re[x].courseInfo.courseName + "（课程编号：" + re[x].courseInfo.courseId +
					"）的选课学生表："));
				area.appendChild(courseInfo);
				//添加首行
				let firstLine = document.createElement("tr");
				//添加学号
				let studentId = document.createElement("td")
				studentId.setAttribute("width", "20%");
				studentId.setAttribute("class", "btbg font-center titfont");
				studentId.appendChild(document.createTextNode("学号"));
				firstLine.appendChild(studentId);
				//添加姓名
				let studentName = document.createElement("td")
				studentName.setAttribute("width", "20%");
				studentName.setAttribute("class", "btbg font-center titfont");
				studentName.appendChild(document.createTextNode("姓名"));
				firstLine.appendChild(studentName);
				//添加班级
				let studentClass = document.createElement("td")
				studentClass.setAttribute("width", "20%");
				studentClass.setAttribute("class", "btbg font-center titfont");
				studentClass.appendChild(document.createTextNode("班级"));
				firstLine.appendChild(studentClass);
				//添加年级
				let studentGrade = document.createElement("td")
				studentGrade.setAttribute("width", "20%");
				studentGrade.setAttribute("class", "btbg font-center titfont");
				studentGrade.appendChild(document.createTextNode("年级"));
				firstLine.appendChild(studentGrade);
				//添加专业
				let studentMajor = document.createElement("td")
				studentMajor.setAttribute("width", "20%");
				studentMajor.setAttribute("class", "btbg font-center titfont");
				studentMajor.appendChild(document.createTextNode("专业"));
				firstLine.appendChild(studentMajor);
				//将整一行(tr)加入表中
				table.appendChild(firstLine);
				//如果选课人数为零的情况
				if (re[x].selectedStudent.length == 0) {
					let line = document.createElement("tr");
					for (let i = 0; i < 5; i++) {
						let td = document.createElement("td");
						td.appendChild(document.createTextNode(" "));
						line.appendChild(td);
					}
					//将行加入到表中
					table.appendChild(line);
				} else {
					//添加剩下行（每个学生的信息）
					for (let stu in re[x].selectedStudent) {
						let line = document.createElement("tr");
						//添加学生学号
						let studentId = document.createElement("td");
						studentId.appendChild(document.createTextNode(re[x].selectedStudent[stu].studentId));
						line.appendChild(studentId);
						//添加学生姓名
						let studentName = document.createElement("td");
						studentName.appendChild(document.createTextNode(re[x].selectedStudent[stu].studentName));
						line.appendChild(studentName);
						//添加学生班级
						let studentClass = document.createElement("td");
						studentClass.appendChild(document.createTextNode(re[x].selectedStudent[stu].className));
						line.appendChild(studentClass);
						//添加学生年级
						let studentGrade = document.createElement("td");
						studentGrade.appendChild(document.createTextNode(re[x].selectedStudent[stu].grade));
						line.appendChild(studentGrade);
						//添加学生专业
						let studentMajor = document.createElement("td");
						studentMajor.appendChild(document.createTextNode(re[x].selectedStudent[stu].profession));
						line.appendChild(studentMajor);
						//将行加入到表中
						table.appendChild(line);
					}
				}
				//将表加入到页面中
				area.appendChild(table);
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://" + ipPort + "/testdoc/teacherquerystudentselectcourse", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

//老师获取选课学生成绩信息
function get_student_score() {
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
			//获取表格区域DOM对象
			let area = document.getElementById("tableArea");
			//生成表
			for (let x in re) {
				area.appendChild(document.createElement("br"));
				//创建表对象
				let table = document.createElement("table");
				//设置表属性
				table.setAttribute("width", "100%");
				table.setAttribute("border", "0");
				table.setAttribute("cellspacing", "1");
				table.setAttribute("cellpadding", "4");
				table.setAttribute("bgcolor", "#cccccc");
				table.setAttribute("class", "tabtop13");
				table.setAttribute("align", "center");
				//添加表头（课程信息）
				let courseInfo = document.createElement("p");
				courseInfo.appendChild(document.createTextNode(re[x].coursename + "（课程编号：" + re[x].courseid +
					"）的选课学生表："));
				area.appendChild(courseInfo);
				//添加首行
				let firstLine = document.createElement("tr");
				//添加课程编号栏
				let courseId = document.createElement("td")
				courseId.setAttribute("width", "15%");
				courseId.setAttribute("class", "btbg font-center titfont");
				courseId.appendChild(document.createTextNode("课程编号"));
				firstLine.appendChild(courseId);
				//添加课程名栏
				let courseName = document.createElement("td")
				courseName.setAttribute("width", "15%");
				courseName.setAttribute("class", "btbg font-center titfont");
				courseName.appendChild(document.createTextNode("课程名"));
				firstLine.appendChild(courseName);
				//添加学号栏
				let studentId = document.createElement("td")
				studentId.setAttribute("width", "15%");
				studentId.setAttribute("class", "btbg font-center titfont");
				studentId.appendChild(document.createTextNode("学号"));
				firstLine.appendChild(studentId);
				//添加姓名栏
				let studentName = document.createElement("td")
				studentName.setAttribute("width", "15%");
				studentName.setAttribute("class", "btbg font-center titfont");
				studentName.appendChild(document.createTextNode("姓名"));
				firstLine.appendChild(studentName);
				//添加成绩栏
				let studentClass = document.createElement("td")
				studentClass.setAttribute("width", "15%");
				studentClass.setAttribute("class", "btbg font-center titfont");
				studentClass.appendChild(document.createTextNode("成绩"));
				firstLine.appendChild(studentClass);
				//添加操作栏
				let studentGrade = document.createElement("td")
				studentGrade.setAttribute("width", "15%");
				studentGrade.setAttribute("class", "btbg font-center titfont");
				studentGrade.appendChild(document.createTextNode("操作"));
				firstLine.appendChild(studentGrade);
				//将整一行(tr)加入表中
				table.appendChild(firstLine);
				//如果选课人数为零的情况
				if (re[x].studentinfo.length == 0) {
					let line = document.createElement("tr");
					for (let i = 0; i < 4; i++) {
						let td = document.createElement("td");
						td.appendChild(document.createTextNode(" "));
						line.appendChild(td);
					}
					//将行加入到表中
					table.appendChild(line);
				} else {
					//添加剩下行（每个学生的信息）
					for (let stu in re[x].studentinfo) {
						let line = document.createElement("tr");
						//添加课程编号
						let courseId = document.createElement("td");
						courseId.appendChild(document.createTextNode(re[x].courseid));
						line.appendChild(courseId);
						//添加课程名
						let courseName = document.createElement("td");
						courseName.appendChild(document.createTextNode(re[x].coursename));
						line.appendChild(courseName);
						//添加学生学号
						let studentId = document.createElement("td");
						studentId.appendChild(document.createTextNode(re[x].studentinfo[stu].studentid));
						line.appendChild(studentId);
						//添加学生姓名
						let studentName = document.createElement("td");
						studentName.appendChild(document.createTextNode(re[x].studentinfo[stu].studentname));
						line.appendChild(studentName);
						//添加学生成绩
						let studentScore = document.createElement("td");
						studentScore.appendChild(document.createTextNode(re[x].studentinfo[stu].score=="null"?"尚无成绩":re[x].studentinfo[stu].score));
						line.appendChild(studentScore);
						//添加修改成绩按钮
						let opTd = document.createElement("td");
						let changeButton = document.createElement("button");
						let changeButtonNode = document.createTextNode("修改成绩");
						changeButton.appendChild(changeButtonNode);
						changeButton.setAttribute("onclick", "to_modify_mark(this)");
						opTd.appendChild(changeButton);
						line.appendChild(opTd);
						//将行加入到表中
						table.appendChild(line);
					}
				}
				//将表加入到页面中
				area.appendChild(table);
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://" + ipPort + "/testdoc/teacherquerystudentscore", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

function to_modify_mark(button){
	let info = button.parentNode.parentNode.children;
	window.location.assign("../teachers_student/Teachers_modify_student_grade.html" + "?courseId=" + info[0].innerHTML +
		"&studentId=" + info[2].innerHTML + "&score=" + (info[4].innerHTML=="尚无成绩"?"null":info[4].innerHTML));
}

function onModifyMarkLoad(){
	document.getElementById("Student_Grade").value = GetRequest().score;
}

function modify_mark(){
	//获取各个属性的值
	var courseid = GetRequest().courseId;
	var studentid = GetRequest().studentId;
	var score = document.getElementById("Student_Grade").value;
	var data = {
		courseid: courseid,
		studentid: studentid,
		score: score,
	}
	//创建AJAX对象
	var xmlhttp = new XMLHttpRequest();
	//服务器返回数据回调函数
	xmlhttp.onreadystatechange = async function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//解析json对象
			let re = JSON.parse(xmlhttp.responseText);
			console.log(re);
			if (re.result) {
				alert("修改成功！");
				window.history.back();location.reload();
			} else {
				alert("修改失败！请检查输入是否有误！");
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://"+ipPort+"/testdoc/teacherupdatestudentscore", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}