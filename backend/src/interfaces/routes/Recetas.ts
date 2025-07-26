import express from 'express'
import RecetasController from '../controllers/Recetas'
import { ListRecetas } from '../../application/usecases/recetas/ListRecetas';
import { MySQLRecetaRepository } from '../../infrastructure/repositories/SqlRecetaRepository'

const RecetaRoutes = express.Router()

const recetaRepository = new MySQLRecetaRepository();
const listRecetas = new ListRecetas(recetaRepository);
const recetasController = new RecetasController(listRecetas);

RecetaRoutes.get('/',recetasController.getAll.bind(recetasController))
RecetaRoutes.get('/:id',recetasController.getById.bind(recetasController))
RecetaRoutes.post('/',recetasController.create.bind(recetasController))
RecetaRoutes.put('/:id',recetasController.update.bind(recetasController))
RecetaRoutes.delete('/:id',recetasController.delete.bind(recetasController))

export default RecetaRoutes