// API Service for AROC Package Management
class AROCAPIService {
  constructor() {
    this.baseURL = "https://student.aroc.au/api";
  }

  // Fetch all packages
  async getAllPackages() {
    try {
      const response = await fetch(`${this.baseURL}/packages`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.packages || [];
    } catch (error) {
      console.error("Error fetching packages:", error);
      return [];
    }
  }

  // Fetch single package by ID
  async getPackageById(id, params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(`${this.baseURL}/packages/${id}?${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { ...data.package, user: data.user }; // Accept both keys
    } catch (error) {
      console.error("Error fetching package:", error);
      return null;
    }
  }

  // Format price with savings display
  formatPriceDisplay(pkg) {
    if (pkg.original_price && pkg.original_price > pkg.price) {
      const savings = pkg.original_price - pkg.price;
      return {
        currentPrice: `$${pkg.price}`,
        originalPrice: `$${pkg.original_price}`,
        savings: `save $${savings}`,
        hasDiscount: true,
      };
    }
    return {
      currentPrice: `$${pkg.price}`,
      originalPrice: null,
      savings: null,
      hasDiscount: false,
    };
  }

  // Format features list
  formatFeatures(features) {
    return features.map((feature) => `✓ ${feature.feature}`);
  }
}

// Global API service instance
window.arocAPI = new AROCAPIService();
