const express = require('express');
const app = express();

app.use(express.json());

app.post('/login', (req, res) => {
  console.log('Request masuk:', req.body);

  setTimeout(() =>{
    res.json({ message: 'Dummy login sukses!' });
  }, 1000);
});

app.listen(5001, () => {
  console.log('Dummy auth-service running on port 5001');
});