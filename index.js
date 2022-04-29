const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const cors = require('cors');

const back = require("./src/back");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

back(app);

var paths='/remoteAPI';
var apiServerHost = 'https://sos2122-pfm.herokuapp.com/api/v1/contacts';

app.use(paths, function(req, res) {
  var url = apiServerHost + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});


app.use("/",express.static("./public"));

app.listen(port, () => {
    console.log(`Server ready at port ${port}`);
});
