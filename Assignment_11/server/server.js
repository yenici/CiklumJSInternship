const app = require('./app');

const config = require('./app/config/config.json');
const port = process.env.PORT || config.port;

app.listen(port, (err) => {
  if (err) {
    throw(err);
  }
});

console.log(`Server is listening on port ${port}...`);
