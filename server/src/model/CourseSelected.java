package model;

public class CourseSelected {
    private String courseId;
    private String studentId;
    private String score;

    public CourseSelected() {
    }

    public CourseSelected(String courseId,String studentId,String score){
        this.courseId = courseId;
        this.studentId = studentId;
        this.score = score;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }
}
