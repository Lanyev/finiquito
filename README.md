# Calculadora de Finiquito y Liquidación (MX 2025)

Una aplicación web para calcular finiquitos y liquidaciones según la Ley Federal del Trabajo de México, específicamente configurada para Ciudad Juárez (Zona Libre Frontera Norte).

## 📁 Estructura del Proyecto

```
finiquito/
├── index.html          # Página principal
├── README.md           # Documentación del proyecto
├── css/
│   └── styles.css      # Estilos CSS
├── js/
│   └── app.js          # Lógica JavaScript
└── assets/             # Recursos estáticos (imágenes, iconos, etc.)
```

## 🚀 Características

- **Cálculo de Finiquito**: Para renuncias y mutuo acuerdo
- **Cálculo de Liquidación**: Para despidos injustificados
- **Datos de Ciudad Juárez**: Configurado para ZLFN ($419.88 MXN)
- **Almacenamiento Local**: Guarda el último cálculo automáticamente
- **Diseño Responsivo**: Optimizado para desktop y móviles
- **Interfaz Moderna**: Diseño atractivo y fácil de usar

## 💻 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS y flexbox/grid
- **JavaScript ES6+**: Lógica de cálculo y manipulación del DOM
- **LocalStorage**: Persistencia de datos del usuario

## 🎯 Funcionalidades

### Cálculos Incluidos

1. **Proporcionales**:
   - Aguinaldo proporcional
   - Vacaciones pendientes
   - Prima vacacional (excluida por configuración)

2. **Prima de Antigüedad**:
   - Aplicable según años de servicio
   - Tope: 2 veces el salario mínimo diario ZLFN

3. **Indemnizaciones**:
   - 3 meses de salario (90 días)
   - 20 días por año (opcional, Art. 50 LFT)

### Características Técnicas

- **Validación de Datos**: Verificación de entrada del usuario
- **Cálculos Precisos**: Basados en la LFT vigente
- **Persistencia**: Recupera el último cálculo al recargar
- **Responsive Design**: Adaptable a diferentes dispositivos

## 🛠️ Instalación y Uso

1. **Clonar o descargar** el proyecto
2. **Abrir** `index.html` en un navegador web
3. **Completar** los datos del trabajador
4. **Calcular** para ver los resultados

### Requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- No requiere servidor web (funciona localmente)

## 📋 Datos Requeridos

- Salario diario (MXN)
- Días de aguinaldo anual (mínimo 15)
- Fecha de ingreso
- Fecha de baja
- Días de vacaciones pendientes
- Opción de incluir 20 días por año (Art. 50 LFT)

## ⚖️ Consideraciones Legales

- **Cálculo Informativo**: Los resultados son de referencia
- **Consulta Profesional**: Recomendado para casos específicos
- **LFT Vigente**: Basado en la legislación actual
- **Zona Específica**: Configurado para Ciudad Juárez (ZLFN)

## 🔧 Personalización

### Modificar Parámetros

En `js/app.js`:

```javascript
const SM_ZLFN = 419.88; // Salario mínimo diario ZLFN
const PRIMA_VAC_PCT = 0; // Porcentaje de prima vacacional
```

### Cambiar Estilos

Modificar variables CSS en `css/styles.css`:

```css
:root {
  --primary: #2563eb;    /* Color principal */
  --success: #10b981;    /* Color de éxito */
  --warning: #f59e0b;    /* Color de advertencia */
  /* ... más variables */
}
```

## 📱 Compatibilidad

- **Desktop**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Móvil**: iOS Safari 12+, Chrome Mobile 60+, Firefox Mobile 55+
- **Tablet**: Optimizado para pantallas táctiles

## 🐛 Solución de Problemas

### El cálculo no se ejecuta
- Verificar que JavaScript esté habilitado
- Comprobar la consola del navegador para errores

### Los estilos no se cargan
- Verificar que el archivo `css/styles.css` exista
- Comprobar las rutas de los archivos

### Los datos no se guardan
- Verificar que localStorage esté disponible
- Comprobar la configuración de privacidad del navegador

## 📄 Licencia

Este proyecto es de uso libre para fines educativos y de referencia. Para uso comercial, consultar las regulaciones aplicables.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crear una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abrir un Pull Request

## 📞 Soporte

Para reportar problemas o sugerencias, crear un issue en el repositorio del proyecto.

---

**⚠️ Aviso Legal**: Esta calculadora es solo para fines informativos. Los cálculos pueden variar según casos específicos. Siempre consulte con un profesional legal o PROFEDET para asesoría específica.
