import express from 'express';
import cors from 'cors';
import routes from './interfaces/routes/api.js';

const app = express()
const port: number = 3333

app.use(express.urlencoded({ extended : false }))
app.use('/static', express.static('static'))
app.use(express.json())
app.use(cors())

app.use(routes)

export {app, port}