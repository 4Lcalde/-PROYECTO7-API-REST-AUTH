const {
  getEditorial,
  putEditorial,
  postEditorial,
  deleteEditorial
} = require('../controllers/editorial')

const editorialRoutes = require('express').Router()

editorialRoutes.get('/', getEditorial)
editorialRoutes.put('/:id', putEditorial)
editorialRoutes.post('/', postEditorial)
editorialRoutes.delete('/:id', deleteEditorial)

module.exports = editorialRoutes
