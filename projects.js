// Project data structure
const projects = [
    // Image projects (featured grid)
    {
        id: 'ashley_zheng_band-aid_x_spiderman',
        title: 'Band-Aid x Spiderman',
        description: 'A creative collaboration featuring Band-Aid and Spiderman, showcasing innovative design and visual storytelling.',
        mediaType: 'image',
        mediaUrl: 'assets/images/ashley_zheng_band-aid_x_spiderman.png',
        thumbnailRegular: 'assets/thumbnails/ashley_zheng_band-aid_x_spiderman_thumbnail_regular.png',
        thumbnailCarousel: 'assets/thumbnails/ashley_zheng_band-aid_x_spiderman_thumbnail_regular.png'
    },
    {
        id: 'ashleyz_prose',
        title: 'AshleyZ Prose',
        description: 'A personal branding project that captures the essence of creative expression through typography and visual design.',
        mediaType: 'image',
        mediaUrl: 'assets/images/ashleyz_prose.png',
        thumbnailRegular: 'assets/thumbnails/ashleyz_prose_thumbnail_regular.png',
        thumbnailCarousel: 'assets/thumbnails/ashleyz_prose_thumbnail_regular.png'
    },
    {
        id: 'freelance_print_ad',
        title: 'Freelance Print Ad',
        description: 'A professional print advertisement showcasing creative direction and layout design for freelance work.',
        mediaType: 'image',
        mediaUrl: 'assets/images/freelance_print_ad.png',
        thumbnailRegular: 'assets/thumbnails/freelance_print_ad_thumbnail_regular.png',
        thumbnailCarousel: 'assets/thumbnails/freelance_print_ad_thumbnail_regular.png'
    },
    {
        id: 'purple_yellow_neon_modern_music_event_instagram_story',
        title: 'Modern Music Event Instagram Story',
        description: 'A vibrant, neon-inspired Instagram story design for a modern music event, featuring bold colors and contemporary aesthetics.',
        mediaType: 'image',
        mediaUrl: 'assets/images/purple_yellow_neon_modern_music_event_instagram_story.png',
        thumbnailRegular: 'assets/thumbnails/purple_yellow_neon_modern_music_event_instagram_story_thumbnail_regular.png',
        thumbnailCarousel: 'assets/thumbnails/purple_yellow_neon_modern_music_event_instagram_story_thumbnail_regular.png'
    },
    {
        id: 'starke-technologies',
        title: 'Starke Technologies',
        description: 'Brand identity and visual design for Starke Technologies, emphasizing modern tech aesthetics and professional presentation.',
        mediaType: 'image',
        mediaUrl: 'assets/images/starke-technologies.jpg',
        thumbnailRegular: 'assets/thumbnails/starke-technologies_thumbnail_regular.jpg',
        thumbnailCarousel: 'assets/thumbnails/starke-technologies_thumbnail_regular.jpg'
    },
    // PDF projects (carousel)
    {
        id: 'ashley_zheng_-_eden_presley_mantra',
        title: 'Eden Presley - Mantra',
        description: 'A creative design project featuring Eden Presley with a mantra theme, showcasing typography and layout design.',
        mediaType: 'pdf',
        mediaUrl: 'assets/pdfs/ashley_zheng_-_eden_presley_mantra.pdf',
        thumbnailCarousel: 'assets/thumbnails/ashley_zheng_-_eden_presley_mantra_thumbnail_carousel.png'
    },
    {
        id: 'ashley_zheng_-_eden_presley_one_of_a_kind',
        title: 'Eden Presley - One of a Kind',
        description: 'A unique design piece for Eden Presley, highlighting individuality and creative expression through visual design.',
        mediaType: 'pdf',
        mediaUrl: 'assets/pdfs/ashley_zheng_-_eden_presley_one_of_a_kind.pdf',
        thumbnailCarousel: 'assets/thumbnails/ashley_zheng_-_eden_presley_one_of_a_kind_thumbnail_carousel.png'
    },
    {
        id: 'ashley_zheng_-_eden_presley_rock',
        title: 'Eden Presley - Rock',
        description: 'A bold design project for Eden Presley with a rock theme, featuring dynamic layouts and strong visual impact.',
        mediaType: 'pdf',
        mediaUrl: 'assets/pdfs/ashley_zheng_-_eden_presley_rock.pdf',
        thumbnailCarousel: 'assets/thumbnails/ashley_zheng_-_eden_presley_rock_thumbnail_carousel.png'
    },
    {
        id: 'ashley_zheng_s_ice_cream_ad',
        title: 'Ice Cream Ad',
        description: 'A delightful print advertisement for ice cream, combining appetizing visuals with effective marketing design.',
        mediaType: 'pdf',
        mediaUrl: 'assets/pdfs/ashley_zheng_s_ice_cream_ad.pdf',
        thumbnailCarousel: 'assets/thumbnails/ashley_zheng_s_ice_cream_ad_thumbnail_carousel.png'
    },
    {
        id: 'ashley_zheng_s_little_caesars_pizza_ad',
        title: 'Little Caesars Pizza Ad',
        description: 'A creative advertisement design for Little Caesars Pizza, showcasing food photography and brand messaging.',
        mediaType: 'pdf',
        mediaUrl: 'assets/pdfs/ashley_zheng_s_little_caesars_pizza_ad.pdf',
        thumbnailCarousel: 'assets/thumbnails/ashley_zheng_s_little_caesars_pizza_ad_thumbnail_carousel.png'
    },
    // Video projects (carousel)
    {
        id: 'campaign',
        title: 'Campaign',
        description: 'A comprehensive campaign video showcasing creative direction and visual storytelling.',
        mediaType: 'video',
        mediaUrl: 'assets/videos/campaign.mp4',
        thumbnailCarousel: 'assets/thumbnails/campaign_thumbnail_carousel.png'
    },
    {
        id: 'copy_34bcb4fa-bd37-4a6f-9852-38b44ce3bbd9',
        title: 'Creative Video Project',
        description: 'A dynamic video project featuring creative visuals and engaging motion design.',
        mediaType: 'video',
        mediaUrl: 'assets/videos/copy_34bcb4fa-bd37-4a6f-9852-38b44ce3bbd9.mp4',
        thumbnailCarousel: 'assets/thumbnails/copy_34bcb4fa-bd37-4a6f-9852-38b44ce3bbd9_thumbnail_carousel.png'
    },
    {
        id: 'copy_78ce68e6-fc5e-49cd-8798-c7fd8aa31a7d',
        title: 'Creative Video Project',
        description: 'A dynamic video project featuring creative visuals and engaging motion design.',
        mediaType: 'video',
        mediaUrl: 'assets/videos/copy_78ce68e6-fc5e-49cd-8798-c7fd8aa31a7d.mp4',
        thumbnailCarousel: 'assets/thumbnails/copy_78ce68e6-fc5e-49cd-8798-c7fd8aa31a7d_thumbnail_carousel.png'
    },
    {
        id: 'copy_885ae6c7-2d2f-485b-98ec-54a8a31aaf46',
        title: 'Creative Video Project',
        description: 'A dynamic video project featuring creative visuals and engaging motion design.',
        mediaType: 'video',
        mediaUrl: 'assets/videos/copy_885ae6c7-2d2f-485b-98ec-54a8a31aaf46.mp4',
        thumbnailCarousel: 'assets/thumbnails/copy_885ae6c7-2d2f-485b-98ec-54a8a31aaf46_thumbnail_carousel.png'
    },
    {
        id: 'copy_dbb7b916-cdb6-41a0-b5b5-56cabb7b509a',
        title: 'Creative Video Project',
        description: 'A dynamic video project featuring creative visuals and engaging motion design.',
        mediaType: 'video',
        mediaUrl: 'assets/videos/copy_dbb7b916-cdb6-41a0-b5b5-56cabb7b509a.mp4',
        thumbnailCarousel: 'assets/thumbnails/copy_dbb7b916-cdb6-41a0-b5b5-56cabb7b509a_thumbnail_carousel.png'
    },
    {
        id: 'fall_campaign',
        title: 'Fall Campaign',
        description: 'A seasonal campaign video capturing the essence of autumn through creative visuals and storytelling.',
        mediaType: 'video',
        mediaUrl: 'assets/videos/fall_campaign.mp4',
        thumbnailCarousel: 'assets/thumbnails/fall_campaign_thumbnail_carousel.png'
    },
    {
        id: 'spring_campaign',
        title: 'Spring Campaign',
        description: 'A vibrant spring campaign video featuring fresh visuals and energetic motion design.',
        mediaType: 'video',
        mediaUrl: 'assets/videos/spring_campaign.mp4',
        thumbnailCarousel: 'assets/thumbnails/spring_campaign_thumbnail_carousel.png'
    }
];

// Helper function to get project by ID
function getProjectById(id) {
    return projects.find(project => project.id === id);
}

// Helper function to get featured projects (first 4 image projects)
function getFeaturedProjects() {
    return projects.filter(p => p.mediaType === 'image').slice(0, 4);
}

// Helper function to get all carousel projects (PDFs and videos)
function getCarouselProjects() {
    return projects.filter(p => p.mediaType === 'pdf' || p.mediaType === 'video');
}

