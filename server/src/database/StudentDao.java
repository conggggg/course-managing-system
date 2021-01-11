package database;

import model.Course;
import model.Student;
import model.Teacher;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class StudentDao implements ClassDao<Student,String>{
    @Override
    public List<Student> queryByKeys(List<String> keys) throws Exception {
        String sql = "select studentId,classId,studentName,studentSex,account from student where studentId = ?";
        PreparedStatement pstmt = DBcontroller.getConnection().prepareStatement(sql);
        List<Student> list = new ArrayList<>();
        for (String key : keys) {
            pstmt.setString(1, key);
            ResultSet rs = pstmt.executeQuery();
            while(rs.next()){
                Student tmp = new Student();
                tmp.setStudentId(rs.getString(1));
                tmp.setClassId(rs.getString(2));
                tmp.setStudentName(rs.getString(3));
                tmp.setStudentSex(rs.getString(4));
                list.add(tmp);
            }
    }
        pstmt.close();
        return list;
    }

    @Override
    public List<Student> query() throws Exception {
            String sql="select studentId,classId,studentName,studentSex,account from student";
            ResultSet rs = DBcontroller.getConnection().createStatement().executeQuery(sql);
            List<Student> list = new ArrayList<>();
            while(rs.next()){
                Student tmp = new Student();
                tmp.setStudentId(rs.getString(1));
                tmp.setClassId(rs.getString(2));
                tmp.setStudentName(rs.getString(3));
                tmp.setStudentSex(rs.getString(4));
                tmp.setAccount(rs.getString(5));
                list.add(tmp);
            }

            return list;
    }

    @Override
    public boolean insert(List<Student> objs) throws Exception {
            String sql = "insert into student (studentId,classId,studentName,studentSex,account) value (?,?,?,?,?)";
            PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
            for (Student s :objs){
                pst.setString(1,s.getStudentId());
                pst.setString(2,s.getClassId());
                pst.setString(3,s.getStudentName());
                pst.setString(4,s.getStudentSex());
                pst.setString(5,s.getAccount());
                pst.execute();
            }
            return pst.getUpdateCount()!= 0;
        }

    @Override
    public boolean update(List<Student> objs) throws Exception {
        String sql = "update student set studentId = ? ,classId = ?,studentName = ?,studentSex = ?,account = ? where studentId = ?";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (Student s :objs){
            pst.setString(1, s.getStudentId());
            pst.setString(2, s.getClassId());
            pst.setString(3, s.getStudentName());
            pst.setString(4, s.getStudentSex());
            pst.setString(5, s.getAccount());
            pst.setString(6, s.getStudentId());
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }

    @Override
    public boolean delete(List<String> keys) throws Exception {
        String sql = "delete from student where studentId = ?";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (String key :keys){
            pst.setString(1,key);
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }
}
