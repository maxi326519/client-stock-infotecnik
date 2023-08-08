export default function dateFormat(fecha: Date) {

  const year: number = fecha.getFullYear();
  const month: number = fecha.getMonth();
  const day: number = fecha.getDate();

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
  const nombreMes = mesesAbreviados[month];

  // Construir la cadena de fecha en el nuevo formato
  const fechaFormateada = `${day} ${nombreMes} ${year.toString().slice(-2)}`;

  return fechaFormateada;
}
