const port = process.env.PORT || 8080;
const express = require('express');
const app = express();
//const port = 8080;

// Redirect all traffic to index.html
app.use(express.static(`${__dirname}`+'/'));
app.use((req, res) => res.sendFile(`${__dirname}`+'/View/index.html'));

app.listen(port, () => {
  console.info('listening on %d', port);
});