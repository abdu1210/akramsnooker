import { useCallback, useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type AboutGalleryBoxProps = {
  images: string[];
  title: string;
  description: string;
  className?: string;
};

const AUTOPLAY_MS = 4500;

export function AboutGalleryBox({ images, title, description, className }: AboutGalleryBoxProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const onSelect = useCallback((carouselApi: CarouselApi) => {
    setIndex(carouselApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api || paused || images.length <= 1) return;
    const timer = window.setInterval(() => api.scrollNext(), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [api, paused, images.length]);

  if (images.length === 0) return null;

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-border bg-card/60 overflow-hidden glow-felt",
        className,
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="px-5 pt-5 pb-3">
        <h3 className="font-display text-xl font-bold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start", dragFree: false }}
        className="relative flex-1 px-2 pb-4"
      >
        <CarouselContent className="-ml-2">
          {images.map((src, i) => (
            <CarouselItem key={src} className="pl-2 basis-full">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                <img
                  src={src}
                  alt={`${title} — photo ${i + 1}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  draggable={false}
                  className="h-full w-full object-cover select-none about-gallery-slide"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 border-border bg-background/80 backdrop-blur" />
            <CarouselNext className="right-4 top-1/2 -translate-y-1/2 border-border bg-background/80 backdrop-blur" />
          </>
        )}
      </Carousel>

      <div className="flex items-center justify-between px-5 pb-4 text-xs text-muted-foreground">
        <span>Swipe or use arrows</span>
        <span>
          {index + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}
