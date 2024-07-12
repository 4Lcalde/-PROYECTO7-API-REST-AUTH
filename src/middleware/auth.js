const User = require('../api/models/user')
const { verifyJWT } = require('../config/jwt')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json('No estás autorizado')
    }

    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifyJWT(parsedToken)
    const user = await User.findById(id)

    req.user = user

    // Permito acciones si es admin o si es el mismo usuario y el método es DELETE
    if (
      user.rol === 'admin' ||
      (req.method === 'DELETE' && req.params.id === id)
    ) {
      return next()
    }
    return next()
  } catch (error) {
    return res.status(500).json('Error en el servidor')
  }
}
const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const parsedToken = token.replace('Bearer ', '')

    const { id } = verifyJWT(parsedToken)
    const user = await User.findById(id)

    if (user.rol === 'admin') {
      user.password = null
      req.user = user
      next()
    } else {
      return res.status(400).json(error)
    }
  } catch (error) {
    return res.status(400).json('No estás autorizado 1')
  }
}

module.exports = { isAdmin, isAuth }
