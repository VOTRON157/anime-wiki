$(document).ready(function () {
    $('html, body').animate({ scrollTop:  70 }, 1000)
    $('#scroll').click(function (e) { 
        e.preventDefault();
        $('html, body').animate({ scrollTop:  1050 }, 1000)
    });
    const banners = ['images/banners/banner01.gif', 'images/banners/banner02.gif', 'images/banners/banner03.gif', 'images/banners/banner04.gif', 'images/banners/banner05.gif', 'images/banners/banner06.gif', 'images/banners/banner07.gif']
    let i = 0
    setInterval(() => {
        $('.welcome').css('background-image', `url(${banners[i]})`)
        i++
        if (i == banners.length - 1) i = 0
    }, 3000)
    var j = 0;
    var txt = 'Bem vindo(a) ao Minha Lista de Anime! 💚';
    var speed = 100;

    function typeWriter() {
        if (j < txt.length) {
            document.getElementById("welcome-text").innerHTML += txt.charAt(j);
            j++;
            setTimeout(typeWriter, speed);
        }
        twemoji.parse(document.body)
    }
    typeWriter()
})