const express = require('express');
const path = require('path');
const router = require('./config/routes');
const customResponses = require('./middlewares/customResponses');

const app = express();
app.use( customResponses );

//body parser middleware, to handle raw json
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));