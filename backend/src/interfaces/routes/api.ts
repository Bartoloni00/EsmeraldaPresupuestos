import express from 'express'
import IndexController from '../controllers/Index'




const routes = express.Router()

let namespace = '/api'
routes.get(namespace,IndexController.index)


import IngredientesController from '../controllers/Ingredientes'
import { ListIngredientes } from '../../application/usecases/ingredientes/ListIngredientes';
import { MySQLIngredienteRepository } from '../../infrastructure/repositories/SqlIngredienteRepository'

let namespaceIngredientes = namespace + '/ingredientes'
const IngredienteRepository = new MySQLIngredienteRepository();
const listIngredientes = new ListIngredientes(IngredienteRepository);
const IngredienteController = new IngredientesController(listIngredientes);

routes.get(namespaceIngredientes,IngredienteController.getAll.bind(IngredienteController))
routes.get(namespaceIngredientes + '/:id',IngredienteController.getById.bind(IngredienteController))
routes.post(namespaceIngredientes,IngredientesController.create)
routes.put(namespaceIngredientes + '/:id',IngredientesController.update)
routes.delete(namespaceIngredientes + '/:id',IngredientesController.delete)

import RecetasController from '../controllers/Recetas'
import { ListRecetas } from '../../application/usecases/recetas/ListRecetas';
import { MySQLRecetaRepository } from '../../infrastructure/repositories/SqlRecetaRepository'

let namespaceRecetas = namespace + '/recetas'
const recetaRepository = new MySQLRecetaRepository();
const listRecetas = new ListRecetas(recetaRepository);
const recetasController = new RecetasController(listRecetas);

routes.get(namespaceRecetas,recetasController.getAll.bind(recetasController))
routes.get(namespaceRecetas + '/:id',recetasController.getById.bind(recetasController))
/*routes.post(namespaceRecetas,RecetasController.create)
routes.put(namespaceRecetas + '/:id',RecetasController.update)
routes.delete(namespaceRecetas + '/:id',RecetasController.delete)*/

import ProveedoresController from '../controllers/Proveedores'
import { ListProveedores } from '../../application/usecases/proveedores/ListProveedores';
import { MySQLProveedorRepository } from '../../infrastructure/repositories/SqlProveedorRepository'

let namespaceProveedores = namespace + '/proveedores'
const proveedorRepository = new MySQLProveedorRepository();
const listProveedores = new ListProveedores(proveedorRepository);
const proveedoresController = new ProveedoresController(listProveedores);

routes.get(namespaceProveedores,proveedoresController.getAll.bind(proveedoresController))
routes.get(namespaceProveedores + '/:id',proveedoresController.getById.bind(proveedoresController))
/*routes.post(namespaceProveedores,ProveedoresController.create)
routes.put(namespaceProveedores + '/:id',ProveedoresController.update)
routes.delete(namespaceProveedores + '/:id',ProveedoresController.delete)
*/

import PackagingController from '../controllers/Packaging'
import { ListPackagings } from '../../application/usecases/packagings/ListPackagings';
import { MySQLPackagingRepository } from '../../infrastructure/repositories/SqlPackagingRepository'

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