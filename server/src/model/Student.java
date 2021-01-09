package model;

import dataItemModel.ClassItem;

public class Student extends User implements Individual{
    private String CLid;

    private String Sid;

    private String Sname;

    private String Ssex;

    public String getCLid() {
        return CLid;
    }

    public void setCLid(String CLid) {
        this.CLid = CLid;
    }

    public String getSid() {
        return Sid;
    }

    public void setSid(String sid) {
        Sid = sid;
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
