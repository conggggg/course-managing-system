package demo;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "MangerUpdateServlet",urlPatterns = "/managerupdate")
public class ManagerUpdateServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        response.setContentType("text/json");
//        response.setCharacterEncoding("UTF-8");
//        response.setHeader("Access-Control-Allow-Origin","*");
//        String type = request.getParameter("type");
//        JSONArray ary = JSON.parseArray(request.getParameter("data"));
//
//        JSONObject res = new JSONObject();
//        res.put("result", Manager.Update("type",ary));
//        response.getWriter().print(JSON.toJSONString(res));
    }

}
