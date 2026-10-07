import Image from "next/image";

/**
 * The lit disc a companion stands in — the one piece of ornament left in the
 * app, so it carries the whole decoration budget. It reads as light falling on
 * the companion rather than as a floating blurred shape, and the slow breath is
 * the only motion that is not a response to something a person did.
 */
export default function CompanionStage({
  src,
  alt,
  size = 280,
  breathing = false,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  size?: number;
  breathing?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative grid shrink-0 place-items-center rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle at 50% 36%, #fdf1d2 0%, #f8dfa0 58%, #f0c76c 100%)",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={Math.round(size * 0.84)}
        height={Math.round(size * 0.84)}
        priority={priority}
        className={`size-[84%] select-none object-contain ${
          breathing ? "animate-breathe" : ""
        }`}
      />
    </div>
  );
}
