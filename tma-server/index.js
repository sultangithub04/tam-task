require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ptqba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const taskCollection = client.db("taskDB").collection("task")
    // const userCollection = client.db("coffeeDB").collection("users")
    app.post('/add', async (req, res) => {
      const newTask = req.body;
      const taskCount = await taskCollection.countDocuments();
      newTask.id = (taskCount + 1).toString();
      newTask.timestamp = new Date().toISOString();
    //   console.log(newEquipment);
      const result = await taskCollection.insertOne(newTask);
      res.send(result);
    })

    app.get('/add', async(req, res)=>{
      const result= await taskCollection.find().toArray()
      res.send(result)
    })
    app.get('/task/:id', async (req, res) => {
      const id=req.params.id;
      const query={_id: new ObjectId(id)}
      const result = await taskCollection.findOne(query);
      res.send(result);
    })


    app.put('/edit/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updated = req.body;
      const task = {
        $set: {
          title: updated.title,
          status: updated.status,
          description: updated.description,
        }
      }
      const result = await taskCollection.updateOne(filter, task, options);
      res.send(result);
    })


    app.put('/add/:id', async (req, res) => {
      const newTask = req.body;
      const taskCount = await taskCollection.countDocuments();
      newTask.id = (taskCount + 1).toString();
      newTask.timestamp = new Date().toISOString();
    //   console.log(newEquipment);
      const result = await taskCollection.insertOne(newTask);
      res.send(result);
    })

    
    app.delete('/delete/:id', async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    })

    // app.get('/equipment/:id', async (req, res) => {
    //   const id=req.params.id;
    //   const query={_id: new ObjectId(id)}
    //   const result = await equipmentCollection.findOne(query);
    //   res.send(result);
    // })
    // app.delete('/equipment/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: new ObjectId(id) };
    //   const result = await equipmentCollection.deleteOne(query);
    //   res.send(result);
    // })
   


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('task server is running')
});
app.listen(port, () => {
  console.log(`task server is running on port ${port}`);
})