require('dotenv').config()
const mongoose = require('mongoose')
const Editorial = require('../api/models/editorial')
const { editoriales, libros } = require('../data/data')
const Libro = require('../api/models/libros')

const lanzarSemilla = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Conectado a BBDD')
    await Editorial.collection.drop()
    await Libro.collection.drop()
    await Editorial.insertMany(editoriales)
    await Libro.insertMany(libros)
    await mongoose.disconnect()
    console.log('Desonectado de BBDD')
  } catch (error) {
    console.log(error)
  }
}

lanzarSemilla()
