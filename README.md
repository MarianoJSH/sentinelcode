# ⚡ SentinelCode AI
> Auditor de seguridad inteligente impulsado por IA para el desarrollador moderno.

[Demo en vivo](TU_URL_DE_VERCEL) • [Reportar Bug](https://github.com/tu-usuario/sentinelcode/issues) • [Backend API](TU_URL_DE_RENDER/api)

---

### 🌑 The App
SentinelCode no es solo un auditor; es una herramienta de precisión. Diseñada con una estética **Enterprise Dark**, permite a los desarrolladores pegar código o subir archivos para obtener un diagnóstico inmediato sobre vulnerabilidades, eficiencia y calidad.

### 🛠️ Core Stack
| Componente | Tecnología | Rol |
| :--- | :--- | :--- |
| **Frontend** | Angular 17+ | Interfaz reactiva y SPA |
| **Estilos** | Tailwind CSS | Diseño atómico y Modo Oscuro nativo |
| **Backend** | NestJS | Arquitectura modular y escalable |
| **Motor IA** | Groq + LangChain | Inferencia de modelos Llama-3 a < 500ms |
| **Despliegue** | Vercel & Render | Pipeline de CI/CD automático |

---

### 🛡️ Key Features
* **Deep Scan:** Análisis de seguridad buscando inyecciones, fugas de memoria y patrones inseguros.
* **Instant Feedback:** Gracias al motor de **Groq**, el análisis es casi instantáneo.
* **Drag & Drop:** Soporte nativo para auditoría de archivos locales.
* **Security First:** Configuración robusta de CORS y límites de carga para protección del backend.

---

👤 Autor
Mariano Desarrollador Fullstack centrado en IA y Seguridad.

Nota: Este proyecto utiliza servicios gratuitos. Si la API no responde de inmediato, por favor espera 30 segundos a que el servidor de Render despierte.

### 📂 Estructura del Proyecto
```text
sentinelcode/
├── frontend/             # Angular SPA con Tailwind
│   └── src/app/services  # Lógica de comunicación con la API
├── backend/              # NestJS API
│   ├── src/ai/           # Módulo de integración con LangChain
│   └── main.ts           # Configuración de seguridad y CORS
└── README.md

