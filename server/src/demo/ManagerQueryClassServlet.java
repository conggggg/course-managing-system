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

@WebServlet(name = "ManagerQueryClassServlet",urlPatterns = "/managerqueryclass")
public class ManagerQueryClassServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/json");
        try {
            JSONObject result = new JSONObject();
            result.put("data", Manager.queryClass());
            response.getWriter().println(JSON.toJSONString(result));
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
/*
{"data",[{"profession":"软件工程","classId":"11181","grade":"2018","className":"软件181"}]}
 */