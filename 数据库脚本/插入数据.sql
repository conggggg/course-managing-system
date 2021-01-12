INSERT INTO Account VALUES
('104123','123456','教师'),
('104387','123456','教师'),
('103168','123456','教师'),
('100625','123456','教师'),
('101469','123456','教师'),
('100103','123456','教师'),
('102625','123456','教师'),
('103745','123456','教师'),
('102047','123456','教师'),
('101540','123456','教师'),
('105102','123456','教师'),
('100755','123456','教师'),
('103321','123456','教师'),
('104353','123456','教师'),
('100776','123456','教师'),
('102083','123456','教师'),
('101621','123456','教师'),
('100210','123456','教师'),
('101629','123456','教师'),
('205082','123456','教师'),
('104363','123456','教师'),
('102726','123456','教师'),
('100983','123456','教师'),
('205039','123456','教师'),
('102420','123456','教师'),
('204896','123456','教师'),
('100276','123456','教师'),
('104334','123456','教师'),
('102209','123456','教师'),
('101038','123456','教师'),
('104087','123456','教师'),
('102675','123456','教师'),
('101048','123456','教师'),
('104029','123456','教师'),
('103325','123456','教师'),
('104648','123456','教师'),
('103304','123456','教师'),
('104103','123456','教师'),
('104632','123456','教师'),
('180610001','123456','学生'),
('180610002','123456','学生'),
('180610003','123456','学生'),
('180610004','123456','学生'),
('180610005','123456','学生'),
('180610006','123456','学生'),
('180610007','123456','学生'),
('180610008','123456','学生'),
('180610009','123456','学生'),
('180610010','123456','学生'),
('180610011','123456','学生');

INSERT INTO TheClass
VALUES('11181','软件181','软件工程','2018');

INSERT INTO Theclass
VALUES('11182','软件182','软件工程','2018');

INSERT INTO Theclass
VALUES('13181','计科181','计算机科学','2018');

INSERT INTO Student(student.studentId,student.studentName,student.classId,student.studentSex,student.account) VALUES
('180610001','纪敬','11181','男','180610001'),
('180610002','钱清澜','11181','女','180610002'),
('180610004','苏义','11181','男','180610004'),
('180610003','王灵','11181','女','180610003'),
('180610005','贾贝','11182','女','180610005'),
('180610006','王承卿','11182','男','180610006'),
('180610007','裴妮','11182','女','180610007'),
('180610008','钟翔庆','11182','男','180610008'),
('180610009','潘杰','13181','男','180610009'),
('180610010','沈叶','13181','男','180610010'),
('180610011','邱亮','13181','男','180610011');

INSERT INTO Teacher VALUES
('104123','范立生','男','104123'),
('104387','方美娥','女','104387'),
('103168','冯元勇','男','103168'),
('100625','高鹰','男','100625'),
('101469','古鹏','男','101469'),
('100103','桂丽萍','女','100103'),
('102625','郭四稳','男','102625'),
('103745','何锫','男','103745'),
('102047','揭廷红','男','102047'),
('101540','金政哲','男','101540'),
('105102','赖根','男','105102'),
('100755','李传中','男','100755'),
('103321','李进','男','103321'),
('104353','李婧','女','104353'),
('100776','李鹏','男','100776'),
('102083','李雨霞','女','102083'),
('101621','刘斌','男','101621'),
('100210','刘淼','女','100210'),
('101629','刘敏华','女','101629'),
('205082','宁洪','男','205082'),
('104363','彭滔','男','104363'),
('102726','綦科','男','102726'),
('100983','丘凯伦','男','100983'),
('205039','饶彦祎','男','205039'),
('102420','饶永生','男','102420'),
('204896','谭恒良','男','204896'),
('100276','谭建中','男','100276'),
('104334','谭伟强','男','104334'),
('102209','汤茂斌','男','102209'),
('101038','汤泳山','男','101038'),
('104087','唐卷','男','104087'),
('102675','唐琳','女','102675'),
('101048','陶文正','男','101048'),
('104029','王国军','男','104029'),
('103325','王健雄','男','103325'),
('104648','王显珉','男','104648'),
('103304','王秀妮','女','103304'),
('104103','王艳','女','104103'),
('104632','王员根','男','104632');

INSERT INTO Course VALUES 
('1806100011','人工智能原理','必修','3','48','1','1'),
('1806000251','算法设计与分析','选修','2','32','1','2'),
('1806000261','Unix操作系统分析','选修','2','32','1','3'),
('1806000435','人工智能导论','选修','2','32','1','4'),
('1806000075','数据结构','必修','4','48','2','1'),
('1806000412','面向对象分析与设计','选修','3','48','2','2'),
('1806000184','编译原理','必修','2','32','2','3'),
('1806000094','计算机组成与系统结构','必修','3','48','2','4'),
('1806000581','汇编语言与接口技术','选修','3','32','3','1'),
('1806008016','计算机与信息技术基础','必修','2','32','3','2'),
('1806000033','程序设计基础','必修','3','48','3','3'),
('1806000074','数据结构','必修','4','48','3','4'),
('1806000253','算法设计与分析','必修','2','32','4','1'),
('1806008012','计算机与信息技术基础','必修','2','32','4','2'),
('1806000025','程序设计基础','必修','4','48','4','3'),
('1806000024','程序设计基础','必修','4','48','4','4'),
('1906010091','科技英语写作','选修','2','32','5','1'),
('1806000212','组网技术','必修','2','32','5','2'),
('1806008017','计算机与信息技术基础','必修','2','32','5','3'),
('1806000781','网络编程','必修','2','32','1','2'),
('1806000782','网络编程','必修','2','32','1','1'),
('2006400011','计算机导论','必修','2','32','1','2'),
('1906020101','动态几何','选修','4','64','1','3'),
('1806008014','计算机与信息技术基础','必修','2','32','1','4'),
('1806000012','计算机导论','必修','2','16','2','1'),
('1806000175','编译原理','选修','2','32','2','2'),
('1806000171','编译原理','必修','2','32','2','3'),
('1806000211','组网技术','必修','2','32','2','4'),
('1806000029','程序设计基础','必修','4','48','3','1'),
('1806000076','数据结构','必修','4','48','3','2'),
('1806000097','计算机组成与系统结构','必修','4','48','3','3');

INSERT INTO courseTeaching VALUES
('1806000435','104123'),
('1806000075','104387'),
('1806000412','103168'),
('1806000184','103168'),
('1806000094','101469'),
('1806000581','101469'),
('1806008016','100103'),
('1806000033','102625'),
('1806000074','103745'),
('1806000253','103745'),
('1806000025','100755'),
('1806000024','100755'),
('1906010091','103321'),
('1806000212','100776'),
('1806008017','102083'),
('1806000781','100210'),
('1806000782','100210'),
('2006400011','205082'),
('1906020101','102420'),
('1806008014','100276'),
('1806000012','104334'),
('1806000175','102209'),
('1806000171','104087'),
('1806000211','102675'),
('1806000029','104029'),
('1806000076','103304'),
('1806000097','104103');

INSERT INTO courseSelected VALUES
('1806000171','180610001','90'),
('1806000171','180610002','85'),
('1806000171','180610003','89'),
('1806000171','180610004','92'),
('1806000211','180610001','93'),
('1806000211','180610002','73'),
('1806000211','180610003','86'),
('1806000211','180610004','75'),
('1806000412','180610005','68'),
('1806000412','180610006','86'),
('1806000412','180610007','75'),
('1806000412','180610008','89'),
('1806000435','180610009','78'),
('1806000435','180610010','74'),
('1806000435','180610011','91');


insert into Account(account, password, accounttype)
value ("root","123456","管理员");