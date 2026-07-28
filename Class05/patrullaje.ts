
// IMPORTACIÓN
import { EventEmitter } from 'events';

interface ReporteVecinal {

  // Lugar donde ocurre el incidente
  ubicacion: string;

  // Categoría del problema.
  // Solo permite uno de estos cuatro valores.
  tipoIncidente: 'Sospechoso' | 'Emergencia' | 'Accidente' | 'Incidencia';

  // Detalles del reporte
  descripcion: string;

  // Nivel de prioridad.
  // Solo permite uno de estos tres valores.
  urgencia: 'Alta' | 'Media' | 'Baja';
}


// CLASE EMISORA
class CentralVecinal extends EventEmitter {

  public reportarIncidente(

    ubicacion: string,
    tipoIncidente: 'Sospechoso' | 'Emergencia' | 'Accidente' | 'Incidencia',
    descripcion: string,
    urgencia: 'Alta' | 'Media' | 'Baja'

  ): void {

    console.log(
      `\n📍 [CENTRAL VECINAL]: ¡ALERTA VECINAL! ${ubicacion} - ${tipoIncidente} - Urgencia: ${urgencia}`
    );

    const detallesReporte: ReporteVecinal = {

      ubicacion,
      tipoIncidente,
      descripcion,
      urgencia

    };

    // EMITIR EL EVENTO
    this.emit("alertaVecinal", detallesReporte);
  }
}


// PATRULLA SPIDER
class PatrullaSpider {

  // Recibe un reporte y responde según la urgencia.
  public movilizarEquipo(reporte: ReporteVecinal): void {

    if (reporte.urgencia === 'Alta') {

      console.log(
        `🕷️ [Patrulla Spider]: Movilizando equipo completo con Spider-Man`
      );

    } else {

      console.log(
        `🕷️ [Patrulla Spider]: Enviando patrulla de reconocimiento`
      );

    }

  }

}

// AMBULANCIA COMUNITARIA
class AmbulanciaComunitaria {

  public enviarEmergencia(reporte: ReporteVecinal): void {

    // Solo responde a Emergencia o Accidente.
    if (reporte.tipoIncidente === 'Emergencia' || reporte.tipoIncidente === 'Accidente') {

      console.log(
        `🚑 [Ambulancia Comunitaria]: Unidad médica en camino a ${reporte.ubicacion}`
      );

    } else {

      console.log(
        `🚑 [Ambulancia Comunitaria]: [No responde - Tipo no coincide]`
      );

    }

  }

}


// VECINOS VIGILANTES
// ==========================================================
class VecinosVigilantes {

  public activarVigilancia(reporte: ReporteVecinal): void {

    console.log(
      `🔦 [Vecinos Vigilantes]: Vecinos alertados en ${reporte.ubicacion} - Mantener vigilancia`
    );

  }

}

// CONSEJO DEL BARRIO
class ConsejoDelBarrio {

  public evaluarIncidente(reporte: ReporteVecinal): void {

    if (reporte.urgencia === 'Alta' || reporte.urgencia === 'Media') {

      console.log(
        `🏢 [Consejo del Barrio]: Convocando reunión de emergencia`
      );

    } else {

      console.log(
        `🏢 [Consejo del Barrio]: Registrando incidente para informe mensual`
      );

    }

  }

}

// CREAR OBJETOS

// Crear la Central Vecinal.
const centralVecinal = new CentralVecinal();

// Crear los cuatro grupos de respuesta.
const patrullaSpider = new PatrullaSpider();
const ambulancia = new AmbulanciaComunitaria();
const vecinosVigilantes = new VecinosVigilantes();
const consejoDelBarrio = new ConsejoDelBarrio();

// SUSCRIPCIÓN AL EVENTO

centralVecinal.on(

  // Nombre del evento que queremos escuchar.
  "alertaVecinal",

  (reporte: ReporteVecinal) => {

    patrullaSpider.movilizarEquipo(reporte);

  }

);

// SEGUNDO ESCUCHADOR
// Ambulancia Comunitaria también escucha el mismo evento.

centralVecinal.on(

  "alertaVecinal",

  (reporte: ReporteVecinal) => {

    ambulancia.enviarEmergencia(reporte);

  }

);

// TERCER ESCUCHADOR
// Vecinos Vigilantes también escucha el mismo evento.

centralVecinal.on(

  "alertaVecinal",

  (reporte: ReporteVecinal) => {

    vecinosVigilantes.activarVigilancia(reporte);

  }

);


// CUARTO ESCUCHADOR
// Consejo del Barrio también escucha el mismo evento.

centralVecinal.on(

  "alertaVecinal",

  (reporte: ReporteVecinal) => {

    consejoDelBarrio.evaluarIncidente(reporte);

  }

);


// PRUEBAS DE INTEGRACIÓN

// Incidente 1: Sospechoso en Calle 23.
centralVecinal.reportarIncidente(

  "Calle 23",
  "Sospechoso",
  "Hombre sospechoso merodeando",
  "Alta"

);

// Incidente 2: Accidente en Avenida 7.
centralVecinal.reportarIncidente(

  "Avenida 7",
  "Accidente",
  "Choque entre dos vehículos",
  "Media"

);

// Incidente 3: Incidencia menor en Parque Central.
centralVecinal.reportarIncidente(

  "Parque Central",
  "Incidencia",
  "Ruido molesto en horario nocturno",
  "Baja"

);