import express from 'express'
import IngredientesController from '../controllers/Ingredientes'
import { ListIngredientes } from '../../application/usecases/ingredientes/ListIngredientes';
import { MySQLIngredienteRepository } from '../../infrastructure/repositories/SqlIngredienteRepository'

const IngredientesRoutes = express.Router()

const IngredienteRepository = new MySQLIngredienteRepository();
const listIngredientes = new ListIngredientes(IngredienteRepository);
const IngredienteController = new IngredientesController(listIngredientes);

IngredientesRoutes.get('/',IngredienteController.getAll.bind(IngredienteController))
IngredientesRoutes.get('/:id',IngredienteController.getById.bind(IngredienteController))
IngredientesRoutes.post('/',IngredienteController.create.bind(IngredienteController))
IngredientesRoutes.put('/:id',IngredienteController.update.bind(IngredienteController))
IngredientesRoutes.delete('/:id',IngredienteController.delete.bind(IngredienteController))

export default IngredientesRoutes