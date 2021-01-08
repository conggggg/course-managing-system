function loginfunc() {
	// window.location.href="../pages/main.html";//转跳（可以后退）
	// window.location.replace("../pages/main.html");//直接替换（无法后退）
	//创建AJAX对象
	var xmlhttp=new XMLHttpRequest();
	//打印用户输入信息
	console.log(document.getElementById("un").value);
	console.log(document.getElementById("pw").value);
	//服务器返回数据回调函数
	xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            //解析json对象
            let re=JSON.parse(xmlhttp.responseText);
            console.log(re);
            if(re.result){
                //登录成功
                //根据角色转跳页面
                console.log(re.identity)
                console.log()
                if(re.identity=="学生"){
                    window.location.assign("Students/main_html/Student_main.html");
                }
                else if(re.identity=="老师"){
                    window.location.assign("Teachers/teachers_main/Teachers_main.html");
                }
                else if(re.identity=="管理员"){
                    window.location.assign("Manager/Manager_main/Manager_main.html");
                }
			}
			else{
                //登录失败
                alert("账号或密码错误！");
			}
        }
    };
    //设置并提交申请
	xmlhttp.open("POST", "http://172.18.41.15:8080/testdoc/login", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("username="+document.getElementById("un").value+"&password="+document.getElementById("pw").value);
}