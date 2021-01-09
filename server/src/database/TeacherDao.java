package database;

import model.Teacher;
import model.User;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class TeacherDao implements ClassDao<Teacher,String>{
    @Override
    public List<Teacher> query() throws Exception {

        String sql="select tid,tname,tsex from user_account";
        ResultSet rs = DBcontroller.getConnection().createStatement().executeQuery(sql);
        List<Teacher> list = new ArrayList<>();
        while(rs.next()){
            Teacher tmp = new Teacher();
            tmp.setTid(rs.getString(1));
            tmp.setTname(rs.getString(2));
            tmp.setTsex(rs.getString(3));
            list.add(tmp);
        }

        return list;
    }

    @Override
    public boolean insert(List<Teacher> objs) throws Exception {
        return false;
    }

    @Override
    public boolean update(List<Teacher> objs) throws Exception {
        return false;
    }

    @Override
    public boolean delete(List<String> key) throws Exception {
        return false;
    }
}
