//个人信息页，从数据库获取个人信息
function get_info(){
    document.getElementById("Sid").innerHTML="18063";
    document.getElementById("Sname").innerHTML="张三";
    document.getElementById("Ssex").innerHTML="男";
    document.getElementById("Sclass").innerHTML="软件185";
}

//点击确定按钮，修改密码成功，更新数据库密码的值
function change_password(){
    var ACCOUNT="",PASSWORD="",AGIAN="";  
    ACCOUNT= document.getElementById("account");
    PASSWORD= document.getElementById("password");
    AGIAN= document.getElementById("agian");
}

//点击搜索按钮，查询选课表里对应的课程
function search_course(){
   var COURSE_NAME="";
   COURSE_NAME=document.getElementById("course_name");
    //将获取的课程名与选课表匹配，显示出对应的课程
    //不会写。。。
} 

//点击选课，对应那一行课程会加入学生的课表，同时选课按钮会变成退课按钮，点击可以退课
function select_course(){

}

//导出课表
function export_course(){

}

//导出成绩表
function export_grade(){

}










