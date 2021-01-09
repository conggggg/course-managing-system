package model;

public class Account {
    private String account;
    private String passWord;
    private String accountType;


    public Account() {
    }

    public Account(String account, String passWord, String accountType) {
        this.account = account;
        this.passWord = passWord;
        this.accountType = accountType;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }
}
