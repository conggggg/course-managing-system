package demo;

import model.*;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;


@WebServlet(name = "LoginServlet",urlPatterns = "/login")
public class LoginServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/json");
        try {
            String username = request.getParameter("username");
            String password = request.getParameter("password");
            System.out.println(username);
            System.out.println(password);
            response.getWriter().println(JSON.toJSONString(Account.login(username,password)));
        }catch (Exception e){
            e.printStackTrace();
        }

    }

}
