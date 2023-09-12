import express from 'express';
import cors from 'cors';

import config from './config/index.js';
import dbConnect from './db/dbConnect.js';
import globalErrorHandler from './middleware/errors/globalErrorHandler.js';
import router from './api/routes/index.js';

// create express app instance
const app = express();
// parse incoming JSON data from requests
app.use(express.json());
// parse incoming URL-encoded data from requests
app.use(express.urlencoded({ extended: true }));
// enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// mongodb database connection
dbConnect();

// root router
app.use(router);

// handle all error
app.use(globalErrorHandler);

app.listen(config.port, () => {
  console.log(`server running on port ${config.port}`);
});
