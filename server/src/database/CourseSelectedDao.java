package database;

import model.CourseSelected;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
//先输入 课程编号 再输入 学生学号
public class CourseSelectedDao implements ClassDao<CourseSelected,List<String>>{

    public List<CourseSelected> queryByStudentId(String studentId)throws Exception{
        String sql = "select courseId,studentId,score from courseSelected where studentId = ?";
        PreparedStatement pstmt = DBcontroller.getConnection().prepareStatement(sql);
        List<CourseSelected> list = new ArrayList<>();
        pstmt.setString(1, studentId);
        ResultSet rs = pstmt.executeQuery();
        while(rs.next()) {
            CourseSelected tmp = new CourseSelected();
            tmp.setCourseId(rs.getString(1));
            tmp.setStudentId(rs.getString(2));
            tmp.setScore(rs.getString(3));
            list.add(tmp);
        }
        pstmt.close();
        return list;
    }

    public List<CourseSelected> queryByCourseId(String courseId)throws Exception{
        String sql = "select courseId,studentId,score from courseSelected where courseId = ?";
        PreparedStatement pstmt = DBcontroller.getConnection().prepareStatement(sql);
        List<CourseSelected> list = new ArrayList<>();
        pstmt.setString(1, courseId);
        ResultSet rs = pstmt.executeQuery();
        while(rs.next()) {
            CourseSelected tmp = new CourseSelected();
            tmp.setCourseId(rs.getString(1));
            tmp.setStudentId(rs.getString(2));
            tmp.setScore(rs.getString(3)==null?"null":rs.getString(3));
            list.add(tmp);
        }
        pstmt.close();
        return list;
    }

    @Override
    public List<CourseSelected> queryByKeys(List<List<String>> keys) throws Exception {
        String sql = "select courseId,studentId,score from courseSelected where courseId = ? and studentId = ?";
        PreparedStatement pstmt = DBcontroller.getConnection().prepareStatement(sql);
        List<CourseSelected> list = new ArrayList<>();
        for ( List<String> key : keys) {
            pstmt.setString(1, key.get(0));
            pstmt.setString(2, key.get(1));
            ResultSet rs = pstmt.executeQuery();
            while(rs.next()) {
                CourseSelected tmp = new CourseSelected();
                tmp.setCourseId(rs.getString(1));
                tmp.setStudentId(rs.getString(2));
                tmp.setScore(rs.getString(3));
                list.add(tmp);
            }
        }
        pstmt.close();
        return list;
    }



    @Override
    public List<CourseSelected> query() throws Exception {
        String sql="select courseId,studentId,score from courseSelected";
        ResultSet rs = DBcontroller.getConnection().createStatement().executeQuery(sql);
        List<CourseSelected> list = new ArrayList<>();
        while(rs.next()){
            CourseSelected tmp = new CourseSelected();
            tmp.setCourseId(rs.getString(1));
            tmp.setStudentId(rs.getString(2));
            tmp.setScore(rs.getString(3));
            list.add(tmp);
        }

        return list;
    }

    @Override
    public boolean insert(List<CourseSelected> objs) throws Exception {
        String sql = "insert into courseSelected (courseId,studentId,score) value (?,?,?)";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (CourseSelected c :objs){
            pst.setString(1,c.getCourseId());
            pst.setString(2,c.getStudentId());
            pst.setString(3,c.getScore());
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }

    @Override
    public boolean update(List<CourseSelected> objs) throws Exception {
        String sql = "update courseSelected set courseId = ? ,studentId = ?,score = ? where courseId = ? and studentId = ?";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (CourseSelected c :objs){
            pst.setString(1, c.getCourseId());
            pst.setString(2, c.getStudentId());
            pst.setString(3, c.getScore());
            pst.setString(4, c.getCourseId());
            pst.setString(5, c.getStudentId());
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }

    @Override
    public boolean delete(List<List<String>> keys) throws Exception {
        String sql = "delete from courseSelected where courseId = ? and studentId = ?";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (List<String> key :keys){
            pst.setString(1, key.get(0));
            pst.setString(2, key.get(1));
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }

    public boolean deleteByCourseId(String courseId)throws Exception{
        String sql = "delete from courseSelected where courseId = ? ";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        pst.setString(1, courseId);
        pst.execute();
        return pst.getUpdateCount()!= 0;
    }

}
