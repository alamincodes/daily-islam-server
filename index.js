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
    const ramadanQna = client.db("ramadanPayers").collection("ramadanqna");

    // get ramadan payers
    app.get("/prayers", async (req, res) => {
      const query = {};
      const cursor = ramadanPayers.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // get ramadan QNA
    app.get("/ramadanQna", async (req, res) => {
      const query = {};
      const cursor = ramadanQna.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // post ramadan payers
    app.post("/ramadanPrayers", async (req, res) => {
      const duya = req.body;
      const result = await ramadanPayers.insertOne(duya);
      res.send(result);
    });
    // post ramadan QNA
    app.post("/ramadanQna", async (req, res) => {
      const qna = req.body;
      const result = await ramadanQna.insertOne(qna);
      res.send(result);
      console.log(req)
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
