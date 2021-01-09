package model;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import database.DBInfo;
import database.DBcontroller;

import java.sql.*;


public class Manager extends User {

//    public static boolean Insert(String tablename,JSONArray ary){
//        try {
//            int len = ary.size();
//            if (len == 0) return false;
//            Class.forName(DBInfo.DRIVER);
//            Connection conn = DriverManager.getConnection(DBInfo.URL, DBInfo.USER, DBInfo.PASSWORD);
//            conn.createStatement().execute("use coursedesign");
//            if (tablename.equals("teacher")) {
//                String sql = "insert into teacher(Tid,Tname,Tsex) value (?,?,?)";
//                PreparedStatement pstmt = conn.prepareStatement(sql);
//                for (int i = 0; i < len; i++) {
//                    JSONObject obj = ary.getJSONObject(i);
//                    Teacher tmp = JSON.toJavaObject(obj, Teacher.class);
//                    pstmt.setString(1, tmp.getTid());
//                    pstmt.setString(2, tmp.getTname());
//                    pstmt.setString(3, tmp.getTsex());
//                    pstmt.execute();
//                }
//                return pstmt.getUpdateCount()!=0;
//            }
//            else if (tablename.equals("student")){
//                String sql = "insert into student(CLid,Sid,Sname,Ssex) value (?,?,?,?)";
//                PreparedStatement pstmt = conn.prepareStatement(sql);
//                for (int i = 0; i < len; i++) {
//                    JSONObject obj = ary.getJSONObject(i);
//                    Student tmp = JSON.toJavaObject(obj, Student.class);
//                    pstmt.setString(1, tmp.getCLid());
//                    pstmt.setString(2, tmp.getSid());
//                    pstmt.setString(3, tmp.getSname());
//                    pstmt.setString(4, tmp.getSsex());
//                    pstmt.execute();
//                }
//                return pstmt.getUpdateCount()!=0;
//            }
//            else if (tablename.equals("course")){
//                String sql = "insert into course(Cid,Cname,Cperiod,Ctype,`date`,Ccredit) value (?,?,?,?,?,?)";
//                PreparedStatement pstmt = conn.prepareStatement(sql);
//                for (int i = 0; i < len; i++) {
//                    JSONObject obj = ary.getJSONObject(i);
//                    CourseItem tmp = JSON.toJavaObject(obj, CourseItem.class);
//                    pstmt.setString(1, tmp.getCid());
//                    pstmt.setString(2, tmp.getCname());
//                    pstmt.setString(3, tmp.getCperiod());
//                    pstmt.setString(4, tmp.getCtype());
//                    pstmt.setString(5, tmp.getDate());
//                    pstmt.setString(6, tmp.getCcredit());
//                    pstmt.execute();
//                }
//                return pstmt.getUpdateCount()!=0;
//            }
//            else return false;
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//        return false;
//    }
//
//    public static boolean Delete(String tablename,JSONArray ary){
//        try {
//            int len = ary.size();
//            if (len == 0) return false;
//            Class.forName(DBInfo.DRIVER);
//            Connection conn = DriverManager.getConnection(DBInfo.URL, DBInfo.USER, DBInfo.PASSWORD);
//            conn.createStatement().execute("use coursedesign");
//            if (tablename.equals("teacher")) {
//                String sql = "delete from teacher where Tid = ? ";
//                PreparedStatement pstmt = conn.prepareStatement(sql);
//                for (int i = 0; i < len; i++) {
//                    JSONObject obj = ary.getJSONObject(i);
//                    Teacher tmp = JSON.toJavaObject(obj, Teacher.class);
//                    pstmt.setString(1, tmp.getTid());
//                    pstmt.execute();
//                }
//                return pstmt.getUpdateCount()!=0;
//            }
//            else if (tablename.equals("student")){
//                String sql = "delete from student where Sid = ? ";
//                PreparedStatement pstmt = conn.prepareStatement(sql);
//                for (int i = 0; i < len; i++) {
//                    JSONObject obj = ary.getJSONObject(i);
//                    Student tmp = JSON.toJavaObject(obj, Student.class);
//                    pstmt.setString(1, tmp.getSid());
//                    pstmt.execute();
//                }
//                return pstmt.getUpdateCount()!=0;
//            }
//            else if (tablename.equals("course")){
//                String sql = "delete course where Cid = ? ";
//                PreparedStatement pstmt = conn.prepareStatement(sql);
//                for (int i = 0; i < len; i++) {
//                    JSONObject obj = ary.getJSONObject(i);
//                    CourseItem tmp = JSON.toJavaObject(obj, CourseItem.class);
//                    pstmt.setString(1, tmp.getCid());
//                    pstmt.execute();
//                }
//                return pstmt.getUpdateCount()!=0;
//            }
//            else return false;
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//        return false;
//    }
//
//    public static boolean Update(String tablename,JSONArray ary){
//        try {
//            int len = ary.size();
//            if (len == 0) return false;
//            Class.forName(DBInfo.DRIVER);
//            Connection conn = DriverManager.getConnection(DBInfo.URL, DBInfo.USER, DBInfo.PASSWORD);
//            conn.createStatement().execute("use coursedesign");
//            if (tablename.equals("teacher")) {
//                String sql = "update teacher set Tid = ? ,Tname = ? ,Tsex = ? where Tid = ? ";
//                PreparedStatement pstmt = conn.prepareStatement(sql);
//                for (int i = 0; i < len; i++) {
//                    JSONObject obj = ary.getJSONObject(i);
//                    Teacher tmp = JSON.toJavaObject(obj, Teacher.class);
//                    pstmt.setString(1, tmp.getTid());
//                    pstmt.setString(2, tmp.getTname());
//                    pstmt.setString(3, tmp.getTsex());
//                    pstmt.setString(4, tmp.getTid());
//                    System.out.println(tmp.getTid()+tmp.getTname()+tmp.getTsex());
//                    pstmt.execute();
//                }
//                return pstmt.getUpdateCount()!=0;
//            }
//            else if (tablename.equals("student")){
//                String sql = "update student set CLid = ?,Sid = ?,Sname = ? ,Ssex = ? where Sid = ? ";
//                PreparedStatement pstmt = conn.prepareStatement(sql);
//                for (int i = 0; i < len; i++) {
//                    JSONObject obj = ary.getJSONObject(i);
//                    Student tmp = JSON.toJavaObject(obj, Student.class);
//                    pstmt.setString(1, tmp.getCLid());
//                    pstmt.setString(2, tmp.getSid());
//                    pstmt.setString(3, tmp.getSname());
//                    pstmt.setString(4, tmp.getSsex());
//                    pstmt.setString(5, tmp.getSid());
//                    pstmt.execute();
//                }
//                return pstmt.getUpdateCount()!=0;
//            }
//            else if (tablename.equals("course")){
//                String sql = "update course set Cid = ? ,Cname = ?,Cperiod = ?, Ctype = ?,`date` = ? ,Ccredit = ? where Cid = ? ";
//                PreparedStatement pstmt = conn.prepareStatement(sql);
//                for (int i = 0; i < len; i++) {
//                    JSONObject obj = ary.getJSONObject(i);
//                    CourseItem tmp = JSON.toJavaObject(obj, CourseItem.class);
//                    pstmt.setString(1, tmp.getCid());
//                    pstmt.setString(2, tmp.getCname());
//                    pstmt.setString(3, tmp.getCperiod());
//                    pstmt.setString(4, tmp.getCtype());
//                    pstmt.setString(5, tmp.getDate());
//                    pstmt.setString(6, tmp.getCcredit());
//                    pstmt.setString(7, tmp.getCid());
//                    pstmt.execute();
//                }
//                return pstmt.getUpdateCount()!=0;
//            }
//            else return false;
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//        return false;
//    }
//
//    public static JSONArray Query(String tablename){
//        JSONArray ary = new JSONArray();
//
//
//        try{
//
//            Connection conn = DBcontroller.getConnection();
//            //创建SQL语句
//            String sql = "select * from "+tablename;
//            Statement stmt = conn.createStatement();
//            ResultSet rs = stmt.executeQuery(sql);
//            ResultSetMetaData meta = rs.getMetaData();
//            while (rs.next()){
//                JSONObject obj = new JSONObject();
//                for (int i = 1; i<=meta.getColumnCount();i++){
//                    obj.put(meta.getColumnName(i).toLowerCase(),rs.getString(i));
//                }
//                ary.add(obj);
//            }
//
//
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//        return ary;
//
//
//
//
//
//
//
//
//
//    }

}


