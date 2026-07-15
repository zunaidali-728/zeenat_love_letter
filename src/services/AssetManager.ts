class AssetManagerService {
  private loadedAssets: Set<string> = new Set();
  private assetCount: number = 0;
  private loadedCount: number = 0;
  
  public onProgress: (progress: number) => void = () => {};
  public onComplete: () => void = () => {};

  public loadImages(images: string[]) {
    this.assetCount += images.length;
    
    images.forEach(src => {
      if (this.loadedAssets.has(src)) {
        this.incrementLoaded();
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        this.loadedAssets.add(src);
        this.incrementLoaded();
      };
      img.onerror = () => {
        console.warn(`Failed to load asset: ${src}`);
        this.incrementLoaded(); // don't block on error
      };
      img.src = src;
    });
  }

  private incrementLoaded() {
    this.loadedCount++;
    const progress = Math.min(100, Math.round((this.loadedCount / Math.max(this.assetCount, 1)) * 100));
    this.onProgress(progress);
    
    if (this.loadedCount >= this.assetCount) {
      this.onComplete();
    }
  }

  public preloadCriticalAssets() {
    // These are just example paths, we will populate with real assets later
    const critical = [
      '/images/couple/placeholder.jpg' // We will add real ones later
    ];
    this.loadImages(critical);
  }
}

export const AssetManager = new AssetManagerService();
