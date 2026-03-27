import React, { useState, useCallback, useEffect, useRef, useMemo, forwardRef, MutableRefObject, CSSProperties, HTMLAttributes } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Sparkles, BookOpen, Activity, X, Maximize2 } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  AnimatePresence,
  useSpring,
  type SpringOptions,
  type Transition,
  type HTMLMotionProps
} from "motion/react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { cn } from '@/lib/utils';

// ==================================================================================
// 1. CUSTOM STARS BACKGROUND
// ==================================================================================

type StarLayerProps = HTMLMotionProps<'div'> & {
  count: number;
  size: number;
  transition: Transition;
  starColor: string;
};

function generateStars(count: number, starColor: string) {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(', ');
}

function StarLayer({
  count = 1000,
  size = 1,
  transition = { repeat: Infinity, duration: 50, ease: 'linear' },
  starColor = '#fff',
  className,
  ...props
}: StarLayerProps) {
  const [boxShadow, setBoxShadow] = React.useState<string>('');

  React.useEffect(() => {
    setBoxShadow(generateStars(count, starColor));
  }, [count, starColor]);

  return (
    <motion.div
      animate={{ y: [-2000, 0] }}
      transition={transition}
      className={cn('absolute top-0 left-0 w-full h-[2000px]', className)}
      {...props}
    >
      <div
        className="absolute bg-transparent rounded-full"
        style={{ width: `${size}px`, height: `${size}px`, boxShadow: boxShadow }}
      />
      <div
        className="absolute bg-transparent rounded-full top-[2000px]"
        style={{ width: `${size}px`, height: `${size}px`, boxShadow: boxShadow }}
      />
    </motion.div>
  );
}

type StarsBackgroundProps = React.ComponentProps<'div'> & {
  factor?: number;
  speed?: number;
  transition?: SpringOptions;
  starColor?: string;
  pointerEvents?: boolean;
};

function StarsBackground({
  children,
  className,
  factor = 0.05,
  speed = 60,
  transition = { stiffness: 50, damping: 20 },
  starColor = '#fff',
  pointerEvents = true,
  ...props
}: StarsBackgroundProps) {
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const newOffsetX = -(e.clientX - centerX) * factor;
      const newOffsetY = -(e.clientY - centerY) * factor;
      offsetX.set(newOffsetX);
      offsetY.set(newOffsetY);
    },
    [offsetX, offsetY, factor],
  );

  return (
    <div
      className={cn(
        'relative w-full h-full overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_#1a1a1a_0%,_#000_100%)]',
        className,
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className={cn("w-full h-full", { 'pointer-events-none': !pointerEvents })}
      >
        <StarLayer count={150} size={1} transition={{ repeat: Infinity, duration: speed, ease: 'linear' }} starColor={starColor} />
        <StarLayer count={50} size={2} transition={{ repeat: Infinity, duration: speed * 0.8, ease: 'linear' }} starColor={starColor} />
        <StarLayer count={20} size={3} transition={{ repeat: Infinity, duration: speed * 0.6, ease: 'linear' }} starColor={starColor} />
      </motion.div>
      {children}
    </div>
  );
}

// ==========================================
// 2. HELPER COMPONENTS
// ==========================================

const ImagePreviewModal = ({ src, alt, isOpen, onClose }: { src: string; alt: string; isOpen: boolean; onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:top-8 md:right-8 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all z-50 pointer-events-auto"
          >
            <X className="w-8 h-8" />
          </button>
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-7xl max-h-[90vh] w-full flex justify-center pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={src} alt={alt} className="w-auto h-auto max-h-[85vh] max-w-full rounded-lg shadow-2xl border border-white/10 object-contain" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ScrollDownIndicator = () => (
  // FIXED: Replaced absolute left-1/2 -translate-x-1/2 with flex justify-center inset-x-0
  <div className="absolute bottom-6 md:bottom-12 inset-x-0 flex justify-center pointer-events-none z-20">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="flex flex-col items-center gap-3"
    >
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-light hidden sm:block">Scroll</span>
      <div className="h-12 md:h-16 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent relative overflow-hidden">
        <motion.div
          animate={{ y: [-20, 40] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
          className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#00ddeb] to-transparent"
        />
      </div>
    </motion.div>
  </div>
);

const CosmicButton = () => (
  <Link to="/pyqs" className="pointer-events-auto w-full sm:w-auto">
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group cursor-pointer w-full sm:w-auto text-center">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ddeb] via-[#5b42f3] to-[#af40ff] rounded-full blur opacity-30 group-hover:opacity-75 transition duration-500 group-hover:duration-200" />
      <div className="relative flex items-center justify-center gap-3 px-8 py-4 bg-black/90 rounded-full ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
        <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 group-hover:to-white">
          Explore PYQs
        </span>
        <ArrowRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 group-hover:text-[#00ddeb] transition-all duration-300" />
      </div>
    </motion.div>
  </Link>
);

const MacbookMockup = ({ src, alt, onPreview }: { src: string; alt: string; onPreview: () => void }) => (
  <div className="relative w-full max-w-md md:max-w-[90%] lg:max-w-full mx-auto perspective-[2000px] group/laptop pointer-events-auto">
    <div className="relative bg-[#0f0f10] rounded-[14px] p-[2%] ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] border-t border-white/5">
      <div className="relative w-full aspect-[16/10] bg-black rounded-[6px] overflow-hidden border border-white/5 shadow-inner">
        <div className="absolute top-3 left-3 flex gap-1.5 md:gap-2 z-20 pointer-events-none">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#ff5f57] shadow-sm" />
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#febc2e] shadow-sm" />
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#28c840] shadow-sm" />
        </div>
        <div className="relative w-full h-full bg-[#1e1e1e] cursor-zoom-in" onClick={onPreview}>
          <img src={src} alt={alt} className="w-full h-full object-cover object-top transform transition-transform duration-700 group-hover/laptop:scale-[1.02]" />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/laptop:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
              <Maximize2 className="w-3 h-3" /> Click to Preview
            </div>
          </div>
        </div>
      </div>
      {/* FIXED: Removed left-1/2 -translate-x-1/2 and replaced with inset-x-0 flex justify-center */}
      <div className="absolute bottom-[0.5%] inset-x-0 flex justify-center text-[8px] text-white/10 font-medium tracking-widest uppercase">
        MacBook Pro
      </div>
    </div>
    <div className="relative -mt-[1px] mx-auto w-full">
      <div className="h-[10px] md:h-[16px] w-full bg-[#151516] rounded-b-[10px] md:rounded-b-[16px] shadow-2xl relative z-10">
        {/* FIXED: Removed left-1/2 -translate-x-1/2 and replaced with inset-x-0 mx-auto */}
        <div className="absolute top-0 inset-x-0 mx-auto w-[15%] h-[40%] bg-[#0f0f10] rounded-b-md border-b border-x border-white/5" />
      </div>
      <div className="absolute -bottom-8 left-[5%] right-[5%] h-8 bg-black/80 blur-xl rounded-[100%]" />
    </div>
  </div>
);

// ==========================================
// 3. TEXT ANIMATIONS
// ==========================================

const ShinyText = ({ text, className = '' }: { text: string; className?: string }) => (
  <span className={cn("inline-block bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 animate-shimmer", className)} style={{ backgroundSize: '200% auto' }}>
    {text}
  </span>
);

const TextLoop = () => {
  const [index, setIndex] = useState(0);
  const items = [
    "Curated PYQs to help you study what actually appears.",
    "No clutter. No distractions. Just questions.",
    "Learn From the Questions That Matter.",
    "Stop Guessing. Start Practicing."
  ];
  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % items.length), 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[70px] md:min-h-[48px] w-full overflow-hidden flex justify-center items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0, filter: 'blur(5px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -20, opacity: 0, filter: 'blur(5px)' }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-x-0 flex justify-center px-4 text-center"
        >
          <ShinyText text={items[index]} className="text-lg sm:text-xl md:text-2xl font-normal leading-tight" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// 4. MAIN HERO SECTION
// ==========================================

const features = [
  {
    id: 1,
    title: "PYQ Vault",
    subtitle: "All Previous Year Questions. One Powerful Library.",
    description: "Access a centralized vault of Previous Year Question Papers for all years, all exams, and the autonomous pattern.",
    tags: ["PYQs for Every Year", "All Exams Covered", "Distraction-Free"],
    image: "https://iili.io/fOpPV3J.png",
    icon: <BookOpen className="w-6 h-6 text-[#00ddeb]" />,
    color: "from-[#00ddeb]/20",
    link: "/pyqs",
    cta: "Enter Vault"
  },
  {
    id: 2,
    title: "Smart Dashboard",
    subtitle: "Track Progress. Stay Consistent. Prepare Smarter.",
    description: "Your personal space to monitor progress, maintain study streaks, and stay exam-ready.",
    tags: ["Streak Tracking", "Subject-wise Progress"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
    icon: <Activity className="w-6 h-6 text-[#28c840]" />,
    color: "from-[#28c840]/20",
    link: "/dashboard",
    cta: "Go to Dashboard"
  }
];

const FeatureRow = ({ data, index }: { data: typeof features[0]; index: number }) => {
  const isEven = index % 2 === 0;
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <>
      <ImagePreviewModal src={data.image} alt={data.title} isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
      
      <div className="relative w-full flex items-center justify-center py-12 md:py-20 lg:py-32 bg-transparent pointer-events-none">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 pointer-events-none">
          <div className={`flex flex-col lg:flex-row items-center gap-8 md:gap-16 lg:gap-24 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full lg:w-1/2 space-y-6 pointer-events-auto text-center lg:text-left"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight pb-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                {data.title}
              </h2>
              <div className="text-base sm:text-lg md:text-xl font-medium text-gray-300">
                {data.subtitle}
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed cursor-default max-w-xl mx-auto lg:mx-0">
                {data.description}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3">
                {data.tags.map((tag, i) => (
                  <div key={i} className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-300 bg-white/5 px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-white/5 backdrop-blur-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#00ddeb]" />
                    {tag}
                  </div>
                ))}
              </div>
              <Link to={data.link} className="inline-block pt-2">
                <Button variant="outline" className="h-10 md:h-12 px-6 md:px-8 rounded-full border-white/10 hover:bg-white/10 hover:text-[#00ddeb] transition-all group bg-white/5 w-full sm:w-auto">
                  {data.cta}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full lg:w-1/2 relative perspective-1000 pointer-events-auto mt-6 lg:mt-0"
            >
              {/* FIXED: Removed top-1/2 left-1/2 translations, replaced with safe inset-0 sizing */}
              <div className={`absolute inset-0 w-full h-full bg-gradient-to-tr ${data.color} to-transparent blur-[80px] rounded-full -z-10 opacity-50`} />
              <MacbookMockup src={data.image} alt={data.title} onPreview={() => setIsPreviewOpen(true)} />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    // FIXED: Removed `max-w-[100vw]` and strictly enforce `overflow-x-hidden` on the parent to prevent the phantom scrollbar bug on mobile
    <div className="relative w-full bg-black overflow-x-hidden flex flex-col min-h-screen">
      
      {/* FIXED: Strictly limit star animations within an overflow-hidden fixed wrapper */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <StarsBackground factor={0.02} speed={80} className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_bottom,_#1a1a1a_0%,_#000_100%)]" />
        <div className="absolute inset-0 mix-blend-screen overflow-hidden"><ShootingStars starColor="#00ddeb" trailColor="#2EB9DF" minDelay={1000} maxDelay={3000} /></div>
        <div className="absolute inset-0 mix-blend-screen overflow-hidden"><ShootingStars starColor="#af40ff" trailColor="#5b42f3" minDelay={2000} maxDelay={4000} /></div>
      </div>

      <div className="relative z-10 w-full flex flex-col pointer-events-none">
        <section className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-[12vh] md:pt-[15vh] pb-16 md:pb-20">
          <motion.div style={{ opacity, scale }} className="container mx-auto text-center space-y-6 md:space-y-8 pointer-events-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-center max-w-5xl mx-auto cursor-default" style={{ lineHeight: 1.15 }}>
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/40">
                  Practice Smarter
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/40">
                  Learn From Real Exam Questions
                </span>
              </h1>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="max-w-2xl mx-auto px-2">
              <TextLoop />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex justify-center pt-6 md:pt-4 w-full px-4">
              <CosmicButton />
            </motion.div>
          </motion.div>
          <ScrollDownIndicator />
        </section>

        <div className="flex flex-col">
          {features.map((feature, index) => (
            <FeatureRow key={feature.id} data={feature} index={index} />
          ))}
        </div>
        <div className="h-16 md:h-24" />
      </div>
    </div>
  );
};

export default HeroSection;