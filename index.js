const express = require("express");
const fs = require('fs')
const cors = require("cors");
const app = express();
const file = 'api.json'
let api = fs.readFileSync(file,"utf-8")
let apiResult = JSON.parse(api)

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.get("/api/data", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const data = {
    data1: [
      { id: "1", name: "adam" },
      { id: "2", name: "enid" },
    ],
  };
  if (req.method === "GET") {
    res.jsonp(data);
  } else {
    res.send("請求錯誤");
  }
});

app.get("/add", (req, res) => {
  const testData = {
    id:"03",name:"Enid"
  }
  const newAPI = [...apiResult.user,testData]
  apiResult ={...apiResult,user:newAPI}
  api = JSON.stringify(apiResult)
  fs.writeFileSync(file,api,'utf-8')

  res.send(apiResult);
});

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log("hello Express",port,'監聽中');
});
