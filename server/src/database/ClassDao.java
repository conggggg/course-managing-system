package database;

import java.util.List;

public interface ClassDao<T,K> {
    public List<T> query() throws Exception;
    public boolean insert(List<T> objs)throws Exception;
    public boolean update(List<T> objs)throws Exception;
    public boolean delete(List<K> key)throws Exception;
}
