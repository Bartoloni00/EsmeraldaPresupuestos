import express from 'express'
import IngredientesController from '../controllers/Ingredientes'
import { ListIngredientes } from '../../application/usecases/ingredientes/ListIngredientes';
import { CreateIngrediente } from '../../application/usecases/ingredientes/CreateIngrediente';
import { UpdateIngrediente } from '../../application/usecases/ingredientes/UpdateIngrediente';
import { DeleteIngrediente } from '../../application/usecases/ingredientes/DeleteIngrediente';
import { MySQLIngredienteRepository } from '../../infrastructure/repositories/SqlIngredienteRepository'

import { MySQLProveedorRepository } from '../../infrastructure/repositories/SqlProveedorRepository'
import { ListProveedores } from '../../application/usecases/proveedores/ListProveedores';

import existIngrediente from '../middlewares/existIngrediente'
import StoreIngrediente from '../middlewares/StoreIngredienteRequest'

const IngredientesRoutes = express.Router()

const IngredienteRepository = new MySQLIngredienteRepository();
const listIngredientes = new ListIngredientes(IngredienteRepository);
const createIngrediente = new CreateIngrediente(IngredienteRepository);
const updateIngrediente = new UpdateIngrediente(IngredienteRepository);
const deleteIngrediente = new DeleteIngrediente(IngredienteRepository);
const IngredienteController = new IngredientesController(listIngredientes, createIngrediente, updateIngrediente, deleteIngrediente);

IngredientesRoutes.get('/',IngredienteController.getAll.bind(IngredienteController))
IngredientesRoutes.get('/:id',IngredienteController.getById.bind(IngredienteController))

const proveedorRepository = new MySQLProveedorRepository();
const listProveedores = new ListProveedores(proveedorRepository);

const existIngredienteMiddleware = new existIngrediente(listIngredientes);
const StoreIngredienteMiddleware = new StoreIngrediente(listProveedores);

IngredientesRoutes.post('/',[
    StoreIngredienteMiddleware.validate.bind(StoreIngredienteMiddleware),
],IngredienteController.create.bind(IngredienteController))
IngredientesRoutes.put('/:id',[
    existIngredienteMiddleware.validate.bind(existIngredienteMiddleware),
    StoreIngredienteMiddleware.partialValidate.bind(StoreIngredienteMiddleware),
],IngredienteController.update.bind(IngredienteController))
IngredientesRoutes.delete('/:id',[
    existIngredienteMiddleware.validate.bind(existIngredienteMiddleware),
],IngredienteController.delete.bind(IngredienteController))

export default IngredientesRoutes