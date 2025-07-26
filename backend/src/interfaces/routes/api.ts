import express from 'express'
import IndexController from '../controllers/Index'
import RecetaRoutes from './Recetas'
import IngredientesRoutes from './Ingredientes'
import ProveedoresRoutes from './Proveedores'
import PackagingRoutes from './Packaging'

const routes = express.Router()

let namespace = '/api'
routes.get(namespace,IndexController.index)
routes.use(namespace + '/recetas',RecetaRoutes)
routes.use(namespace + '/ingredientes',IngredientesRoutes)
routes.use(namespace + '/proveedores',ProveedoresRoutes)
routes.use(namespace + '/packagings',PackagingRoutes)

export default routes