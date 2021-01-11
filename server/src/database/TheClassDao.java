package database;

import model.Course;
import model.Teacher;
import model.TheClass;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class TheClassDao implements ClassDao<TheClass,String>{
    @Override
    public List<TheClass> queryByKeys(List<String> keys) throws Exception {
        String sql="select classId,className,profession,grade from theClass where classId = ?";
        PreparedStatement pstmt = DBcontroller.getConnection().prepareStatement(sql);
        List<TheClass> list = new ArrayList<>();
        for (String key : keys) {
            pstmt.setString(1, key);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                TheClass tmp = new TheClass();
                tmp.setClassId(rs.getString(1));
                tmp.setClassName(rs.getString(2));
                tmp.setProfession(rs.getString(3));
                tmp.setGrade(rs.getString(4));
                list.add(tmp);
            }
        }
        pstmt.close();
        return list;
    }

    public List<TheClass> queryByClassNames(List<String> ClassNames)throws Exception{
        String sql="select classId,className,profession,grade from theClass where className = ?";
        PreparedStatement pstmt = DBcontroller.getConnection().prepareStatement(sql);
        List<TheClass> list = new ArrayList<>();
        for (String className : ClassNames) {
            pstmt.setString(1, className);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                TheClass tmp = new TheClass();
                tmp.setClassId(rs.getString(1));
                tmp.setClassName(rs.getString(2));
                tmp.setProfession(rs.getString(3));
                tmp.setGrade(rs.getString(4));
                list.add(tmp);
            }
        }
        pstmt.close();
        return list;
    }

    @Override
    public List<TheClass> query() throws Exception {
        String sql="select classId,className,profession,grade from theClass";
        ResultSet rs = DBcontroller.getConnection().createStatement().executeQuery(sql);
        List<TheClass> list = new ArrayList<>();
        while(rs.next()){
            TheClass tmp = new TheClass();
            tmp.setClassId(rs.getString(1));
            tmp.setClassName(rs.getString(2));
            tmp.setProfession(rs.getString(3));
            tmp.setGrade(rs.getString(4));
            list.add(tmp);
        }

        return list;
    }

    @Override
    public boolean insert(List<TheClass> objs) throws Exception {
        String sql = "insert into theClass (classId,className,profession,grade) value (?,?,?,?)";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (TheClass t :objs){
            pst.setString(1,t.getClassId());
            pst.setString(2,t.getClassName());
            pst.setString(3,t.getProfession());
            pst.setString(4,t.getGrade());
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }

    @Override
    public boolean update(List<TheClass> objs) throws Exception {
        String sql = "update theClass set classId = ? ,className = ?,profession = ?,grade = ? where classId = ?";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (TheClass t :objs){
            pst.setString(1, t.getClassId());
            pst.setString(2, t.getClassName());
            pst.setString(3, t.getProfession());
            pst.setString(4, t.getGrade());
            pst.setString(5, t.getClassId());
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }

    @Override
    public boolean delete(List<String> keys) throws Exception {
        String sql = "delete from theClass where classId = ?";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (String key :keys){
            pst.setString(1,key);
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }

}
