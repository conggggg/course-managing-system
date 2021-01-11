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

@WebServlet(name = "ManagerUpdateStudentServlet",urlPatterns = "/managerupdatestudent")
public class ManagerUpdateStudentServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/json");
        try {
            String studentName = request.getParameter("studentname");
            String studentId = request.getParameter("studentid");
            String studentSex = request.getParameter("studentsex");
            String className =request.getParameter("classname");
            JSONObject result = new JSONObject();
            result.put("result", Manager.updateStudent(studentId,studentName,studentSex,className));
            response.getWriter().println(JSON.toJSONString(result));
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
