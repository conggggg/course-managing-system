package demo;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import model.Student;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "StudentQueryScoreServlet",urlPatterns = "/studentqueryscore")
public class StudentQueryScoreServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/json");
        try {
            String studentId = request.getParameter("studentid");
            JSONObject result = new JSONObject();
            result.put("data", Student.queryScore(studentId));
            response.getWriter().println(JSON.toJSONString(result));
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
/*
    {"data":[{"score":"90","courseName":"编译原理","GPA":"4.0","courseId":"1806000171"},{"score":"93","courseName":"组网技术","GPA":"4.0","courseId":"1806000211"}]}
 */