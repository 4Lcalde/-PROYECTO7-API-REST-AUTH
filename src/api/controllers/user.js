const { generateSign } = require('../../config/jwt')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const getUser = async (req, res, next) => {
  try {
    const users = await User.find().populate({
      path: 'libros',
      populate: {
        path: 'editorial',
        model: 'editoriales' // Ajusta el nombre del modelo de Editorial según sea necesario
      }
    })
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json('Error al obtener los usuarios')
  }
}

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
      rol: 'user',
      libros: req.body.libros
    })

    const duplicatedUser = await User.findOne({ userName: req.body.userName })
    if (duplicatedUser) {
      return res.status(400).json('El usuario ya está registrado')
    }
    const userSaved = await newUser.save()
    res.status(201).json(userSaved)
  } catch (error) {
    return res.status(400).json('Error al registrar el usuario')
  }
}

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName })

    if (!user) {
      return res.status(400).json('Usuario inválido')
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id)
      return res.status(200).json({ user, token })
    } else {
      return res.status(400).json('Usuario o contraseña incorrecta')
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const putUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const oldUser = await User.findById(id)
    const newUser = new User(req.body)
    newUser._id = id
    const userUpdated = await User.findByIdAndUpdate(id, newUser, { new: true })
    return res.status(200).json(userUpdated)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const UserDeleted = await User.findByIdAndDelete(id)
    return res.status(200).json(UserDeleted)
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  getUser,
  register,
  login,
  deleteUser,
  putUser
}
