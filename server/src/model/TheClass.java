package model;

public class TheClass {
    private String classId;
    private String className;
    private String profession;
    private String grade;

    public TheClass() {
    }

    public TheClass(String classId, String className, String profession, String grade) {
        this.classId = classId;
        this.className = className;
        this.profession = profession;
        this.grade = grade;
    }

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }
}
