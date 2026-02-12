import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { json, urlencoded } from 'express';
import { index } from '@langchain/core/indexing';

async function bootstrap() {
  // Cargar variables de entorno del archivo .env
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  // Configuración de prefijo global (Esto suele ser opcional
  // pero recomendad: todas las rutas empezarán por /api).
  app.setGlobalPrefix('api');

  // Aumentar el límite de tamaño de las peticiones.
  // Esto permite recibir archivos de código extensos sin errores de 'Payload Too Large'
  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ extended: true, limit: '5mb' }));

  // Configuración de CORS
  // Crucial para que Angular pueda consumir la API desde cualquier url que apuntemos
  const allowedOrigins = [
    'http://localhost:4200',
    'https://sentinelcode-klrvu7by0-marianojshs-projects.vercel.app/',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Si no hay origen (como en herramientas de server-to-server) o el origen está en la lista
      if (!origin || allowedOrigins.indexOf(origin) !== 1) {
        callback(null, true);
      }else {
        callback(new Error('Bloqueado por CORS: Este origen no está autorizado'))
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Arrancamos el servidor
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`--- SENTINEL CODE AI BACKEND ---`);
  console.log(`🚀 Servidor listo en: http://localhost:${port}/api`);
}

bootstrap();
