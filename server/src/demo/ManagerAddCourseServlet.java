package demo;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import model.Course;
import model.Manager;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ManagerAddCourseServlet",urlPatterns = "/manageraddcourse")
public class ManagerAddCourseServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/json");
        try {
            JSONObject data = JSON.parseObject(request.getParameter("data"));
            //获取属性
            String courseId = data.getString("coursename");
            String courseName = data.getString("coursename");
            String courseCredit = data.getString("coursecredit");
            String coursePeriod = data.getString("courseperiod");
            String courseType = data.getString("coursetype");

            //调用接口
            JSONObject result = new JSONObject();
            result.put("result", Manager.addCourse(courseId,courseName,courseType,courseCredit,coursePeriod));
            response.getWriter().println(JSON.toJSONString(result));
        }catch (Exception e){
            e.printStackTrace();
        }
    }

}
/*
    {"result":true或false}
 */