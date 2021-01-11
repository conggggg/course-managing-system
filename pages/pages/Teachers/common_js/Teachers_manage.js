//加载页面完成触发事件 显示教师个人信息
function myFunction() {
    document.getElementById("teacherId").innerHTML = "1806300144";
    document.getElementById("teacherName").innerHTML = "王五";
    document.getElementById("teacherSex").innerHTML = "男";
    // document.getElementById("manage_Class").innerHTML = "软件185";
}

//点击修改学生成绩按钮,实现修改学生成绩功能,更新数据库学生成绩表
function grade_change(){
	var student_id,student_name,student_course_id,student_grade,student_class;
	student_id = document.getElementById("Student_Id");//获取各个属性的值
	student_name = document.getElementById("Student_Name");
    student_course_id = document.getElementById("Student_Course_id");
    student_class = document.getElementById("Student_Class");
	student_grade = document.getElementById("Student_Grade");
	alert("修改学生成绩");//根据学号在数据库中找到相应学生,并更新该学生的成绩
}

//点击返回，不修改学生信息
function grade_return(){
    alert("返回查看学生成绩表");
}

//获取输入的课程名和课程编号
//查询刷新选课学生表
function get_student(){
    var search_course_id,search_course_name;
    search_course_id = document.getElementById("search_course_Id");
    search_course_name = document.getElementById("search_course_Name");
	alert("刷新选课学生表");
}

//导出选课学生表
function export_student(){
	alert("导出选课学生表");
}

//获取输入的课程名和课程编号
//查询刷新学生成绩表
function get_student_grade(){
    var search_course_id,search_course_name;
    search_course_id = document.getElementById("search_course_Id");
    search_course_name = document.getElementById("search_course_Name");
	alert("刷新学生成绩表");
}

//导出学生成绩表
function export_student_grade(){
	alert("导出学生信息表");
}

//获取输入的课程名和课程编号
//查询教师排课表 
function get_teacher_course(){
	alert("刷新教师排课表");
}

//导出教师排课表
function export_teacher_course(){
	alert("导出教师排课表");
}

//修改教师登录密码
function sure_change_password(){
    var teacher_id,change_password1,change_password2;
    teacher_id = document.getElementById("teacher_Id");//获取各个属性的值
	change_password1 = document.getElementById("change_Password1");
    change_password2 = document.getElementById("change_Password2");
    alert("修改登录密码");
}

//课程学生成绩表选中某行,获取某行信息
function student_grade_chart_rowonlick(){
	alert("该行学生成绩信息被选中");
}

//选课学生表选中某行,获取某行信息
function course_student_chart_rowonlick(){
	alert("该行课程选课学生信息被选中");
}