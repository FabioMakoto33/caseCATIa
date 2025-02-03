import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333', // Altere se necessário
});

export default {
  // Listas
  getLists: () => api.get('/lists'),
  createList: (title) => api.post('/lists', { title }),
  updateList: (id, title) => api.put(`/lists/${id}`, { title }),
  deleteList: (id) => api.delete(`/lists/${id}`),

  // Tarefas
  getTasks: () => api.get('/tasks'),
  createTask: (task) => api.post('/tasks', task),
  updateTask: (id, task) => api.put(`/tasks/${id}`, task),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  uploadFile: (id, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/tasks/${id}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};