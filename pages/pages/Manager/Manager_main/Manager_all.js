function logout() {
	//删除cookie
	deleteCookie("username");
	deleteCookie("type");
	//转跳回主页面
	window.location.replace("../../login.html");
	alert("您已退出登录！")
}

//点击添加课程按钮,实现添加课程函数,更新数据库的值
function course_add() {
	//获取各个属性的值
	var course_id = document.getElementById("Course_Id").value;
	var course_name = document.getElementById("Course_Name").value;
	var course_mark = document.getElementById("Course_Mark").value;
	var course_time = document.getElementById("Course_Time").value;
	var course_type = document.getElementById("Course_Type").value;
	var data = {
		courseid: course_id,
		coursename: course_name,
		coursecredit: course_mark,
		courseperiod: course_time,
		coursetype: course_type,
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
			}
			else {
				alert("添加失败！");
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

//点击修改课程按钮,实现修改课程函数,更新数据库的值
function course_change() {
	var course_id = "", course_name = "", course_mark = "", course_time = "", course_type = "";//初始化变量,获取输入的值
	course_id = document.getElementById("Course_Id");//获取各个属性的值
	course_name = document.getElementById("Course_Name");
	course_mark = document.getElementById("Course_Mark");
	course_time = document.getElementById("Course_Time");
	course_type = document.getElementById("Course_Type");
	alert("修改课程");//修改课程函数,自己修改实现?
}

//点击课程信息表的一行,则获取该行的属性值
function get_course_info() {
	var course_id = "", course_name = "", course_mark = "", course_time = "", course_type = "";//初始化变量,获取输入的值
	course_id = document.getElementById("Course_Id");//获取各个属性的值
	course_name = document.getElementById("Course_Name");
	course_mark = document.getElementById("Course_Mark");
	course_time = document.getElementById("Course_Time");
	course_type = document.getElementById("Course_Type");
	alert("获取到该行的信息");

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

//点击添加学生按钮,实现添加学生功能,更新数据库学生信息表
function student_add() {
	//获取各个属性的值
	var type = "student";
	var student_id = document.getElementById("Student_Id").value;
	var student_name = document.getElementById("Student_Name").value;
	var student_sex = document.getElementById("Student_sex").value;
	var student_grade = document.getElementById("Student_Grade").value;
	var zhuanye = document.getElementById("zhuanye").value;
	var data = {
		Sid: student_id,
		Sname: student_name,
		Ssex: student_sex,
		Sclass: student_grade,
	}
	//创建AJAX对象
	var xmlhttp = new XMLHttpRequest();
	//服务器返回数据回调函数
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//解析json对象
			let re = JSON.parse(xmlhttp.responseText);
			console.log(re);
		}
		else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
			alert("网络错误！");
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://172.18.41.15:8080/testdoc/login", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("type=" + type + "&data=" + JSON.stringify(data));
}

//点击修改学生信息按钮,实现修改学生信息功能,更新数据库学生信息表
function student_changeinfo() {
	var student_id = document.getElementById("Student_Id");//获取各个属性的值
	var student_name = document.getElementById("Student_Name");
	var student_sex = document.getElementById("Student_sex");
	var student_grade = document.getElementById("Student_Grade");
	var zhuanye = document.getElementById("zhuanye");

	//创建AJAX对象
	var xmlhttp = new XMLHttpRequest();
	//服务器返回数据回调函数
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//解析json对象
			let re = JSON.parse(xmlhttp.responseText);
			console.log(re);
		}
	};
	//设置并提交申请
	xmlhttp.open("POST", "http://172.18.41.15:8080/testdoc/login", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("username=" + username + "&password=" + password);
}

//点击添加教师按钮,实现添加教师功能,更新数据库教师信息表
function teacher_add() {
	var teacher_id, teacher_name, teacher_sex, teach_course, manage_class;
	teacher_id = document.getElementById("Teacher_Id");//获取各个属性的值
	teacher_name = document.getElementById("Teacher_Name");
	teacher_sex = document.getElementById("Teacher_Sex");
	teach_course = document.getElementById("Teach_Course");
	manage_class = document.getElementById("Manage_Class");
	alert("添加教师");
}

//点击修改学生信息按钮,实现修改学生信息功能,更新数据库学生信息表
function teacher_changeinfo() {
	var teacher_id, teacher_name, teacher_sex, teach_course, manage_class;
	teacher_id = document.getElementById("Teacher_Id");//获取各个属性的值
	teacher_name = document.getElementById("Teacher_Name");
	teacher_sex = document.getElementById("Teacher_Sex");
	teach_course = document.getElementById("Teach_Course");
	manage_class = document.getElementById("Manage_Class");
	alert("修改教师信息");
}

//查询刷新学生表格
function get_newstudent() {
	alert("刷新学生信息表");
}

//查询刷新教师表格
function get_newteacher() {
	alert("刷新教师信息表");
}

//查询选课学生表
function get_select_student() {
	alert("刷新选课学生表");
}

//查询学生课程表
function get_student_chart() {
	alert("学生课程表");
}

//查询教师授课课程信息
function get_teach_course() {
	alert("刷新教师授课课程表");
}

//点击返回按钮,返回到主页面
function return_to_main() {
	window.location.href = '../Manager_main/Manager_main.html'
}

//学生信息表格选中某行,获取某行信息
function student_chart_rowonlick() {
	//获取该行学生信息
	alert("该行学生信息被选中");
}

//教师信息表格选中某行,获取某行信息
function teacher_chart_rowonlick() {
	alert("该行教师信息被选中");
}

//课程信息表格选中某行,获取某行信息
function course_chart_rowonlick() {
	alert("该行课程信息被选中");
}

//点击删除学生按钮,删除学生,更新数据库
function student_delect() {
	//可以考虑获取搜索框的学生进行删除或者表格每行的信息进行删除,难度大的话可以做一个
	alert("删除学生");
}

//点击删除教师按钮,删除教师,更新数据库
function teacher_delect() {
	//可以考虑获取搜索框的教师进行删除或者表格每行的信息进行删除,难度大的话可以做一个
	alert("删除教师");
}

//点击删除教师授课课程按钮,删除教师的授课课程,更新数据库
function teacher_course_delect() {
	//可以考虑获取搜索框的课程进行珊瑚或者表格每个空格的信息进行删除,难度大的话可以做一个
	alert("删除课程");
}


//导出各种表格
//导出学生信息表格
function student_chart_export() {
	alert("导出学生信息表");
}

//导出教师信息表格
function teacher_chart_export() {
	alert("导出教师信息表");
}

//导出学生课程表格
function student_course_chart_export() {
	alert("导出学生课程表");
}

//导出教师授课课程表格
function teacher_course_chart_export() {
	alert("导出教师授课课程表");
}

//导出选课学生表格
function select_course_chart_export() {
	alert("导出选课学生表");
}

//导出课程信息表格
function course_chart_export() {
	alert("导出课程信息表");
}