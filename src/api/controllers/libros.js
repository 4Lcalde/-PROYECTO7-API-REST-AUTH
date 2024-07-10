const Libro = require('../models/libros')

const getLibros = async (req, res, next) => {
  try {
    //!Al popular tengo que popular el campo del modelo que quiero que se popule, no el nombre de la colección.
    const allLibros = await Libro.find().populate('editorial')
    return res.status(200).json(allLibros)
  } catch (error) {
    return res.status(400).json('Error al obtener los libros')
  }
}

const getLibrosByPrice = async (req, res, next) => {
  try {
    const { id } = req.params
    const libro = await Libro.findById(id)
    return res.status(200).json(libro)
  } catch (error) {
    return res.status(400).json('Error al obtener los libros')
  }
}
const getLibrosByAutor = async (req, res, next) => {
  try {
    const { autor } = req.params
    const libro = await Libro.findById(autor)
    return res.status(200).json(libro)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const postLibros = async (req, res, next) => {
  try {
    const newLibro = new Libro(req.body)

    const duplicatedLibro = await Libro.findOne({ titulo: req.body.titulo })

    if (duplicatedLibro) {
      return res.status(400).json('El libro ya existe')
    }
    const libroSaved = await newLibro.save()
    return res.status(201).json(libroSaved)
  } catch (error) {
    return res.status(400).json('Error al publicar el libro')
  }
}

const putLibro = async (req, res, next) => {
  try {
    const { id } = req.params
    const tituloDuplicado = await Libro.findOne({ titulo: req.body.titulo })
    if (tituloDuplicado) {
      return res.status(400).json('El libro ya existe')
    }
    const newLibro = new Libro(req.body)
    newLibro._id = id
    const libroActualizado = await Libro.findByIdAndUpdate(id, newLibro, {
      new: true
    })
    return res.status(200).json(libroActualizado)
  } catch (error) {
    return res.status(400).json('Error al actualizar el libro')
  }
}

const deleteLibros = async (req, res, next) => {
  try {
    const { id } = req.params
    const libroEliminado = await Libro.findByIdAndDelete(id)
    return res.status(200).json(libroEliminado)
  } catch (error) {
    return res.status(400).json('Error al eliminar el libro')
  }
}

module.exports = {
  getLibros,
  postLibros,
  putLibro,
  deleteLibros,
  getLibrosByPrice,
  getLibrosByAutor
}
