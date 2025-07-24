import express from 'express'
import IndexController from '../controllers/Index'
import IngredientesController from '../controllers/Ingredientes'
import RecetasController from '../controllers/Recetas'
import ProveedoresController from '../controllers/Proveedores'
import PackagingController from '../controllers/Packaging'
import { ListPackagings } from '../../application/usecases/packagings/ListPackagings';
import { MySQLPackagingRepository } from '../../infrastructure/repositories/SqlPackagingRepository'

const routes = express.Router()

let namespace = '/api'
routes.get(namespace,IndexController.index)

let namespaceIngredientes = namespace + '/ingredientes'
routes.get(namespaceIngredientes,IngredientesController.getAll)
routes.get(namespaceIngredientes + '/:id',IngredientesController.getById)
routes.post(namespaceIngredientes,IngredientesController.create)
routes.put(namespaceIngredientes + '/:id',IngredientesController.update)
routes.delete(namespaceIngredientes + '/:id',IngredientesController.delete)


let namespaceRecetas = namespace + '/recetas'
routes.get(namespaceRecetas,RecetasController.getAll)
routes.get(namespaceRecetas + '/:id',RecetasController.getById)
routes.post(namespaceRecetas,RecetasController.create)
routes.put(namespaceRecetas + '/:id',RecetasController.update)
routes.delete(namespaceRecetas + '/:id',RecetasController.delete)

let namespaceProveedores = namespace + '/proveedores'
routes.get(namespaceProveedores,ProveedoresController.getAll)
routes.get(namespaceProveedores + '/:id',ProveedoresController.getById)
routes.post(namespaceProveedores,ProveedoresController.create)
routes.put(namespaceProveedores + '/:id',ProveedoresController.update)
routes.delete(namespaceProveedores + '/:id',ProveedoresController.delete)

let namespacePackaging = namespace + '/packaging'

const packagingRepository = new MySQLPackagingRepository();
const listPackagings = new ListPackagings(packagingRepository);
const packagingController = new PackagingController(listPackagings);

routes.get(namespacePackaging,packagingController.getAll.bind(packagingController))
routes.get(namespacePackaging  + '/:id',packagingController.getById.bind(packagingController))
routes.post(namespacePackaging,packagingController.create)
routes.put(namespacePackaging + '/:id',packagingController.update)
routes.delete(namespacePackaging + '/:id',packagingController.delete)


export default routes