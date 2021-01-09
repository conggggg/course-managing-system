package model;


import com.alibaba.fastjson.annotation.JSONField;

public class User {
    @JSONField(name = "username")
    private String userName;
    @JSONField(name = "password")
    private String passWord;

    private String account_type;

    public String getAccount_type() {
        return account_type;
    }

    public void setAccount_type(String account_type) {
        this.account_type = account_type;
    }

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
