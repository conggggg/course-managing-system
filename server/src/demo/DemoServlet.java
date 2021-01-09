package demo;

import com.alibaba.fastjson.JSON;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import model.*;

@WebServlet(urlPatterns = "/test")
public class DemoServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/json");
        response.getWriter().println(JSON.toJSONString(new User("cc4","123456")));
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/json");
        response.setCharacterEncoding("UTF-8");
        User u = new User("cc2","123456");
        System.out.println(JSON.toJSONString(u));
        response.getWriter().println(u);
    }

}
