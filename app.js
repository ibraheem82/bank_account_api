const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const validator = require('validator');

dotenv.config({ path: './config.env' });
const cors = require('cors');

// * Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.options('*', cors());
const api = process.env.API_URL;
// * Router
const UserRouter = require('./routes/user.account.route');

// * it will use all the function the is coming from the routers and match it to the specific url needed.
app.use(`${api}/users`, UserRouter);






// * Database
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
).then(() => console.log('DB connection was successfull'));

// * Server
app.listen(3000, () => {
  console.log('listening on port http://localhost:3000');
})