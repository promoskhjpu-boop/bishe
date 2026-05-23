<%@ page language="java" import="java.sql.*" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>管理</title>
<link rel="stylesheet" type="text/css" href="bishe.css">
<script src="common.js"></script>
<style>
 body{
    background: url("img/管理.jpg") center top / cover no-repeat fixed;
    margin: 0;
    padding: 20px 0;
 }
</style>
</head>
<body bgcolor="33ccff">
<center>
<h1>查询结果</h1><br>
<hr> 
	 
	<table border=1 align="center">
		<tr>
			<th>快递编号</th>
			<th>姓名</th>
			<th>手机号</th>
			<th>出发地</th>
			<th>接收地</th>
		    <th>快递单位</th>
		    <th>现在位置</th>
		</tr>
 	<%
String driverName="com.mysql.jdbc.Driver";
String userName="root";
String userPasswd="123456";
String dbName="bishe";
String tableName="chaxun";
String url="jdbc:mysql://localhost:3306/"+dbName;
Connection con=null; Statement st=null; ResultSet rs=null;
try
{
	Class.forName(driverName).newInstance();
}catch(ClassNotFoundException e)
{
System.out.print("Error loading Driver,不能加载驱动程序");
}
try
{
con=DriverManager.getConnection(url, "root", "123456");
}catch(SQLException er)
{
System.out.print("Error getConnection,不能连接数据库");
}
try{
    st=con.createStatement();
    
    // 快递信息
    rs=st.executeQuery("select * from "+tableName);
    out.println("快递详细信息<br><table border=1>");
    out.println("<tr><td>编号</td><td>姓名</td><td>手机号</td><td>出发地</td><td>接收地</td><td>快递单位</td><td>位置</td></tr>");
    while(rs.next()){
        out.println("<tr><td>"+rs.getString(1)+"</td><td>"+rs.getString(2)+"</td><td>"+rs.getString(3)+"</td><td>"+rs.getString(4)+"</td><td>"+rs.getString(5)+"</td><td>"+rs.getString(6)+"</td><td>"+rs.getString(7)+"</td></tr>");
    }
    out.println("</table>");
    
    // 网点信息
    rs=st.executeQuery("select * from wangdian");
    out.println("快递信息<br><table border=1>");
    out.println("<tr><td>出发地</td><td>接收地</td><td>时间</td><td>重量</td><td>价格</td></tr>");
    while(rs.next()){
        out.println("<tr><td>"+rs.getString(1)+"</td><td>"+rs.getString(2)+"</td><td>"+rs.getString(3)+"</td><td>"+rs.getString(4)+"</td><td>"+rs.getString(5)+"</td></tr>");
    }
    out.println("</table>");
    
    // 会员信息
    rs=st.executeQuery("select * from denglu");
    out.println("会员信息<br><table border=1>");
    out.println("<tr><td>账号</td><td>密码</td></tr>");
    while(rs.next()){
        out.println("<tr><td>"+rs.getString(1)+"</td><td>"+rs.getString(2)+"</td></tr>");
    }
    out.println("</table>");
    
    // 合作伙伴
    rs=st.executeQuery("select * from hezuohuoban");
    out.println("快递公司信息<br><table border=1>");
    out.println("<tr><td>姓名</td><td>快递公司</td><td>联系方式</td><td>性别</td></tr>");
    while(rs.next()){
        out.println("<tr><td>"+rs.getString(1)+"</td><td>"+rs.getString(2)+"</td><td>"+rs.getString(3)+"</td><td>"+rs.getString(4)+"</td></tr>");
    }
    out.println("</table>");
    
    // 留言信息
    rs=st.executeQuery("select * from liuyanban");
    out.println("留言信息<br><table border=1>");
    out.println("<tr><td>姓名</td><td>E-mail</td><td>主题</td><td>留言</td></tr>");
    while(rs.next()){
        out.println("<tr><td>"+rs.getString(1)+"</td><td>"+rs.getString(2)+"</td><td>"+rs.getString(3)+"</td><td>"+rs.getString(4)+"</td></tr>");
    }
    out.println("</table>");
    
    rs.close();
    st.close();
    con.close();
}
 catch(SQLException er)
 {System.out.println("Error executeQuery,不能执行查询！");}
%>
 </table>
</center>
</body>
</html>