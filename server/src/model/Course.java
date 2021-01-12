package model;

public class Course {
    private String courseId;
    private String courseName;
    private String courseType;
    private String courseCredit;
    private String coursePeriod;
    private String courseDay;
    private String courseLesson;

    public Course() {
    }

    public Course(String courseId,String courseName,String courseType,String courseCredit,String coursePeriod,String courseDay,String courseLesson ) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.courseType = courseType;
        this.courseCredit = courseCredit;
        this.coursePeriod = coursePeriod;
        this.courseDay = courseDay;
        this.courseLesson = courseLesson;
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

    public String getCourseDay() { return courseDay; }

    public void setCourseDay(String courseDay) { this.courseDay = courseDay; }

    public String getCourseLesson() { return courseLesson; }

    public void setCourseLesson(String courseLesson) { this.courseLesson = courseLesson; }
}
