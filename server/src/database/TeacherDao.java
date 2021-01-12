package database;

import model.Course;
import model.Teacher;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class TeacherDao implements ClassDao<Teacher,String>{
    public Teacher queryByKey(String teacherId)throws Exception{
        String sql="select teacherId,teacherName,teacherSex,account from teacher where teacherId = ?";
        PreparedStatement pstmt = DBcontroller.getConnection().prepareStatement(sql);
        pstmt.setString(1, teacherId);
        ResultSet rs = pstmt.executeQuery();
        Teacher tmp = new Teacher();
        if (rs.next()) {
            tmp.setTeacherId(rs.getString(1));
            tmp.setTeacherName(rs.getString(2));
            tmp.setTeacherSex(rs.getString(3));
            tmp.setAccount(rs.getString(4));
        }
        pstmt.close();
        return tmp;
    }

    @Override
    public List<Teacher> queryByKeys(List<String> keys) throws Exception {
        String sql="select teacherId,teacherName,teacherSex,account from teacher where teacherId = ?";
        PreparedStatement pstmt = DBcontroller.getConnection().prepareStatement(sql);
        List<Teacher> list = new ArrayList<>();
        for (String key : keys) {
            pstmt.setString(1, key);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Teacher tmp = new Teacher();
                tmp.setTeacherId(rs.getString(1));
                tmp.setTeacherName(rs.getString(2));
                tmp.setTeacherSex(rs.getString(3));
                tmp.setAccount(rs.getString(4));
                list.add(tmp);
            }
        }
        pstmt.close();
        return list;
    }

    @Override
    public List<Teacher> query() throws Exception {

        String sql="select teacherId,teacherName,teacherSex,account from teacher";
        ResultSet rs = DBcontroller.getConnection().createStatement().executeQuery(sql);
        List<Teacher> list = new ArrayList<>();
        while(rs.next()){
            Teacher tmp = new Teacher();
            tmp.setTeacherId(rs.getString(1));
            tmp.setTeacherName(rs.getString(2));
            tmp.setTeacherSex(rs.getString(3));
            tmp.setAccount(rs.getString(4));
            list.add(tmp);
        }

        return list;
    }

    @Override
    public boolean insert(List<Teacher> objs) throws Exception {
        String sql = "insert into teacher (teacherId,teacherName,teacherSex,account) value (?,?,?,?)";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (Teacher t :objs){
            pst.setString(1,t.getTeacherId());
            pst.setString(2,t.getTeacherName());
            pst.setString(3,t.getTeacherSex());
            pst.setString(4,t.getAccount());
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }

    @Override
    public boolean update(List<Teacher> objs) throws Exception {
        String sql = "update teacher set teacherId = ? ,teacherName = ?,teacherSex = ?,account = ? where teacherId = ?";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (Teacher t :objs){
            pst.setString(1, t.getTeacherId());
            pst.setString(2, t.getTeacherName());
            pst.setString(3, t.getTeacherSex());
            pst.setString(4, t.getAccount());
            pst.setString(5, t.getTeacherId());
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }

    @Override
    public boolean delete(List<String> keys) throws Exception {
        String sql = "delete from teacher where teacherId = ?";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (String key :keys){
            pst.setString(1,key);
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }
}
