<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%
    request.setCharacterEncoding("UTF-8");
    
    String username = request.getParameter("txtUser");
    String password = request.getParameter("txtPassword");
    // 获取其他参数...
    
    // 1. 检查用户名是否已存在（查询）
    // 2. 如果不存在，执行 INSERT
    // 3. 如果成功，跳转到登录页；如果失败，提示错误
    
    try {
        Class.forName("com.mysql.jdbc.Driver");
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/kdgj", "root", "密码");
        
        // 先检查是否已存在
        String checkSql = "SELECT * FROM stu WHERE username=?";
        PreparedStatement checkPstmt = conn.prepareStatement(checkSql);
        checkPstmt.setString(1, username);
        ResultSet rs = checkPstmt.executeQuery();
        
        if(rs.next()) {
            out.print("<script>alert('用户名已存在！');history.back();</script>");
        } else {
            // 插入新用户
            String insertSql = "INSERT INTO stu(username, password, regtime) VALUES(?, ?, NOW())";
            PreparedStatement insertPstmt = conn.prepareStatement(insertSql);
            insertPstmt.setString(1, username);
            insertPstmt.setString(2, password); // 实际项目要MD5加密
            
            int result = insertPstmt.executeUpdate();
            
            if(result > 0) {
                out.print("<script>alert('注册成功！请登录');window.location.href='login.html';</script>");
            } else {
                out.print("<script>alert('注册失败，请重试');history.back();</script>");
            }
            insertPstmt.close();
        }
        
        rs.close();
        checkPstmt.close();
        conn.close();
        
    } catch(Exception e) {
        out.print("系统错误：" + e.getMessage());
    }
%>