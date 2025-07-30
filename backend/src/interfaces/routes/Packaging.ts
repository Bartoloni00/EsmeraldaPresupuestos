import express from 'express'
import PackagingController from '../controllers/Packaging'
import { ListPackagings } from '../../application/usecases/packagings/ListPackagings';
import { CreatePackaging } from '../../application/usecases/packagings/CreatePackaging';
import { UpdatePackaging } from '../../application/usecases/packagings/UpdatePackaging';
import { DeletePackaging } from '../../application/usecases/packagings/DeletePackaging';

import { MySQLPackagingRepository } from '../../infrastructure/repositories/SqlPackagingRepository'
import { ListProveedores } from '../../application/usecases/proveedores/ListProveedores';
import { MySQLProveedorRepository } from '../../infrastructure/repositories/SqlProveedorRepository'

import StorePackaging from '../middlewares/StorePackagingRequest'
import existPackaging from '../middlewares/existPackaging'

const PackagingRoutes = express.Router()

const packagingRepository = new MySQLPackagingRepository();
const listPackagings = new ListPackagings(packagingRepository);
const createPackaging = new CreatePackaging(packagingRepository);
const updatePackaging = new UpdatePackaging(packagingRepository);
const deletePackaging = new DeletePackaging(packagingRepository);
const packagingController = new PackagingController(listPackagings, createPackaging, updatePackaging, deletePackaging);

PackagingRoutes.get('/',packagingController.getAll.bind(packagingController))
PackagingRoutes.get( '/:id',packagingController.getById.bind(packagingController))

const proveedorRepository = new MySQLProveedorRepository();
const listProveedores = new ListProveedores(proveedorRepository);
const StorePackagingMiddleware = new StorePackaging(listProveedores);

const existPackagingMiddleware = new existPackaging(listPackagings);

PackagingRoutes.post('/',[
    StorePackagingMiddleware.validate.bind(StorePackagingMiddleware),
],packagingController.create.bind(packagingController))
PackagingRoutes.put('/:id',[
        existPackagingMiddleware.validate.bind(existPackagingMiddleware),
        StorePackagingMiddleware.partialValidate.bind(StorePackagingMiddleware),
    ],packagingController.update.bind(packagingController))
PackagingRoutes.delete('/:id',[
    existPackagingMiddleware.validate.bind(existPackagingMiddleware),
],packagingController.delete.bind(packagingController))

export default PackagingRoutes