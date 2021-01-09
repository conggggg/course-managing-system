package model;

public class Teacher extends User implements Individual{

    private String tid;

    private String tname;

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
