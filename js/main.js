// Main JavaScript for Brawl Stars Gems Generator

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true,
        offset: 50
    });
    
    // Initialize language selector
    initLanguageSelector();
    
    // Initialize platform status updates
    initPlatformStatus();
    
    // Initialize counters
    initCounters();
    
    // Initialize activity feed
    initActivityFeed();
    
    // Initialize gem pack selection
    initGemPackSelection();
    
    // Initialize modals
    initModals();
    
    // Initialize testimonials carousel
    initTestimonials();
});

// Language Selector
function initLanguageSelector() {
    const languageSelector = document.querySelector('.language-selector');
    const currentLanguage = document.querySelector('.current-language');
    const languageOptions = document.querySelectorAll('.language-option');
    
    // Toggle language dropdown
    currentLanguage.addEventListener('click', function() {
        languageSelector.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!languageSelector.contains(e.target)) {
            languageSelector.classList.remove('active');
        }
    });
    
    // Language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            const langText = this.textContent;
            
            // Update current language display
            currentLanguage.querySelector('span').textContent = langText;
            
            // Close dropdown
            languageSelector.classList.remove('active');
            
            // Apply translations (implemented in enhanced.js)
            if (typeof applyTranslations === 'function') {
                applyTranslations(lang);
            }
        });
    });
    
    // Auto-detect browser language
    function detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const shortLang = browserLang.split('-')[0];
        
        // Find matching language option
        const matchingOption = document.querySelector(`.language-option[data-lang="${shortLang}"]`);
        
        if (matchingOption) {
            currentLanguage.querySelector('span').textContent = matchingOption.textContent;
            
            // Apply translations if function exists
            if (typeof applyTranslations === 'function') {
                applyTranslations(shortLang);
            }
        }
    }
    
    // Run language detection
    detectBrowserLanguage();
}

// Platform Status Updates
function initPlatformStatus() {
    const androidStatus = document.querySelector('.status-item:nth-child(1) .status-indicator');
    const iosStatus = document.querySelector('.status-item:nth-child(2) .status-indicator');
    
    // Simulate occasional status changes
    function updatePlatformStatus() {
        // Random status updates (mostly online)
        const androidOnline = Math.random() > 0.05; // 95% chance of being online
        const iosOnline = Math.random() > 0.05; // 95% chance of being online
        
        updateStatusIndicator(androidStatus, androidOnline);
        updateStatusIndicator(iosStatus, iosOnline);
        
        // Schedule next update
        setTimeout(updatePlatformStatus, 5000 + Math.random() * 10000); // 5-15 seconds
    }
    
    function updateStatusIndicator(indicator, isOnline) {
        if (isOnline) {
            indicator.className = 'status-indicator online';
            indicator.innerHTML = '<i class="fas fa-circle"></i> <span>Online</span>';
        } else {
            indicator.className = 'status-indicator offline';
            indicator.innerHTML = '<i class="fas fa-circle"></i> <span>Maintenance</span>';
            
            // Auto-recover after a short period
            setTimeout(() => {
                indicator.className = 'status-indicator online';
                indicator.innerHTML = '<i class="fas fa-circle"></i> <span>Online</span>';
            }, 10000); // 10 seconds of maintenance
        }
    }
    
    // Start status updates
    updatePlatformStatus();
}

// Counter Animations
function initCounters() {
    const visitorsCounter = document.getElementById('visitors-counter');
    const gemsCounter = document.getElementById('gems-counter');
    const tasksCounter = document.getElementById('tasks-counter');
    
    // Initial values
    let visitors = parseInt(visitorsCounter.textContent.replace(/,/g, ''));
    let gems = parseInt(gemsCounter.textContent.replace(/,/g, ''));
    let tasks = parseInt(tasksCounter.textContent.replace(/,/g, ''));
    
    // Update counters with animation
    function updateCounterWithAnimation(element, oldValue, newValue) {
        // Add updating class for animation
        element.classList.add('updating');
        
        // Animate count up
        const duration = 1500; // 1.5 seconds
        const steps = 20;
        const stepDuration = duration / steps;
        const increment = (newValue - oldValue) / steps;
        
        let currentStep = 0;
        const interval = setInterval(() => {
            currentStep++;
            const currentValue = Math.floor(oldValue + (increment * currentStep));
            element.textContent = currentValue.toLocaleString();
            
            if (currentStep >= steps) {
                clearInterval(interval);
                element.textContent = newValue.toLocaleString();
                
                // Remove updating class after animation
                setTimeout(() => {
                    element.classList.remove('updating');
                }, 300);
            }
        }, stepDuration);
    }
    
    // Update counters periodically with more realistic patterns
    function updateCounters() {
        // Visitors: Add 1-3 randomly with occasional jumps
        const visitorIncrement = Math.random() < 0.9 ? 
            Math.floor(Math.random() * 3) + 1 : // Normal increase (90% chance)
            Math.floor(Math.random() * 10) + 5; // Occasional jump (10% chance)
        
        const newVisitors = visitors + visitorIncrement;
        updateCounterWithAnimation(visitorsCounter, visitors, newVisitors);
        visitors = newVisitors;
        
        // Gems: Add 500-2000 randomly with occasional larger jumps
        const gemIncrement = Math.random() < 0.8 ? 
            Math.floor(Math.random() * 1500) + 500 : // Normal increase (80% chance)
            Math.floor(Math.random() * 5000) + 2000; // Occasional jump (20% chance)
        
        const newGems = gems + gemIncrement;
        updateCounterWithAnimation(gemsCounter, gems, newGems);
        gems = newGems;
        
        // Tasks: Add 1-5 randomly with occasional jumps
        const taskIncrement = Math.random() < 0.9 ? 
            Math.floor(Math.random() * 5) + 1 : // Normal increase (90% chance)
            Math.floor(Math.random() * 15) + 5; // Occasional jump (10% chance)
        
        const newTasks = tasks + taskIncrement;
        updateCounterWithAnimation(tasksCounter, tasks, newTasks);
        tasks = newTasks;
        
        // Schedule next update with variable timing
        const nextUpdateTime = 3000 + Math.random() * 4000; // 3-7 seconds
        setTimeout(updateCounters, nextUpdateTime);
    }
    
    // Start counter updates
    updateCounters();
}

// Activity Feed
function initActivityFeed() {
    const activityList = document.querySelector('.activity-list');
    const usernames = [
        'BrawlMaster', 'StarPlayer', 'GemHunter', 'ProGamer', 'BrawlKing', 
        'LegendaryBrawler', 'StarQueen', 'GemCollector', 'BrawlChamp', 'ElPrimo',
        'Luna', 'Leo', 'Spike', 'Shelly', 'Colt', 'Brock', 'Jessie', 'Nita', 
        'Dynamike', 'Bo', 'Tick', 'Emz', 'Rosa', 'Rico', 'Barley', 'Poco'
    ];
    
    const gemAmounts = [30, 80, 170, 360, 950, 2000];
    const platforms = ['Android', 'iOS'];
    
    // Generate random activity
    function generateActivity() {
        const username = usernames[Math.floor(Math.random() * usernames.length)];
        const randomNum = Math.floor(Math.random() * 100);
        const platform = platforms[Math.floor(Math.random() * platforms.length)];
        
        let activity;
        
        // Different types of activities
        if (randomNum < 60) {
            // Gem claim (60% chance)
            const gems = gemAmounts[Math.floor(Math.random() * gemAmounts.length)];
            activity = `
                <div class="activity-item new">
                    <div class="activity-icon"><i class="fas fa-check-circle"></i></div>
                    <div class="activity-text">
                        <span class="activity-username">@${username}</span>
                        <span class="activity-action">just claimed</span>
                        <span class="activity-amount">${gems} gems</span>
                    </div>
                    <div class="activity-platform">${platform}</div>
                </div>
            `;
        } else if (randomNum < 80) {
            // Verification (20% chance)
            activity = `
                <div class="activity-item new">
                    <div class="activity-icon"><i class="fas fa-shield-alt"></i></div>
                    <div class="activity-text">
                        <span class="activity-username">@${username}</span>
                        <span class="activity-action">verified</span>
                    </div>
                    <div class="activity-platform">${platform}</div>
                </div>
            `;
        } else {
            // Generation in progress (20% chance)
            const gems = gemAmounts[Math.floor(Math.random() * gemAmounts.length)];
            activity = `
                <div class="activity-item new">
                    <div class="activity-icon"><i class="fas fa-sync fa-spin"></i></div>
                    <div class="activity-text">
                        <span class="activity-username">@${username}</span>
                        <span class="activity-action">generating</span>
                        <span class="activity-amount">${gems} gems</span>
                    </div>
                    <div class="activity-platform">${platform}</div>
                </div>
            `;
        }
        
        // Add to activity list
        activityList.insertAdjacentHTML('afterbegin', activity);
        
        // Remove new class after animation
        setTimeout(() => {
            const newItem = activityList.querySelector('.activity-item.new');
            if (newItem) {
                newItem.classList.remove('new');
            }
        }, 1000);
        
        // Remove oldest activity if more than 5
        if (activityList.children.length > 5) {
            activityList.removeChild(activityList.lastChild);
        }
        
        // Schedule next activity
        setTimeout(generateActivity, 2000 + Math.random() * 3000); // 2-5 seconds
    }
    
    // Start activity feed
    generateActivity();
    
    // Show activity feed on desktop only
    function toggleActivityFeed() {
        const activityFeed = document.querySelector('.activity-feed');
        if (window.innerWidth >= 768) {
            activityFeed.style.display = 'block';
        } else {
            activityFeed.style.display = 'none';
        }
    }
    
    // Initial check
    toggleActivityFeed();
    
    // Check on resize
    window.addEventListener('resize', toggleActivityFeed);
}

// Scroll to Packs
function scrollToPacks() {
    const packsSection = document.getElementById('packs');
    packsSection.scrollIntoView({ behavior: 'smooth' });
}

// Testimonials Carousel
function initTestimonials() {
    const track = document.querySelector('.testimonials-track');
    
    // Add touch scrolling for mobile
    let isDown = false;
    let startX;
    let scrollLeft;
    
    track.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    });
    
    track.addEventListener('mouseleave', () => {
        isDown = false;
    });
    
    track.addEventListener('mouseup', () => {
        isDown = false;
    });
    
    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        track.scrollLeft = scrollLeft - walk;
    });
}

// Gem Pack Selection
function initGemPackSelection() {
    const gemCards = document.querySelectorAll('.gem-card');
    
    gemCards.forEach(card => {
        card.addEventListener('click', function() {
            // Get gem amount and value
            const selectedGemAmount = this.getAttribute('data-amount');
            const selectedGemValue = this.getAttribute('data-value');
            
            // Update verification modal with gem amount
            document.getElementById('verification-gems').textContent = selectedGemAmount;
            
            // Open platform selection modal
            openModal('platform-modal');
        });
    });
}

// Modal Handling
function initModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const platformOptions = document.querySelectorAll('.platform-option');
    const continueButton = document.querySelector('.continue-button');
    
    // Selected values
    let selectedPlatform = '';
    let playerId = '';
    
    // Close modal when clicking close button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });
    
    // Close modal when clicking outside content
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
    
    // Platform selection
    platformOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            platformOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Store selected platform
            selectedPlatform = this.getAttribute('data-platform');
            
            // After a short delay, proceed to player ID modal
            setTimeout(() => {
                closeModal('platform-modal');
                openModal('playerid-modal');
            }, 500);
        });
    });
    
    // Player ID form submission
    if (continueButton) {
        continueButton.addEventListener('click', function() {
            const playerIdInput = document.getElementById('player-id');
            playerId = playerIdInput.value.trim();
            
            if (playerId === '') {
                // Show error
                playerIdInput.style.borderColor = 'var(--red)';
                return;
            }
            
            // Update generator modal with selected values
            document.getElementById('display-playerid').textContent = playerId;
            document.getElementById('display-platform').textContent = selectedPlatform === 'android' ? 'Android' : 'iOS';
            
            // Get selected gem amount from the clicked gem card
            const gemAmount = document.getElementById('verification-gems').textContent;
            document.getElementById('display-gems').textContent = gemAmount;
            
            // Close player ID modal and open generator modal
            closeModal('playerid-modal');
            openModal('generator-modal');
            
            // Start generator animation
            startGenerator(gemAmount, playerId, selectedPlatform);
        });
    }
}

// Open Modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

// Close Modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Generator Animation
function startGenerator(gemAmount, playerId, platform) {
    const consoleOutput = document.getElementById('console-output');
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    
    // Clear previous console output
    consoleOutput.innerHTML = '';
    
    // Reset progress
    progressFill.style.width = '0%';
    progressPercentage.textContent = '0%';
    
    // Console messages - simplified for faster experience
    const consoleMessages = [
        { text: 'Connecting to server...', type: 'normal', delay: 500 },
        { text: 'Connection established', type: 'success', delay: 800 },
        { text: `Searching for player: ${playerId}...`, type: 'normal', delay: 1000 },
        { text: 'Player found!', type: 'success', delay: 1200 },
        { text: `Platform detected: ${platform === 'android' ? 'Android' : 'iOS'}`, type: 'normal', delay: 800 },
        { text: 'Preparing gem generator...', type: 'normal', delay: 1000 },
        { text: `Generating ${gemAmount} gems...`, type: 'normal', delay: 1500 },
        { text: `Injecting gems to account...`, type: 'normal', delay: 1500 },
        { text: 'Generation complete!', type: 'success', delay: 1000 },
        { text: 'Human verification required', type: 'warning', delay: 1000 }
    ];
    
    // Add console messages with delays
    let totalDelay = 0;
    consoleMessages.forEach((message, index) => {
        totalDelay += message.delay;
        
        setTimeout(() => {
            // Add message to console
            const line = document.createElement('div');
            line.className = `console-line ${message.type}`;
            line.textContent = message.text;
            consoleOutput.appendChild(line);
            
            // Auto-scroll to bottom
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
            
            // Update progress based on message index
            const progress = Math.min(100, Math.round((index + 1) / consoleMessages.length * 100));
            progressFill.style.width = `${progress}%`;
            progressPercentage.textContent = `${progress}%`;
            
            // If last message, show verification modal after a delay
            if (index === consoleMessages.length - 1) {
                setTimeout(() => {
                    closeModal('generator-modal');
                    openModal('verification-modal');
                }, 1200);
            }
        }, totalDelay);
    });
}

// Content Locker Integration
function showLocker() {
    // This function would normally trigger the content locker
    console.log('Content locker triggered');
    
    // For demo purposes, show a success message
    alert('Content locker would appear here in the real implementation.');
    
    // You would normally add your content locker code here
    // Example: window.location.href = 'your-content-locker-url';
}
