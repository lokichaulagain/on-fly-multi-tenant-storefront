import { GradientBlurBackground } from "./gradient-blur-background";

type Props = {
  title?: string;
  description?: string;
  className?: string;
};

export default function PageBanner({ title, description, className }: Props) {
  return (
    <GradientBlurBackground>
      <div className="relative max-w-5xl mx-auto  text-center z-10 px-4 py-8 md:py-12">
        <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">{title}</p>
        {description && <p className=" opacity-85 mt-2">{description}</p>}
      </div>
    </GradientBlurBackground>
  );
}
