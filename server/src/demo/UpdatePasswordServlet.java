package demo;

import Actor.AccountProxy;
import Actor.User;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import database.DBInfo;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.swing.plaf.nimbus.State;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

@WebServlet(name = "UpdatePasswordServlet",urlPatterns = "/updatepassword")
public class UpdatePasswordServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
        // 注册数据库驱动
        try {
            Class.forName(DBInfo.DRIVER);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userName = request.getParameter("username");
        String newPassWord = request.getParameter("newpassword");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setContentType("text/json");
        try {
            boolean result = AccountProxy.updatePassWord(userName,newPassWord);
            //处理成JSON格式
            JSONObject obj = new JSONObject();
            obj.put("result",result);
            //输出
            PrintWriter out = response.getWriter();
            out.print(JSON.toJSONString(obj));
        }catch (Exception e){
            e.printStackTrace();
        }

    }

}
