package model;

public class Student {
    private String studentId;
    private String studentName;
    private String studentSex;
    private String classId;
    private String account;

    public Student() {
    }

    public Student(String studentId, String studentName, String studentSex, String classId, String account) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.studentSex = studentSex;
        this.classId = classId;
        this.account = account;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentSex() {
        return studentSex;
    }

    public void setStudentSex(String studentSex) {
        this.studentSex = studentSex;
    }

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }
}
