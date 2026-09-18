/**
 *
 * @param {float} altura do cilindro
 * @param {float} raio da base do cilindro
 * @returns {float} volume do cilindro
 */

function calcularVolumeCilindro(altura, raio) {
  return altura * 3.14 * raio ** 2;
}
console.log(calcularVolumeCilindro(35.0, 5.2));
