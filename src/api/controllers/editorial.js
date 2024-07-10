const Editorial = require('../models/editorial')

const getEditorial = async (req, res, next) => {
  try {
    const allLibrerias = await Editorial.find().populate('libros')
    return res.status(200).json(allLibrerias)
  } catch (error) {
    return res.status(400).json('Error al obtener las librerías')
  }
}

const postEditorial = async (req, res, next) => {
  try {
    const newEditorial = new Editorial(req.body)

    const duplicatedEditorial = await Editorial.findOne({
      nombre: req.body.nombre
    })

    if (duplicatedEditorial) {
      return res.status(400).json('La editorial ya existe')
    }

    const editorialSaved = await newEditorial.save()
    //Añado esta linea para que me devuelva los datos de los libros populados

    return res.status(201).json(editorialSaved)
  } catch (error) {
    return res.status(400).json('Error al publicar la editoral')
  }
}

const putEditorial = async (req, res, next) => {
  try {
    const { id } = req.params
    const oldEditorial = await Editorial.findById(id)
    if (!oldEditorial) {
      return res.status(404).json('Editorial no encontrada')
    }

    if (req.body.nombre) {
      const duplicatedEditorial = await Editorial.findOne({
        // Verifico si ya existe una editorial con el mismo nombre, excluyendo la actual
        nombre: req.body.nombre,
        _id: { $ne: id }
      })

      if (duplicatedEditorial) {
        return res.status(400).json('La editorial ya existe')
      }
    }

    // Combino los datos existentes y los nuevos
    const updatedData = {
      nombre: req.body.nombre,
      ciudad: req.body.ciudad
    }

    const editorialActualizada = await Editorial.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    )

    res.status(200).json(editorialActualizada)
  } catch (error) {
    return res.status(400).json('Error al actualizar la editorial')
  }
}

const deleteEditorial = async (req, res, next) => {
  try {
    const { id } = req.params
    const editoralEliminada = await Editorial.findByIdAndDelete(id)
    return res.status(200).json(editoralEliminada)
  } catch (error) {
    return res.status(400).json('Error al eliminar la editoral')
  }
}

module.exports = { getEditorial, putEditorial, postEditorial, deleteEditorial }
