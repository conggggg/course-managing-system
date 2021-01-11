package model;

public class CourseTeaching {
    private String courseId;
    private String teacherId;

    public CourseTeaching() {
    }

    public CourseTeaching(String courseId, String teacherId) {
        this.courseId = courseId;
        this.teacherId = teacherId;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }
}
