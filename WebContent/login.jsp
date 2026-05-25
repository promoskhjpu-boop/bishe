<%@ page language="java" import="java.sql.*" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>登录处理</title>
</head>
<body> 
<%
String driverName="com.mysql.jdbc.Driver";
String userName="root";
String userPasswd="123456";
String dbName="bishe";
String tableName="denglu";
String url="jdbc:mysql://localhost:3306/"+dbName;
Connection con=null; Statement st=null; ResultSet rs=null;

try {
    Class.forName(driverName).newInstance();
} catch(ClassNotFoundException e) {
    out.print("Error loading Driver,不能加载驱动程序");
}

try {
    con=DriverManager.getConnection(url, "root", "123456");
} catch(SQLException er) {
    out.print("Error getConnection,不能连接数据库");
}

try {
    String username=request.getParameter("txtUser");
    String password=request.getParameter("txtPassword");
    st=con.createStatement();
    String sql="select * from "+tableName+" where name = '"+username + "' and password = '"+password+"'";
    rs=st.executeQuery(sql);
     
    if(rs.next()){
        session.setAttribute("loginUser", username);  // 保存到session
        
        // 使用JavaScript将用户名保存到localStorage并跳转
        out.println("<script>");
        out.println("localStorage.setItem('loginUsername', '" + username + "');");
        out.println("window.location.href = 'zhuye.html';");
        out.println("</script>");
    } else {
        out.print("<script>alert('用户名或密码错误！');history.back();</script>");
    }
            
    rs.close();
    st.close();
    con.close();
} catch(SQLException er) {
    er.printStackTrace();
    out.println("Error executeQuery,不能执行查询！");
}
%>
</body>
</html>