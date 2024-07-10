const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Conexión con la BBDD correcta')
  } catch (error) {
    console.log('La conexión con la BBDD ha fallado')
  }
}

module.exports = { connectDB }
