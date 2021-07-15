//express allows you to define routes of your application based on HTTP methods and URLs. It is a backend framework.
const express = require("express")
//cors allows you to make requests from one website to another website in the browser, which is normally prohibited by another browser
//const cors = require("cors")
const { graphqlHTTP } = require("express-graphql")
const mongoose = require("mongoose")
const schema = require("./schema/schema")
require("dotenv").config()


//allow cross sharing of resources
//app.use(cors())

// added due to error with collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set("useCreateIndex", true);
mongoose.Promise = global.Promise;


//connect to mongodb
mongoose.connect(process.env.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
//check the mongodb connection
mongoose.connection.once('open', () => {
    console.log("Connected to database");
    
    startWebServer();
   },
   err =>{
       console.log("Failed to connect database",err);
   }
);

function startWebServer(){

    const app = express();

    app.get("/api/publicinformation", function(req,res) {
        res.send("Can view");
    })
    app.use(express.static("public"));

    app.get("*",function(req,res) {
        res.sendFile(path.join(__dirname + "/public/index.html"));
    });

//use graphql as middleware
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

//listen for the request
const port = process.env.PORT || 6000
app.listen(port, () => console.log(`Server is up at port ${port}`))
}