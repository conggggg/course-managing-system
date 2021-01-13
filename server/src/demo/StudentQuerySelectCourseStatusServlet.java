package demo;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import model.Manager;
import model.Student;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "StudentQuerySelectCourseStatusServlet",urlPatterns = "/studentqueryselectcoursestatus")
public class StudentQuerySelectCourseStatusServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/json");
        try {
            JSONObject data = JSON.parseObject(request.getParameter("data"));
            //获取属性
            String studentId = data.getString("studentid");

            //调用接口
            JSONObject result = new JSONObject();
            result.put("data", Student.querySelectCourseStatus(studentId));
            response.getWriter().println(JSON.toJSONString(result));
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
