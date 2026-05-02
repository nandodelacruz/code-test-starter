import Image from "next/image";
import { cn } from "@/lib/utils";

interface BookImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  sizes?: string;
  aspectRatio?: string;
  padding?: string;
  showEffects?: boolean;
}

export function BookImage({
  src,
  alt,
  fill = true,
  priority = false,
  className,
  containerClassName,
  sizes,
  aspectRatio = "aspect-[3/4]",
  padding = "p-4",
  showEffects = true,
}: BookImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-slate-950 shadow-2xl transition-all duration-500",
        aspectRatio,
        containerClassName,
      )}
    >
      {/* Blurred background to fill empty space for inconsistent cover sizes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={src}
          alt=""
          fill
          className="object-cover blur-3xl opacity-40 scale-125 transition-transform duration-700"
          aria-hidden="true"
        />
        {/* Dark overlay to provide contrast for light covers */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main Book Cover */}
      <div
        className={cn(
          "relative z-10 h-full w-full flex items-center justify-center",
          padding,
        )}
      >
        <div className="relative h-full w-full">
          <Image
            src={src}
            alt={alt}
            fill={fill}
            className={cn(
              "object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-500",
              className,
            )}
            sizes={sizes}
            priority={priority}
          />
        </div>
      </div>

      {showEffects && (
        <>
          {/* Spine / Binding Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-[5%] z-20 bg-gradient-to-r from-black/40 via-black/10 to-transparent pointer-events-none" />

          {/* Lighting / Texture Overlay */}
          <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-tr from-black/10 via-transparent to-white/10 opacity-60" />

          {/* Subtle Inner Border */}
          <div className="absolute inset-0 z-40 pointer-events-none rounded-xl ring-1 ring-inset ring-white/10" />
        </>
      )}
    </div>
  );
}
