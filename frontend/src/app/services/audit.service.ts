import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

/**
 * Interfaz para definir la estructura de la petición al Backend
 */

interface AuditRequest {
    code: string;
    fileName: string;
    sourceType: 'file' | 'paste'
}

@Injectable({
    providedIn: 'root'
})
export class AuditService {
    // URL del backend  (ajustada con el prefijo /api)
    private readonly API_URL = 'https://sentinel-code-backend.onrender.com/api/ai/analyze';

    constructor (private readonly http: HttpClient) {}

    /**
     * Envía el código al backend para su análisis.
     * @param data Objeto con el código y metadatos.
     * @return Observable con la respuesta de la IA.
     */

    sendForAudit(data: AuditRequest): Observable<any> {
        return this.http.post<any>(this.API_URL, data);
    }
}