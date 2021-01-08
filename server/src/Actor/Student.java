package Actor;

import com.alibaba.fastjson.annotation.JSONField;

public class Student extends User implements Individual{
    @JSONField(name = "clid")
    private String CLid;
    @JSONField(name = "sgrade")
    private String Sgrade;
    @JSONField(name = "sid")
    private String Sid;
    @JSONField(name = "smajor")
    private String Smajor;
    @JSONField(name = "sname")
    private String Sname;
    @JSONField(name = "ssex")
    private String Ssex;

    public String getCLid() {
        return CLid;
    }

    public void setCLid(String CLid) {
        this.CLid = CLid;
    }

    public String getSgrade() {
        return Sgrade;
    }

    public void setSgrade(String sgrade) {
        Sgrade = sgrade;
    }

    public String getSid() {
        return Sid;
    }

    public void setSid(String sid) {
        Sid = sid;
    }

    public String getSmajor() {
        return Smajor;
    }

    public void setSmajor(String smajor) {
        Smajor = smajor;
    }

    public String getSname() {
        return Sname;
    }

    public void setSname(String sname) {
        Sname = sname;
    }

    public String getSsex() {
        return Ssex;
    }

    public void setSsex(String ssex) {
        Ssex = ssex;
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
