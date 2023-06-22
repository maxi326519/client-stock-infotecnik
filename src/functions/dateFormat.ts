export default function dateFormat(fecha: string) {
  const partes = fecha.split("/"); // Dividir la cadena de fecha en partes

  const dia = parseInt(partes[0], 10); // Obtener el día como número entero
  const mes = parseInt(partes[1], 10); // Obtener el mes como número entero
  const año = parseInt(partes[2], 10); // Obtener el año como número entero

  // Array de nombres de meses en formato abreviado
  const mesesAbreviados = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  // Obtener el nombre del mes correspondiente al índice del array de meses abreviados
  const nombreMes = mesesAbreviados[mes - 1];

  // Construir la cadena de fecha en el nuevo formato
  const fechaFormateada = `${dia} ${nombreMes} ${año}`;

  return fechaFormateada;
}
