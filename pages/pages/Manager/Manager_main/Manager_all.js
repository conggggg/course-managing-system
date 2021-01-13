//点击返回按钮,返回到主页面
function return_to_main() {
	window.location.href = '../Manager_main/Manager_main.html'
}

//管理员登出
function logout() {
	//删除cookie
	deleteCookie("username");
	deleteCookie("type");
	//转跳回主页面
	window.location.replace("../../login.html");
	alert("您已退出登录！")
}

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

//将字符串星期转为字符串数字
function convertWeekdayToNumberString(day) {
	if (day == "星期一") {
		return "1";
	} else if (day == "星期二") {
		return "2";
	} else if (day == "星期三") {
		return "3";
	} else if (day == "星期四") {
		return "4";
	} else if (day == "星期五") {
		return "5";
	} else if (day == "星期六") {
		return "6";
	} else if (day == "星期日") {
		return "7";
	}
}

//学生增删改查----------------------------------------------------------------------------------------------------

//点击添加学生按钮,实现添加学生功能,更新数据库学生信息表
function student_add() {
	//获取各个属性的值
	var student_name = document.getElementById("Student_Name").value;
	var student_id = document.getElementById("Student_Id").value;
	var student_sex = document.getElementById("Student_sex").value;
	var student_class = document.getElementById("Student_Class").value;
	var data = {
		studentname: student_name,
		studentid: student_id,
		studentsex: student_sex,
		classname: student_class,
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
				alert("添加成功！");
				setTimeout(function() {
					window.location.assign("../Manager_main/Manager_main.html")
				}, 1000)
			} else {
				alert("添加失败！请检查输入是否有误！");
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://"+ipPort+"/testdoc/manageraddstudent", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

//删除学生信息
function delete_student(button) {
	console.log(button.parentNode.parentNode.children[0].innerHTML) //选中的学生学号
	var data = {
		studentid: button.parentNode.parentNode.children[0].innerHTML,
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
				//删除视图层的表格项
				button.parentNode.parentNode.parentNode.removeChild(button.parentNode.parentNode)
				alert("删除成功！");
			} else {
				alert("删除失败！");
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://"+ipPort+"/testdoc/managerdeletestudent", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

//转跳到修改学生信息页
function to_student_changeinfo(button) {
	let info = button.parentNode.parentNode.children;
	window.location.assign("../Manager_Student_manage/student_changeinfo.html" + "?studentId=" + info[0].innerHTML +
		"&studentName=" + info[1].innerHTML + "&studentSex=" + info[2].innerHTML + "&studentClass=" + info[5].innerHTML);
}

function onChageStudentInfoLoad() {
	document.getElementById("Student_Name").value = GetRequest().studentName;
	document.getElementById("Student_sex").value = GetRequest().studentSex;
	document.getElementById("Student_Class").value = GetRequest().studentClass;
}

//点击修改学生信息按钮,实现修改学生信息功能,更新数据库学生信息表
function student_changeinfo() {
	//获取各个属性的值
	var student_name = document.getElementById("Student_Name").value;
	var student_id = GetRequest().studentId;
	var student_sex = document.getElementById("Student_sex").value;
	var student_class = document.getElementById("Student_Class").value;
	var data = {
		studentname: student_name,
		studentid: student_id,
		studentsex: student_sex,
		classname: student_class,
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
	xmlhttp.open("POST", "http://"+ipPort+"/testdoc/managerupdatestudent", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

//获取学生表格
function get_student() {
	//创建AJAX对象
	var xmlhttp = new XMLHttpRequest();
	//服务器返回数据回调函数
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//解析json对象
			let re = JSON.parse(xmlhttp.responseText);
			console.log(re);
			//获取表格DOM对象
			let element = document.getElementById("studentTable");
			for (let x in re.data) {
				//表格栏DOM对象
				let tr = document.createElement("tr");
				//插入学号
				let studentId = document.createElement("td");
				let studentIdNode = document.createTextNode(re.data[x].studentId);
				studentId.appendChild(studentIdNode);
				tr.appendChild(studentId)
				//插入姓名
				let studentName = document.createElement("td");
				let studentNameNode = document.createTextNode(re.data[x].studentName);
				studentName.appendChild(studentNameNode);
				tr.appendChild(studentName)
				//插入性别
				let studentSex = document.createElement("td");
				let studentSexNode = document.createTextNode(re.data[x].studentSex);
				studentSex.appendChild(studentSexNode);
				tr.appendChild(studentSex)
				//插入年级
				let grade = document.createElement("td");
				let gradeNode = document.createTextNode(re.data[x].grade);
				grade.appendChild(gradeNode);
				tr.appendChild(grade)
				//插入专业
				let profession = document.createElement("td");
				let professionNode = document.createTextNode(re.data[x].profession);
				profession.appendChild(professionNode);
				tr.appendChild(profession)
				//插入班级
				let className = document.createElement("td");
				let classNameNode = document.createTextNode(re.data[x].className);
				className.appendChild(classNameNode);
				tr.appendChild(className)
				//添加修改和删除按钮
				let opTd = document.createElement("td");
				let changeButton = document.createElement("button");
				let changeButtonNode = document.createTextNode("修改");
				changeButton.appendChild(changeButtonNode);
				changeButton.setAttribute("onclick", "to_student_changeinfo(this)");
				opTd.appendChild(changeButton);
				let deleteButton = document.createElement("button");
				let deleteButtonNode = document.createTextNode("删除");
				deleteButton.appendChild(deleteButtonNode);
				deleteButton.setAttribute("onclick", "delete_student(this)");
				opTd.appendChild(deleteButton);
				tr.appendChild(opTd);
				//将当前栏插进表格
				element.appendChild(tr);
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("GET", "http://"+ipPort+"/testdoc/managerquerystudent", true);
	xmlhttp.send();
}

//教师增删改查----------------------------------------------------------------------------------------------------

//点击添加教师按钮,实现添加教师功能,更新数据库教师信息表
function teacher_add() {
	//获取各个属性的值
	var teacher_id = document.getElementById("Teacher_Id").value;
	var teacher_name = document.getElementById("Teacher_Name").value;
	var teacher_sex = document.getElementById("Teacher_Sex").value;
	var data = {
		teacherid: teacher_id,
		teachername: teacher_name,
		teachersex: teacher_sex,
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
				alert("添加成功！");
				setTimeout(function() {
					window.location.assign("../Manager_main/Manager_main.html")
				}, 1000)
			} else {
				alert("添加失败！请检查输入是否有误！");
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://"+ipPort+"/testdoc/manageraddteacher", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

function delete_teacher(button) {
	console.log(button.parentNode.parentNode.children[0].innerHTML) //选中的教师学号
	var data = {
		teacherid: button.parentNode.parentNode.children[0].innerHTML,
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
				//删除视图层的表格项
				button.parentNode.parentNode.parentNode.removeChild(button.parentNode.parentNode)
				alert("删除成功！");
			} else {
				alert("删除失败！");
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://"+ipPort+"/testdoc/managerdeleteteacher", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

function to_teacher_changeinfo(button) {
	let info = button.parentNode.parentNode.children;
	window.location.assign("../Manager_Teacher_manage/Teacher_changeinfo.html" + "?teacherId=" + info[0].innerHTML +
		"&teacherName=" + info[1].innerHTML + "&teacherSex=" + info[2].innerHTML);
}

function onChageTeacherInfoLoad() {
	document.getElementById("Teacher_Name").value = GetRequest().teacherName;
	document.getElementById("Teacher_Sex").value = GetRequest().teacherSex;
}

//点击修改教师信息按钮
function teacher_changeinfo() {
	//获取各个属性的值
	var teacher_id = GetRequest().teacherId;
	var teacher_name = document.getElementById("Teacher_Name").value;
	var teacher_sex = document.getElementById("Teacher_Sex").value;
	var data = {
		teacherid: teacher_id,
		teachername: teacher_name,
		teachersex: teacher_sex,
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
				window.history.back();location.reload();
			} else {
				alert("修改失败！请检查输入是否有误！");
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://"+ipPort+"/testdoc/managerupdateteacher", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}


//获取教师信息
function get_teacher() {
	//创建AJAX对象
	var xmlhttp = new XMLHttpRequest();
	//服务器返回数据回调函数
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//解析json对象
			let re = JSON.parse(xmlhttp.responseText);
			console.log(re);
			//获取表格DOM对象
			let element = document.getElementById("teacherTable");
			for (let x in re.data) {
				//表格栏DOM对象
				let tr = document.createElement("tr");
				//插入工号
				let teacherId = document.createElement("td");
				let teacherIdNode = document.createTextNode(re.data[x].teacherId);
				teacherId.appendChild(teacherIdNode);
				tr.appendChild(teacherId)
				//插入姓名
				let teacherName = document.createElement("td");
				let teacherNameNode = document.createTextNode(re.data[x].teacherName);
				teacherName.appendChild(teacherNameNode);
				tr.appendChild(teacherName)
				//插入性别
				let teacherSex = document.createElement("td");
				let teacherSexNode = document.createTextNode(re.data[x].teacherSex);
				teacherSex.appendChild(teacherSexNode);
				tr.appendChild(teacherSex)
				//添加修改和删除按钮
				let opTd = document.createElement("td");
				let changeButton = document.createElement("button");
				let changeButtonNode = document.createTextNode("修改");
				changeButton.appendChild(changeButtonNode);
				changeButton.setAttribute("onclick", "to_teacher_changeinfo(this)");
				opTd.appendChild(changeButton);
				let deleteButton = document.createElement("button");
				let deleteButtonNode = document.createTextNode("删除");
				deleteButton.appendChild(deleteButtonNode);
				deleteButton.setAttribute("onclick", "delete_teacher(this)");
				opTd.appendChild(deleteButton);
				tr.appendChild(opTd);
				//将当前栏插进表格
				element.appendChild(tr);
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("GET", "http://"+ipPort+"/testdoc/managerqueryteacher", true);
	xmlhttp.send();
}

//课程增删改查----------------------------------------------------------------------------------------------------

//点击添加课程按钮,实现添加课程函数,更新数据库的值
function course_add() {
	//获取各个属性的值
	var course_id = document.getElementById("Course_Id").value;
	var course_name = document.getElementById("Course_Name").value;
	var course_mark = document.getElementById("Course_Mark").value;
	var course_time = document.getElementById("Course_Time").value;
	var course_type = document.getElementById("Course_Type").value;
	var course_weekday = document.getElementById("Course_Weekday").value;
	var course_section = document.getElementById("Course_Section").value;
	var course_teacher = document.getElementById("Course_Teacher").value;
	var data = {
		courseid: course_id,
		coursename: course_name,
		coursecredit: course_mark,
		courseperiod: course_time,
		coursetype: course_type,
		courseday: course_weekday,
		courselesson: course_section,
		teacherid: course_teacher,
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
				alert("添加成功！");
				setTimeout(function() {
					window.location.assign("../Manager_main/Manager_main.html")
				}, 1000)
			} else {
				alert("添加失败！请检查输入是否有误！");
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://"+ipPort+"/testdoc/manageraddcourse", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

//删除课程
function delete_course(button) {
	console.log(button.parentNode.parentNode.children[0].innerHTML) //选中的课程号
	var data = {
		courseid: button.parentNode.parentNode.children[0].innerHTML,
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
				//删除视图层的表格项
				button.parentNode.parentNode.parentNode.removeChild(button.parentNode.parentNode)
				alert("删除成功！");
			} else {
				alert("删除失败！");
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://"+ipPort+"/testdoc/managerdeletecourse", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

function to_course_changeinfo(button) {
	let info = button.parentNode.parentNode.children;
	window.location.assign("../Manager_Course_manage/Course_Changeinfo.html" + "?courseId=" + info[0].innerHTML +
		"&courseName=" + info[1].innerHTML + "&courseMark=" + info[2].innerHTML + "&courseTime=" + info[3].innerHTML +
		"&courseType=" + info[4].innerHTML + "&courseWeekday=" + convertWeekdayToNumberString(info[5].innerHTML) +
		"&courseSection=" + info[6].innerHTML.slice(1, -2) + "&courseTeacherId=" + info[8].innerHTML);
}

function onChangeCourseInfoLoad() {
	document.getElementById("Course_Name").value = GetRequest().courseName;
	document.getElementById("Course_Mark").value = GetRequest().courseMark;
	document.getElementById("Course_Time").value = GetRequest().courseTime;
	document.getElementById("Course_Type").value = GetRequest().courseType;
	document.getElementById("Course_Weekday").value = GetRequest().courseWeekday;
	document.getElementById("Course_Section").value = GetRequest().courseSection;
	document.getElementById("Course_TeacherId").value = GetRequest().courseTeacherId;
}

//点击修改课程按钮,实现修改课程函数,更新数据库的值
function course_change() {
	//获取各个属性的值
	var course_id = GetRequest().courseId;
	var course_name = document.getElementById("Course_Name").value;
	var course_mark = document.getElementById("Course_Mark").value;
	var course_time = document.getElementById("Course_Time").value;
	var course_type = document.getElementById("Course_Type").value;
	var course_weekday = document.getElementById("Course_Weekday").value;
	var course_section = document.getElementById("Course_Section").value;
	var course_teacherId = document.getElementById("Course_TeacherId").value;
	var data = {
		courseid: course_id,
		coursename: course_name,
		coursecredit: course_mark,
		courseperiod: course_time,
		coursetype: course_type,
		courseday: course_weekday,
		courselesson: course_section,
		teacherid: course_teacherId,
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
				window.history.back();location.reload();
			} else {
				alert("修改失败！请检查输入是否有误！");
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://"+ipPort+"/testdoc/managerupdatecourse", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

//根据信息,或者直接获取课程信息表
function get_course() {
	//创建AJAX对象
	var xmlhttp = new XMLHttpRequest();
	//服务器返回数据回调函数
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//解析json对象
			let re = JSON.parse(xmlhttp.responseText);
			console.log(re);
			//获取表格DOM对象
			let element = document.getElementById("courseTable");
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
				let changeButton = document.createElement("button");
				let changeButtonNode = document.createTextNode("修改");
				changeButton.appendChild(changeButtonNode);
				changeButton.setAttribute("onclick", "to_course_changeinfo(this)");
				opTd.appendChild(changeButton);
				let deleteButton = document.createElement("button");
				let deleteButtonNode = document.createTextNode("删除");
				deleteButton.appendChild(deleteButtonNode);
				deleteButton.setAttribute("onclick", "delete_course(this)");
				opTd.appendChild(deleteButton);
				tr.appendChild(opTd);
				//将当前栏插进表格
				element.appendChild(tr);
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("GET", "http://"+ipPort+"/testdoc/managerquerycourse", true);
	xmlhttp.send();
}

//班级增删改查----------------------------------------------------------------------------------------------------------

//添加班级
function add_class() {
	//获取各个属性的值
	var class_id = document.getElementById("Class_Id").value;
	var class_name = document.getElementById("Class_Name").value;
	var class_grade = document.getElementById("Class_Grade").value;
	var class_profession = document.getElementById("Class_Profession").value;
	var data = {
		classid: class_id,
		classname: class_name,
		profession: class_profession,
		grade: class_grade,
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
				alert("添加成功！");
				setTimeout(function() {
					window.location.assign("../Manager_main/Manager_main.html")
				}, 1000)
			} else {
				alert("添加失败！请检查输入是否有误！");
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://"+ipPort+"/testdoc/manageraddclass", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

//删除班级
function delete_class(button) {
	console.log(button.parentNode.parentNode.children[0].innerHTML) //选中的课程号
	var data = {
		classid: button.parentNode.parentNode.children[0].innerHTML,
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
				//删除视图层的表格项
				button.parentNode.parentNode.parentNode.removeChild(button.parentNode.parentNode)
				alert("删除成功！");
			} else {
				alert("删除失败！");
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://"+ipPort+"/testdoc/managerdeleteclass", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

//转跳到修改班级页
function to_class_changeinfo(button) {
	let info = button.parentNode.parentNode.children;
	window.location.assign("../Manager_Class_manage/Class_changeinfo.html" + "?classId=" + info[0].innerHTML +
		"&className=" + info[1].innerHTML + "&classGarde=" + info[2].innerHTML + "&classMajor=" + info[3].innerHTML);
}

//加载修改班级页
function onChageCourseInfoLoad() {
	document.getElementById("Class_Name").value = GetRequest().className;
	document.getElementById("Class_Grade").value = GetRequest().classGarde;
	document.getElementById("Class_Major").value = GetRequest().classMajor;
}

//修改班级信息
function Class_changeinfo() {
	//获取各个属性的值
	var class_id = GetRequest().classId;
	var class_name = document.getElementById("Class_Name").value;
	var class_grade = document.getElementById("Class_Grade").value;
	var class_major = document.getElementById("Class_Major").value;
	var data = {
		classid: class_id,
		classname: class_name,
		profession: class_major,
		grade: class_grade,
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
				window.history.back();location.reload();
			} else {
				alert("修改失败！请检查输入是否有误！");
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://"+ipPort+"/testdoc/managerupdateclass", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

//获取班级信息
function get_class() {
	//创建AJAX对象
	var xmlhttp = new XMLHttpRequest();
	//服务器返回数据回调函数
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//解析json对象
			let re = JSON.parse(xmlhttp.responseText);
			console.log(re);
			//获取表格DOM对象
			let element = document.getElementById("classTable");
			for (let x in re.data) {
				//表格栏DOM对象
				let tr = document.createElement("tr");
				//插入班级编号
				let classId = document.createElement("td");
				let classIdNode = document.createTextNode(re.data[x].classId);
				classId.appendChild(classIdNode);
				tr.appendChild(classId)
				//插入班级名称
				let className = document.createElement("td");
				let classNameNode = document.createTextNode(re.data[x].className);
				className.appendChild(classNameNode);
				tr.appendChild(className)
				//插入年级
				let grade = document.createElement("td");
				let gradeNode = document.createTextNode(re.data[x].grade);
				grade.appendChild(gradeNode);
				tr.appendChild(grade)
				//插入专业
				let profession = document.createElement("td");
				let professionNode = document.createTextNode(re.data[x].profession);
				profession.appendChild(professionNode);
				tr.appendChild(profession)
				//添加删除按钮
				let opTd = document.createElement("td");
				let changeButton = document.createElement("button");
				let changeButtonNode = document.createTextNode("修改");
				changeButton.appendChild(changeButtonNode);
				changeButton.setAttribute("onclick", "to_class_changeinfo(this)");
				opTd.appendChild(changeButton);
				let deleteButton = document.createElement("button");
				let deleteButtonNode = document.createTextNode("删除");
				deleteButton.appendChild(deleteButtonNode);
				deleteButton.setAttribute("onclick", "delete_class(this)");
				opTd.appendChild(deleteButton);
				tr.appendChild(opTd);
				//将当前栏插进表格
				element.appendChild(tr);
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("GET", "http://"+ipPort+"/testdoc/managerqueryclass", true);
	xmlhttp.send();
}

//教师课程表-----------------------------------------------------------------------------------------------------------

function getTeacherTimetable() {
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
				//添加表头（老师信息）
				let teacherInfo = document.createElement("p");
				teacherInfo.appendChild(document.createTextNode(re[x].teacherProfile.teacherName + "（工号：" + re[x].teacherProfile.teacherId +
					"）的课表："));
				area.appendChild(teacherInfo);
				//添加首行（星期）
				let firstLine = document.createElement("tr");
				let td = document.createElement("td")
				td.setAttribute("width", "12.5%");
				td.setAttribute("class", "btbg font-center titfont");
				td.appendChild(document.createTextNode("节次"));
				firstLine.appendChild(td);
				//添加星期栏
				for (let i = 1; i <= 7; i++) {
					let td = document.createElement("td")
					td.setAttribute("width", "12.5%");
					td.setAttribute("class", "btbg font-center titfont");
					td.appendChild(document.createTextNode(convertStringToWeekday(String(i))));
					firstLine.appendChild(td);
				}
				//将整一行(tr)加入表中
				table.appendChild(firstLine);
				//添加剩下行（节次）
				for (let i = 1; i <= 6; i++) {
					let line = document.createElement("tr");
					for (let j = 0; j < 8; j++) {
						let td = document.createElement("td")
						if (j == 0) {
							td.appendChild(document.createTextNode("第" + i + "大节"));
						} else {
							td.appendChild(document.createTextNode(" "));
						}
						line.appendChild(td);
					}
					//将该行加进表
					table.appendChild(line);
				}
				//处理每个课程
				for (let k in re[x].course) {
					table.children[Number(re[x].course[k].courseLesson)].children[Number(re[x].course[k].courseDay)].innerHTML = re[x]
						.course[k].courseName
				}
				//将表加入到页面中
				area.appendChild(table);
			}
		} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("GET", "http://"+ipPort+"/testdoc/managerqueryteachertimetable", true);
	xmlhttp.send();
}

//选课学生表-----------------------------------------------------------------------------------------------------------

function getCourseSeletedStudentList() {
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
	xmlhttp.open("GET", "http://"+ipPort+"/testdoc/managerquerystudentselectcourse", true);
	xmlhttp.send();
}
