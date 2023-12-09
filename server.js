const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful'));

// 4) START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listen on port ${port}...`);
});
