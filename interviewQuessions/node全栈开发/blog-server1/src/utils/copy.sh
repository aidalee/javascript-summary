# linux下的command命令
#!/bin/sh
cd D:\javascript-summary-master\interviewQuessions\node全栈开发\blog-server1\logs
cp access.log $(date + %Y-%m-%d-%H).access.log
echo "" > access.log