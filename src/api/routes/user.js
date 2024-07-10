const { isAdmin, isAuth } = require('../../middleware/auth')
const {
  getUser,
  login,
  register,
  deleteUser,
  putUser
} = require('../controllers/user')

const userRoutes = require('express').Router()

userRoutes.get('/', [isAuth], getUser)
userRoutes.post('/register', register)
userRoutes.post('/login', login)
userRoutes.delete('/:id', isAuth, deleteUser)
userRoutes.put('/:id', [isAdmin], putUser)

module.exports = userRoutes
