"use client";

type LogoItem = {
  name: string;
  src: string;
};

type LogoLoopProps = {
  logos: LogoItem[];
  speed?: "slow" | "normal" | "fast";
  title?: string;
};

export default function LogoLoop({
  logos,
  speed = "normal",
  title = "Trusted by travelers and partners",
}: LogoLoopProps) {
  const duplicatedLogos = [...logos, ...logos];

  const speedClass =
    speed === "slow"
      ? "animate-logo-loop-slow"
      : speed === "fast"
      ? "animate-logo-loop-fast"
      : "animate-logo-loop";

  return (
    <section className="w-full overflow-hidden bg-[#0b1f1a] py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Title */}
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
            {title}
          </p>
        </div>

        {/* Loop */}
        <div className="relative">
          {/* Edge fade */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#0b1f1a] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#0b1f1a] to-transparent" />

          <div className="overflow-hidden group">
            <div
              className={`flex min-w-max items-center gap-12 ${speedClass} group-hover:[animation-play-state:paused]`}
            >
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="
                    flex h-20 w-[170px] items-center justify-center
                    rounded-xl
                    bg-white/5
                    border border-white/10
                    backdrop-blur-sm
                    transition-all duration-300
                    hover:bg-white/10 hover:scale-105
                  "
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="
                      h-10 w-auto object-contain
                      opacity-80
                      transition duration-300
                      hover:opacity-100
                    "
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}