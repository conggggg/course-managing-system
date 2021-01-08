package demo;

import Actor.*;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;

import java.sql.*;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import database.*;


@WebServlet(name = "LoginServlet",urlPatterns = "/login")
public class LoginServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        System.out.println(username);
        System.out.println(password);
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setCharacterEncoding("UTF-8");
        try {
            User user = AccountProxy.login(username,password);

            JSONObject obj = new JSONObject();
            obj.put("result",user!=null);
            obj.put("identity",AccountProxy.getInstanceType(user));

            response.setContentType("text/json");
            PrintWriter out = response.getWriter();
            out.print(JSON.toJSONString(obj));

        }catch (Exception e){
            e.printStackTrace();
        }

    }

}
