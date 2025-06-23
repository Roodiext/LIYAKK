const bgMusic = document.getElementById('bgMusic');

// Auto-play music when page loads with lower volume
window.addEventListener('load', () => {
    bgMusic.volume = 0.3;  // Set volume to 30%
    bgMusic.currentTime = 2;  // Skip langsung ke detik ke-1
    bgMusic.play().catch(console.log);

});

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

    // Ensure button is in document body, not in container
    if (noButton.parentElement !== document.body) {
        document.body.appendChild(noButton);
    }

    // Get container boundaries
    const containerRect = container.getBoundingClientRect();
    const safeDistance = isMobile ? 80 : 120; // Minimum distance from container

    // Get current position or use initial position
    const currentX = parseInt(noButton.style.left) || containerRect.right + safeDistance;
    const currentY = parseInt(noButton.style.top) || containerRect.top;

    // Calculate new position
    let newX, newY;

    // If button is near container, move it far away
    if (isNearContainer(currentX, currentY, containerRect, safeDistance)) {
        const farPosition = getFarPosition(containerRect, windowWidth, windowHeight, buttonWidth, buttonHeight, safeDistance);
        newX = farPosition.x;
        newY = farPosition.y;
    } else {
        // Normal evasion movement
        newX = currentX + (Math.random() - 0.5) * (isMobile ? 150 : 300);
        newY = currentY + (Math.random() - 0.5) * (isMobile ? 150 : 300);
    }

    // Keep in viewport bounds
    const padding = isMobile ? 20 : 40;
    newX = Math.max(padding, Math.min(windowWidth - buttonWidth - padding, newX));
    newY = Math.max(padding, Math.min(windowHeight - buttonHeight - padding, newY));

    // Apply position with smooth animation
    noButton.style.position = 'fixed';
    noButton.style.transition = `all ${isMobile ? '0.8s' : '0.6s'} cubic-bezier(0.34, 1.56, 0.64, 1)`;
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;
    noButton.style.zIndex = '9999';
}

// Add these helper functions
function isNearContainer(x, y, containerRect, safeDistance) {
    return x >= containerRect.left - safeDistance &&
           x <= containerRect.right + safeDistance &&
           y >= containerRect.top - safeDistance &&
           y <= containerRect.bottom + safeDistance;
}

function getFarPosition(containerRect, windowWidth, windowHeight, buttonWidth, buttonHeight, safeDistance) {
    // Choose a random side away from container
    const positions = [
        { // Left side
            x: Math.max(20, containerRect.left - buttonWidth - safeDistance),
            y: Math.random() * (windowHeight - buttonHeight - 40) + 20
        },
        { // Right side
            x: Math.min(windowWidth - buttonWidth - 20, containerRect.right + safeDistance),
            y: Math.random() * (windowHeight - buttonHeight - 40) + 20
        },
        { // Top side
            x: Math.random() * (windowWidth - buttonWidth - 40) + 20,
            y: Math.max(20, containerRect.top - buttonHeight - safeDistance)
        },
        { // Bottom side
            x: Math.random() * (windowWidth - buttonWidth - 40) + 20,
            y: Math.min(windowHeight - buttonHeight - 20, containerRect.bottom + safeDistance)
        }
    ];

    // Return random position from available positions
    return positions[Math.floor(Math.random() * positions.length)];
}

yesBtn.addEventListener('click', () => {
    title.innerHTML = " yaa kan kmuu emng manisss";
    document.querySelector('img').src = "3.png";
    noBtn.style.display = 'none';
    yesBtn.style.display = 'none';
    bgMusic.play();

    // 🌸 BURST: bunga jatuh banyak di awal
    for (let i = 0; i < 30; i++) {
        setTimeout(createFallingLily, i * 200);
    }

    // 🌼 Bunga static muncul acak terus menerus
    for (let i = 0; i < 10; i++) {
        setTimeout(createStaticLilyLoop, i * 300);
    }

    // 🌀 HUJAN ABADI: bunga jatuh pelan-pelan terus
    setInterval(() => {
        createFallingLily();
    }, 500); // setiap 3 detik muncul satu kelopak jatuh
});



noBtn.addEventListener('click', () => {
    if (noCount < 3) {
        noCount++;
        title.innerHTML = messages[noCount - 1].text;
        document.querySelector('img').src = messages[noCount - 1].image;
    } else {
    title.innerHTML = "EITSS TAPI BOONG HEHEHE";
    document.querySelector('img').src = "7.jpeg"; // tambahkan ini
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

// Make button run away on hover/touch
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

function createLilies() {
    const lily = document.createElement('img');
    lily.src = 'lily.png';
    lily.className = 'falling-lily';
    lily.style.position = 'fixed';
    lily.style.width = '30px';
    lily.style.left = Math.random() * 100 + 'vw';
    lily.style.top = '-50px';
    lily.style.opacity = '0.9';
    lily.style.pointerEvents = 'none';
    lily.style.zIndex = '999';
    lily.style.transition = 'transform 6s ease-in, opacity 6s ease-in';

    document.body.appendChild(lily);

    requestAnimationFrame(() => {
        lily.style.transform = `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;
        lily.style.opacity = '0';
    });

    setTimeout(() => {
        lily.remove();
    }, 7000);
}

function createFallingLily() {
    const lily = document.createElement('img');
    lily.src = 'lily2.png'; // Ganti ke file baru
    lily.className = 'falling-lily';
    lily.style.left = Math.random() * 100 + 'vw';
    lily.style.top = '-50px';
    lily.style.width = '30px';
    lily.style.opacity = '0.9';
    lily.style.pointerEvents = 'none';
    lily.style.filter = ' saturate(3.2) contrast(6.2) '; // Tambahkan filter
    lily.style.zIndex = '999';
    lily.style.transition = 'transform 9s ease-in, opacity 9s ease-in'; // was 6s


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
    lily.style.filter = ' saturate(2.2) contrast(3.2) '; 
    // Posisi random
    lily.style.left = Math.random() * 100 + 'vw';
    lily.style.top = Math.random() * 100 + 'vh';
    document.body.appendChild(lily);

    // Muncul
    setTimeout(() => {
        lily.style.opacity = '1';
    }, 50);

    // Hilang pelan-pelan
    setTimeout(() => {
        lily.style.opacity = '0';
    }, 2000);

    // Hapus & buat lagi
    setTimeout(() => {
        lily.remove();
        createStaticLilyLoop(); // panggil lagi untuk loop
    }, 3000);
}


function getRandomPositionOutsideContainer() {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();

    let x, y;

    // Loop sampe dapet posisi yang nggak nabrak container
    do {
        x = Math.random() * window.innerWidth;
        y = Math.random() * window.innerHeight;
    } while (
        x > containerRect.left - 50 && x < containerRect.right + 50 &&
        y > containerRect.top - 50 && y < containerRect.bottom + 50
    );

    return { x, y };
}
