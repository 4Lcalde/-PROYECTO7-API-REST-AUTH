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

    if (!user) {
      return res.status(401).json('No estás logueado')
    }

    req.user = user
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

//Añado esta función en donde hago que se verifique si el usuario es rol admin o si el id que me ha solicitado es el mismo que el que me ha volcado la petición.
const esBorrador = (req, res, next) => {
  const user = req.user
  const { id } = req.params

  if (user.rol === 'admin' || user._id.toString() === id) {
    return next()
  } else {
    return res.status(400).json('No estás autorizado')
  }
}

module.exports = { isAdmin, isAuth, esBorrador }
