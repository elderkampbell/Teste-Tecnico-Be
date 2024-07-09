/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const UsersController = () => import('#controllers/users_controller')
const ClientsController = () => import('#controllers/clients_controller')
const ProductsController = () => import('#controllers/products_controller')
const SalesController = () => import('#controllers/sales_controller')


router.on('/').render('pages/home')
router.post('/signup', [UsersController, 'signup'])
router.post('/login', [UsersController, 'login'])

router.get('/clients', [ClientsController, 'index'])
router.get('/clients/:id', [ClientsController, 'findById'])
router.post('/clients', [ClientsController, 'store'])
router.put('/clients/:id', [ClientsController, 'update'])
router.delete('/clients/:id', [ClientsController, 'destroy'])

router.get('/products', [ProductsController, 'index'])
router.get('/products/:id', [ProductsController, 'show'])
router.post('/products', [ProductsController, 'store'])
router.put('/products/:id', [ProductsController, 'update'])
router.delete('/products/:id', [ProductsController, 'destroy'])

router.get('/sales', [SalesController, 'index'])
router.get('/sales/:id', [SalesController, 'show'])
router.post('/sales', [SalesController, 'store'])
router.put('/sales/:id', [SalesController, 'update'])
router.delete('/sales/:id', [SalesController, 'destroy'])

router.group(() => {

}).use(middleware.auth({ guards: ['api'] }))

router.any('*', ({ response }) => {
    return response.notFound('Rota não encontrada')})
