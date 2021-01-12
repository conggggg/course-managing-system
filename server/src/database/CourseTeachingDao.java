package database;

import model.Course;
import model.CourseTeaching;
import model.Teacher;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

//先输入 课程编号 再输入 教师工号
public class CourseTeachingDao implements ClassDao<CourseTeaching,List<String>>{
    public List<CourseTeaching> queryByCourseId(String courseId)throws Exception{
        String sql = "select courseId,teacherId from courseTeaching where courseId = ?";
        PreparedStatement pstmt = DBcontroller.getConnection().prepareStatement(sql);
        List<CourseTeaching> list = new ArrayList<>();
        pstmt.setString(1, courseId);
        ResultSet rs = pstmt.executeQuery();
        while (rs.next()) {
            CourseTeaching tmp = new CourseTeaching();
            tmp.setCourseId(rs.getString(1));
            tmp.setTeacherId(rs.getString(2));
            list.add(tmp);
        }
        pstmt.close();
        return list;
    }

    public List<CourseTeaching> queryByTeacherId(String teacherId)throws Exception{
        String sql = "select courseId,teacherId from courseTeaching where teacherId = ?";
        PreparedStatement pstmt = DBcontroller.getConnection().prepareStatement(sql);
        List<CourseTeaching> list = new ArrayList<>();
        pstmt.setString(1, teacherId);
        ResultSet rs = pstmt.executeQuery();
        while (rs.next()) {
            CourseTeaching tmp = new CourseTeaching();
            tmp.setCourseId(rs.getString(1));
            tmp.setTeacherId(rs.getString(2));
            list.add(tmp);
        }
        pstmt.close();
        return list;
    }

    @Override
    public List<CourseTeaching> queryByKeys(List<List<String>> keys) throws Exception {
        String sql = "select courseId,teacherId from courseTeaching where courseId = ? and teacherId = ?";
        PreparedStatement pstmt = DBcontroller.getConnection().prepareStatement(sql);
        List<CourseTeaching> list = new ArrayList<>();
        for (List<String> key : keys) {
            pstmt.setString(1, key.get(0));
            pstmt.setString(2, key.get(1));
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                CourseTeaching tmp = new CourseTeaching();
                tmp.setCourseId(rs.getString(1));
                tmp.setTeacherId(rs.getString(2));
                list.add(tmp);
            }

        }
        pstmt.close();
        return list;
    }

    @Override
    public List<CourseTeaching> query() throws Exception {
        String sql="select courseId,teacherId from courseTeaching";
        ResultSet rs = DBcontroller.getConnection().createStatement().executeQuery(sql);
        List<CourseTeaching> list = new ArrayList<>();
        while(rs.next()){
            CourseTeaching tmp = new CourseTeaching();
            tmp.setCourseId(rs.getString(1));
            tmp.setTeacherId(rs.getString(2));
            list.add(tmp);
        }

        return list;
    }

    @Override
    public boolean insert(List<CourseTeaching> objs) throws Exception {
        String sql = "insert into courseTeaching (courseId,teacherId) value (?,?)";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (CourseTeaching c :objs){
            pst.setString(1,c.getCourseId());
            pst.setString(2,c.getTeacherId());
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }

    public boolean updateByCourseId(CourseTeaching ct)throws Exception{
        String sql = "update courseTeaching set courseId = ? ,teacherId = ? where courseId = ? ";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        pst.setString(1, ct.getCourseId());
        pst.setString(2, ct.getTeacherId());
        pst.setString(3, ct.getCourseId());
        pst.execute();
        return pst.getUpdateCount()!= 0;
    }

    @Override
    public boolean update(List<CourseTeaching> objs) throws Exception {
        String sql = "update courseTeaching set courseId = ? ,teacherId = ? where courseId = ? and teacherId = ?";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (CourseTeaching c :objs){
            pst.setString(1, c.getCourseId());
            pst.setString(2, c.getTeacherId());
            pst.setString(3, c.getCourseId());
            pst.setString(4, c.getTeacherId());
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }

    @Override
    public boolean delete(List<List<String>> keys) throws Exception {
        String sql = "delete from courseTeaching where courseId = ? and teacherId = ?";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (List<String> key :keys){
            pst.setString(1, key.get(0));
            pst.setString(2, key.get(1));
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }
}
