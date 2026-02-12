import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { AuditService } from './services/audit.service';
import { DOCUMENT } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None,
})
export class App {
  codeSnippet: string = ''; // Texto del textarea
  analysisResult: any = null; // Respuesta que nos envía la IA
  isLoading: boolean = false; // Estado de carga
  darkMode = false; // Variable para cambiar los estilos al modo nocturno

  constructor(
    private readonly auditService: AuditService,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  /**
   * Procesamos el análsis del texto pegado
   */

  async anylizePaste() {
    if (!this.codeSnippet.trim()) {
      return;
    }

    this.executeAudit(this.codeSnippet, 'paste');
  }

  /**
   * Procesamos ahora el análisis en caso de que se envíe un archivo
   */

  async onFileSelected(event: any) {
    const file: File = event?.target.files[0];
    if (file) {
      try {
        this.isLoading = true;
        const content = await file.text();
        this.executeAudit(content, 'file', file.name);
      } catch (error) {
        console.error('Error leyendo el archivo:', error);
        this.isLoading = false;
      }
    }
  }

  /**
   * Método que ejecuta la auditoría al servicio del backend
   */

  executeAudit(code: string, type: 'file' | 'paste', fileName?: string) {
    this.isLoading = true;
    this.analysisResult = null;

    this.auditService
      .sendForAudit({ code, fileName: fileName || '', sourceType: type })
      .subscribe({
        next: (res) => {
          this.analysisResult = res;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error en la auditoría', err);
          this.isLoading = false;
        },
      });
  }

  limpiarEditor(): void {
    this.codeSnippet = '';
    this.analysisResult = null;
    this.isLoading = false;
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;

    if (this.darkMode) {
      this.document.body.classList.add('dark');
    } else {
      this.document.body.classList.remove('dark');
    }
  }
}
