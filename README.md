This is project generates reports when we use this with nexial project as external command.

1. First run the command npm install

2. node app.js to run locally

When you invoke this node js program through nexial external command, you need to give command in following format.

node <ur poject path of node program>/app.js <port no> <categories[]> <output type []> <device> <path of local system to store a report>

ex.
node "C:\nexial-lighthouse\nexial-lighthouse\app.js" 12332 accessibility html,json mobile C:\Users\al11172\Desktop\report\report1
