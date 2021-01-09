package database;

import model.Student;

import java.util.List;

public class StudentDao implements ClassDao<Student,String>{
    @Override
    public List<Student> query() throws Exception {
        return null;
    }

    @Override
    public boolean insert(List<Student> objs) throws Exception {
        return false;
    }

    @Override
    public boolean update(List<Student> objs) throws Exception {
        return false;
    }

    @Override
    public boolean delete(List<String> key) throws Exception {
        return false;
    }
}
