
const navLinks = document.querySelectorAll('.nav-link') //junta todos os links da navegação em um array

const sections = document.querySelectorAll('.conteudos') //junta todas as sections de conteudo em um array

const scroolSeta = document.querySelector('.img-seta')

const openMenu = document.querySelector('#open-menu-icon')

const closeMenu = document.querySelector('#close-menu-icon')

const navList = document.querySelector('.nav-list')


// EventListener para mudar o foco conforme seção clicada
navLinks.forEach(link => {

    //percorre o array de links criando um EventListener para cada link
    link.addEventListener('click', () => {

        //remove a classe 'selected' de todos os links 
        navLinks.forEach(link =>  {
            link.classList.remove('selected')
        })

        //adiciona a classe 'selected' para o link atual clicado
        link.classList.add('selected')
    })

})

// EventListener para rolar para a próxima página ao clicar na seta da pagina inicio
scroolSeta.addEventListener('click', () => {

    const alvo = document.querySelector('.sobre')

    alvo.scrollIntoView({behavior: "smooth"})

})

//Eu não sei muito bem como funciona essa ferramenta, mas basicamente ela observa um elemento (no caso estamos usando para obserar as seções), se ele entra no campo de visão ele realiza uma ação
const observador = new IntersectionObserver(function(entries) {

    //O intersectionobserver recebe como parâmetro uma função de callback

    entries.forEach(entry => {
        //a função recebe os dados que serão observados e aqui realizamos as ações

        const targetId = entry.target.id //busca o id (aqui no caso da section)
        const link = document.querySelector(`.nav-link[data-target="${targetId}"]`) //busca o link responsavel por esse id

        if (entry.isIntersecting) { //verifica se essa section está entrando na tela,
            // logo abaixo deixamos um parâmetro para quanto da tela deve estar amostra para realizar a ação

            //remove todos os selecteds por precaução

            link.classList.add('selected')

        } else {

            link.classList.remove('selected')

        }

    })

}, {threshold: 0.4})// esse parâmetro diz que 60% da tela deve estar amostra para que realize a ação

sections.forEach(section => observador.observe(section)) //Aqui chamaos o observador para cada section do array de sections da página, é semelhante a como o EventListener age

//Agora vamos criar os EventListener do menu quando página está na versão mobile


openMenu.addEventListener('click', () => {

    let count = 1.5

    navList.style.animation = 'descerMenu .8s ease forwards'

    navLinks.forEach(link => {

        
        link.style.animation = `links ${count}s ease forwards`

        count += 0.2
    })

    closeMenu.addEventListener('click', () => {

        navLinks.forEach(link => {
            link.style.animation = `none`
        })

        navList.style.animation = 'subirMenu 2s ease forwards'

    })

})
