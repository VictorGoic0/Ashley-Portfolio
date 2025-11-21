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
        this.totalCards = 0;
        this.isTransitioning = false;
        
        this.init();
    }

    init() {
        this.setupInfiniteScroll();
        this.calculateDimensions();
        this.setupEventListeners();
        this.updateButtonStates();
        
        // Start at the first real card (after clones at beginning)
        const cloneCount = Math.min(3, this.totalCards);
        this.currentIndex = cloneCount;
        this.scrollToIndex(this.currentIndex, false);
        
        // Recalculate on window resize
        window.addEventListener('resize', () => {
            this.calculateDimensions();
            this.scrollToIndex(this.currentIndex, false);
        });
    }

    setupInfiniteScroll() {
        const cards = this.track.querySelectorAll('.project-card');
        this.totalCards = cards.length;
        
        if (this.totalCards === 0) return;
        
        // Clone first few cards and append to end
        const cloneCount = Math.min(3, this.totalCards);
        for (let i = 0; i < cloneCount; i++) {
            const clone = cards[i].cloneNode(true);
            clone.classList.add('carousel-clone');
            this.track.appendChild(clone);
        }
        
        // Clone last few cards and prepend to beginning
        for (let i = this.totalCards - cloneCount; i < this.totalCards; i++) {
            const clone = cards[i].cloneNode(true);
            clone.classList.add('carousel-clone');
            this.track.insertBefore(clone, cards[0]);
        }
    }

    calculateDimensions() {
        const cards = this.track.querySelectorAll('.project-card');
        if (cards.length === 0) return;

        const firstCard = cards[0];
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
        if (this.isTransitioning) return;
        
        this.currentIndex--;
        this.scrollToIndex(this.currentIndex, true);
    }

    scrollNext() {
        if (this.isTransitioning) return;
        
        this.currentIndex++;
        this.scrollToIndex(this.currentIndex, true);
    }

    scrollToIndex(index, animate = true) {
        if (this.isTransitioning) return;
        
        const translateX = -(index * this.cardStep);
        
        if (animate) {
            this.track.style.transition = 'transform 0.5s ease';
            this.isTransitioning = true;
        } else {
            this.track.style.transition = 'none';
        }
        
        this.track.style.transform = `translateX(${translateX}px)`;
        
        // Check if we've reached the cloned items and jump to real ones
        if (animate) {
            this.track.addEventListener('transitionend', this.handleTransitionEnd.bind(this), { once: true });
        }
        
        this.updateButtonStates();
    }

    handleTransitionEnd() {
        this.isTransitioning = false;
        
        const cloneCount = Math.min(3, this.totalCards);
        const realStartIndex = cloneCount;
        const realEndIndex = cloneCount + this.totalCards - 1;
        
        // If we're at the cloned items at the end, jump to the real ones at the beginning
        if (this.currentIndex > realEndIndex) {
            this.currentIndex = this.currentIndex - this.totalCards;
            this.scrollToIndex(this.currentIndex, false);
        }
        // If we're at the cloned items at the beginning, jump to the real ones at the end
        else if (this.currentIndex < realStartIndex) {
            this.currentIndex = this.currentIndex + this.totalCards;
            this.scrollToIndex(this.currentIndex, false);
        }
    }

    updateButtonStates() {
        // Since carousel loops, buttons are always enabled
        this.prevButton.style.opacity = '1';
        this.prevButton.style.cursor = 'pointer';
        this.nextButton.style.opacity = '1';
        this.nextButton.style.cursor = 'pointer';
    }
}

// Project rendering functions
function renderFeaturedProjects() {
    const featuredGrid = document.getElementById('featured-grid');
    if (!featuredGrid) return;
    
    const featuredProjects = getFeaturedProjects();
    featuredGrid.innerHTML = '';
    
    featuredProjects.forEach(project => {
        const card = createProjectCard(project, 'regular');
        featuredGrid.appendChild(card);
    });
}

function renderCarouselProjects() {
    const carouselTrack = document.getElementById('carousel-track');
    if (!carouselTrack) return;
    
    const carouselProjects = getCarouselProjects();
    carouselTrack.innerHTML = '';
    
    carouselProjects.forEach(project => {
        const card = createProjectCard(project, 'carousel');
        carouselTrack.appendChild(card);
    });
}

function createProjectCard(project, thumbnailType) {
    const card = document.createElement('a');
    card.href = `projects/${project.id}.html`;
    card.className = 'project-card';
    
    const thumbnailDiv = document.createElement('div');
    thumbnailDiv.className = `card-thumbnail thumbnail-${thumbnailType}`;
    
    const img = document.createElement('img');
    const thumbnailUrl = thumbnailType === 'regular' 
        ? project.thumbnailRegular 
        : project.thumbnailCarousel;
    img.src = thumbnailUrl;
    img.alt = project.title;
    img.className = 'thumbnail-image';
    
    thumbnailDiv.appendChild(img);
    card.appendChild(thumbnailDiv);
    
    return card;
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only render projects if we're on the main page
    if (document.getElementById('featured-grid')) {
        renderFeaturedProjects();
        renderCarouselProjects();
        
        // Initialize carousel after cards are rendered
        const carouselContainer = document.querySelector('.carousel-container');
        const carouselTrack = document.getElementById('carousel-track');
        const carouselPrev = document.getElementById('carousel-prev');
        const carouselNext = document.getElementById('carousel-next');

        if (carouselContainer && carouselTrack && carouselPrev && carouselNext) {
            // Wait for images to load before initializing carousel
            const images = carouselTrack.querySelectorAll('img');
            let imagesLoaded = 0;
            const totalImages = images.length;
            
            if (totalImages === 0) {
                // No images, initialize immediately
                setTimeout(() => {
                    new Carousel(carouselContainer, carouselTrack, carouselPrev, carouselNext);
                }, 100);
            } else {
                images.forEach(img => {
                    if (img.complete) {
                        imagesLoaded++;
                        if (imagesLoaded === totalImages) {
                            setTimeout(() => {
                                new Carousel(carouselContainer, carouselTrack, carouselPrev, carouselNext);
                            }, 100);
                        }
                    } else {
                        img.addEventListener('load', () => {
                            imagesLoaded++;
                            if (imagesLoaded === totalImages) {
                                setTimeout(() => {
                                    new Carousel(carouselContainer, carouselTrack, carouselPrev, carouselNext);
                                }, 100);
                            }
                        });
                        img.addEventListener('error', () => {
                            imagesLoaded++;
                            if (imagesLoaded === totalImages) {
                                setTimeout(() => {
                                    new Carousel(carouselContainer, carouselTrack, carouselPrev, carouselNext);
                                }, 100);
                            }
                        });
                    }
                });
            }
        }
    }
});

