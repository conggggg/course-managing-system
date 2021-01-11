package model;

import com.alibaba.fastjson.annotation.JSONField;

public class Test {
    @JSONField(name = "testid")
    private String testid;
    @JSONField(name = "testname")
    private String testname;

    public Test() {
        testid = "default";
        testname = "default";
    }

    public String getTestid() {
        return testid;
    }

    public void setTestid(String testid) {
        this.testid = testid;
    }

    public String getTestname() {
        return testname;
    }

    public void setTestname(String testname) {
        this.testname = testname;
    }
}
