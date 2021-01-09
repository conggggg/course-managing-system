package model;

public class Course {
    private String courseId;
    private String courseName;
    private String courseType;
    private String courseCredit;
    private String coursePeriod;

    public Course() {
    }

    public Course(String courseId,String courseName,String courseType,String courseCredit,String coursePeriod) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.courseType = courseType;
        this.courseCredit = courseType;
        this.coursePeriod = coursePeriod;
        this.coursePeriod = coursePeriod;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseType() {
        return courseType;
    }

    public void setCourseType(String courseType) {
        this.courseType = courseType;
    }

    public String getCourseCredit() {
        return courseCredit;
    }

    public void setCourseCredit(String courseCredit) {
        this.courseCredit = courseCredit;
    }

    public String getCoursePeriod() {
        return coursePeriod;
    }

    public void setCoursePeriod(String courseCeriod) {
        this.coursePeriod = courseCeriod;
    }
}
