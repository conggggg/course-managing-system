package model;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import database.*;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class Manager {
    //数据库接口
    private static AccountDao adao = new AccountDao();
    private static TheClassDao classdao = new TheClassDao();
    private static StudentDao sdao = new StudentDao();
    private static CourseDao cdao = new CourseDao();
    private static TeacherDao tdao =new TeacherDao();
    //课程操作
    public static boolean addCourse(String courseID,String courseName,String courseType,String courseCredit,String coursePeriod,String courseDay,String courseLesson)throws Exception{
        List<Course> courseList = new ArrayList<>();
        Course c = new Course(courseID,courseName,courseType,courseCredit,coursePeriod,courseDay,courseLesson);
        courseList.add(c);
        return cdao.insert(courseList);
    }
    public static boolean updateCourse(String courseID,String courseName,String courseType,String courseCredit,String coursePeriod,String courseDay,String courseLesson)throws Exception{
        List<Course> courseList = new ArrayList<>();
        Course c = new Course(courseID,courseName,courseType,courseCredit,coursePeriod,courseDay,courseLesson);
        courseList.add(c);
        return cdao.update(courseList);
    }
    public static boolean deleteCourse(String courseID)throws Exception{
        List<String> keys = new ArrayList<>();
        return cdao.delete(keys);
    }
    public static JSONArray queryCourse()throws Exception{
        return JSON.parseArray(JSON.toJSONString(cdao.query()));
    }
    //学生操作
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
    public static boolean deleteStudent(String studentId)throws Exception{
        //创建一个被删除项的主键列表
        List<String> keys = new ArrayList<>();
        keys.add(studentId);

        //获取账号信息
        List<Student> studentList = sdao.queryByKeys(keys);
        List<String> accountIds = new ArrayList<>();
        accountIds.add(studentList.get(0).getAccount());

        //若删除学生成功，则返回删除账号的布尔值
        if (sdao.delete(keys)) {
            return adao.delete(accountIds);
        }
        //否则返回false
        return false;

    }
    public static JSONArray queryStudent()throws Exception{
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
        return ary;
    }
    //教师操作
    public static boolean addTeacher(String teacherId,String teacherName,String teacherSex)throws Exception{
        //添加一个账号
        List<Account> accountList = new ArrayList<>();
        Account account = new Account(teacherId,"123456","教师");
        accountList.add(account);
        if (!adao.insert(accountList)) return false;

        //添加教师信息
        List<Teacher> teacherList = new ArrayList<>();
        Teacher t = new Teacher(teacherId,teacherName,teacherSex,teacherId);
        teacherList.add(t);
        //添加并返回添加结果
        return tdao.insert(teacherList);
    }
    public static boolean updateTeacher(String teacherId,String teacherName,String teacherSex) throws Exception{
        //创建修改的教师list
        List<Teacher> teacherList = new ArrayList<>();
        Teacher t = new Teacher(teacherId,teacherName,teacherSex,teacherId);
        teacherList.add(t);

        return tdao.update(teacherList);
    }
    public static boolean deleteTeacher(String teacherId)throws Exception{
        //创建一个被删除项的主键列表
        List<String> keys = new ArrayList<>();
        keys.add(teacherId);

        //获取账号信息
        List<Teacher> studentList = tdao.queryByKeys(keys);
        List<String> accountIds = new ArrayList<>();
        accountIds.add(studentList.get(0).getTeacherId());

        //若删除教师成功，则返回删除账号的布尔值
        if (tdao.delete(keys)) {
            return adao.delete(accountIds);
        }
        //否则返回false
        return false;
    }
    public static JSONArray queryTeacher()throws Exception{
        return JSON.parseArray(JSON.toJSONString(tdao.query()));
    }
    //班级操作
    public static boolean addClass(String classId,String className,String profession,String grade)throws Exception{
        List<TheClass> classList = new ArrayList<>();
        TheClass c = new TheClass(classId,className,profession,grade);
        classList.add(c);
        return classdao.insert(classList);
    }
    public static boolean updateClass(String classId,String className,String profession,String grade)throws Exception{
        List<TheClass> classList = new ArrayList<>();
        TheClass c = new TheClass(classId,className,profession,grade);
        classList.add(c);
        return classdao.insert(classList);
    }
    public static boolean deleteClass(String classId)throws Exception{
        List<String> keys = new ArrayList<>();
        return classdao.delete(keys);
    }
    public static JSONArray queryClass()throws Exception{
        return JSON.parseArray(JSON.toJSONString(classdao.query()));
    }
}

