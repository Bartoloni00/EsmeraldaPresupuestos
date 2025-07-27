import express from 'express'
import RecetasController from '../controllers/Recetas'
import { ListRecetas } from '../../application/usecases/recetas/ListRecetas';
import { CreateReceta } from '../../application/usecases/recetas/CreateReceta';
import { DeleteReceta } from '../../application/usecases/recetas/DeleteReceta';
import { MySQLRecetaRepository } from '../../infrastructure/repositories/SqlRecetaRepository'
import { MySQLIngredienteRepository } from '../../infrastructure/repositories/SqlIngredienteRepository'
import { MySQLPackagingRepository } from '../../infrastructure/repositories/SqlPackagingRepository'
import StoreRequest from '../middlewares/StoreRecetaRequest'
import existReceta from '../middlewares/existReceta'
import { ListIngredientes } from '../../application/usecases/ingredientes/ListIngredientes';
import { ListPackagings } from '../../application/usecases/packagings/ListPackagings';
import { UpdateReceta } from '../../application/usecases/recetas/UpdateReceta';

const RecetaRoutes = express.Router()

const recetaRepository = new MySQLRecetaRepository();
const ingredienteRepository = new MySQLIngredienteRepository();
const packagingRepository = new MySQLPackagingRepository();

const listIngredientes = new ListIngredientes(ingredienteRepository);
const listPackagings = new ListPackagings(packagingRepository);
const listRecetas = new ListRecetas(recetaRepository, listIngredientes, listPackagings);
const createReceta = new CreateReceta(recetaRepository);
const updateReceta = new UpdateReceta(recetaRepository);
const deleteReceta = new DeleteReceta(recetaRepository);
const recetasController = new RecetasController(listRecetas, createReceta, updateReceta, deleteReceta);

RecetaRoutes.get('/',recetasController.getAll.bind(recetasController))
RecetaRoutes.get('/:id',recetasController.getById.bind(recetasController))

const validateRecetaMiddleware = new StoreRequest(listIngredientes, listPackagings);
const existRecetaMiddleware = new existReceta(listRecetas);

RecetaRoutes.post('/',[
    validateRecetaMiddleware.validate.bind(validateRecetaMiddleware),
],recetasController.create.bind(recetasController))
RecetaRoutes.put('/:id',[
    existRecetaMiddleware.validate.bind(existRecetaMiddleware),
    validateRecetaMiddleware.partialValidate.bind(validateRecetaMiddleware),
],recetasController.update.bind(recetasController))
RecetaRoutes.delete('/:id',recetasController.delete.bind(recetasController))

export default RecetaRoutes