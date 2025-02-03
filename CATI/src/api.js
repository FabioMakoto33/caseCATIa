import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  response => response,
  error => {
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        'Erro na operação';
    
    // Mostra notificação de erro
    toast.error(errorMessage, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    return Promise.reject(error);
  }
);

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