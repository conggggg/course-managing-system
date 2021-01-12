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
    if(location.search){
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
function convertStringToWeekday(str){
	if(str=="1"){
		return "星期一"
	}
	else if(str=="2"){
		return "星期二"
	}
	else if(str=="3"){
		return "星期三"
	}
	else if(str=="4"){
		return "星期四"
	}
	else if(str=="5"){
		return "星期五"
	}
	else if(str=="6"){
		return "星期六"
	}
	else if(str=="7"){
		return "星期日"
	}
}

//将字符串星期转为字符串数字
function convertWeekdayToNumberString(day){
	if(day=="星期一"){
		return "1";
	}
	else if(day=="星期二"){
		return "2";
	}
	else if(day=="星期三"){
		return "3";
	}
	else if(day=="星期四"){
		return "4";
	}
	else if(day=="星期五"){
		return "5";
	}
	else if(day=="星期六"){
		return "6";
	}
	else if(day=="星期日"){
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
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//解析json对象
			let re = JSON.parse(xmlhttp.responseText);
			console.log(re);
			if (re.result) {
				alert("添加成功！");
				setTimeout(function() {
					window.location.assign("../Manager_main/Manager_main.html")
				},1000)
			}
			else {
				alert("添加失败！请检查输入是否有误！");
			}
		}
		else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://172.18.41.15:8080/testdoc/manageraddstudent", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

//删除学生信息
function delete_student(button) {
	console.log(button.parentNode.parentNode.children[0].innerHTML)//选中的学生学号
	var data = {
		studentid: button.parentNode.parentNode.children[0].innerHTML,
	}
	//创建AJAX对象
	var xmlhttp = new XMLHttpRequest();
	//服务器返回数据回调函数
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//解析json对象
			let re = JSON.parse(xmlhttp.responseText);
			console.log(re);
			if (re.result) {
				//删除视图层的表格项
				button.parentNode.parentNode.parentNode.removeChild(button.parentNode.parentNode)
				alert("删除成功！");
			}
			else {
				alert("删除失败！");
			}
		}
		else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://172.18.41.15:8080/testdoc/managerdeletestudent", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

//转跳到修改学生信息页
function to_student_changeinfo(button){
	let info=button.parentNode.parentNode.children;
	window.location.assign("../Manager_Student_manage/student_changeinfo.html"+"?studentId="+info[0].innerHTML+"&studentName="+info[1].innerHTML+"&studentSex="+info[2].innerHTML+"&studentClass="+info[5].innerHTML);
}

function onChageStudentInfoLoad(){
	document.getElementById("Student_Name").value=GetRequest().studentName;
	document.getElementById("Student_sex").value=GetRequest().studentSex;
	document.getElementById("Student_Class").value=GetRequest().studentClass;
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
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//解析json对象
			let re = JSON.parse(xmlhttp.responseText);
			console.log(re);
			if (re.result) {
				alert("修改成功！");
				setTimeout(function() {
					window.location.assign("../Manager_main/Manager_main.html")
				},1000)
			}
			else {
				alert("修改失败！请检查输入是否有误！");
			}
		}
		else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://172.18.41.15:8080/testdoc/managerupdatestudent", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

//获取学生表格
function get_student() {
	//创建AJAX对象
	var xmlhttp = new XMLHttpRequest();
	//服务器返回数据回调函数
	xmlhttp.onreadystatechange = function () {
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
				changeButton.setAttribute("onclick","to_student_changeinfo(this)");
				opTd.appendChild(changeButton);
				let deleteButton = document.createElement("button");
				let deleteButtonNode = document.createTextNode("删除");
				deleteButton.appendChild(deleteButtonNode);
				deleteButton.setAttribute("onclick","delete_student(this)");
				opTd.appendChild(deleteButton);
				tr.appendChild(opTd);
				//将当前栏插进表格
				element.appendChild(tr);
			}
		}
		else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("GET", "http://172.18.41.15:8080/testdoc/managerquerystudent", true);
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
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//解析json对象
			let re = JSON.parse(xmlhttp.responseText);
			console.log(re);
			if (re.result) {
				alert("添加成功！");
				setTimeout(function() {
					window.location.assign("../Manager_main/Manager_main.html")
				},1000)
			}
			else {
				alert("添加失败！请检查输入是否有误！");
			}
		}
		else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://172.18.41.15:8080/testdoc/manageraddteacher", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

function delete_teacher(button){
	console.log(button.parentNode.parentNode.children[0].innerHTML)//选中的教师学号
	var data = {
		teacherid: button.parentNode.parentNode.children[0].innerHTML,
	}
	//创建AJAX对象
	var xmlhttp = new XMLHttpRequest();
	//服务器返回数据回调函数
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//解析json对象
			let re = JSON.parse(xmlhttp.responseText);
			console.log(re);
			if (re.result) {
				//删除视图层的表格项
				button.parentNode.parentNode.parentNode.removeChild(button.parentNode.parentNode)
				alert("删除成功！");
			}
			else {
				alert("删除失败！");
			}
		}
		else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://172.18.41.15:8080/testdoc/managerdeleteteacher", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

function to_teacher_changeinfo(button){
	let info=button.parentNode.parentNode.children;
	window.location.assign("../Manager_Teacher_manage/Teacher_changeinfo.html"+"?teacherId="+info[0].innerHTML+"&teacherName="+info[1].innerHTML+"&teacherSex="+info[2].innerHTML);
}

function onChageTeacherInfoLoad(){
	document.getElementById("Teacher_Name").value=GetRequest().teacherName;
	document.getElementById("Teacher_Sex").value=GetRequest().teacherSex;
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
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//解析json对象
			let re = JSON.parse(xmlhttp.responseText);
			console.log(re);
			if (re.result) {
				alert("修改成功！");
				setTimeout(function() {
					window.location.assign("../Manager_main/Manager_main.html")
				},1000)
			}
			else {
				alert("修改失败！请检查输入是否有误！");
			}
		}
		else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://172.18.41.15:8080/testdoc/managerupdateteacher", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}


//获取教师信息
function get_teacher(){
	//创建AJAX对象
	var xmlhttp = new XMLHttpRequest();
	//服务器返回数据回调函数
	xmlhttp.onreadystatechange = function () {
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
				changeButton.setAttribute("onclick","to_teacher_changeinfo(this)");
				opTd.appendChild(changeButton);
				let deleteButton = document.createElement("button");
				let deleteButtonNode = document.createTextNode("删除");
				deleteButton.appendChild(deleteButtonNode);
				deleteButton.setAttribute("onclick","delete_teacher(this)");
				opTd.appendChild(deleteButton);
				tr.appendChild(opTd);
				//将当前栏插进表格
				element.appendChild(tr);
			}
		}
		else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("GET", "http://172.18.41.15:8080/testdoc/managerqueryteacher", true);
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
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//解析json对象
			let re = JSON.parse(xmlhttp.responseText);
			console.log(re);
			if (re.result) {
				alert("添加成功！");
				setTimeout(function() {
					window.location.assign("../Manager_main/Manager_main.html")
				},1000)
			}
			else {
				alert("添加失败！请检查输入是否有误！");
			}
		}
		else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://172.18.41.15:8080/testdoc/manageraddcourse", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

//删除课程
function delete_course(button){
	console.log(button.parentNode.parentNode.children[0].innerHTML)//选中的课程号
	var data = {
		courseid: button.parentNode.parentNode.children[0].innerHTML,
	}
	//创建AJAX对象
	var xmlhttp = new XMLHttpRequest();
	//服务器返回数据回调函数
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//解析json对象
			let re = JSON.parse(xmlhttp.responseText);
			console.log(re);
			if (re.result) {
				//删除视图层的表格项
				button.parentNode.parentNode.parentNode.removeChild(button.parentNode.parentNode)
				alert("删除成功！");
			}
			else {
				alert("删除失败！");
			}
		}
		else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://172.18.41.15:8080/testdoc/managerdeletecourse", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

function to_course_changeinfo(button){
	let info=button.parentNode.parentNode.children;
	window.location.assign("../Manager_Course_manage/Course_Changeinfo.html"+"?courseId="+info[0].innerHTML+"&courseName="+info[1].innerHTML+"&courseMark="+info[2].innerHTML+"&courseTime="+info[3].innerHTML+"&courseType="+info[4].innerHTML+"&courseWeekday="+info[5].innerHTML+"&courseSection="+info[6].innerHTML+"&courseTeacher="+info[7].innerHTML);
}

function onChageCourseInfoLoad(){
	document.getElementById("Course_Name").value=GetRequest().courseName;
	document.getElementById("Course_Mark").value=GetRequest().courseMark;
	document.getElementById("Coure_Time").value=GetRequest().courseTime;
	document.getElementById("Course_Type").value=GetRequest().courseType;
	document.getElementById("Course_Weekday").value=convertWeekdayToNumberString(GetRequest().courseWeekday);
	document.getElementById("Course_Section").value=GetRequest().courseSection;
	document.getElementById("Course_Teacher").value=GetRequest().courseTeacher;
}

//点击修改课程按钮,实现修改课程函数,更新数据库的值
function course_change() {
	//获取各个属性的值
	var course_id = GetRequest().courseId;
	var course_name = document.getElementById("Course_Name");
	var course_mark = document.getElementById("Course_Mark");
	var course_time = document.getElementById("Course_Time");
	var course_type = document.getElementById("Course_Type");
	var course_weekday = document.getElementById("Course_Weekday");
	var course_section = document.getElementById("Course_Section");
	var course_teacher = document.getElementById("Course_Teacher");
	var data = {
		courseid: course_id,
		coursename: course_name,
		coursecredit: course_mark,
		courseperiod: course_time
		coursetype: course_type
		courseday: course_weekday
		courselesson: course_section
	}
	//创建AJAX对象
	var xmlhttp = new XMLHttpRequest();
	//服务器返回数据回调函数
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//解析json对象
			let re = JSON.parse(xmlhttp.responseText);
			console.log(re);
			if (re.result) {
				alert("修改成功！");
				setTimeout(function() {
					window.location.assign("../Manager_main/Manager_main.html")
				},1000)
			}
			else {
				alert("修改失败！请检查输入是否有误！");
			}
		}
		else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://172.18.41.15:8080/testdoc/managerupdatecourse", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send("data=" + JSON.stringify(data));
}

//根据信息,或者直接获取课程信息表
function get_course() {
	//创建AJAX对象
	var xmlhttp = new XMLHttpRequest();
	//服务器返回数据回调函数
	xmlhttp.onreadystatechange = function () {
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
				let courseLessonNode = document.createTextNode("第"+re.data[x].courseLesson+"大节");
				courseLesson.appendChild(courseLessonNode);
				tr.appendChild(courseLesson)
				//插入执教老师
				
				//添加删除按钮
				let opTd = document.createElement("td");
				let changeButton = document.createElement("button");
				let changeButtonNode = document.createTextNode("修改");
				changeButton.appendChild(changeButtonNode);
				changeButton.setAttribute("onclick","to_course_changeinfo(this)");
				opTd.appendChild(changeButton);
				let deleteButton = document.createElement("button");
				let deleteButtonNode = document.createTextNode("删除");
				deleteButton.appendChild(deleteButtonNode);
				deleteButton.setAttribute("onclick","delete_course(this)");
				opTd.appendChild(deleteButton);
				tr.appendChild(opTd);
				//将当前栏插进表格
				element.appendChild(tr);
			}
		}
		else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("GET", "http://172.18.41.15:8080/testdoc/managerquerycourse", true);
	xmlhttp.send();
}
