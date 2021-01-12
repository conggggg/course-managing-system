package demo;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import model.Manager;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ManagerUpdateCourseServlet",urlPatterns = "/managerupdatecourse")
public class ManagerUpdateCourseServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/json");
        try {
            JSONObject data = JSON.parseObject(request.getParameter("data"));
            //获取属性
            String courseId = data.getString("courseid");
            String courseName = data.getString("coursename");
            String courseCredit = data.getString("coursecredit");
            String coursePeriod = data.getString("courseperiod");
            String courseType = data.getString("coursetype");
            String courseDay = data.getString("courseday");
            String courseLesson = data.getString("courselesson");
            String teacherId = data.getString("teacherid");

            //调用接口
            JSONObject result = new JSONObject();
            result.put("result", Manager.updateCourse(courseId,courseName,courseType,courseCredit,coursePeriod,courseDay,courseLesson,teacherId));
            response.getWriter().println(JSON.toJSONString(result));
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
/*
    {"result":true或false}
 */