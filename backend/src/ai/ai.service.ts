import { Injectable } from '@nestjs/common';
import { ChatGroq } from '@langchain/groq';

@Injectable()
export class AiService {
  private model: ChatGroq;

  /**
   * Creamos el modelo de Llama que usará la app y le especificamos la API Key a la que debe referirse
   */
  
  onModuleInit() {
    console.log('🤖 AiService: Inicializando modelo Groq...');
    this.model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1, // Bajamos a 0.1 para máxima precisión técnica
    });
  }

  /**
   * Analiza el código fuente, ya sea un fragmento pegado o un archivo completo.
   * @param code El contenido del código en texto plano.
   * @param fileName Nombre del archivo (opcional) para dar contexto del lenguaje.
   */

  async analyzedCode(code: string, fileName?: string): Promise<any> {
    console.log('--- 1. Entrando en analyzeCode ---');

    try {
      // Preparamos el contexto: ¿Es un archivo específico o un snippet genérico?
      const contextPrompt = fileName
        ? `Estas analizando el archivo completo: "${fileName}".`
        : 'Estas analizando un fragmento de código pegado por el usuario.';

      console.log('--- 2. Invocando modelo de Groq... ---');

      const response = await this.model.invoke([
        [
          'system',
          `
                Eres SentinelCode AI. ${contextPrompt}
                Tu misión es identificar fallos de seguridad, inyecciones, fugas de memoria 
                y errores lógicos. 
                
                Estructura tu respuesta así:
                1. 🛡️ Resumen de Seguridad (Puntuación 1-10).
                2. 🚨 Vulnerabilidades Críticas.
                3. 📝 Mejoras de Código.
                4. ✅ Versión Corregida (si aplica).`,
        ],
        ['user', code],
      ]);

      console.log('--- Respuesta recibida de Groq ---');

      return {
        analysis: response.content,
        meta: {
          fileProcessed: fileName || 'Snipet (Texto pegado)',
          lines: code.split('\n').length,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('[AiService] Error en proceso:', error.message);
      throw error;
    }
  }
}
