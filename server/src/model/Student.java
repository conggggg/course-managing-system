package model;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.annotation.JSONField;
import com.mysql.cj.xdevapi.JsonArray;
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
    @JSONField(serialize = false,deserialize = false)
    private static StudentDao sdao = new StudentDao();
    @JSONField(serialize = false,deserialize = false)
    private static TheClassDao classdao = new TheClassDao();
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

    public static JSONObject queryInfo(String studentId)throws Exception{
        //查询学生信息
        List<String> keys = new ArrayList<>();
        keys.add(studentId);
        Student s = sdao.queryByKeys(keys).get(0);
        //查询班级信息
        keys.clear();
        keys.add(s.classId);
        TheClass c = classdao.queryByKeys(keys).get(0);
        //生成信息
        JSONObject obj = new JSONObject();
        //获取学生类中需要的信息
        Field[] fields = Student.class.getDeclaredFields();
        for (int i =0 ;i <= 2;i++){
            fields[i].setAccessible(true);
            obj.put(fields[i].getName(),fields[i].get(s));
        }
        //获取班级类中需要的信息
        fields = TheClass.class.getDeclaredFields();
        for (int i = 1 ;i <= fields.length;i++){
            fields[i].setAccessible(true);
            obj.put(fields[i].getName(),fields[i].get(s));
        }
        return obj;
    }

    public static JSONObject queryScore(String studentId)throws Exception{
        //查询学生信息
        List<String> keys = new ArrayList<>();
        keys.add(studentId);
        Student s = sdao.queryByKeys(keys).get(0);
        return null;
    }

}
