import 'dotenv/config'
import app from './app.js'
import './database.js'

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Corriendo en puerto ${PORT}`);
});