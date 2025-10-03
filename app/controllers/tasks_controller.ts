import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'

export default class TasksController {
  async index({ inertia }: HttpContext) {
    const tasks = await Task.all()
    return inertia.render('home', { tasks })
  }

  async store({ request, response }: HttpContext) {
    const { title } = request.only(['title'])
    
    await Task.create({
      title,
      completed: false
    })

    return response.redirect().back()
  }

  async update({ params, request, response }: HttpContext) {
    const task = await Task.findOrFail(params.id)
    const { completed } = request.only(['completed'])
    
    task.completed = completed
    await task.save()

    if (request.header('accept')?.includes('application/json')) {
      return response.json({ success: true, task })
    }

    return response.redirect().back()
  }

  async destroy({ params, request, response }: HttpContext) {
    const task = await Task.findOrFail(params.id)
    await task.delete()

    if (request.header('accept')?.includes('application/json')) {
      return response.json({ success: true })
    }

    return response.redirect().back()
  }
}