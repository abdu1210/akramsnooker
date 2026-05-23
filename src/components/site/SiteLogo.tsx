import { cn } from "@/lib/utils";

const sizeMap = {
  sm: "w-8 h-8 text-xs rounded-lg",
  md: "w-9 h-9 text-sm rounded-lg",
  lg: "w-20 h-20 text-2xl rounded-2xl",
} as const;

type SiteLogoProps = {
  size?: keyof typeof sizeMap;
  className?: string;
};

export function SiteLogo({ size = "md", className }: SiteLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center font-display font-bold tracking-tight",
        "bg-primary text-primary-foreground glow-felt",
        sizeMap[size],
        className,
      )}
      aria-hidden
    >
      AF
    </span>
  );
}
