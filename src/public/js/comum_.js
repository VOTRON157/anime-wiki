const before = new Date()
$(document).ready(function () {
    const now = new Date()
    console.log(`A página levou ${(now - before)/1000} segundos para ser carregada (${now - before} millisegundos).`)
})