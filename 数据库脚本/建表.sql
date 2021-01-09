CREATE TABLE user_account (
`account` VARCHAR(10) PRIMARY KEY,
`password` VARCHAR(15),
account_type VARCHAR(10) CHECK(account_type IN('student','teacher','manager'))
);

CREATE TABLE course(
Cid VARCHAR(10) PRIMARY KEY,
Cname VARCHAR(10) NOT NULL,
Ctype VARCHAR(2) CHECK(Ctype IN('必修','选修')),
Ccredit VARCHAR(5),
Cperiod VARCHAR(5),
date varchar(10)
);

CREATE TABLE teacher(
Tid VARCHAR(10) PRIMARY KEY,
Tname VARCHAR(5) NOT NULL,
Tsex VARCHAR(1) CHECK(Tsex IN ('男','女')),
`account` VARCHAR(10),

FOREIGN KEY (`account`) REFERENCES user_account(`account`)
);


CREATE TABLE class(
CLid VARCHAR(10) PRIMARY KEY,
CLname VARCHAR(5) NOT NULL,
CLmajor VARCHAR(10),
CLgrade VARCHAR(5),
Tid VARCHAR(10),


FOREIGN KEY (Tid) REFERENCES teacher(Tid)
);

CREATE TABLE student(
Sid VARCHAR(10) PRIMARY KEY,
CLid VARCHAR(10) NOT NULL,
Sname VARCHAR(5),
Ssex VARCHAR(1) CHECK(Ssex IN('男','女')),
Smajor VARCHAR(10),
Sgrade VARCHAR(5),
`account` VARCHAR(10),

FOREIGN KEY (CLid) REFERENCES class(CLid),
FOREIGN KEY (`account`) REFERENCES user_account(`account`)
);

CREATE TABLE course_selected(
Cid VARCHAR(10),
Sid VARCHAR(10),
score VARCHAR(5),

PRIMARY KEY(Cid,Sid),
FOREIGN KEY (Cid) REFERENCES course(Cid),
FOREIGN KEY (Sid) REFERENCES student(Sid)
);

CREATE TABLE course_teaching(
Cid VARCHAR(10),
Tid VARCHAR(10),

PRIMARY KEY(Cid,Tid),
FOREIGN KEY (Cid) REFERENCES course(Cid),
FOREIGN KEY (Tid) REFERENCES teacher(Tid)
);
