import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AiService } from './ai.service';

/**
 * Controlador encargado de gestionar las peticiones relacionadas con la IA.
 * Expone el endpoint 'ai/analyze' para recibir fragmentos de código.
 */

interface AnalyzeRequest {
  code: string; // Contenido del archivo o texto pegado
  fileName?: string; // Nombre del archivo (opcional, ayuda a la IA con el lenguaje)
  sourceType: 'file' | 'paste'; // Identificador del origen para métricas o lógica específica
}

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  /**
   * Procesa la solicitud de análisis.
   * No importa si viene de un archivo subido o de texto pegado,
   * el frontend enviará el contenido extraído en el campo 'code'.
   */

  @Post('analyze')
  async analyze(@Body() body: any) {
    console.log('[Controller] Recibida petición de análisis');
    const { code, fileName, sourceType } = body;

    // Validación básica: aseguramos que hay contenido que analizar
    if (!code || code.trim().length === 0) {
      throw new HttpException(
        'El contenido de código está vacío es inválido',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      // Log informativo para monitorear qué tipo de entrada recibimos más
      const fileInfo = fileName ? `(${fileName})` : '';
      console.log(`[Análisis] Procesando ${sourceType} ${fileInfo}`);
      const result = await this.aiService.analyzedCode(code, fileName);
      return result;
    } catch (error) {
      console.error('Error en AiController:', error);
      throw new HttpException(
        'Error interno al comunicarse con el motor de IA.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
