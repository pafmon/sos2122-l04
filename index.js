const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

app.get("/api", (req,res)=>{
    //res.send({ result: true });
    res.sendStatus(400);
});

app.listen(port, () => {
    console.log(`Server ready at port ${port}`);
});
