package database;

import java.sql.*;
import java.util.List;

import com.alibaba.fastjson.JSONArray;

public class DBcontroller {

    private static Connection conn;

    public static Connection getConnection() throws Exception{
        if (conn == null){
            //加载驱动并预处理
            Class.forName(DBInfo.DRIVER);
            conn = DriverManager.getConnection(DBInfo.URL,DBInfo.USER,DBInfo.PASSWORD);
        }
        conn.createStatement().execute("use coursedesign");
        return conn;
    }

    private static Statement getStatement() throws Exception{
        return DBcontroller.getConnection().createStatement();
    }


    private static PreparedStatement getPreparedStatement(String sql)throws Exception{
        return DBcontroller.getConnection().prepareStatement(sql);
    }

    public static ResultSet Query(String tablename,String[] attributes)throws Exception{
        String sql = "select ";
        for (String s : attributes){
            sql+= attributes+" ";
        }
        sql += "from "+tablename;
        return DBcontroller.getStatement().executeQuery(sql);
    }

    public static boolean Insert(String tablename, String[] attributes, List<List<String>> values) throws Exception{
        StringBuilder sql = new StringBuilder();

        sql.append("insert into ");
        sql.append(tablename);
        sql.append("(");
        //插入属性名
        int attriLen = attributes.length;
        for (int i = 0;i<attriLen;i++){
            sql.append(attributes[i]);
            if (i!=attriLen-1) sql.append(",");
        }
        sql.append(") values ");
        int size = values.size();
        for (int i =0;i<size;i++){
            List<String> tmp = values.get(i);
            sql.append("(");
            for (int j = 0;j<attriLen;j++){
                sql.append("\""+tmp.get(j)+"\"");
                if (i!=attriLen-1) sql.append(",");
            }
            sql.append(")");
            if (i!=size-1) sql.append(",");
        }

        return DBcontroller.getPreparedStatement(sql.toString()).getUpdateCount()!=0;
    }
}
