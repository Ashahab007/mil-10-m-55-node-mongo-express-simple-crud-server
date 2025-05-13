// 1.0 creating the server as per documentation of express (This was done in previous module 54 ). Here from steps 1.1 to 1.3 is done in previous module 54.

// 1.1
const express = require("express");
const cors = require("cors");

// 3.0 export from  driver => View full code sample from mongodb documentation
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb"); // from mongodb documentation
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// user :simpleDBUser, password = JUlcVHbxSwrIZmfr

// 3.1 copy the uri from mongodb documentation and replace <db_password> with password 'JUlcVHbxSwrIZmfr'
/* const uri =
  "mongodb+srv://simpleDBUser:<db_password>@cluster0.bmunlsr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; */ //from mongodb documentation

const uri =
  "mongodb+srv://simpleDBUser:JUlcVHbxSwrIZmfr@cluster0.bmunlsr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; //from mongodb documentation

// 3.2 now creating the mongo client from documentation
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// 3.3 Now run the connection and get the connection message in server terminal "Pinged your deployment. You successfully connected to MongoDB!" if the connection is ok. after that setup the client side using react and react router.
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // 4.4 Search in google mongodb crud => CRUD Operations => Insert Documents => insertOne() Example: Full File
    // Connect to the "userdb" database and access its "movies" collection
    const database = client.db("usersdb");
    const usersCollection = database.collection("users");

    // 5.0 my requirement is get the data from the data base and show in ui. go to documentation => find documents => now in code 'Execute query' but didn't match with the video. As i confused so followed the vidoe tutorial which was used toArray().

    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
      // 5.1 Now in browser url type 'http://localhost:3000/users' to see the data from data base in browser
    });

    // 7.1 to get the specific details we use get method by selecting the id
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }; //query means match with which property in database. findOne() Example from documentation
      const result = await usersCollection.findOne(query);
      res.send(result);
    });

    // 4.1 to receive the data create api
    app.post("/users", async (req, res) => {
      // res.send("data in the server");
      console.log(req.body);

      // 4.5 Insert the defined document into the "usersCollection" collection
      const newUsers = req.body;
      const result = await usersCollection.insertOne(newUsers);
      res.send(result);
      // 4.6 Now fill the form and see in the console message for "data from the client {acknowledged: true, insertedId: '6822bbcd5a86260b0667ac8c'}". Now add some data from the form and check the mongodb Database => cluster => browse collection => userdb (from left panel) => user. Create data in data base is complete
    });

    // 6.3 set the delete api
    app.delete("/users/:id", async (req, res) => {
      console.log(req.params); // now in running server terminal u will have the id i.e backend is getting the id
      const id = req.params.id; //req has the property params
      console.log(id);

      // 6.4 from the documentation of crud mongodb, Delete documents create a query
      const query = { _id: new ObjectId(id) }; // from the mongodb server we see that _id is in a ObjectId. so created a constructor new ObjectId and set the id.
      // 6.5 call the deleteOne from the documentation and in this step if u delete the data will delete after refresh.
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    // 8.6 creating the put method to get the data from the client side according the documentation https://www.mongodb.com/docs/drivers/node/current/crud/update/

    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }; //filter means match with which property in database. same as query we have previously used

      const user = req.body; // as the data is come to body as like as post method
      console.log(user);

      // 8.8 as per documentation
      // Specify the update to set a value for the plot field i.e which information going to be updated
      const updateDoc = {
        $set: {
          name: user.name,
          email: user.email,
        },
      };
      /* 8.9 Set the upsert option to insert a document if no documents match
    the filter */
      const options = { upsert: true };

      // 8.10
      const result = await usersCollection.findOne(filter, updateDoc, options);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// 1.2
app.get("/", (req, res) => {
  res.send("Simple CRUD server is running");
});

// 1.3
app.listen(port, () => {
  console.log(`Simple CRUD server is running on port ${port}`);
});

// 2.0 Now setup mongoDB, sign up and security => network access => in ip address => edit => Access List => allow access from anywhere => then confirm
// 2.1 go to cluster =>Database access => Add New Database User
// 2.2 Password Authentication name simpleDBUser and click autogenerate secure password
// user :simpleDBUser, password = JUlcVHbxSwrIZmfr
// 2.3 builtin role: admin then add user button
// 2.4 type npm install mongodb
// 2.5 now to connect with backend with client go to Database cluster => connect => driver => View full code sample
