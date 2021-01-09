package database;
import model.*;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class UserDao implements ClassDao<User,String>{

    @Override
    public List<User> query() throws Exception{

        String sql="select username,password,account_type from user_account";
        ResultSet rs = DBcontroller.getConnection().createStatement().executeQuery(sql);
        List<User> list = new ArrayList<>();
        while(rs.next()){
            User tmp = new User();
            tmp.setUserName(rs.getString(1));
            tmp.setPassWord(rs.getString(2));
            tmp.setAccount_type(rs.getString(3));
            list.add(tmp);
        }

        return list;
    }

    @Override
    public boolean insert(List<User> objs) throws Exception{
        String sql = "insert into user_account (username,password,account_type) value (?,?,?)";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (User u :objs){
            pst.setString(1,u.getUserName());
            pst.setString(2,u.getPassWord());
            pst.setString(3,u.getAccount_type());
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }

    @Override
    public boolean update(List<User> objs) throws Exception{
        String sql = "update user_account set username = ? ,password = ?,account_type = ? where username = ?";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (User u :objs){
            pst.setString(1,u.getUserName());
            pst.setString(2,u.getPassWord());
            pst.setString(3,u.getAccount_type());
            pst.setString(4,u.getUserName());
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }

    @Override
    public boolean delete(List<String> keys) throws Exception{
        String sql = "delete from user_account where username = ?";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (String key :keys){
            pst.setString(1,key);
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }
}
