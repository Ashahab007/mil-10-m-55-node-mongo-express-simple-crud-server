// 1.0 creating the server as per documents of express (This was done in previous module 54 ). From 1.0 to 1.1 the between code is done in previous module 54

const express = require("express");
const cors = require("cors");
// 3.0 export from  driver => View full code sample from mongodb documentation
const { MongoClient, ServerApiVersion } = require("mongodb"); // from mongodb documentation
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

app.get("/", (req, res) => {
  res.send("Simple CRUD running");
});

app.listen(port, () => {
  console.log(`Simple CRUD running on port ${port}`);
});
// 1.1

// 2.0 Now setup mongoDB, sign up and security => network access => in ip address => edit => Access List => allow access from anywhere => then confirm
// 2.1 go to cluster =>Database access => Add New Database User
// 2.2 Password Authentication name simpleDBUser and click autogenerate secure password
// user :simpleDBUser, password = JUlcVHbxSwrIZmfr
// 2.3 builtin role: admin then add user button
// 2.4 type npm install mongodb
// 2.5 now to connect with backend with client go to Database cluster => connect => driver => View full code sample
