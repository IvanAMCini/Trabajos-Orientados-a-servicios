const express = require('express');
const app = express();

// Middleware para permitir trabajar con datos en formato JSON
app.use(express.json());

let tareas = [
  { id: 1, descripcion: 'Tarea Lavar manos',},
  { id: 2, descripcion: 'Tarea Lavar trastes',},
  { id: 3, descripcion: 'Tarea Limpiar cuarto',},
  { id: 4, descripcion: 'Tarea Universidad',},
  { id: 5, descripcion: 'Tarea Dormir',},
];

// Rutas de la API

// Obtener todas las tareas (GET)
app.get('/tareas', (req, res) => {
  res.json(tareas);
});

// Crear una nueva tarea (POST)
app.post('/tareas', (req, res) => {
  const nuevaTarea = {
    id: tareas.length + 1,
    descripcion: req.body.descripcion,
    completado: false,
  };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// Actualizar una tarea (PUT)
app.put('/tareas/:id', (req, res) => {
  const tarea = tareas.find(t => t.id === parseInt(req.params.id));
  if (!tarea) return res.status(404).send('La tarea no fue encontrada.');

  tarea.descripcion = req.body.descripcion;
  tarea.completado = req.body.completado;
  res.json(tarea);
});

// Eliminar una tarea (DELETE)
app.delete('/tareas/:id', (req, res) => {
  const tarea = tareas.find(t => t.id === parseInt(req.params.id));
  if (!tarea) return res.status(404).send('La tarea no fue encontrada.');

  const index = tareas.indexOf(tarea);
  tareas.splice(index, 1);
  res.json(tarea);
});

// Escuchar en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

