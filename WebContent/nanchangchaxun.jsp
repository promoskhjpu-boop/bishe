<%@ page language="java" import="java.sql.*" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>查询结果</title>
<link rel="stylesheet" type="text/css" href="bishe.css">
<style>
        body { 
            background: url("img/南昌.jpg") center top / cover no-repeat fixed;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px 0;
        }
    .table-container {
        width: 80%;
        margin: 0 auto;
    }
    .btn-container {
        text-align: right;
        width: 100%;
    }
</style>
</head>
<body>
<h1>查询结果</h1>
<hr> 
<div class="table-container">
    <table class="express-table">
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
	 String number=request.getParameter("text1");
	 st=con.createStatement();
	 String sql="select * from "+tableName+" where number ="+number;
	 rs=st.executeQuery(sql);
	 if(rs.next()){
		 if(rs.getString("cfd").equals("南昌"))
		 {
			out.println("<tr>");
			out.println("<td>"+rs.getString("number")+"</td>");
			out.println("<td>"+rs.getString("xingming")+"</td>");
			out.println("<td>"+rs.getString("shoujihao")+"</td>");
			out.println("<td>"+rs.getString("cfd")+"</td>");
			out.println("<td>"+rs.getString("jsd")+"</td>");
			out.println("<td>"+rs.getString("kd")+"</td>");
			out.println("<td>"+rs.getString("xz")+"</td>");
			out.println("</tr>");
		 
		 }
		 else{
			 out.print("<script language='javascript'>alert('不属于南昌站！');history.back();</script>"); 
		 }
		 
	}else{
		out.print("<script language='javascript'>alert('没有该编号！');history.back();</script>"); 
	}
	 
rs.close();
st.close();
con.close();
		 
 }
 catch(SQLException er)
 {System.out.println("Error executeQuery,不能执行查询！");}
%>
    </table>
    <div class="btn-container">
        <a href="zhuye.html" class="back-home-btn">返回主页</a>
    </div>
</div>
</body>
</html>