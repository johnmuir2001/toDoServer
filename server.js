const express = require("express");
const path = require("path");
const { addTask, showTasks, deleteTask } = require("./utils/mongo-app");
const bodyParser = require("body-parser")

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  // show list
app.get("/data", async (req, res) => {
    const todotask = await showTasks();
    console.log(todotask);
    res.send({
        data: todotask 
    });
});

// adds task
app.post("/register", (req, res) => {
    addTask(req.body.todo)
    res.send(req.body.todo)
})

// deletes task
app.post("/delete", (req, res) => {
    deleteTask(req.body.todo)
    res.send(req.body.todo)
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});