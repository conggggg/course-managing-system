package Actor;


import database.DBInfo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class User {

    private String userName;

    private String passWord;


    public User() {
        this.userName = "null";
        this.passWord = "null";
    }

    public User(String userName, String passWord) {


        this.userName = userName;

        this.passWord = passWord;

    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassWord() {
        return passWord;
    }


}
