import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * Interfaz para definir la estructura de la petición al Backend
 */

interface AuditRequest {
  code: string;
  fileName: string;
  sourceType: 'file' | 'paste';
}

/**
 * Interfaz para definir la estructura de la respuesta del Backend
 */
interface AuditResponse {
  // Definir la estructura de la respuesta del backend
  result: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  // URL del backend  (ajustada con el prefijo /api)
  private readonly API_URL =
    'https://sentinel-code-backend.onrender.com/api/ai/analyze';

  constructor(private readonly http: HttpClient) {}

  /**
   * Envía el código al backend para su análisis.
   * @param data Objeto con el código y metadatos.
   * @return Observable con la respuesta de la IA.
   */

  sendForAudit(data: AuditRequest): Observable<AuditResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<AuditResponse>(this.API_URL, data, { headers }).pipe(
      map((response) => response),
      catchError((error) => {
        console.error(error);
        return throwError('Error al enviar la petición');
      }),
    );
  }
}
