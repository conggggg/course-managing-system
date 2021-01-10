use coursedesign;

CREATE TABLE Account(
account VARCHAR(10) PRIMARY KEY,
`passWord` VARCHAR(15),
accountType VARCHAR(3) CHECK(accountType IN('学生','教师','管理员'))
);

CREATE TABLE Course(
courseId VARCHAR(10) PRIMARY KEY,
courseName VARCHAR(10) NOT NULL,
courseType VARCHAR(2) CHECK(courseType IN('必修','选修')),
courseCredit VARCHAR(5),
coursePeriod VARCHAR(2)
);

CREATE TABLE Teacher(
teacherId VARCHAR(10) PRIMARY KEY,
teacherName VARCHAR(5) NOT NULL,
teacherSex VARCHAR(1) CHECK(teacherSex IN ('男','女')),
account VARCHAR(10),

FOREIGN KEY (account) REFERENCES Account(account)
);


CREATE TABLE TheClass(
classId VARCHAR(10) PRIMARY KEY,
className VARCHAR(5) NOT NULL,
profession VARCHAR(10),
grade VARCHAR(5)
);

CREATE TABLE Student(
studentId VARCHAR(10) PRIMARY KEY,
classId VARCHAR(10),
studentName VARCHAR(5),
studentSex VARCHAR(1) CHECK(studentSex IN('男','女')),
account VARCHAR(10),

FOREIGN KEY (account) REFERENCES Account(account),
FOREIGN KEY (classId) REFERENCES TheClass(classId)
);

CREATE TABLE courseSelected(
courseId VARCHAR(10),
studentId VARCHAR(10),
score VARCHAR(4),

PRIMARY KEY(courseId,studentId),
FOREIGN KEY (courseId) REFERENCES Course(courseId),
FOREIGN KEY (studentId) REFERENCES Student(studentId)
);

CREATE TABLE courseTeaching(
courseId VARCHAR(10),
teacherId VARCHAR(10),

PRIMARY KEY(courseId,teacherId),
FOREIGN KEY (courseId) REFERENCES Course(courseId),
FOREIGN KEY (teacherId) REFERENCES Teacher(teacherId)
);
