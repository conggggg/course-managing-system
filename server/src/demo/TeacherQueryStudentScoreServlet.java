package demo;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import model.Teacher;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "TeacherQueryStudentScoreServlet",urlPatterns = "/teacherquerystudentscore")
public class TeacherQueryStudentScoreServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/json");
        try {
            JSONObject data = JSON.parseObject(request.getParameter("data"));
            String teacherId = data.getString("teacherid");
            JSONObject result = new JSONObject();
            result.put("data", Teacher.queryStudentScore(teacherId));
            response.getWriter().println(JSON.toJSONString(result));
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
//{"data":[{"courseid":,"coursename":,"studentinfo":[{"studentid":"123","studentname":"张三","score":"100"}]}]}