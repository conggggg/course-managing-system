package database;

import model.Course;
import model.Teacher;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class CourseDao implements ClassDao<Course,String>{
    @Override
    public List<Course> queryByKeys(List<String> keys) throws Exception {
        String sql = "select courseId,courseName,courseType,courseCredit,coursePeriod from course where courseId = ?";
        PreparedStatement pstmt = DBcontroller.getConnection().prepareStatement(sql);
        List<Course> list = new ArrayList<>();
        for (String key : keys) {
            pstmt.setString(1, key);
            ResultSet rs = pstmt.executeQuery();
            while(rs.next()){
                Course tmp = new Course();
                tmp.setCourseId(rs.getString(1));
                tmp.setCourseName(rs.getString(2));
                tmp.setCourseType(rs.getString(3));
                tmp.setCourseCredit(rs.getString(4));
                tmp.setCoursePeriod(rs.getString(5));
                list.add(tmp);
            }
        }
        pstmt.close();
        return list;
    }

    @Override
    public List<Course> query() throws Exception {
        String sql="select courseId,courseName,courseType,courseCredit,coursePeriod from course";
        ResultSet rs = DBcontroller.getConnection().createStatement().executeQuery(sql);
        List<Course> list = new ArrayList<>();
        while(rs.next()){
            Course tmp = new Course();
            tmp.setCourseId(rs.getString(1));
            tmp.setCourseName(rs.getString(2));
            tmp.setCourseType(rs.getString(3));
            tmp.setCourseCredit(rs.getString(4));
            tmp.setCoursePeriod(rs.getString(5));
            list.add(tmp);
        }
        return list;
    }

    @Override
    public boolean insert(List<Course> objs) throws Exception {
        String sql = "insert into Course (courseId,courseName,courseType,courseCredit,coursePeriod) value (?,?,?,?,?)";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (Course c :objs){
            pst.setString(1,c.getCourseId());
            pst.setString(2,c.getCourseName());
            pst.setString(3,c.getCourseType());
            pst.setString(4,c.getCourseCredit());
            pst.setString(5,c.getCoursePeriod());
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }

    @Override
    public boolean update(List<Course> objs) throws Exception {
        String sql = "update Course set courseId = ? ,courseName = ?,courseType = ?,courseCredit = ?,coursePeriod = ? where courseId = ? ";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (Course c :objs){
            pst.setString(1, c.getCourseId());
            pst.setString(2, c.getCourseName());
            pst.setString(3, c.getCourseName());
            pst.setString(4, c.getCourseCredit());
            pst.setString(5, c.getCoursePeriod());
            pst.setString(6, c.getCourseId());
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }

    @Override
        public boolean delete(List<String> keys) throws Exception {
            String sql = "delete from Course where courseId = ?";
            PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
            for (String key :keys){
                pst.setString(1,key);
                pst.execute();
            }
        return pst.getUpdateCount()!= 0;
    }
}
