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

@WebServlet(name = "ManagerAddStudentServlet",urlPatterns = "/manageraddstudent")
public class ManagerAddStudentServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/json");
        try {
            JSONObject data = JSON.parseObject(request.getParameter("data"));

            String studentName = data.getString("studentname");
            String studentId = data.getString("studentid");
            String studentSex = data.getString("studentsex");
            String className = data.getString("classname");
            JSONObject result = new JSONObject();
            result.put("result", Manager.addStudent(studentId,studentName,studentSex,className));
            response.getWriter().println(JSON.toJSONString(result));
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
/*
    {“result”:true或false}
 */
