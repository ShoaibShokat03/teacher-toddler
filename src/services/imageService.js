class ImageService {
  constructor() {
    this.unsplashAccessKey = 'your-unsplash-access-key'; // You'll need to get this from Unsplash
    this.pixabayApiKey = 'your-pixabay-api-key'; // You'll need to get this from Pixabay
  }

  async getImage(query, category = 'educational') {
    try {
      // Try Unsplash first
      const unsplashImage = await this.getUnsplashImage(query);
      if (unsplashImage) return unsplashImage;

      // Fallback to Pixabay
      const pixabayImage = await this.getPixabayImage(query);
      if (pixabayImage) return pixabayImage;

      // Final fallback to placeholder
      return this.getPlaceholderImage(query);
    } catch (error) {
      console.error('Error fetching image:', error);
      return this.getPlaceholderImage(query);
    }
  }

  async getUnsplashImage(query) {
    if (!this.unsplashAccessKey) return null;

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&client_id=${this.unsplashAccessKey}`
      );
      
      if (!response.ok) return null;
      
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return {
          url: data.results[0].urls.regular,
          alt: data.results[0].alt_description || query,
          source: 'unsplash'
        };
      }
    } catch (error) {
      console.error('Unsplash API error:', error);
    }
    
    return null;
  }

  async getPixabayImage(query) {
    if (!this.pixabayApiKey) return null;

    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${this.pixabayApiKey}&q=${encodeURIComponent(query)}&image_type=photo&category=education&per_page=3&safesearch=true`
      );
      
      if (!response.ok) return null;
      
      const data = await response.json();
      if (data.hits && data.hits.length > 0) {
        return {
          url: data.hits[0].webformatURL,
          alt: data.hits[0].tags || query,
          source: 'pixabay'
        };
      }
    } catch (error) {
      console.error('Pixabay API error:', error);
    }
    
    return null;
  }

  getPlaceholderImage(query) {
    // Generate a colorful placeholder based on the query
    const colors = ['FF6B6B', '4ECDC4', '45B7D1', '96CEB4', 'FFEAA7', 'DDA0DD', '98D8C8', 'F7DC6F'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return {
      url: `https://via.placeholder.com/400x300/${color}/FFFFFF?text=${encodeURIComponent(query)}`,
      alt: query,
      source: 'placeholder'
    };
  }

  // Predefined images for common educational topics
  getEducationalImages() {
    return {
      animals: [
        { url: 'https://images.unsplash.com/photo-1549366021-9f761d040fb0?w=400', alt: 'Cute animals' },
        { url: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=400', alt: 'Farm animals' },
        { url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400', alt: 'Wild animals' }
      ],
      colors: [
        { url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400', alt: 'Rainbow colors' },
        { url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400', alt: 'Colorful toys' },
        { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', alt: 'Colorful balloons' }
      ],
      numbers: [
        { url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400', alt: 'Number blocks' },
        { url: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400', alt: 'Counting objects' },
        { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', alt: 'Math symbols' }
      ],
      letters: [
        { url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', alt: 'Alphabet blocks' },
        { url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400', alt: 'Letter toys' },
        { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', alt: 'Writing practice' }
      ],
      shapes: [
        { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', alt: 'Geometric shapes' },
        { url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400', alt: 'Shape blocks' },
        { url: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400', alt: 'Pattern shapes' }
      ]
    };
  }

  getRandomEducationalImage(category) {
    const images = this.getEducationalImages();
    const categoryImages = images[category] || images.animals;
    return categoryImages[Math.floor(Math.random() * categoryImages.length)];
  }
}

export default new ImageService();
