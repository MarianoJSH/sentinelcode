import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { json, urlencoded } from 'express';

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
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://sentinelcode.vercel.app',
      'https://sentinel-code-ai.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  // Arrancamos el servidor
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`--- SENTINEL CODE AI BACKEND ---`);
  console.log(`🚀 Servidor listo`);
}

bootstrap();
