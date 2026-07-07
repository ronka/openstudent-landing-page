import Image from "next/image";

type PhoneFrameProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

/** A screenshot wrapped in a simple device bezel. Preserves the 1206×2622 shot ratio. */
export default function PhoneFrame({ src, alt, priority, className }: PhoneFrameProps) {
  return (
    <div
      className={`relative w-full rounded-[2.4rem] border border-black/10 bg-black p-2 shadow-[0_30px_60px_-20px_rgba(11,13,18,0.35)] ${className ?? ""}`}
    >
      <div className="overflow-hidden rounded-[1.9rem] bg-white">
        <Image
          src={src}
          alt={alt}
          width={1206}
          height={2622}
          priority={priority}
          className="h-auto w-full"
          sizes="(max-width: 768px) 70vw, 300px"
        />
      </div>
    </div>
  );
}
