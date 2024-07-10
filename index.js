require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const libroRoutes = require('./src/api/routes/libros')
const editorialRoutes = require('./src/api/routes/editorial')
const userRoutes = require('./src/api/routes/user')

const app = express()
app.use(express.json())

connectDB()

app.listen(3000, () => {
  console.log('Servidor desplegado en http://localhost:3000')
})

app.use('/ping', (req, res, next) => {
  return res.status(200).json('pong')
})

app.use('/api/vi/libros', libroRoutes)
app.use('/api/vi/editoriales', editorialRoutes)
app.use('/api/vi/users', userRoutes)

app.use('/*', (req, res, next) => {
  return res.status(400).json('Servidor no encontrado')
})
