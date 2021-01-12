package demo;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import database.*;
import model.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(urlPatterns = "/test")
public class DemoServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/json");
        response.getWriter().println();
        System.out.println(request.getParameter("newpassword"));
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/json");
        response.setCharacterEncoding("UTF-8");

        try {
            response.getWriter().println(Manager.queryCourse());
//            response.getWriter().println(Manager.queryCourse());
//            List<List<String>> keylist = new ArrayList<>();
//            List<String> item = new ArrayList<>();
//            item.add("1806000435");
//            item.add("180610001");
//            keylist.add(item);
//
//            List<CourseSelected> objList = new ArrayList<>();
//            CourseSelected t = new CourseSelected("1806000435","180610001","100");
//            objList.add(t);
//            response.getWriter().println(JSON.toJSONString(new AccountDao().queryByKeys(list)));
//            response.getWriter().println();
//            response.getWriter().println(JSON.toJSONString(new CourseDao().query()));
//            response.getWriter().println();
//            response.getWriter().println(JSON.toJSONString(new CourseSelectedDao().insert(objList)));
//            response.getWriter().println();
//            response.getWriter().println(JSON.toJSONString(new CourseSelectedDao().query()));
//            response.getWriter().println();
//            response.getWriter().println(JSON.toJSONString(new CourseSelectedDao().update(objList)));
//            response.getWriter().println();
//            response.getWriter().println(JSON.toJSONString(new CourseSelectedDao().queryByKeys(keylist)));
//            response.getWriter().println();
//            response.getWriter().println(JSON.toJSONString(new CourseSelectedDao().delete(keylist)));
//            response.getWriter().println();
//            response.getWriter().println(JSON.toJSONString(new CourseTeachingDao().query()));
//            response.getWriter().println();
//            response.getWriter().println(JSON.toJSONString(new StudentDao().query()));
//            response.getWriter().println();
//            response.getWriter().println(JSON.toJSONString(new TeacherDao().query()));
//            response.getWriter().println();
//            response.getWriter().println(JSON.toJSONString(new TheClassDao().query()));
//            response.getWriter().println();

        }catch (Exception e){
            e.printStackTrace();
        }

    }

}
