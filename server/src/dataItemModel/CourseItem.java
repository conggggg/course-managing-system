package dataItemModel;

import com.alibaba.fastjson.annotation.JSONField;

public class CourseItem {
    @JSONField(name = "cid")
    private String cid;
    @JSONField(name = "cname")
    private String cname;
    @JSONField(name = "ccredit")
    private String ccredit;
    @JSONField(name = "cperiod")
    private String cperiod;
    @JSONField(name = "ctype")
    private String ctype;
    @JSONField(name = "date")
    private String date;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public String getCcredit() {
        return ccredit;
    }

    public void setCcredit(String ccredit) {
        this.ccredit = ccredit;
    }

    public String getCperiod() {
        return cperiod;
    }

    public void setCperiod(String cperiod) {
        this.cperiod = cperiod;
    }

    public String getCtype() {
        return ctype;
    }

    public void setCtype(String ctype) {
        this.ctype = ctype;
    }
}
