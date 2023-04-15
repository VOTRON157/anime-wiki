const before = new Date()
$(document).ready(function () {
    const frases = ['Alguém lê isso?', 'Não esqueça de criar uma conta.', 'Essa é so uma frase genérica de uma tela de carregamento.', 'Você pode ver todas as frases que podem aparecer aqui, é so ver o código fonte da página']
    $('#text-load').html(frases[Math.floor(Math.random() * frases.length)])
    const now = new Date()
    console.log(`A página levou ${(now - before) / 1000} segundos para ser carregada (${now - before} millisegundos).`)
})

$(window).on("load", function () {
    $('.loader').css('transition', 'all .5s').css('opacity', '0')
    $('#text-load').css('transition', 'all .5s').css('opacity', '0')
    $("#load-aprt1").css('transition', "all .5s").css('width', '0%')
    $("#load-aprt2").css('transition', "all .5s").css('width', '0%')
    $(".load").css('backdrop-filter', 'blur(0px)')
    setTimeout(() => {
        $('.load').remove()
    }, 500)
});