// index.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { Eureka } = require("eureka-js-client");
const app = express();
const port = 5001;
const cors = require("cors");


// Middleware
app.use(bodyParser.json());
app.use(cors());


// Connect to MongoDB

mongoose.connect('mongodb://127.0.0.1:27017/submission')
.then(
    ()=>{
        console.log('connected');
    }
).catch(
    (err)=>{
       console.log(err); 
    }
)


module.exports=mongoose;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Import routes
const submissionRoutes = require("./routes/submissionRoutes");

// Use routes
app.use("/api/submissions", submissionRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


const client = new Eureka({
    instance: {
      app: "node-service", // Nom du service
      hostName: "localhost",
      ipAddr: "127.0.0.1",
      statusPageUrl: `http://localhost:${port}`, // Page de statut du service
      port: {
        $: port, // Port sur lequel le service est exposé
        "@enabled": "true",
      },
      vipAddress: "node-service", // Adresse virtuelle du service
      dataCenterInfo: {
        "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
        name: "MyOwn",
      },
    },
    eureka: {
      host: "localhost",
      port: 8761, // Port sur lequel Eureka Server est en cours d'exécution
      servicePath: "/eureka/apps/",
    },
  });
  
  // Démarrez l'enregistrement dans Eureka
  client.start((error) => {
    if (error) {
      console.log("Error registering with Eureka:", error);
    } else {
      console.log("Node service registered with Eureka on port 8761");
    }
  });
