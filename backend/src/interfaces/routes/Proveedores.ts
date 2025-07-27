import express from 'express'
import ProveedoresController from '../controllers/Proveedores'
import { ListProveedores } from '../../application/usecases/proveedores/ListProveedores';
import { CreateProveedor } from '../../application/usecases/proveedores/CreateProveedor';
import { UpdateProveedor } from '../../application/usecases/proveedores/UpdateProveedor';
import { DeleteProveedor } from '../../application/usecases/proveedores/DeleteProveedor';

import { MySQLProveedorRepository } from '../../infrastructure/repositories/SqlProveedorRepository'

import StoreRequest from '../middlewares/StoreProveedorRequest'
import existProveedor from '../middlewares/existProveedor'

const ProveedoresRoutes = express.Router()

const proveedorRepository = new MySQLProveedorRepository();
const listProveedores = new ListProveedores(proveedorRepository);
const createProveedor = new CreateProveedor(proveedorRepository);
const updateProveedor = new UpdateProveedor(proveedorRepository);
const deleteProveedor = new DeleteProveedor(proveedorRepository);

const proveedoresController = new ProveedoresController(
    listProveedores, 
    createProveedor,
    updateProveedor,
    deleteProveedor
);

ProveedoresRoutes.get('/',proveedoresController.getAll.bind(proveedoresController))
ProveedoresRoutes.get('/:id',proveedoresController.getById.bind(proveedoresController))
ProveedoresRoutes.post('/',[
    StoreRequest.validate,
],proveedoresController.create.bind(proveedoresController))

const existProveedorMiddleware = new existProveedor(listProveedores)

ProveedoresRoutes.put('/:id',[
    existProveedorMiddleware.validate.bind(existProveedorMiddleware),
    StoreRequest.partialValidate,
],proveedoresController.update.bind(proveedoresController))

ProveedoresRoutes.delete('/:id',[
    existProveedorMiddleware.validate.bind(existProveedorMiddleware),
],proveedoresController.delete.bind(proveedoresController))

export default ProveedoresRoutes