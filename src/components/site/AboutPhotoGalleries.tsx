import { aboutGalleryImages, galleryBoxClub, galleryBoxEvents } from "@/lib/about-gallery";
import { AboutGalleryBox } from "@/components/site/AboutGalleryBox";

function GalleryMarquee({ reverse = false }: { reverse?: boolean }) {
  if (aboutGalleryImages.length === 0) return null;

  const track = [...aboutGalleryImages, ...aboutGalleryImages];

  return (
    <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card/30 py-3">
      <div
        className={`flex w-max gap-3 ${reverse ? "animate-gallery-marquee-reverse" : "animate-gallery-marquee"}`}
        aria-hidden
      >
        {track.map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt=""
            loading="lazy"
            draggable={false}
            className="h-20 w-28 shrink-0 rounded-lg object-cover opacity-90"
          />
        ))}
      </div>
    </div>
  );
}

export function AboutPhotoGalleries() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-felt-glow)] mb-3">
          Real photos
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold">
          Life inside <span className="text-gradient-felt">Akram Snooker</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          {aboutGalleryImages.length} moments from our club — tables, tournaments, celebrations,
          and the people who make it home. Swipe through each gallery or watch them scroll.
        </p>
      </div>

      <GalleryMarquee />
      <div className="mt-4">
        <GalleryMarquee reverse />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <AboutGalleryBox
          images={galleryBoxClub}
          title="Club & tables"
          description="Our halls, snooker and pool tables, and everyday play."
        />
        <AboutGalleryBox
          images={galleryBoxEvents}
          title="Events & community"
          description="Tournaments, celebrations, guests, and nights at the club."
        />
      </div>
    </section>
  );
}
