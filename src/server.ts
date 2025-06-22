import app from './app/app';
import db from './app/database/index';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

db.raw('SELECT 1')
  .then(() => {
    console.log('Conexão com o banco OK');

    app.listen(PORT, () => {
      console.log(`Servidor na porta http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Falha ao conectar ao banco:', err);
    process.exit(1);
  });
