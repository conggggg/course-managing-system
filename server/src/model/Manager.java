package model;

import com.alibaba.fastjson.JSON;
import database.CourseDao;
import database.StudentDao;

import java.util.ArrayList;
import java.util.List;

public class Manager {
    private static StudentDao sdao = new StudentDao();
    private static CourseDao cdao = new CourseDao();
    public static boolean addCourse(String courseID,String courseName,String courseType,String courseCredit,String coursePeriod)throws Exception{
        List<Course> courseList = new ArrayList<>();
        Course c = new Course(courseID,courseName,courseType,courseCredit,coursePeriod);
        courseList.add(c);
        return cdao.insert(courseList);
    }
    public static boolean updateCourse(String courseID,String courseName,String courseType,String courseCredit,String coursePeriod)throws Exception{
        List<Course> courseList = new ArrayList<>();
        Course c = new Course(courseID,courseName,courseType,courseCredit,coursePeriod);
        courseList.add(c);
        return cdao.update(courseList);
    }
    public static String queryCourse()throws Exception{
        return JSON.toJSONString(cdao.query());
    }

}
