package database;
import model.*;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class AccountDao implements ClassDao<Account,String>{

    @Override
    public List<Account> queryByKeys(List<String> keys) throws Exception {
        String sql="select account,password,accountType from account where account = ?";
        PreparedStatement pstmt = DBcontroller.getConnection().prepareStatement(sql);
        List<Account> list = new ArrayList<>();
        for (String key : keys) {
            pstmt.setString(1, key);
            ResultSet rs = pstmt.executeQuery();
            while(rs.next()){
                Account tmp = new Account();
                tmp.setAccount(rs.getString(1));
                tmp.setPassWord(rs.getString(2));
                tmp.setAccountType(rs.getString(3));
                list.add(tmp);
            }
        }
        pstmt.close();
        return list;
    }

    @Override
    public List<Account> query() throws Exception{

        String sql="select account,password,accountType from account";
        ResultSet rs = DBcontroller.getConnection().createStatement().executeQuery(sql);
        List<Account> list = new ArrayList<>();
        while(rs.next()){
            Account tmp = new Account();
            tmp.setAccount(rs.getString(1));
            tmp.setPassWord(rs.getString(2));
            tmp.setAccountType(rs.getString(3));
            list.add(tmp);
        }

        return list;
    }

    @Override
    public boolean insert(List<Account> objs) throws Exception{
        String sql = "insert into account (account,password,accountType) value (?,?,?)";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (Account u :objs){
            pst.setString(1,u.getAccount());
            pst.setString(2,u.getPassWord());
            pst.setString(3,u.getAccountType());
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }

    @Override
    public boolean update(List<Account> objs) throws Exception{
        String sql = "update account set account = ? ,password = ?,accountType = ? where account = ?";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (Account u :objs){
            pst.setString(1,u.getAccount());
            pst.setString(2,u.getPassWord());
            pst.setString(3,u.getAccountType());
            pst.setString(4,u.getAccount());
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }

    @Override
    public boolean delete(List<String> keys) throws Exception{
        String sql = "delete from account where account = ?";
        PreparedStatement pst = DBcontroller.getConnection().prepareStatement(sql);
        for (String key :keys){
            pst.setString(1,key);
            pst.execute();
        }
        return pst.getUpdateCount()!= 0;
    }
}
