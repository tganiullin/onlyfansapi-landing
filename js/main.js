gsap.registerPlugin(ScrollTrigger);
gsap.set(".cursor-glow", { xPercent: -50, yPercent: -50 });

document.addEventListener('mousemove', (e) => {
    gsap.to(".cursor-glow", {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power4.out"
    });
});



document.addEventListener("DOMContentLoaded", function () {

    const iconCounts = {
        layer1: 20,
        layer2: 40,
        layer3: 80
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
    const screenHeight = window.innerHeight;
    const pageHeight = screenHeight * 2;
    const placedIcons = {
        layer1: [],
        layer2: [],
        layer3: []
    };

    function createIcons(layerClass, count) {
        const layerKey = layerClass.replace('-', ''); // Получаем ключ для placedIcons и minDistances
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

    function getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
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

    createIcons('layer-1', iconCounts.layer1);
    createIcons('layer-2', iconCounts.layer2);
    createIcons('layer-3', iconCounts.layer3);

    const layers = [
        { className: 'layer-1', offset: 200 },
        { className: 'layer-2', offset: 400 },
        { className: 'layer-3', offset: 600 }
    ];

    layers.forEach(layer => {
        gsap.fromTo(`.${layer.className}`,
            { translateY: 0 },
            {
                translateY: layer.offset,
                ease: 'none',
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            }
        );
    });
});



