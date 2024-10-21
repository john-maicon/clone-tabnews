const express = require('express');
const app = express();

const PORT = 5001;

app.get('/', (req, res) => {
  res.send('Hello, world back!');
});

app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});
