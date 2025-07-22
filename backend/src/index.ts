import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (_, res) => res.send('API funcionando'));

app.listen(3000, () => console.log('Servidor en puerto 3000'));