const mongoose = require('mongoose')

const librosSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: {
      type: String,
      enum: [
        'Novela',
        'Ensayo',
        'Comic',
        'Poesía',
        'Biografía',
        'Ciencia Ficción'
      ]
    },
    editorial: {
      type: mongoose.Types.ObjectId,
      ref: 'editoriales'
    }
  },
  {
    timestamps: true,
    collection: 'libros'
  }
)

const Libro = mongoose.model('libros', librosSchema, 'libros')
module.exports = Libro
