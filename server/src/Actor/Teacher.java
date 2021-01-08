package Actor;

import com.alibaba.fastjson.annotation.JSONField;

public class Teacher extends User implements Individual{
    @JSONField(name = "tid")
    private String tid;
    @JSONField(name = "tname")
    private String tname;
    @JSONField(name = "tsex")
    private String tsex;

    public String getTid() {
        return tid;
    }

    public void setTid(String tid) {
        this.tid = tid;
    }

    public String getTname() {
        return tname;
    }

    public void setTname(String tname) {
        this.tname = tname;
    }

    public String getTsex() {
        return tsex;
    }

    public void setTsex(String tsex) {
        this.tsex = tsex;
    }

    @Override
    public void queryInfo() {

    }

    @Override
    public void QueryScore() {

    }

    @Override
    public void queryTimeTable() {

    }
}
