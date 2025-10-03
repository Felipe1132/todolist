/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import TasksController from '#controllers/tasks_controller'

router.get('/', [TasksController, 'index'])
router.post('/tasks', [TasksController, 'crear'])
router.patch('/tasks/:id', [TasksController, 'actualizar'])
router.delete('/tasks/:id', [TasksController, 'eliminar'])

