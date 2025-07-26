import express from 'express'
import PackagingController from '../controllers/Packaging'
import { ListPackagings } from '../../application/usecases/packagings/ListPackagings';
import { MySQLPackagingRepository } from '../../infrastructure/repositories/SqlPackagingRepository'

const PackagingRoutes = express.Router()

const packagingRepository = new MySQLPackagingRepository();
const listPackagings = new ListPackagings(packagingRepository);
const packagingController = new PackagingController(listPackagings);

PackagingRoutes.get('/',packagingController.getAll.bind(packagingController))
PackagingRoutes.get( '/:id',packagingController.getById.bind(packagingController))
PackagingRoutes.post('/',packagingController.create.bind(packagingController))
PackagingRoutes.put('/:id',packagingController.update.bind(packagingController))
PackagingRoutes.delete('/:id',packagingController.delete.bind(packagingController))

export default PackagingRoutes