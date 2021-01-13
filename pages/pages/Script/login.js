function onLoad() {
    //检查有没有已登录的cookie
    let type = getCookie("type");
    console.log(document.cookie)
    console.log(type)
    if (type != "") {
        //根据角色转跳页面
        if (type == "student") {
            window.location.replace("Students/main_html/Student_main.html");
        }
        else if (type == "teacher") {
            window.location.replace("Teachers/teachers_main/Teachers_main.html");
        }
        else if (type == "manager") {
            window.location.replace("Manager/Manager_main/Manager_main.html");
        }
    }
    else{
        console.log("尚未登录")
    }

}

function loginfunc() {
    // window.location.assign("../pages/main.html");//转跳（可以后退）
    // window.location.replace("../pages/main.html");//直接替换（无法后退）

    //创建AJAX对象
    var xmlhttp = new XMLHttpRequest();
    //打印用户输入信息
    console.log(document.getElementById("un").value);
    console.log(document.getElementById("pw").value);
    //保存用户输入信息
    let username = document.getElementById("un").value;
    let password = document.getElementById("pw").value;
    //服务器返回数据回调函数
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //解析json对象
            let re = JSON.parse(xmlhttp.responseText);
            console.log(re);
            if (re.result) {
                //登录成功

                //写入cookie
                addCookie("username", username, 1)

                //根据角色转跳页面
                if (re.type == "学生") {
                    window.location.replace("Students/main_html/Student_main.html");
					addCookie("type", "student", 1)
                }
                else if (re.type == "老师") {
                    window.location.replace("Teachers/teachers_main/Teachers_main.html");
					addCookie("type", "teacher", 1)
                }
                else if (re.type == "管理员") {
                    window.location.replace("Manager/Manager_main/Manager_main.html");
					addCookie("type", "manager", 1)
                }
            }
            else {
                //登录失败
                alert("账号或密码错误！");
            }
        }
    };
    //设置并提交申请
    xmlhttp.open("POST", "http://"+ipPort+"/testdoc/login", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("username=" + username + "&password=" + password);
}