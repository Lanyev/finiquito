/**
 * Calculadora de Finiquito y Liquidación (MX 2025)
 * Aplicación para calcular finiquitos y liquidaciones según la LFT
 * 
 * @author Tu Nombre
 * @version 1.0.0
 * @date 2025
 */

// === Parámetros fijos (Ciudad Juárez) ===
const SM_ZLFN = 419.88; // Salario Mínimo Diario Zona Libre Frontera Norte (editable)
const SM_GENERAL = 248.93; // Salario Mínimo Diario General (referencia)

/**
 * Formatea un número como moneda mexicana
 * @param {number} n - Número a formatear
 * @returns {string} Número formateado como moneda
 */
const fmt = (n) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(n);

/**
 * Calcula los días entre dos fechas
 * @param {Date} a - Fecha inicial
 * @param {Date} b - Fecha final
 * @returns {number} Número de días entre las fechas
 */
const diasEntre = (a, b) =>
  Math.max(0, Math.floor((b - a) / (1000 * 60 * 60 * 24)));

/**
 * Obtiene el inicio del año de una fecha
 * @param {Date} d - Fecha
 * @returns {Date} Primer día del año de la fecha
 */
const inicioDeAnio = (d) => new Date(d.getFullYear(), 0, 1);

/**
 * Función principal de cálculo de finiquito y liquidación
 */
function calcular() {
  // Obtener valores del formulario
  const sd = parseFloat(document.getElementById('salarioDiario').value);
  const diasAguinaldo = parseFloat(
    document.getElementById('diasAguinaldo').value
  );
  const fechaIngreso = new Date(
    document.getElementById('fechaIngreso').value + 'T00:00:00'
  );
  const fechaBaja = new Date(
    document.getElementById('fechaBaja').value + 'T00:00:00'
  );
  const diasVacPend = parseFloat(
    document.getElementById('diasVacPend').value || 0
  );
  const inc20 = document.getElementById('inc20').checked;
  const incluirPrimaVac = document.getElementById('incluirPrimaVac').checked;

  // Validación de datos
  if (!sd || !diasAguinaldo || !(fechaIngreso < fechaBaja)) {
    alert(
      'Verifica salario, aguinaldo (≥15) y que la fecha de ingreso sea anterior a la de baja.'
    );
    return;
  }

  // Antigüedad total y años completos (base 365 días)
  const totalDias = diasEntre(fechaIngreso, fechaBaja);
  const aniosCompletos = Math.floor(totalDias / 365);

  // Días trabajados del año en curso (desde 1 de enero hasta fechaBaja)
  const diasAnio = diasEntre(inicioDeAnio(fechaBaja), fechaBaja);

  // --- Proporcionales ---
  const aguinaldoProp = sd * (diasAguinaldo * (diasAnio / 365));
  const vacMonto = diasVacPend * sd;
  const PRIMA_VAC_PCT = incluirPrimaVac ? 0.25 : 0; // Dinámico según checkbox
  const primaVac = vacMonto * PRIMA_VAC_PCT;

  // --- Prima de antigüedad (art. 162 LFT) ---
  const salarioTope = Math.min(sd, SM_ZLFN * 2);
  const primaAntig = 12 * aniosCompletos * salarioTope;

  // --- FINIQUITO (Renuncia/Mutuo acuerdo) ---
  const paRenuncia = aniosCompletos >= 15 ? primaAntig : 0;
  const subTotalFiniquito =
    aguinaldoProp + vacMonto + primaVac + paRenuncia;
  const finiquitoTotal = subTotalFiniquito;

  // --- LIQUIDACIÓN (Despido injustificado) ---
  const indem3 = 90 * sd;
  const veintePorAnio = inc20 ? 20 * aniosCompletos * sd : 0;
  const liquidaTotal =
    indem3 +
    veintePorAnio +
    primaAntig +
    aguinaldoProp +
    vacMonto +
    primaVac;

  // Actualizar la interfaz de usuario
  actualizarUI({
    aniosCompletos,
    diasAnio,
    salarioTope,
    aguinaldoProp,
    vacMonto,
    primaAntig,
    subTotalFiniquito,
    finiquitoTotal,
    indem3,
    veintePorAnio,
    liquidaTotal,
    inc20
  });

  // Actualizar la leyenda de Prima Vacacional
  actualizarLeyendaPrimaVac(incluirPrimaVac);

  // Guardar datos en localStorage
  guardarCalculo({
    salarioDiario: sd,
    diasAguinaldo: diasAguinaldo,
    fechaIngreso: document.getElementById('fechaIngreso').value,
    fechaBaja: document.getElementById('fechaBaja').value,
    diasVacPend: diasVacPend,
    inc20: inc20,
    incluirPrimaVac: incluirPrimaVac,
  });

  // Guardar en historial
  guardarEnHistorial({
    fechaBaja: document.getElementById('fechaBaja').value,
    finiquitoTotal: finiquitoTotal,
    liquidaTotal: liquidaTotal,
    salarioDiario: sd,
    incluirPrimaVac: incluirPrimaVac,
    timestamp: new Date().toISOString()
  });
}

/**
 * Actualiza la visibilidad de la leyenda de Prima Vacacional
 * @param {boolean} incluirPrimaVac - Si se incluye la prima vacacional
 */
function actualizarLeyendaPrimaVac(incluirPrimaVac) {
  const leyenda = document.getElementById('leyendaPrimaVac');
  if (leyenda) {
    leyenda.style.display = incluirPrimaVac ? 'none' : 'block';
  }
}

/**
 * Actualiza la interfaz de usuario con los resultados del cálculo
 * @param {Object} resultados - Objeto con todos los resultados del cálculo
 */
function actualizarUI(resultados) {
  const {
    aniosCompletos,
    diasAnio,
    salarioTope,
    aguinaldoProp,
    vacMonto,
    primaAntig,
    subTotalFiniquito,
    finiquitoTotal,
    indem3,
    veintePorAnio,
    liquidaTotal,
    inc20
  } = resultados;

  // Datos de servicio
  document.getElementById('aniosCompletos').textContent = aniosCompletos;
  document.getElementById('diasAnio').textContent = diasAnio;
  // PINTAR EL NUEVO SALARIO TOPADO
  document.getElementById('salarioTopado').textContent = fmt(salarioTope);

  // Proporcionales
  document.getElementById('aguinaldo').textContent = fmt(aguinaldoProp);
  document.getElementById('vac').textContent = fmt(vacMonto);
  document.getElementById('primaAntiguedadTotal').textContent = fmt(primaAntig);

  // Finiquito
  document.getElementById('subTotalFiniquito').textContent = fmt(subTotalFiniquito);
  document.getElementById('totFiniquito').textContent = fmt(finiquitoTotal) + ' MXN';

  // Liquidación
  document.getElementById('baseFiniquito').textContent = fmt(finiquitoTotal);
  document.getElementById('indem3').textContent = fmt(indem3);
  document.getElementById('v20').textContent = inc20
    ? fmt(veintePorAnio)
    : '— (opción desactivada)';
  document.getElementById('totLiquida').textContent = fmt(liquidaTotal) + ' MXN';
}

/**
 * Limpia el formulario y los resultados
 */
function limpiar() {
  // Restablecer valores del formulario
  document.getElementById('salarioDiario').value = 500;
  document.getElementById('diasAguinaldo').value = 15;
  document.getElementById('fechaIngreso').value = '2022-01-01';
  document.getElementById('fechaBaja').valueAsDate = new Date();
  document.getElementById('diasVacPend').value = 0;
  document.getElementById('inc20').checked = false;
  document.getElementById('incluirPrimaVac').checked = false;

  // Limpiar resultados
  const elementosResultado = [
    'aniosCompletos',
    'diasAnio',
    'salarioTopado',
    'aguinaldo',
    'vac',
    'primaAntiguedadTotal',
    'subTotalFiniquito',
    'baseFiniquito',
    'indem3',
    'v20',
  ];

  elementosResultado.forEach((id) => {
    const elemento = document.getElementById(id);
    if (id === 'v20') {
      elemento.textContent = '— (opción desactivada)';
    } else if (id === 'aniosCompletos' || id === 'diasAnio') {
      elemento.textContent = '0';
    } else {
      elemento.textContent = '$0.00';
    }
  });

  document.getElementById('totFiniquito').textContent = '$0.00 MXN';
  document.getElementById('totLiquida').textContent = '$0.00 MXN';

  // Limpiar localStorage
  localStorage.removeItem('ultimoCalculoMX');
  localStorage.removeItem('historialCalculos');
  
  // Limpiar historial visual
  renderHistorial();
  
  // Ocultar leyenda de Prima Vacacional
  actualizarLeyendaPrimaVac(false);
}

/**
 * Guarda los datos del cálculo en localStorage
 * @param {Object} datos - Datos a guardar
 */
function guardarCalculo(datos) {
  try {
    localStorage.setItem('ultimoCalculoMX', JSON.stringify(datos));
    console.log('Cálculo guardado en localStorage');
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
  }
}

/**
 * Guarda un cálculo en el historial (máximo 5)
 * @param {Object} calculo - Datos del cálculo a guardar
 */
function guardarEnHistorial(calculo) {
  try {
    let historial = JSON.parse(localStorage.getItem('historialCalculos') || '[]');
    
    // Añadir el nuevo cálculo al inicio
    historial.unshift(calculo);
    
    // Mantener solo los últimos 5 cálculos
    if (historial.length > 5) {
      historial = historial.slice(0, 5);
    }
    
    localStorage.setItem('historialCalculos', JSON.stringify(historial));
    console.log('Cálculo guardado en historial');
    
    // Actualizar la visualización del historial
    renderHistorial();
  } catch (error) {
    console.error('Error al guardar en historial:', error);
  }
}

/**
 * Renderiza el historial de cálculos en la interfaz
 */
function renderHistorial() {
  try {
    const historial = JSON.parse(localStorage.getItem('historialCalculos') || '[]');
    const container = document.getElementById('historialCalculos');
    
    if (historial.length === 0) {
      container.innerHTML = '<p class="historial-vacio">No hay cálculos guardados aún.</p>';
      return;
    }
    
    let html = '<div class="historial-lista">';
    
    historial.forEach((calculo, index) => {
      const fecha = new Date(calculo.fechaBaja).toLocaleDateString('es-MX');
      const hora = new Date(calculo.timestamp).toLocaleTimeString('es-MX', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      html += `
        <div class="historial-item">
          <div class="historial-header">
            <span class="historial-fecha">${fecha}</span>
            <span class="historial-hora">${hora}</span>
            ${calculo.incluirPrimaVac ? '<span class="prima-vac-badge">Con Prima Vac.</span>' : ''}
          </div>
          <div class="historial-resultados">
            <div class="historial-resultado">
              <span>Finiquito:</span>
              <strong>${fmt(calculo.finiquitoTotal)}</strong>
            </div>
            <div class="historial-resultado">
              <span>Liquidación:</span>
              <strong>${fmt(calculo.liquidaTotal)}</strong>
            </div>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    container.innerHTML = html;
    
  } catch (error) {
    console.error('Error al renderizar historial:', error);
    document.getElementById('historialCalculos').innerHTML = 
      '<p class="historial-error">Error al cargar el historial.</p>';
  }
}

/**
 * Carga el último cálculo guardado desde localStorage
 */
function cargarCalculoGuardado() {
  try {
    const ultimoCalculo = localStorage.getItem('ultimoCalculoMX');
    const hoy = new Date();

    if (ultimoCalculo) {
      const data = JSON.parse(ultimoCalculo);

      // Cargar valores al formulario
      document.getElementById('salarioDiario').value = data.salarioDiario;
      document.getElementById('diasAguinaldo').value = data.diasAguinaldo;
      document.getElementById('fechaIngreso').value = data.fechaIngreso;
      document.getElementById('fechaBaja').value = data.fechaBaja;
      document.getElementById('diasVacPend').value = data.diasVacPend;
      document.getElementById('inc20').checked = data.inc20;
      document.getElementById('incluirPrimaVac').checked = data.incluirPrimaVac || false;

      // Ejecutar el cálculo automáticamente para mostrar los resultados
      calcular();
      // Actualizar la leyenda de Prima Vacacional
      actualizarLeyendaPrimaVac(data.incluirPrimaVac || false);
      console.log('Cálculo anterior cargado desde localStorage');
    } else {
      // Si no hay cálculo guardado, solo inicializa la fecha de baja a hoy
      document.getElementById('fechaBaja').valueAsDate = hoy;
      console.log('No hay cálculos anteriores guardados');
    }
    
    // Renderizar el historial
    renderHistorial();
  } catch (error) {
    console.error('Error al cargar desde localStorage:', error);
    // En caso de error, inicializar con valores por defecto
    document.getElementById('fechaBaja').valueAsDate = new Date();
    renderHistorial();
  }
}

// =========================================================
// MÓDULO DE LISTENERS (Vincular eventos)
// =========================================================

// 1. Escuchador del botón principal (click)
document.getElementById('btnCalc').addEventListener('click', calcular);
document.getElementById('btnClear').addEventListener('click', limpiar);

// 2. Escuchadores de REACTIVIDAD (Actualización automática)
// Identificadores de los inputs para cálculo
const inputIds = [
  'salarioDiario',   
  'diasAguinaldo',   
  'fechaIngreso',   
  'fechaBaja',   
  'diasVacPend',   
  'inc20',
  'incluirPrimaVac'
];

inputIds.forEach(id => {
  const inputElement = document.getElementById(id);
  // 'input' para cambios de texto/número
  if (inputElement.type === 'number') {
    inputElement.addEventListener('input', calcular);
  }   
  // 'change' para cambios de fecha o checkbox
  else if (inputElement.type === 'date' || inputElement.type === 'checkbox') {
    inputElement.addEventListener('change', calcular);
  }
});

// Event listener específico para el checkbox de Prima Vacacional (actualización inmediata de leyenda)
document.getElementById('incluirPrimaVac').addEventListener('change', function() {
  actualizarLeyendaPrimaVac(this.checked);
});

// 3. Escuchador de carga de página
window.addEventListener('load', cargarCalculoGuardado);
