const mongoose = require('mongoose')

const editorialSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    ciudad: { type: String, required: true }
  },
  { timestamps: true, collection: 'editoriales' }
)

const Editorial = mongoose.model('editoriales', editorialSchema, 'editoriales')
module.exports = Editorial
