const express = require('express');
const path = require('path');
const router = require('./config/routes');
const customResponses = require('./middlewares/customResponses');

const app = express();
app.use( customResponses );

//body parser middleware, to handle raw json
app.use(express.json());

app.use( (req,res, next) => {
  console.log( new Date());
  return next();
});

app.use(router);

// app.use((req,res, next) => {
//    console.log("entered err app func");
//   // const err = new Error("Not found");
//   // err.status = 404;
//   // next(err)
//   try {
//     console.log("inside try");
//     throw "this is a trow error";
//   }
//   catch (err) {
//     next(err);
//   }
// });
// error handling
app.use ((req, res) => {
  res.notFound({msg: "Not found"});
});
app.use((err, req, res, next) => {
  console.log("Error msg was: ", err);

    res.serverError();
   
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));