First modify the connection.js
-- user
-- password
-- database

Create database in Mysql with the same name (I am using infeedo as db name)

command:- npm i (to install the dependency)
command:- npm start (to start the project)
NOTE:- make sure your port 8000 is free, if not then modify the .env (PORT)

APIs:

1.  To create a task
    -- POST: localhost:8000/task/create
    -- parameter (JSON)
    {
    "name": "Learn NodeJs",
    "status": "completed",
    "date": "2023-05-25 22:22:15"
    }
    -- Here, "date" is optional. "status" can have one of from "open", "inprogress" or "completed" value

2.  To update a task
    -- PUT: localhost:8000/task/update/:taskId
    -- parameters (JSON)
    {
    "name": "Task-3 updated",
    "status": "completed"
    }
    -- Here we can either provide name or status or both.

3.  To get all tasks and pagination
    -- GET: localhost:8000/tasks?page=1&perPage=5
    We can provide page and perPage query paramter. Default value for page is 1 and perPage is 5.

4.  To get task metrics like counts tasks on basis of status and timeline
    -- GET: localhost:8000/task/count

THANK YOU!
