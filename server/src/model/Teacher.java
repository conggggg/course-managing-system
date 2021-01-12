package model;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.annotation.JSONField;
import database.*;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class Teacher {
    private String teacherId;
    private String teacherName;
    private String teacherSex;
    private String account;

    @JSONField(serialize = false,deserialize = false)
    private static TeacherDao tdao = new TeacherDao();

    @JSONField(serialize = false,deserialize = false)
    private static CourseTeachingDao ctdao = new CourseTeachingDao();

    @JSONField(serialize = false,deserialize = false)
    private static CourseSelectedDao csdao = new CourseSelectedDao();

    @JSONField(serialize = false,deserialize = false)
    private static StudentDao sdao = new StudentDao();

    @JSONField(serialize = false,deserialize = false)
    private static CourseDao cdao = new CourseDao();
    public Teacher() {
    }

    public Teacher(String teacherId,String teacherName,String teacherSex,String account) {
        this.teacherId = teacherId;
        this.teacherName = teacherName;
        this.teacherSex = teacherSex;
        this.account = account;
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public String getTeacherSex() {
        return teacherSex;
    }

    public void setTeacherSex(String teacherSex) {
        this.teacherSex = teacherSex;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public static JSONObject queryInfo(String teacherId)throws Exception{
        List<String> keys = new ArrayList<>();
        keys.add(teacherId);
        Teacher t = tdao.queryByKeys(keys).get(0);

        //生成数据
        JSONObject obj = new JSONObject();
        Field[] fields = Teacher.class.getDeclaredFields();
        for (int i =0;i<fields.length-1;i++){
            fields[i].setAccessible(true);
            obj.put(fields[i].getName(),fields[i].get(t));
        }
        return obj;
    }

    public static JSONArray queryStudentScore(String teacherId)throws Exception{
        //查询老师教授课程信息
        List<CourseTeaching> courseTeachingList = ctdao.queryByTeacherId(teacherId);
        List<String> courseIds = new ArrayList<>();
        for (CourseTeaching ct : courseTeachingList){
            courseIds.add(ct.getCourseId());
        }
        List<Course> courseList = cdao.queryByKeys(courseIds);
        //查询选修课程学生信息
        //一个课程多个学生成绩
        List<List<CourseSelected>> studentScoreList = new ArrayList<>();
        for (String id :courseIds){
            studentScoreList.add(csdao.queryByCourseId(id));
        }
        //生成数据
        JSONArray ary = new JSONArray();
        for (int i = 0;i<courseList.size();i++){
            JSONObject obj = new JSONObject();
            obj.put("courseid",courseList.get(i).getCourseId());

            obj.put("coursename",courseList.get(i).getCourseName());

            JSONArray studentInfo = new JSONArray();
            //获取该课程下所有学生
            List<String> studentIds = new ArrayList<>();
            for (CourseSelected cs:studentScoreList.get(i)){
                studentIds.add(cs.getStudentId());
            }
            List<Student> studentList = sdao.queryByKeys(studentIds);
            for (int j = 0;j<studentScoreList.get(i).size();j++){
                JSONObject tmp = new JSONObject();
                tmp.put("studentid",studentList.get(j).getStudentId());
                tmp.put("studentname",studentList.get(j).getStudentName());
                tmp.put("score",studentScoreList.get(i).get(j).getScore());
                studentInfo.add(tmp);
            }
            obj.put("studentinfo",studentInfo);
            ary.add(obj);
        }
        return ary;
    }

    public static boolean updateStudentScore(String courseId,String studentId,String score)throws Exception{
        CourseSelected cs = new CourseSelected(courseId,studentId,score);
        List<CourseSelected> courseSelectedList = new ArrayList<>();
        courseSelectedList.add(cs);
        return csdao.update(courseSelectedList);
    }

}
//[{"courseid":,"coursename":,"studentinfo":[{"studentid":"123","studentname":"张三","score":"100"}]}]
