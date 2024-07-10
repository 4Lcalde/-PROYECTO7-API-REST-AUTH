const {
  getLibros,
  postLibros,
  putLibro,
  deleteLibros,
  getLibrosByPrice,
  getLibrosByAutor
} = require('../controllers/libros')

const libroRoutes = require('express').Router()

libroRoutes.get('/getLibrosByPrice', getLibrosByPrice)
libroRoutes.get('/getLibrosByAutor', getLibrosByAutor)
libroRoutes.get('/', getLibros)
libroRoutes.put('/:id', putLibro)
libroRoutes.post('/', postLibros)
libroRoutes.delete('/:id', deleteLibros)

module.exports = libroRoutes
