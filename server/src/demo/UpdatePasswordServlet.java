package demo;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import database.DBInfo;
import model.Account;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "UpdatePasswordServlet",urlPatterns = "/updatepassword")
public class UpdatePasswordServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/json");
        try {
            String userName = request.getParameter("username");
            String newPassWord = request.getParameter("newpassword");
            System.out.println(userName);
            System.out.println(newPassWord);
            response.getWriter().println(JSON.toJSONString(Account.updatePassWord(userName,newPassWord)));
        }catch (Exception e){
            e.printStackTrace();
        }

    }

}

/*
{"result":true或false}
 */