import { Head, useForm, router } from '@inertiajs/react'
import { useState } from 'react'

interface Task {
  id: number
  title: string
  completed: boolean
  created_at: string
  updated_at: string
}

interface HomeProps {
  tasks: Task[]
}

export default function Home({ tasks }: HomeProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')
  
  const { data, setData, post, processing, reset } = useForm({
    title: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (data.title.trim()) {
      post('/tasks', {
        onSuccess: () => reset()
      })
    }
  }

  const toggleTask = (id: number, completed: boolean) => {
    router.patch(`/tasks/${id}`, {
      completed: !completed
    })
  }

  const deleteTask = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      router.delete(`/tasks/${id}`)
    }
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const pendingCount = tasks.filter(task => !task.completed).length

  return (
    <>
      <Head title="Mis Tareas" />

      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-gray-800 text-white py-4">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-2xl font-bold">Mis Tareas</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Agregar Nueva Tarea */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Agregar Nueva Tarea</h2>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                placeholder="Escribe tu tarea aquí..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={processing}
              />
              <button
                type="submit"
                disabled={processing || !data.title.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Agregar
              </button>
            </form>
          </div>

          {/* Lista de Tareas */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Mis Tareas</h2>
            <p className="text-gray-600 mb-4">Tienes {pendingCount} tareas pendientes</p>
            
            {filteredTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                {filter === 'all' ? 'No hay tareas' : 
                 filter === 'pending' ? 'No hay tareas pendientes' : 
                 'No hay tareas completadas'}
              </p>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      task.completed 
                        ? 'bg-gray-50 border-gray-200' 
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <button
                      onClick={() => toggleTask(task.id, task.completed)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        task.completed
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-gray-300 hover:border-blue-500'
                      }`}
                    >
                      {task.completed && (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    
                    <span
                      className={`flex-1 ${
                        task.completed
                          ? 'text-gray-500 line-through'
                          : 'text-gray-800'
                      }`}
                    >
                      {task.title}
                    </span>
                    
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filtros */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === 'pending'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Pendientes
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === 'completed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Completadas
            </button>
          </div>
        </div>
      </div>
    </>
  )
}