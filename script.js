const bgMusic = document.getElementById('bgMusic');

// Siapkan musik tapi jangan autoplay
bgMusic.volume = 0.3;
bgMusic.currentTime = 2;

const messages = [
    {
        text: "masa sii,affah iyahh?",
        image: "4.jpeg"
    },
    {
        text: "plsss klik yg kirii donggg",
        image: "1.jpeg"  
    },
    {
        text: "terakhir, kalo \"ga\" ywdh deh",
        image: "2.jpeg"
    }
];

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

setInterval(() => createHeart(), 300);

// Preload gambar
["1.jpeg", "2.jpeg", "3.png", "4.jpeg", "7.jpeg", "lily.png", "lily2.png"].forEach(src => {
    const img = new Image();
    img.src = src;
});

const title = document.querySelector('.title');
const noBtn = document.querySelector('.no-btn');
const yesBtn = document.querySelector('.yes-btn');
let noCount = 0;

function runAway(e) {
    const noButton = e.target;
    const container = document.querySelector('.container');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    const isMobile = window.innerWidth <= 768;

    if (noButton.parentElement !== document.body) {
        document.body.appendChild(noButton);
    }

    const containerRect = container.getBoundingClientRect();
    const safeDistance = isMobile ? 80 : 120;

    const currentX = parseInt(noButton.style.left) || containerRect.right + safeDistance;
    const currentY = parseInt(noButton.style.top) || containerRect.top;

    let newX, newY;

    if (isNearContainer(currentX, currentY, containerRect, safeDistance)) {
        const farPosition = getFarPosition(containerRect, windowWidth, windowHeight, buttonWidth, buttonHeight, safeDistance);
        newX = farPosition.x;
        newY = farPosition.y;
    } else {
        newX = currentX + (Math.random() - 0.5) * (isMobile ? 150 : 300);
        newY = currentY + (Math.random() - 0.5) * (isMobile ? 150 : 300);
    }

    const padding = isMobile ? 20 : 40;
    newX = Math.max(padding, Math.min(windowWidth - buttonWidth - padding, newX));
    newY = Math.max(padding, Math.min(windowHeight - buttonHeight - padding, newY));

    noButton.style.position = 'fixed';
    noButton.style.transition = `all ${isMobile ? '0.8s' : '0.6s'} cubic-bezier(0.34, 1.56, 0.64, 1)`;
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;
    noButton.style.zIndex = '9999';
}

function isNearContainer(x, y, containerRect, safeDistance) {
    return x >= containerRect.left - safeDistance &&
           x <= containerRect.right + safeDistance &&
           y >= containerRect.top - safeDistance &&
           y <= containerRect.bottom + safeDistance;
}

function getFarPosition(containerRect, windowWidth, windowHeight, buttonWidth, buttonHeight, safeDistance) {
    const positions = [
        {
            x: Math.max(20, containerRect.left - buttonWidth - safeDistance),
            y: Math.random() * (windowHeight - buttonHeight - 40) + 20
        },
        {
            x: Math.min(windowWidth - buttonWidth - 20, containerRect.right + safeDistance),
            y: Math.random() * (windowHeight - buttonHeight - 40) + 20
        },
        {
            x: Math.random() * (windowWidth - buttonWidth - 40) + 20,
            y: Math.max(20, containerRect.top - buttonHeight - safeDistance)
        },
        {
            x: Math.random() * (windowWidth - buttonWidth - 40) + 20,
            y: Math.min(windowHeight - buttonHeight - 20, containerRect.bottom + safeDistance)
        }
    ];

    return positions[Math.floor(Math.random() * positions.length)];
}

yesBtn.addEventListener('click', () => {
    title.innerHTML = " yaa kan kmuu emng manisss";
    document.querySelector('img').src = "3.png";
    noBtn.style.display = 'none';
    yesBtn.style.display = 'none';

    // play musik baru di klik ya
    bgMusic.play();

    for (let i = 0; i < 30; i++) {
        setTimeout(createFallingLily, i * 200);
    }

    for (let i = 0; i < 10; i++) {
        setTimeout(createStaticLilyLoop, i * 300);
    }

    setInterval(() => {
        createFallingLily();
    }, 3000);
});

noBtn.addEventListener('click', () => {
    if (noCount < 3) {
        noCount++;
        title.innerHTML = messages[noCount - 1].text;
        document.querySelector('img').src = messages[noCount - 1].image;
    } else {
        title.innerHTML = "EITSS TAPI BOONG HEHEHE";
        document.querySelector('img').src = "7.jpeg";
        if (!noBtn.classList.contains('running')) {
            noBtn.classList.add('running');
        }
        runAway({ 
            target: noBtn, 
            type: 'click',
            clientX: event.clientX || event.touches?.[0]?.clientX,
            clientY: event.clientY || event.touches?.[0]?.clientY
        });
    }
});

const handleButtonDodge = (e) => {
    if (noCount >= 3) {
        e.preventDefault();
        e.stopPropagation();
        runAway(e);
    }
};

noBtn.addEventListener('mouseover', handleButtonDodge);
noBtn.addEventListener('touchstart', handleButtonDodge, { passive: false });
noBtn.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

function createFallingLily() {
    const lily = document.createElement('img');
    lily.src = 'lily2.png';
    lily.className = 'falling-lily';
    lily.style.left = Math.random() * 100 + 'vw';
    lily.style.top = '-50px';
    lily.style.width = '30px';
    lily.style.opacity = '0.9';
    lily.style.pointerEvents = 'none';
    lily.style.filter = 'saturate(3.2) contrast(6.2)';
    lily.style.zIndex = '999';
    lily.style.transition = 'transform 9s ease-in, opacity 9s ease-in';

    document.body.appendChild(lily);

    requestAnimationFrame(() => {
        lily.style.transform = `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;
        lily.style.opacity = '0';
    });

    setTimeout(() => {
        lily.remove();
    }, 10000);
}

function createStaticLilyLoop() {
    const lily = document.createElement('img');
    lily.src = 'lily.png';
    lily.className = 'static-lily';
    lily.style.filter = 'saturate(2.2) contrast(3.2)';
    const pos = getRandomPositionOutsideContainer();
    lily.style.left = `${pos.x}px`;
    lily.style.top = `${pos.y}px`;
    lily.style.position = 'fixed';
    lily.style.width = '30px';
    lily.style.opacity = '0';
    lily.style.pointerEvents = 'none';
    lily.style.zIndex = '999';
    lily.style.transition = 'opacity 1s ease-in-out';

    document.body.appendChild(lily);

    setTimeout(() => {
        lily.style.opacity = '1';
    }, 50);

    setTimeout(() => {
        lily.style.opacity = '0';
    }, 2000);

    setTimeout(() => {
        lily.remove();
        createStaticLilyLoop();
    }, 3000);
}

function getRandomPositionOutsideContainer() {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();

    let x, y;

    do {
        x = Math.random() * window.innerWidth;
        y = Math.random() * window.innerHeight;
    } while (
        x > containerRect.left - 50 && x < containerRect.right + 50 &&
        y > containerRect.top - 50 && y < containerRect.bottom + 50
    );

    return { x, y };
}
