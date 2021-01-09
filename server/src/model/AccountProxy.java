package model;

import com.sun.istack.internal.Nullable;
import database.DBInfo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class AccountProxy {
    @Nullable
    public static User login(String userName, String passWord){
        try {
            Class.forName(DBInfo.DRIVER);
            //创建连接
            Connection conn = DriverManager.getConnection(DBInfo.URL,DBInfo.USER,DBInfo.PASSWORD);
            //创建描述
            String sql = "select * from user_account where `account` = ? and  `password` = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            //查询是否存在该用户
            conn.createStatement().execute("use coursedesign");
            pstmt.setString(1,userName);
            pstmt.setString(2,passWord);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()){
                switch (rs.getString(3)){
                    case "教师":
                        return new Teacher();
                    case "学生":
                        return new Student();
                    case "管理员":
                        return new Manager();
                    default:
                        return null;
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    public static String getInstanceType(User user){
        if (user instanceof Teacher){
            return "教师";
        }else if(user instanceof Student){
            return "学生";
        }else if (user instanceof Manager){
            return "管理员";
        }else return null;
    }


    public static boolean updatePassWord(String username,String newPassWord){
        try {
            Class.forName(DBInfo.DRIVER);
            //执行数据库操作获取结果
            Connection conn = DriverManager.getConnection(DBInfo.URL,DBInfo.USER,DBInfo.PASSWORD);
            conn.createStatement().execute("use coursedesign");
            String sql = "update  user_account set `password` = ? where `account` = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,newPassWord);
            pstmt.setString(2,username);
            pstmt.execute();
            int result = pstmt.getUpdateCount();
            return result!=0;
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }
}
