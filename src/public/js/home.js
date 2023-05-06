$(document).ready(function () {
    $('html, body').animate({ scrollTop:  70 }, 1000)
    $('#scroll').click(function (e) { 
        e.preventDefault();
        $('html, body').animate({ scrollTop:  1050 }, 1000)
    });
    const banners = ['images/personagens/anime1.png', 'images/personagens/anime2.png', 'images/personagens/anime3.png', 'images/personagens/anime4.png', 'images/personagens/anime5.png', 'images/personagens/anime6.png']
    $("#personagem").attr("src", banners[Math.floor(Math.random() * banners.length)])
    for(i of $(".barras")){
        i.style.animationDuration = `${Math.floor(Math.random() * 12) + 3}s`
    }
})