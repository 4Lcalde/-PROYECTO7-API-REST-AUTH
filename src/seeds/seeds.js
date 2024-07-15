require('dotenv').config()
const mongoose = require('mongoose')
const Editorial = require('../api/models/editorial')
const { editoriales, libros } = require('../data/data')
const Libro = require('../api/models/libros')

const lanzarSemilla = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Conexión establecida')

    await Libro.collection.drop()
    await Libro.insertMany(libros)
    await Editorial.collection.drop()
    await Editorial.insertMany(editoriales)

    await mongoose.disconnect()
    console.log('Desconexión realizada')
  } catch (error) {
    console.error('Error en la conexión')
  }
}

lanzarSemilla()
