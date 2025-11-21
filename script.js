// Carousel functionality
class Carousel {
    constructor(container, track, prevButton, nextButton) {
        this.container = container;
        this.track = track;
        this.prevButton = prevButton;
        this.nextButton = nextButton;
        this.currentIndex = 0;
        this.cardWidth = 0;
        this.gap = 0;
        this.visibleCards = 0;
        
        this.init();
    }

    init() {
        this.calculateDimensions();
        this.setupEventListeners();
        this.updateButtonStates();
        
        // Recalculate on window resize
        window.addEventListener('resize', () => {
            this.calculateDimensions();
            this.scrollToIndex(this.currentIndex);
        });
    }

    calculateDimensions() {
        const cards = this.track.querySelectorAll('.project-card');
        if (cards.length === 0) return;

        const firstCard = cards[0];
        const cardStyle = window.getComputedStyle(firstCard);
        const trackStyle = window.getComputedStyle(this.track);
        
        this.cardWidth = firstCard.offsetWidth;
        this.gap = parseInt(trackStyle.gap) || 0;
        this.cardStep = this.cardWidth + this.gap;
        
        const containerWidth = this.container.offsetWidth;
        this.visibleCards = Math.floor(containerWidth / this.cardStep);
    }

    setupEventListeners() {
        this.prevButton.addEventListener('click', () => this.scrollPrev());
        this.nextButton.addEventListener('click', () => this.scrollNext());
        
        // Touch/swipe support for mobile
        let startX = 0;
        let scrollLeft = 0;
        let isDown = false;

        this.track.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - this.track.offsetLeft;
            scrollLeft = this.track.scrollLeft;
        });

        this.track.addEventListener('mouseleave', () => {
            isDown = false;
        });

        this.track.addEventListener('mouseup', () => {
            isDown = false;
        });

        this.track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - this.track.offsetLeft;
            const walk = (x - startX) * 2;
            this.track.scrollLeft = scrollLeft - walk;
        });

        // Touch events
        let touchStartX = 0;
        let touchScrollLeft = 0;

        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].pageX - this.track.offsetLeft;
            touchScrollLeft = this.track.scrollLeft;
        });

        this.track.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX - this.track.offsetLeft;
            const walk = (x - touchStartX) * 1.5;
            this.track.scrollLeft = touchScrollLeft - walk;
        });
    }

    scrollPrev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.scrollToIndex(this.currentIndex);
        }
    }

    scrollNext() {
        const cards = this.track.querySelectorAll('.project-card');
        const maxIndex = Math.max(0, cards.length - this.visibleCards);
        
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.scrollToIndex(this.currentIndex);
        }
    }

    scrollToIndex(index) {
        const translateX = -(index * this.cardStep);
        this.track.style.transform = `translateX(${translateX}px)`;
        this.currentIndex = index;
        this.updateButtonStates();
    }

    updateButtonStates() {
        const cards = this.track.querySelectorAll('.project-card');
        const maxIndex = Math.max(0, cards.length - this.visibleCards);
        
        this.prevButton.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.prevButton.style.cursor = this.currentIndex === 0 ? 'not-allowed' : 'pointer';
        
        this.nextButton.style.opacity = this.currentIndex >= maxIndex ? '0.5' : '1';
        this.nextButton.style.cursor = this.currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
    }
}

// Navigation functionality
function setupNavigation() {
    // Click handlers for featured project cards
    const featuredCards = document.querySelectorAll('#featured-grid .project-card');
    featuredCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            navigateToProject(projectId);
        });
    });

    // Click handlers for carousel project cards
    const carouselCards = document.querySelectorAll('#carousel-track .project-card');
    carouselCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            navigateToProject(projectId);
        });
    });
}

function navigateToProject(projectId) {
    if (projectId) {
        window.location.href = `projects/project-1.html?id=${projectId}`;
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselTrack = document.getElementById('carousel-track');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');

    if (carouselContainer && carouselTrack && carouselPrev && carouselNext) {
        new Carousel(carouselContainer, carouselTrack, carouselPrev, carouselNext);
    }

    // Setup navigation
    setupNavigation();
});

