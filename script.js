document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('noBtn');
    // We move the wrapper now, not the button itself, for better control
    const noBtnWrapper = document.getElementById('noBtnWrapper'); 
    const yesBtn = document.getElementById('yesBtn');
    const heartContainer = document.getElementById('heartContainer');
    const mainCard = document.getElementById('mainCard');
    const tulipContainer = document.getElementById('tulipContainer');
    
    // --- Merged Elements ---
    const loginScreen = document.getElementById('loginScreen');
    const dateInput = document.getElementById('dateInput');
    const letterScreen = document.getElementById('letterScreen');
    const slideShow = document.getElementById('slideShow');
    
    // --- Configuration ---
    const ANNIVERSARY_DATE = "2022-08-02";
    // UPDATE THIS: Add your actual photo filenames here
    const PHOTOS = [
        "rooi.jpg",      // Your main photo
        "photo2.jpg",    // Change this to your second photo's name
        "photo3.jpg"     // Change this to your third photo's name
    ]; 

    // --- 1. Glowing Falling Hearts ---
    function createHearts() {
        const heart = document.createElement('div');
        heart.classList.add('falling-heart');
        // Use different shades of pink/purple emoji hearts
        const heartTypes = ['💖', '💗', '💓', '💝', '💜'];
        heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        
        heart.style.left = Math.random() * 100 + 'vw';
        
        // Make some hearts really big for the "big hearts" request
        const isBig = Math.random() > 0.8; // 20% chance of big heart
        const size = isBig ? Math.random() * 40 + 30 + 'px' : Math.random() * 20 + 10 + 'px';
        heart.style.fontSize = size;
        
        // Random Opacity for depth
        heart.style.opacity = Math.random() * 0.5 + 0.5;

        heart.style.animationDuration = Math.random() * 4 + 3 + 's';
        
        heartContainer.appendChild(heart);
        
        setTimeout(() => { heart.remove(); }, 7000);
    }

    // Create hearts more frequently
    setInterval(createHearts, 200);

    // --- 1.5 Login & Slideshow Logic ---
    
    // Initialize: Hide main card if login screen exists
    if (loginScreen) {
        mainCard.classList.add('hidden');
        mainCard.style.display = 'none'; // Force hide
        
        // Bind checkDate to the button inside loginScreen
        const unlockBtn = loginScreen.querySelector('button');
        if (unlockBtn) {
            unlockBtn.addEventListener('click', checkDate);
        }
    }

    function checkDate() {
        if (dateInput.value === ANNIVERSARY_DATE) {
            // Unlock success
            loginScreen.classList.add('hidden');
            loginScreen.style.display = 'none';
            
            mainCard.classList.remove('hidden');
            mainCard.style.display = 'block'; // Restore display
            
            // Start Music if available
            const music = document.getElementById("bgMusic");
            if (music) {
                music.volume = 0.5;
                music.play().catch(e => console.log("Audio requires interaction"));
            }

            // Calculate Days
            const start = new Date(ANNIVERSARY_DATE);
            const now = new Date();
            const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
            const daysCounter = document.getElementById("daysCounter");
            if (daysCounter) daysCounter.innerHTML = `We've been together for ${diff} days ✨`;

            startSlideshow();
        } else {
            // Use SweetAlert if available
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Wrong date! Try again my love 😅❤️',
                confirmButtonColor: '#d4145a'
            });
        }
    }

    function startSlideshow() {
        if (!slideShow) return;
        let slideIndex = 0;
        setInterval(() => {
            slideIndex = (slideIndex + 1) % PHOTOS.length;
            slideShow.src = PHOTOS[slideIndex];
        }, 3000);
    }

    // --- 2. Unclickable "No" Button ---
    let isMoved = false;

    function moveNoButton() {
        // Get viewport dimensions
        const maxWidth = window.innerWidth - noBtnWrapper.offsetWidth - 20; // 20px buffer
        const maxHeight = window.innerHeight - noBtnWrapper.offsetHeight - 20;
        
        // Calculate random positions
        const newX = Math.random() * maxWidth;
        const newY = Math.random() * maxHeight;

        // Apply styles to the wrapper to move it around the screen
        noBtnWrapper.style.position = 'fixed';
        noBtnWrapper.style.left = newX + 'px';
        noBtnWrapper.style.top = newY + 'px';
        // Add a little rotation for fun
        noBtnWrapper.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
        isMoved = true;
    }

    noBtn.addEventListener('mouseover', moveNoButton);
    // Handle mobile touch just in case
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent actual click
        moveNoButton();
    });

    // --- 2.5 Kiss Counter Logic ---
    const kissBtn = document.getElementById('kissBtn'); // Ensure button has this ID
    const kissDisplay = document.getElementById("kissCount");
    const secretMessage = document.getElementById("secretMessage");
    
    if (kissBtn && kissDisplay) {
        let kisses = parseInt(localStorage.getItem("kisses") || "0");
        kissDisplay.innerText = kisses;

        kissBtn.addEventListener('click', () => {
            kisses++;
            localStorage.setItem("kisses", kisses);
            kissDisplay.innerText = kisses;
            
            // Floating emoji effect
            const heart = document.createElement("div");
            heart.innerHTML = "💋";
            heart.style.position = "absolute";
            heart.style.left = "50%";
            heart.style.top = "50%";
            heart.style.fontSize = "24px";
            heart.style.pointerEvents = "none";
            heart.style.animation = "floatUp 1s ease-out forwards"; // Ensure keyframe exists or use simple transition
            kissBtn.appendChild(heart); // Append to button or body
            setTimeout(() => heart.remove(), 1000);

            if (kisses >= 10 && secretMessage) {
                secretMessage.classList.remove("hidden");
            }
        });
    }

    // --- 3. "Yes" Button Alert Sequence ---
    // Define common SweetAlert styling for consistency
    const swalStyled = Swal.mixin({
        customClass: {
            confirmButton: 'btn yes-btn swal-confirm-custom'
        },
        buttonsStyling: false, // Turn off default, use our CSS class
        color: '#d4145a',
        background: 'rgba(255, 255, 255, 0.9)',
        backdrop: `rgba(255, 105, 180, 0.4)`
    });

    yesBtn.addEventListener('click', () => {
        // Fire Confetti (from input request)
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff4d6d', '#ffccd5', '#ffffff']
            });
        }

        // Alert 1
        swalStyled.fire({
            title: 'Xikombiso xa kahle swinene!',
            html: '<span style="font-size: 1.2rem; color: #ff69b4;">A ndzi swi tiva leswaku u ta vula \'e-e\'!</span>',
            iconHtml: '<span style="font-size: 4rem; text-shadow: 0 0 15px #ff69b4;">🎉</span>',
            confirmButtonText: 'Next ❤️'
        }).then((result) => {
            if (result.isConfirmed) {
                // Alert 2
                swalStyled.fire({
                    title: 'I Love You So Bad',
                    html: '<span style="font-size: 1.2rem; color: #ff69b4;">More than code, more than coffee. ☕💻</span>',
                    // Using another cute sticker here
                    imageUrl: 'https://media.giphy.com/media/l4pTfx2qLszoacZRS/giphy.gif',
                    imageWidth: 200,
                    imageAlt: 'Love Sticker',
                    confirmButtonText: 'Next 💖'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Alert 3
                        swalStyled.fire({
                            title: 'Big Bang',
                            html: '<span style="font-size: 1.5rem; font-weight:bold; color: #9b59b6;">You are my universe! 🌌</span>',
                            iconHtml: '<span style="font-size: 4rem; text-shadow: 0 0 20px #9b59b6;">💥</span>',
                            confirmButtonText: 'See Surprise 💜'
                        }).then(() => {
                            // Trigger Transition
                            showFlowerSurprise();
                        });
                    }
                });
            }
        });
    });

    function showFlowerSurprise() {
        // Fade out and scale down the main card
        mainCard.style.transform = 'scale(0.8)';
        mainCard.style.opacity = '0';
        
        setTimeout(() => {
            mainCard.style.display = 'none';
            
            // If Letter Screen exists, show it first
            if (letterScreen) {
                letterScreen.classList.remove('hidden');
                letterScreen.style.display = 'flex';
                
                // Bind the button in letter screen to show tulips
                const replayBtn = letterScreen.querySelector('button');
                if (replayBtn) {
                    replayBtn.addEventListener('click', () => {
                        letterScreen.style.display = 'none';
                        tulipContainer.style.display = 'flex';
                    });
                }
            } else {
                // Fallback if no letter screen
                tulipContainer.style.display = 'flex';
            }
        }, 500);
    }
});