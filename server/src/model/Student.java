package model;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.annotation.JSONField;
import com.mysql.cj.xdevapi.JsonArray;
import database.CourseDao;
import database.CourseSelectedDao;
import database.StudentDao;
import database.TheClassDao;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class Student {
    private String studentId;
    private String studentName;
    private String studentSex;
    private String classId;
    private String account;
    @JSONField(serialize = false, deserialize = false)
    private static StudentDao sdao = new StudentDao();
    @JSONField(serialize = false, deserialize = false)
    private static TheClassDao classdao = new TheClassDao();
    @JSONField(serialize = false, deserialize = false)
    private static CourseSelectedDao csdao = new CourseSelectedDao();
    @JSONField(serialize = false, deserialize = false)
    private static CourseDao cdao = new CourseDao();

    public Student() {
    }

    public Student(String studentId, String studentName, String studentSex, String classId, String account) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.studentSex = studentSex;
        this.classId = classId;
        this.account = account;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentSex() {
        return studentSex;
    }

    public void setStudentSex(String studentSex) {
        this.studentSex = studentSex;
    }

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public static JSONObject queryInfo(String studentId) throws Exception {
        JSONObject obj = new JSONObject();
        //查询学生信息
        List<String> keys = new ArrayList<>();
        keys.add(studentId);
        List<Student> studentList = sdao.queryByKeys(keys);
        if (studentList.size()==0) return obj;
        Student s = sdao.queryByKeys(keys).get(0);
        //查询班级信息
        keys.clear();
        keys.add(s.classId);
        List<TheClass> classList = classdao.queryByKeys(keys);
        if (classList.size()==0) return obj;
        TheClass c = classdao.queryByKeys(keys).get(0);
        //生成信息
        //获取学生类中需要的信息
        Field[] fields = Student.class.getDeclaredFields();
        for (int i = 0; i <= 2; i++) {
            fields[i].setAccessible(true);
            obj.put(fields[i].getName(), fields[i].get(s));
        }
        //获取班级类中需要的信息
        fields = TheClass.class.getDeclaredFields();
        for (int i = 1; i < fields.length; i++) {
            fields[i].setAccessible(true);
            obj.put(fields[i].getName(), fields[i].get(c));
        }
        return obj;
    }
    public static boolean selectCourse(String studentId,String courseId)throws Exception{
        List<String> courseIds = new ArrayList<>();
        courseIds.add(courseId);
        List<Course> courseList = cdao.queryByKeys(courseIds);
        if (courseList.size()==0) return false;

        List<String> studentIds = new ArrayList<>();
        studentIds.add(studentId);
        List<Student> studentList = sdao.queryByKeys(studentIds);
        if (studentList.size()==0) return false;

        List<String> cskey = new ArrayList<>();
        cskey.add(courseId);cskey.add(studentId);
        List<List<String>> cskeys = new ArrayList<>();
        cskeys.add(cskey);
        List<CourseSelected> courseSelectedList = csdao.queryByKeys(cskeys);
        if (courseSelectedList.size()!=0) return false;


        CourseSelected cs = new CourseSelected(courseId,studentId,null);
        courseSelectedList.clear();
        courseSelectedList.add(cs);
        return csdao.insert(courseSelectedList);

    }
    public static JSONArray queryScore(String studentId) throws Exception {
        JSONArray ary = new JSONArray();
        //查询学生信息
        List<String> keys = new ArrayList<>();
        keys.add(studentId);
        //查询学生选课信息
        List<Student> studentList = sdao.queryByKeys(keys);
        if (studentList.size()==0) return ary;
        List<CourseSelected> courseSelectedList = csdao.queryByStudentId(studentList.get(0).getStudentId());
        //查询课程信息
        keys.clear();
        for (CourseSelected cs : courseSelectedList) {
            keys.add(cs.getCourseId());
        }
        List<Course> courseList = cdao.queryByKeys(keys);
        //生成数据
        for (int i =0 ;i<courseSelectedList.size();i++){
            JSONObject obj = new JSONObject();
            obj.put("score",courseSelectedList.get(i).getScore());
            //分数转GPA
            int score = Integer.valueOf(courseSelectedList.get(i).getScore());
            double GPA;
            if (score>=90) GPA = 4.0;
            else if (score<=60) {
                GPA = 1.0;
            }else {
                GPA = (score-60)/10.0;
            }
            obj.put("GPA",String.valueOf(GPA));
            obj.put("courseId",courseList.get(i).getCourseId());
            obj.put("courseName",courseList.get(i).getCourseName());
            ary.add(obj);
        }
        return ary;
    }
    public static JSONObject queryTimeTable(String studentId)throws Exception{
        //获取学生信息
        JSONObject obj = new JSONObject();
        List<String> studentIds = new ArrayList<>();
        studentIds.add(studentId);
        List<Student> studentList = sdao.queryByKeys(studentIds);
        if (studentList.size()==0) return obj;
        Student s = sdao.queryByKeys(studentIds).get(0);

        obj.put("studentProfile",JSON.parseObject(JSON.toJSONString(s)));
        //获取学生选修的课程id并以此获取课程的信息
        List<CourseSelected> courseSelectedList = csdao.queryByStudentId(studentId);
        List<String> courseIds = new ArrayList<>();
        for (CourseSelected cs:courseSelectedList){
            courseIds.add(cs.getCourseId());
        }
        List<Course> courseList = cdao.queryByKeys(courseIds);
        JSONArray tmp = JSON.parseArray(JSON.toJSONString(courseList));
        obj.put("course",tmp);
        return obj;
    }
}
