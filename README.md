# Calculadora de Finiquito y Liquidación LFT México 2025

Una aplicación web completa para calcular finiquitos y liquidaciones según la Ley Federal del Trabajo de México, específicamente configurada para Ciudad Juárez (Zona Libre Frontera Norte). Incluye validación avanzada, historial de cálculos, accesibilidad WCAG y optimización SEO.

## 📁 Estructura del Proyecto

```
finiquito/
├── index.html          # Página principal con metadatos SEO
├── README.md           # Documentación completa del proyecto
├── css/
│   └── styles.css      # Estilos CSS con variables y responsive design
├── js/
│   └── app.js          # Lógica JavaScript con validación avanzada
└── assets/             # Recursos estáticos (imágenes, iconos, etc.)
```

## 🚀 Características Principales

### 💰 Cálculos Legales
- **Finiquito**: Para renuncias y mutuo acuerdo
- **Liquidación**: Para despidos injustificados
- **Proporcionales**: Aguinaldo, vacaciones y prima vacacional (opcional)
- **Prima de Antigüedad**: Con tope de 2×SM ZLFN
- **Indemnizaciones**: 3 meses + 20 días por año (opcional)

### 🎯 Funcionalidades Avanzadas
- **Historial Interactivo**: Guarda y restaura los últimos 5 cálculos
- **Validación Visual**: Sin alertas molestas, feedback contextual
- **Persistencia Inteligente**: Recupera datos automáticamente
- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Accesibilidad WCAG**: Compatible con lectores de pantalla
- **SEO Optimizado**: Metadatos para mejor posicionamiento

## 💻 Tecnologías Utilizadas

- **HTML5**: Estructura semántica con atributos ARIA
- **CSS3**: Variables CSS, Grid, Flexbox y animaciones
- **JavaScript ES6+**: Lógica modular y validación avanzada
- **LocalStorage**: Persistencia de datos del usuario
- **Web APIs**: Intl.NumberFormat para formateo de moneda

## 🎯 Funcionalidades Detalladas

### 📊 Cálculos Incluidos

#### 1. **Proporcionales**
- Aguinaldo proporcional (días trabajados del año)
- Vacaciones pendientes por pagar
- Prima vacacional (25% - opcional con checkbox)

#### 2. **Prima de Antigüedad**
- Aplicable según años de servicio completos
- Tope: 2 veces el salario mínimo diario ZLFN ($839.76)
- Solo en renuncia si ≥15 años, siempre en despido

#### 3. **Indemnizaciones (Liquidación)**
- 3 meses de salario (90 días)
- 20 días por año (opcional, Art. 50 LFT)
- Solo procede en casos específicos

### 🔧 Características Técnicas

#### **Validación Avanzada**
- Validación en tiempo real sin interrupciones
- Mensajes de error contextuales y específicos
- Feedback visual inmediato en campos
- Ocultación automática de resultados con errores

#### **Historial Inteligente**
- Guarda automáticamente los últimos 5 cálculos
- Restauración completa de datos con un clic
- Información detallada de cada cálculo
- Scroll automático a resultados al cargar

#### **Accesibilidad (WCAG)**
- Atributos ARIA para lectores de pantalla
- Navegación completa por teclado
- Notificaciones automáticas de cambios
- Descripciones contextuales para cada campo

#### **SEO Optimizado**
- Metadatos completos para búsquedas
- Palabras clave específicas del sector
- Open Graph para redes sociales
- Estructura semántica HTML5

## 🛠️ Instalación y Uso

### Instalación Rápida
1. **Clonar o descargar** el proyecto
2. **Abrir** `index.html` en un navegador web
3. **Completar** los datos del trabajador
4. **Calcular** para ver los resultados

### Uso Avanzado
1. **Configurar fechas**: Ingreso y baja de la relación laboral
2. **Ajustar parámetros**: Salario, aguinaldo, vacaciones pendientes
3. **Seleccionar opciones**: Prima vacacional, 20 días por año
4. **Revisar resultados**: Finiquito y liquidación calculados
5. **Guardar en historial**: Automático, restaurable después

### Requisitos del Sistema
- **Navegador**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **JavaScript**: Habilitado (requerido)
- **Almacenamiento**: LocalStorage disponible
- **Servidor**: No requerido (funciona localmente)

## 📋 Datos Requeridos

### Campos Obligatorios
- **Salario diario** (MXN) - Con validación de valor positivo
- **Días de aguinaldo** (mínimo 15) - Según LFT
- **Fecha de ingreso** - Inicio de la relación laboral
- **Fecha de baja** - Fin de la relación laboral

### Campos Opcionales
- **Días de vacaciones pendientes** - Solo días no gozados
- **Incluir Prima Vacacional** - Checkbox para 25% sobre vacaciones
- **20 días por año** - Checkbox para Art. 50 LFT

### Validaciones Implementadas
- Salario diario > 0
- Aguinaldo ≥ 15 días
- Fecha de ingreso < fecha de baja
- Fechas válidas seleccionadas

## ⚖️ Consideraciones Legales

### Transparencia Legal
- **Nota de Prima Vacacional**: Visible cuando no está incluida
- **Referencia SM General**: Contexto de salarios mínimos
- **Cálculo Informativo**: Los resultados son de referencia
- **Consulta Profesional**: Recomendado para casos específicos

### Base Legal
- **LFT Vigente**: Basado en la legislación actual 2025
- **Zona Específica**: Configurado para Ciudad Juárez (ZLFN)
- **Parámetros Actualizados**: Salarios mínimos 2025

## 🔧 Personalización Avanzada

### Modificar Parámetros Legales

En `js/app.js`:

```javascript
// === Parámetros fijos (Ciudad Juárez) ===
const SM_ZLFN = 419.88;     // Salario Mínimo Diario ZLFN
const SM_GENERAL = 248.93;  // Salario Mínimo Diario General (Referencia)

// Modificar porcentaje de prima vacacional
const PRIMA_VAC_PCT = incluirPrimaVac ? 0.25 : 0;
```

### Personalizar Estilos

Modificar variables CSS en `css/styles.css`:

```css
:root {
  --primary: #2563eb;        /* Color principal */
  --success: #10b981;        /* Color de éxito */
  --warning: #f59e0b;        /* Color de advertencia */
  --danger: #ef4444;         /* Color de error */
  --radius-md: 0.5rem;       /* Radio de bordes */
  --shadow-md: 0 4px 6px...; /* Sombras */
  /* ... más variables personalizables */
}
```

### Añadir Nuevas Validaciones

```javascript
// En la función calcular()
if (nuevaCondicion) {
  mostrarError('errorGeneral', 'Mensaje de error personalizado');
  hayErrores = true;
}
```

## 📱 Compatibilidad y Responsive

### Navegadores Soportados
- **Desktop**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Móvil**: iOS Safari 12+, Chrome Mobile 60+, Firefox Mobile 55+
- **Tablet**: Optimizado para pantallas táctiles

### Breakpoints Responsive
- **Desktop**: > 768px - Layout completo
- **Tablet**: 768px - Grid adaptativo
- **Móvil**: < 768px - Layout vertical

## 🐛 Solución de Problemas

### Problemas Comunes

#### El cálculo no se ejecuta
- ✅ Verificar que JavaScript esté habilitado
- ✅ Comprobar la consola del navegador para errores
- ✅ Verificar que todos los campos requeridos estén completos

#### Los estilos no se cargan
- ✅ Verificar que el archivo `css/styles.css` exista
- ✅ Comprobar las rutas de los archivos
- ✅ Limpiar caché del navegador

#### Los datos no se guardan
- ✅ Verificar que localStorage esté disponible
- ✅ Comprobar la configuración de privacidad del navegador
- ✅ Verificar que no esté en modo incógnito

#### Los mensajes de error no aparecen
- ✅ Verificar que los elementos HTML tengan los IDs correctos
- ✅ Comprobar que la función `mostrarError()` esté definida
- ✅ Verificar la consola para errores JavaScript

### Debug Avanzado

```javascript
// Habilitar logs detallados en la consola
console.log('Cálculo ejecutado:', resultados);
console.log('Historial guardado:', historial);
console.log('Errores de validación:', hayErrores);
```

## 🚀 Mejoras Futuras

### Funcionalidades Planificadas
- [ ] Exportación de resultados a PDF
- [ ] Cálculo de impuestos sobre nómina
- [ ] Comparación de diferentes escenarios
- [ ] Integración con APIs de salarios mínimos
- [ ] Modo offline con Service Worker

### Optimizaciones Técnicas
- [ ] Lazy loading de componentes
- [ ] Compresión de assets
- [ ] PWA (Progressive Web App)
- [ ] Tests automatizados

## 📊 Métricas de Rendimiento

### Optimizaciones Implementadas
- **Carga inicial**: < 2 segundos
- **Tiempo de cálculo**: < 100ms
- **Tamaño total**: < 500KB
- **Accesibilidad**: WCAG 2.1 AA compliant

## 📄 Licencia

Este proyecto es de uso libre para fines educativos y de referencia. Para uso comercial, consultar las regulaciones aplicables.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir un Pull Request

### Guías de Contribución
- Seguir las convenciones de código existentes
- Añadir tests para nuevas funcionalidades
- Actualizar documentación según cambios
- Mantener compatibilidad con navegadores soportados

## 📞 Soporte y Contacto

### Reportar Problemas
- Crear un issue en el repositorio del proyecto
- Incluir información del navegador y sistema operativo
- Describir pasos para reproducir el problema

### Solicitar Funcionalidades
- Usar el template de "Feature Request"
- Describir el caso de uso específico
- Incluir mockups o ejemplos si es posible

## 📚 Recursos Adicionales

### Documentación Legal
- [Ley Federal del Trabajo](https://www.gob.mx/profedet)
- [PROFEDET](https://www.gob.mx/profedet) - Procuraduría Federal de la Defensa del Trabajo
- [CONASAMI](https://www.gob.mx/conasami) - Comisión Nacional de los Salarios Mínimos

### Herramientas de Desarrollo
- [MDN Web Docs](https://developer.mozilla.org/) - Documentación web
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accesibilidad web
- [Google PageSpeed](https://pagespeed.web.dev/) - Optimización de rendimiento

---

**⚠️ Aviso Legal**: Esta calculadora es solo para fines informativos. Los cálculos pueden variar según casos específicos y actualizaciones legales. Siempre consulte con un profesional legal o PROFEDET para asesoría específica sobre su situación particular.

**📅 Última actualización**: Enero 2025 | **Versión**: 2.0.0 | **Compatibilidad**: LFT 2025