import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  description?: string;
  className?: string;
};

export default function PageBanner({ title, description, className }: Props) {
  return (
    <section className={cn("relative flex items-center justify-center py-12 md:py-16 mb-12 w-full overflow-hidden", "bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]", className)}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large blurred circles with primary/secondary colors */}
        <div className="absolute left-1/4 top-1/3 h-[40rem] w-[40rem] rounded-full bg-[var(--primary)]/20 mix-blend-overlay blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 h-[40rem] w-[40rem] rounded-full bg-[var(--secondary)]/20 mix-blend-overlay blur-3xl" />

        {/* Additional gradient orbs using only primary/secondary */}
        <div className="absolute left-1/3 bottom-1/4 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tr from-[var(--primary)]/15 to-[var(--secondary)]/15 mix-blend-overlay blur-3xl" />
        <div className="absolute right-1/3 top-1/4 h-[30rem] w-[30rem] rounded-full bg-gradient-to-bl from-[var(--secondary)]/15 to-[var(--primary)]/15 mix-blend-overlay blur-3xl" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,white/10_1px,transparent_1px),linear-gradient(to_bottom,white/10_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

        {/* Diagonal lines with primary/secondary gradients */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-white/20 via-[var(--primary)]/20 to-transparent opacity-40 transform -skew-y-6" />
        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-l from-white/20 via-[var(--secondary)]/20 to-transparent opacity-40 transform skew-y-6" />
      </div>

      <div className="relative max-w-5xl mx-auto space-y-4 text-center z-10 px-4">
        {/* Title with gradient text effect */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent drop-shadow-sm">{title}</span>
        </h1>

        {/* Description with subtle gradient */}
        {description && <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">{description}</p>}

        {/* Enhanced underline with gradient using primary/secondary */}
        <div className="flex justify-center mt-2">
          <div className="h-1.5 w-40 rounded-full bg-gradient-to-r from-[var(--primary)]/80 via-white/90 to-[var(--secondary)]/80 shadow-sm shadow-white/10" />
        </div>
      </div>
    </section>
  );
}
