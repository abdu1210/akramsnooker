const galleryModules = import.meta.glob<string>("@/assets/gallery/*.png", {
  eager: true,
  import: "default",
});

/** All photos in `src/assets/gallery/` — add more PNGs anytime; they load automatically. */
export const aboutGalleryImages = Object.keys(galleryModules)
  .sort()
  .map((path) => galleryModules[path]);

const midpoint = Math.ceil(aboutGalleryImages.length / 2);

export const galleryBoxClub = aboutGalleryImages.slice(0, midpoint);
export const galleryBoxEvents = aboutGalleryImages.slice(midpoint);
