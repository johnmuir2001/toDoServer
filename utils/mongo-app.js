const { MongoClient } = require("mongodb");

const addTask = async (task) => {
    const uri = "mongodb+srv://john-muir:  <password>  @practice-cluster-zmje3.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db("todolist")
        await db.collection("list").insertOne({todo: task})
         
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
}

const showTasks = async () => {
    const uri = "mongodb+srv://john-muir:  <password>  @practice-cluster-zmje3.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db("todolist")
        const response = await db.collection("list").find().toArray();
        return response
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
}

const deleteTask = async (task) => {
    const uri = "mongodb+srv://john-muir:  <password>  @practice-cluster-zmje3.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db("todolist");
      await db.collection("list").deleteOne({ todo: task });
      const response = await db.collection("list").find().toArray();
      console.log('deleting task');
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      await client.close();
    }
  };

module.exports = {
    addTask,
    showTasks,
    deleteTask
}