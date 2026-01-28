// Snake Game JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const finalScoreElement = document.getElementById('finalScore');
    const gameOverScreen = document.getElementById('gameOverScreen');

    const TILE_SIZE = 20;
    const GRID_WIDTH = 25;
    const GRID_HEIGHT = 25;
    const GAME_SPEED = 100;

    let snake = [];
    let food = {};
    let direction = 'RIGHT';
    let nextDirection = 'RIGHT';
    let running = false;
    let gameOver = false;
    let score = 0;
    let gameLoop = null;

    function init() {
        canvas.width = GRID_WIDTH * TILE_SIZE;
        canvas.height = GRID_HEIGHT * TILE_SIZE;
        setupMobileControls();
        startGame();
    }

    function setupMobileControls() {
        const btnUp = document.getElementById('btnUp');
        const btnDown = document.getElementById('btnDown');
        const btnLeft = document.getElementById('btnLeft');
        const btnRight = document.getElementById('btnRight');

        // Prevent default touch behavior
        [btnUp, btnDown, btnLeft, btnRight].forEach(btn => {
            btn.addEventListener('touchstart', (e) => e.preventDefault());
        });

        btnUp.addEventListener('click', () => {
            if (running && direction !== 'DOWN') nextDirection = 'UP';
        });

        btnDown.addEventListener('click', () => {
            if (running && direction !== 'UP') nextDirection = 'DOWN';
        });

        btnLeft.addEventListener('click', () => {
            if (running && direction !== 'RIGHT') nextDirection = 'LEFT';
        });

        btnRight.addEventListener('click', () => {
            if (running && direction !== 'LEFT') nextDirection = 'RIGHT';
        });

        // Touch support for better mobile experience
        btnUp.addEventListener('touchstart', (e) => {
            if (running && direction !== 'DOWN') nextDirection = 'UP';
        });

        btnDown.addEventListener('touchstart', (e) => {
            if (running && direction !== 'UP') nextDirection = 'DOWN';
        });

        btnLeft.addEventListener('touchstart', (e) => {
            if (running && direction !== 'RIGHT') nextDirection = 'LEFT';
        });

        btnRight.addEventListener('touchstart', (e) => {
            if (running && direction !== 'LEFT') nextDirection = 'RIGHT';
        });
    }

    function startGame() {
        snake = [
            { x: 5, y: 5 },
            { x: 4, y: 5 },
            { x: 3, y: 5 }
        ];
        
        direction = 'RIGHT';
        nextDirection = 'RIGHT';
        score = 0;
        gameOver = false;
        running = true;
        
        updateScore();
        gameOverScreen.classList.remove('show');
        spawnFood();
        
        if (gameLoop) clearInterval(gameLoop);
        gameLoop = setInterval(update, GAME_SPEED);
    }

    function spawnFood() {
        let validPosition = false;
        while (!validPosition) {
            food = {
                x: Math.floor(Math.random() * GRID_WIDTH),
                y: Math.floor(Math.random() * GRID_HEIGHT)
            };
            validPosition = !snake.some(segment => 
                segment.x === food.x && segment.y === food.y
            );
        }
    }

    function update() {
        if (!running) return;

        direction = nextDirection;
        const head = { ...snake[0] };

        switch (direction) {
            case 'UP': head.y--; break;
            case 'DOWN': head.y++; break;
            case 'LEFT': head.x--; break;
            case 'RIGHT': head.x++; break;
        }

        // Check wall collision
        if (head.x < 0 || head.x >= GRID_WIDTH || 
            head.y < 0 || head.y >= GRID_HEIGHT) {
            endGame();
            return;
        }

        // Check self collision
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            endGame();
            return;
        }

        snake.unshift(head);

        // Check if food is eaten
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            updateScore();
            spawnFood();
        } else {
            snake.pop();
        }

        draw();
    }

    function draw() {
        // Clear canvas
        ctx.fillStyle = '#9bbc0f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw food
        ctx.fillStyle = '#306230';
        ctx.fillRect(
            food.x * TILE_SIZE,
            food.y * TILE_SIZE,
            TILE_SIZE,
            TILE_SIZE
        );

        // Draw snake
        snake.forEach((segment, index) => {
            ctx.fillStyle = index === 0 ? '#0f380f' : '#306230';
            ctx.fillRect(
                segment.x * TILE_SIZE,
                segment.y * TILE_SIZE,
                TILE_SIZE,
                TILE_SIZE
            );
        });
    }

    function endGame() {
        running = false;
        gameOver = true;
        clearInterval(gameLoop);
        finalScoreElement.textContent = score;
        gameOverScreen.classList.add('show');
    }

    function updateScore() {
        scoreElement.textContent = score;
    }

    window.restartGame = function() {
        startGame();
    }

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (gameOver && e.code === 'Space') {
            restartGame();
            return;
        }

        if (!running) return;

        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                if (direction !== 'DOWN') nextDirection = 'UP';
                e.preventDefault();
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                if (direction !== 'UP') nextDirection = 'DOWN';
                e.preventDefault();
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (direction !== 'RIGHT') nextDirection = 'LEFT';
                e.preventDefault();
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (direction !== 'LEFT') nextDirection = 'RIGHT';
                e.preventDefault();
                break;
        }
    });

    // Start the game when page loads
    init();
});

// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Certificate data - updated paths for Assets/Images/
    const certificatesData = {
        1: {
            title: "Networking Certificate",
            description: "Certificate for Completing Basic Networking Course, Earner Has Knowledge towards managing and Modifying Networks",
            image: "Assets/Images/Networking-Certificate.png",
            issuedBy: "Netacad, Credly",
            date: "October 10, 2025",
            credentialId: "NC-2025-001",
            skills: "Basic Maintenance and Management of Networks and Servers",
            externalLink: "https://www.credly.com/badges/5ffaf686-81da-4287-a126-f2b3c8169215"
        },
        2: {
            title: "Intro to CSS",
            description: "Certificate for completing Intro to CSS Course On Tesda",
            image: "Assets/Images/Intro to CSS.png",
            issuedBy: "TESDA",
            date: "March 6, 2024",
            credentialId: "CSS-2024-001",
            skills: "Basic CSS Elements",
            externalLink: ""
        },
        3: {
            title: "Setting Up Computer Servers",
            description: "Completed by: Setting up computer server certificates to ensure secure and trusted communication.",
            image: "Assets/Images/Setting up Computer Servers.png",
            issuedBy: "TESDA",
            date: "March 11, 2024",
            credentialId: "SCS-2024-001",
            skills: "Completed by: Installing and setting up computer servers",
            externalLink: ""
        },
        4: {
            title: "Maintaining Computer Systems and Networks",
            description: "Completed by: Maintaining computer systems and networks",
            image: "Assets/Images/Maintaining Computer Systems.png",
            issuedBy: "TESDA",
            date: " March 11, 2024",
            credentialId: "MCS-2024-001",
            skills: "Ability to maintain computer systems and networks, perform basic troubleshooting, and assist in server setup and configuration.",
            externalLink: ""
        },
        5: {
            title: "Installing and Configuring Computer Systems",
            description: "Installing and configuring computer systems to ensure proper operation and performance.",
            image: "Assets/Images/Installing and Config.png",
            issuedBy: "TESDA",
            date: "March 6, 2024",
            credentialId: "ICS-2024-001",
            skills: "Computer system installation, basic configuration, troubleshooting, and hardware/software setup.",
            externalLink: ""
        },
        6: {
            title: "Developing Designs for User Interface",
            description: "Developing designs for user interfaces that are simple, user-friendly, and visually clear.",
            image: "Assets/Images/Developing DesignUI.png",
            issuedBy: "TESDA",
            date: "April 14, 2024",
            credentialId: "UI-2024-001",
            skills: "UI design basics, layout planning, usability principles, and basic design tools.",
            externalLink: ""
        }
    };

    // Modal elements
    const modal = document.getElementById('certificateModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalCertificateImage = document.getElementById('modalCertificateImage');
    const modalCertificateName = document.getElementById('modalCertificateName');
    const modalCertificateDescription = document.getElementById('modalCertificateDescription');
    const modalIssuedBy = document.getElementById('modalIssuedBy');
    const modalDateIssued = document.getElementById('modalDateIssued');
    const modalCredentialId = document.getElementById('modalCredentialId');
    const modalSkills = document.getElementById('modalSkills');
    const externalLinkBtn = document.getElementById('externalLinkBtn');

    // Open modal function
    function openCertificateModal(certificateId) {
        const certData = certificatesData[certificateId];
        
        if (!certData) {
            console.error('Certificate data not found for ID:', certificateId);
            return;
        }
        
        // Update modal content
        modalTitle.textContent = certData.title;
        modalCertificateImage.src = certData.image;
        modalCertificateImage.alt = certData.title;
        modalCertificateName.textContent = certData.title;
        modalCertificateDescription.textContent = certData.description;
        modalIssuedBy.textContent = certData.issuedBy;
        modalDateIssued.textContent = certData.date;
        modalCredentialId.textContent = certData.credentialId;
        modalSkills.textContent = certData.skills;
        
        // Update external link button
        if (certData.externalLink && certData.externalLink.trim() !== '') {
            externalLinkBtn.href = certData.externalLink;
            externalLinkBtn.style.display = 'inline-block';
        } else {
            externalLinkBtn.style.display = 'none';
        }
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeCertificateModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Event listeners for certificate cards
    document.querySelectorAll('.certificate-card, .view-certificate-btn').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const certificateId = this.getAttribute('data-certificate');
            openCertificateModal(certificateId);
        });
    });

    // Close modal when clicking close button
    closeModalBtn.addEventListener('click', closeCertificateModal);

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCertificateModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeCertificateModal();
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.padding = '1.5rem 0';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        }
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // In a real implementation, you would send this data to a server
        // For this demo, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you at ${email} as soon as possible.`);
        
        // Reset form
        contactForm.reset();
    });
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add subtle animation to elements on scroll
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
    
    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Observe certificate cards
    document.querySelectorAll('.certificate-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});