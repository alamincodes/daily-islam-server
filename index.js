const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
var cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jrauicn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const ramadanPayers = client.db("ramadanPayers").collection("ramadanduya");

    // get
    app.get("/payers", async (req, res) => {
      const query = {};
      const cursor = ramadanPayers.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // post
    app.post("/ramadanPayers", async (req, res) => {
      const duya = req.body;
      const result = await ramadanPayers.insertOne(duya);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Daily islam server running!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
