let placedIcons = {
    layer1: [],
    layer2: [],
    layer3: []
};


function toggleBurgerMenu() {
    let menuElem = document.getElementById('header-menu');
    if(menuElem.classList.contains('active')) {
        menuElem.classList.remove('active');
    } else {
        menuElem.classList.add('active');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.set(".cursor-glow", { xPercent: -50, yPercent: -50 });


    const menu = document.getElementById('header-menu');
    const menuLinks = menu.querySelectorAll('a[href^="#"]');

    function closeMenu() {
        menu.classList.remove('active');
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (this.getAttribute('href').startsWith('#')) {
                closeMenu();
            }
        });
    });

    $('.carousel-container').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: `<img class="slider-button back" src="assets/arrow-right.svg"/>`,
        nextArrow: `<img class="slider-button next" src="assets/arrow-right.svg"/>`,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
        ]
    });

    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('.accordion-icon');

            const isOpen = content.style.maxHeight;

            if (isOpen) {
                content.style.maxHeight = null;
                icon.classList.remove('rotate-180');
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.classList.add('rotate-180');
            }
        });
    });

    init();

});


document.addEventListener('mousemove', (e) => {
    gsap.to(".cursor-glow", {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power4.out"
    });
});

function init() {
    const iconCounts = {
        layer1: 25,
        layer2: 50,
        layer3: 100
    };

    const minDistances = {
        layer1: 100,
        layer2: 40,
        layer3: 20
    };

    const fileNames = [
        "bell.svg", "checkbox.svg", "brain.svg", "clip.svg", "cloud.svg",
        "cloud-saved.svg", "dollar-in-circle.svg", "gear.svg", "layers.svg",
        "lock.svg", "map-pin.svg", "photo-ok.svg", "settings.svg", "social.svg",
        "star.svg", "wireless.svg", "lamp.svg", "list.svg", "mail.svg",
        "picture.svg", "settings2.svg", "speakbobble.svg", "tools.svg",
        "wrench.svg", "history.svg", "like.svg", "mac.svg", "message.svg",
        "pie_chart.svg", "share.svg", "speakbobble2.svg", "user.svg",
        "disc.svg", "image.svg", "link.svg", "magnifier.svg", "nocloid.svg",
        "profile.svg", "share2.svg", "square.svg", "wallet.svg"
    ];

    const pageWidth = document.documentElement.scrollWidth;
    const container = document.querySelector('.bg-parallax-container');
    const containerHeight = container.offsetHeight;
    const pageHeight = containerHeight - 200;

    function createIcons(layerClass, count) {
        const layerKey = layerClass.replace('-', '');
        const minDistance = minDistances[layerKey];

        for (let i = 0; i < count; i++) {
            let img;
            let left, top;

            do {
                left = Math.random() * (pageWidth - 100);
                top = Math.random() * (pageHeight - 100);
            } while (!isPositionValid(left, top, layerKey, minDistance));

            img = document.createElement('img');
            img.classList.add('bg-icon', layerClass);

            if (layerClass === 'layer-1') {
                img.src = `/assets/bg-icons/config${getRandomInt(1, 9)}.svg`;
            } else {
                const randomIndex = getRandomInt(0, fileNames.length - 1);
                img.src = `/assets/bg-icons/${fileNames[randomIndex]}`;
            }

            img.style.position = 'absolute';
            img.style.left = left + 'px';
            img.style.top = top + 'px';
            document.body.appendChild(img);

            placedIcons[layerKey].push({ left: left, top: top, width: 100, height: 100 });
        }
    }

    createIcons('layer-1', iconCounts.layer1);
    createIcons('layer-2', iconCounts.layer2);
    createIcons('layer-3', iconCounts.layer3);

    const layers = [
        { className: 'layer-1', offset: 220 },
        { className: 'layer-2', offset: 440 },
        { className: 'layer-3', offset: 660 }
    ];

    layers.forEach(layer => {
        gsap.fromTo(`.${layer.className}`,
            { translateY: 0 },
            {
                translateY: layer.offset,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.bg-parallax-container',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            }
        );
    });
}

function isPositionValid(left, top, layerKey, minDistance) {
    for (const icon of placedIcons[layerKey]) {
        const distanceX = Math.abs(left - icon.left);
        const distanceY = Math.abs(top - icon.top);
        if (distanceX < minDistance && distanceY < minDistance) {
            return false;
        }
    }
    return true;
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function removeBgIcons() {
    const elements = document.querySelectorAll('.bg-icon');
    elements.forEach(element => {
        element.remove();
    });
}

window.addEventListener('resize', () => {
    placedIcons = {
        layer1: [],
        layer2: [],
        layer3: []
    };
    removeBgIcons();
    init();
});
