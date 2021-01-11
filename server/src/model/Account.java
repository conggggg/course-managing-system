package model;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.annotation.JSONField;
import database.AccountDao;

import java.util.ArrayList;
import java.util.List;

public class Account {
    private String account;
    private String passWord;
    private String accountType;

    @JSONField(serialize = false,deserialize = false)
    private static AccountDao dao = new AccountDao();

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


    public static JSONObject login (String account,String passWord) throws Exception{
        Account t = new Account(account,passWord,null);

        List<String> keys = new ArrayList<>();
        keys.add(t.account);

        List<Account> queryresult = dao.queryByKeys(keys);

        JSONObject result = new JSONObject();
        if (queryresult.size()>0&&t.passWord.equals(queryresult.get(0).passWord)){
            result.put("result",true);
            result.put("type",queryresult.get(0).accountType);
        }
        else result.put("result",false);

        return result;
    }

    public static JSONObject updatePassWord(String account,String newPassWord)throws Exception{
        Account t = new Account(account,newPassWord,null);

        List<String> keys = new ArrayList<>();
        keys.add(t.account);

        List<Account> queryresult = dao.queryByKeys(keys);

        JSONObject result = new JSONObject();
        if (queryresult.size()>0&&!newPassWord.equals(queryresult.get(0).passWord)){
            queryresult.get(0).passWord = newPassWord;
            result.put("result",dao.update(queryresult));
        }else result.put("result",false);

        return result;
    }

}
