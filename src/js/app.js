document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
    navegacionFija();
    resaltarEnlaces();
    scrollEnlace();
})

function navegacionFija() {
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.festival');
    document.addEventListener('scroll', function() {
        if(sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    })
}

function crearGaleria() {
    const CANTIDAD_IMAGENES = 16;
    const galeria = document.querySelector('.galeria-imagenes');
    for(let i = 1; i <= CANTIDAD_IMAGENES; i++) {
        const imagen = document.createElement('IMG');
        imagen.src = `src/img/gallery/full/${i}.jpg`;
        imagen.alt = 'Imagen Galeria';
        
        //Event Handler
        imagen.onclick = function() {
            mostrarImagen(i)
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(i) {
    const imagen = document.createElement('IMG');
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = 'Imagen Galeria';

    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = function() {
        cerrarModal(modal);
    }

    const cerrarModalButton = document.createElement('BUTTON');
    cerrarModalButton.textContent = 'X';
    cerrarModalButton.classList.add('btn-cerrar');
    cerrarModalButton.onclick = function() {
        cerrarModal(modal);
    }
     
    modal.appendChild(imagen);
    modal.appendChild(cerrarModalButton);


    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');
    body.appendChild(modal);
}

function cerrarModal(modal) {
    modal.classList.add('fade-out')
    setTimeout(() => {
        modal?.remove()
        const body = document.querySelector('body');    
        body.classList.remove('overflow-hidden');
    }, 500);
}

function resaltarLineUp() {
    const enlace = document.querySelectorAll('.navegacion__enlace')[0];
    const sobreFestival = document.querySelector('.festival');
    const lineUp = document.querySelector('.lineup')
    resaltarEnlace(enlace, sobreFestival, lineUp);
}

function resaltarGaleria() {
    const enlace = document.querySelectorAll('.navegacion__enlace')[1];
    const lineUp = document.querySelector('.lineup');
    const galeria = document.querySelector('.galeria');
    resaltarEnlace(enlace, lineUp, galeria);
}

function resaltarBoletos() {
    const enlace = document.querySelectorAll('.navegacion__enlace')[2];
    const galeria = document.querySelector('.galeria');
    const boletos = document.querySelector('.contenedor-boletos');
    resaltarEnlace(enlace, galeria, boletos);
}


function resaltarEnlace(enlace, elementoSuperior, elementoActual) {
    document.addEventListener('scroll', function() {
        const superior = elementoSuperior.getBoundingClientRect().bottom < 1;
        const inferior = elementoActual.getBoundingClientRect().bottom > 1;
        if (superior && inferior) {
            enlace.classList.add('marked');
        } else {
            enlace.classList.remove('marked');
        }
    })
}

function resaltarEnlaces() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navegacion__enlace');

    document.addEventListener('scroll', function() {
        let actual = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                actual = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('marked');
            if (link.getAttribute('href') === `#${actual}`) {
                link.classList.add('marked');
            }
        });
    });
}

function scrollEnlace() {
    const enlaces = document.querySelectorAll('.navegacion__enlace');

    enlaces.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = e.target.getAttribute('href');
            const section = document.querySelector(sectionId);
            section.scrollIntoView({behavior: 'smooth'});
        })
    });
}