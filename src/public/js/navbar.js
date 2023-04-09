$(document).ready(function () {
    $('.menu').click(function (e) {
        const dropdown = $('.dropdown')
        if (dropdown.css('display') == 'none') {
            dropdown.css('animation', 'dr_entrando 2s')
            dropdown.css('display', 'flex')
        } else {
            setTimeout(() => dropdown.css('display', 'none'), 2 * 1000)
            dropdown.css('animation', 'dr_saindo 2s')
        }
        e.preventDefault()
    })
})