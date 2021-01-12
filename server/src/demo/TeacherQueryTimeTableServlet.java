package demo;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import model.Manager;
import model.Teacher;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "TeacherQueryTimeTableServlet")
public class TeacherQueryTimeTableServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/json");
        try {
            JSONObject data = JSON.parseObject(request.getParameter("data"));
            String teacherId = data.getString("teacherid");
            response.getWriter().println(JSON.toJSONString(Teacher.queryTimeTable(teacherId)));
        }catch (Exception e){
            e.printStackTrace();
        }
    }

}
