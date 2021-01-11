package model;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import database.AccountDao;
import database.CourseDao;
import database.StudentDao;
import database.TheClassDao;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class Manager {
    private static AccountDao adao = new AccountDao();
    private static TheClassDao classdao = new TheClassDao();
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

    public static boolean addStudent(String studentId,String studentName,String studentSex,String className)throws Exception{
        //外键属性处理
        //查询是否有该班级名字的班级，没有则返回false
        List<String> classNames = new ArrayList<>();
        classNames.add(className);
        List<TheClass> classList = classdao.queryByClassNames(classNames);
        if (classList.size() == 0) return false;

        //account外键默认与学号一致
        //为账号表添加一个学生账号
        //默认密码为123456
        //添加账号失败则返回false

        List<Account> accountList = new ArrayList<>();
        Account account = new Account(studentId,"123456","学生");
        accountList.add(account);
        if (!adao.insert(accountList)) return false;

        //添加学生信息

        List<Student> studentList = new ArrayList<>();
        Student s = new Student(studentId,studentName,studentSex,classList.get(0).getClassId(),studentId);
        studentList.add(s);
        //添加并返回添加结果
        return sdao.insert(studentList);
    }
    public static boolean updateStudent(String studentId,String studentName,String studentSex,String className)throws Exception{
        //外键属性处理
        //查询是否有该班级名字的班级，没有则返回false
        List<String> classNames = new ArrayList<>();
        classNames.add(className);
        List<TheClass> classList = classdao.queryByClassNames(classNames);
        if (classList.size() == 0) return false;

        //创建修改的学生list
        List<Student> studentList = new ArrayList<>();
        Student s = new Student(studentId,studentName,studentSex,classList.get(0).getClassId(),studentId);
        studentList.add(s);

        return sdao.update(studentList);
    }
    public static String queryStudent()throws Exception{
        List<Student> studentList = sdao.query();
        JSONArray ary = new JSONArray();
        for (Student s:studentList){
            JSONObject obj = JSON.parseObject(JSON.toJSONString(s));
            //添加主表上主键外的信息

            //生成对应的班级类对象
            List<String> classId = new ArrayList<>();
            classId.add(s.getClassId());
            TheClass theClass = classdao.queryByKeys(classId).get(0);
            //用反射机制获取属性值和属性名
            Field[] fields = TheClass.class.getDeclaredFields();
            for (int i = 1;i<fields.length;i++){//第一个是id，重复
                fields[i].setAccessible(true);
                obj.put(fields[i].getName(),fields[i].get(theClass));
            }
            ary.add(obj);
        }
        return JSON.toJSONString(ary);
    }
}
