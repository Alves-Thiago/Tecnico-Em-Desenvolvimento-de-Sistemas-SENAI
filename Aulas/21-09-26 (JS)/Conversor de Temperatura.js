// function converter(celsius) {
//     return (celsius * 9/5) + 32;
// }

// let celsius = 25;
// let fahrenheit = converter(celsius);

// console.log(`${celsius}°C = ${fahrenheit}°F`);

// ------------------------------------------------

// function calcularTempo(distancia, velocidade) {
//     const tempo = distancia / velocidade;
//     return tempo;
// }

// let distancia = 300; // km
// let velocidade = 60; // km/h

// let tempo = calcularTempo(distancia, velocidade);

// console.log("Tempo da viagem: " + tempo + " horas");


function fibbonacciAteN(n){
    let ant = 0
    let atual = 1
    let prox = ant + atual
    let somatorio = ant + atual + prox

    console.log(ant)
    console.log(atual)
    console(prox)

    while(prox < n ){
        ant = atual
        atual = prox
        prox = ant + atual

        if (prox > n){
            break
        }
        console.log(prox)
        somatorio =+ prox
    }
}