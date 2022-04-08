const express = require("express");
const bodyParser = require("body-parser");
const back = require("./src/back");

const app = express();
const port = process.env.PORT || 8080;

back(app);

app.use(bodyParser.json());

app.use("/",express.static("./public"));

app.get("/api/v1/contacts", (req,res)=>{
    res.send([
        {
            name:"pedro",
            phone: 12345
        },
        {
            name:"pablo",
            phone: 12345           
        }
    ]);
});

app.listen(port, () => {
    console.log(`Server ready at port ${port}`);
});
