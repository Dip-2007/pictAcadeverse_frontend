
















// import React, { useState, useCallback, useEffect, useRef, useMemo, forwardRef, MutableRefObject, CSSProperties, HTMLAttributes } from 'react';
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { ArrowRight, CheckCircle2, Sparkles, BookOpen, Activity, X, Maximize2 } from "lucide-react";
// import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame, AnimatePresence } from "motion/react";
// import { ShootingStars } from "@/components/ui/shooting-stars";

// // ==========================================
// // COMPONENT: Image Preview Modal
// // ==========================================
// const ImagePreviewModal = ({ src, alt, isOpen, onClose }: { src: string; alt: string; isOpen: boolean; onClose: () => void }) => {
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
//           onClick={onClose}
//         >
//           <button 
//             onClick={onClose} 
//             className="absolute top-6 right-6 md:top-8 md:right-8 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all z-50"
//           >
//             <X className="w-8 h-8" />
//           </button>

//           <motion.div
//             initial={{ scale: 0.9, opacity: 0, y: 20 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.9, opacity: 0, y: 20 }}
//             transition={{ type: "spring", damping: 25, stiffness: 300 }}
//             className="relative max-w-7xl max-h-[90vh] w-full flex justify-center"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <img 
//               src={src} 
//               alt={alt} 
//               className="w-auto h-auto max-h-[85vh] max-w-full rounded-lg shadow-2xl border border-white/10 object-contain"
//             />
//             <div className="absolute -bottom-10 text-white/50 text-sm font-medium tracking-widest uppercase">
//               {alt} Preview
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// // ==========================================
// // COMPONENT: Modern Scroll Indicator
// // ==========================================
// const ScrollDownIndicator = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ delay: 2, duration: 1 }}
//       className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none"
//     >
//       <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-light">
//         Scroll
//       </span>
//       <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent relative overflow-hidden">
//         <motion.div
//           animate={{ y: [-20, 40] }}
//           transition={{ 
//             duration: 1.5, 
//             repeat: Infinity, 
//             ease: "easeInOut",
//             repeatDelay: 0.5 
//           }}
//           className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#00ddeb] to-transparent"
//         />
//       </div>
//     </motion.div>
//   );
// };

// // ==========================================
// // COMPONENT: Cosmic Button 
// // ==========================================
// const CosmicButton = () => {
//   return (
//     <Link to="/vault">
//       <motion.div
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="relative group cursor-pointer"
//       >
//         <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ddeb] via-[#5b42f3] to-[#af40ff] rounded-full blur opacity-30 group-hover:opacity-75 transition duration-500 group-hover:duration-200" />
//         <div className="relative flex items-center gap-3 px-8 py-4 bg-black/90 rounded-full ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
//           <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 group-hover:to-white">
//             Explore PYQs
//           </span>
//           <ArrowRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 group-hover:text-[#00ddeb] transition-all duration-300" />
//           <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
//         </div>
//       </motion.div>
//     </Link>
//   );
// };

// // ==========================================
// // COMPONENT: MacBook Mockup
// // ==========================================
// interface MacbookMockupProps {
//   src: string;
//   alt: string;
//   onPreview: () => void;
// }

// const MacbookMockup = ({ src, alt, onPreview }: MacbookMockupProps) => {
//   return (
//     <div className="relative w-full max-w-[90%] md:max-w-full mx-auto perspective-[2000px] group/laptop">
//       <div className="relative bg-[#0f0f10] rounded-[14px] p-[2%] ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] border-t border-white/5">
//         <div className="relative w-full aspect-[16/10] bg-black rounded-[6px] overflow-hidden border border-white/5 shadow-inner">
//           <div className="absolute top-3 left-3 md:top-4 md:left-4 flex gap-1.5 md:gap-2 z-20 pointer-events-none">
//              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f57] border border-[#e33e32] shadow-sm" />
//              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#febc2e] border border-[#dba026] shadow-sm" />
//              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#28c840] border border-[#1fa733] shadow-sm" />
//           </div>
//           <div 
//             className="relative w-full h-full bg-[#1e1e1e] cursor-zoom-in"
//             onClick={onPreview}
//           >
//              <img
//                src={src}
//                alt={alt}
//                className="w-full h-full object-cover object-top transform transition-transform duration-700 group-hover/laptop:scale-[1.02]"
//              />
//              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/laptop:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                 <div className="bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
//                   <Maximize2 className="w-3 h-3" /> Click to Preview
//                 </div>
//              </div>
//              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-30 pointer-events-none" />
//           </div>
//         </div>
//         <div className="absolute bottom-[0.5%] left-1/2 -translate-x-1/2 text-[8px] text-white/10 font-medium tracking-widest uppercase">
//             MacBook Pro
//         </div>
//       </div>
//       <div className="relative -mt-[1px] mx-auto w-full">
//         <div className="h-[12px] md:h-[16px] w-full bg-[#151516] rounded-b-[10px] md:rounded-b-[16px] border-x border-b border-white/10 shadow-2xl relative z-10">
//             <div className="absolute top-0 inset-x-[2%] h-[1px] bg-white/20" />
//             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[15%] h-[40%] bg-[#0f0f10] rounded-b-md border-b border-x border-white/5" />
//         </div>
//         <div className="absolute -bottom-8 left-[5%] right-[5%] h-8 bg-black/80 blur-xl rounded-[100%]" />
//       </div>
//     </div>
//   );
// };

// // ==========================================
// // HELPER: Custom RAF Loop for VariableProximity
// // ==========================================
// function useRafLoop(callback: () => void) {
//   useEffect(() => {
//     let frameId: number;
//     const loop = () => {
//       callback();
//       frameId = requestAnimationFrame(loop);
//     };
//     frameId = requestAnimationFrame(loop);
//     return () => cancelAnimationFrame(frameId);
//   }, [callback]);
// }

// function useMousePositionRef(containerRef: MutableRefObject<HTMLElement | null>) {
//   const positionRef = useRef({ x: 0, y: 0 });
//   useEffect(() => {
//     const updatePosition = (x: number, y: number) => {
//       if (containerRef?.current) {
//         const rect = containerRef.current.getBoundingClientRect();
//         positionRef.current = { x: x - rect.left, y: y - rect.top };
//       } else {
//         positionRef.current = { x, y };
//       }
//     };
//     const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);
//     const handleTouchMove = (ev: TouchEvent) => {
//       const touch = ev.touches[0];
//       updatePosition(touch.clientX, touch.clientY);
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('touchmove', handleTouchMove);
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('touchmove', handleTouchMove);
//     };
//   }, [containerRef]);
//   return positionRef;
// }

// // ==========================================
// // COMPONENT: VariableProximity
// // ==========================================
// interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
//   label: string;
//   fromFontVariationSettings: string;
//   toFontVariationSettings: string;
//   containerRef: MutableRefObject<HTMLElement | null>;
//   radius?: number;
//   falloff?: 'linear' | 'exponential' | 'gaussian';
//   className?: string;
//   onClick?: () => void;
//   style?: CSSProperties;
// }

// const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
//   const {
//     label,
//     fromFontVariationSettings,
//     toFontVariationSettings,
//     containerRef,
//     radius = 50,
//     falloff = 'linear',
//     className = '',
//     onClick,
//     style,
//     ...restProps
//   } = props;

//   const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
//   const interpolatedSettingsRef = useRef<string[]>([]);
//   const mousePositionRef = useMousePositionRef(containerRef);
//   const lastPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

//   const parsedSettings = useMemo(() => {
//     const parseSettings = (settingsStr: string) =>
//       new Map(
//         settingsStr.split(',').map(s => s.trim()).map(s => {
//             const [name, value] = s.split(' ');
//             return [name.replace(/['"]/g, ''), parseFloat(value)];
//           })
//       );
//     const fromSettings = parseSettings(fromFontVariationSettings);
//     const toSettings = parseSettings(toFontVariationSettings);
//     return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
//       axis,
//       fromValue,
//       toValue: toSettings.get(axis) ?? fromValue
//     }));
//   }, [fromFontVariationSettings, toFontVariationSettings]);

//   const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
//     Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

//   const calculateFalloff = (distance: number) => {
//     const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
//     switch (falloff) {
//       case 'exponential': return norm ** 2;
//       case 'gaussian': return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
//       case 'linear': default: return norm;
//     }
//   };

//   useRafLoop(() => {
//     if (!containerRef?.current) return;
//     const { x, y } = mousePositionRef.current;
//     if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) return;
//     lastPositionRef.current = { x, y };
//     const containerRect = containerRef.current.getBoundingClientRect();

//     letterRefs.current.forEach((letterRef, index) => {
//       if (!letterRef) return;
//       const rect = letterRef.getBoundingClientRect();
//       const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
//       const letterCenterY = rect.top + rect.height / 2 - containerRect.top;
//       const distance = calculateDistance(mousePositionRef.current.x, mousePositionRef.current.y, letterCenterX, letterCenterY);
//       if (distance >= radius) {
//         letterRef.style.fontVariationSettings = fromFontVariationSettings;
//         return;
//       }
//       const falloffValue = calculateFalloff(distance);
//       const newSettings = parsedSettings
//         .map(({ axis, fromValue, toValue }) => {
//           const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
//           return `'${axis}' ${interpolatedValue}`;
//         })
//         .join(', ');
//       interpolatedSettingsRef.current[index] = newSettings;
//       letterRef.style.fontVariationSettings = newSettings;
//     });
//   });

//   const words = label.split(' ');
//   let letterIndex = 0;

//   return (
//     <span ref={ref} onClick={onClick} style={{ display: 'inline', fontFamily: '"Roboto Flex", sans-serif', ...style }} className={className} {...restProps}>
//       {words.map((word, wordIndex) => (
//         <span key={wordIndex} className="inline-block whitespace-nowrap">
//           {word.split('').map(letter => {
//             const currentLetterIndex = letterIndex++;
//             return (
//               <motion.span
//                 key={currentLetterIndex}
//                 ref={el => { letterRefs.current[currentLetterIndex] = el; }}
//                 style={{ display: 'inline-block', fontVariationSettings: interpolatedSettingsRef.current[currentLetterIndex] }}
//                 aria-hidden="true"
//               >
//                 {letter}
//               </motion.span>
//             );
//           })}
//           {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
//         </span>
//       ))}
//       <span className="sr-only">{label}</span>
//     </span>
//   );
// });
// VariableProximity.displayName = 'VariableProximity';

// // ==========================================
// // COMPONENT: ShinyText
// // ==========================================
// interface ShinyTextProps {
//   text: string;
//   disabled?: boolean;
//   speed?: number;
//   className?: string;
//   color?: string;
//   shineColor?: string;
//   spread?: number;
//   yoyo?: boolean;
//   pauseOnHover?: boolean;
//   direction?: 'left' | 'right';
//   delay?: number;
// }

// const ShinyText: React.FC<ShinyTextProps> = ({
//   text, disabled = false, speed = 2, className = '', color = '#b5b5b5', shineColor = '#ffffff', spread = 120, yoyo = false, pauseOnHover = false, direction = 'left', delay = 0
// }) => {
//   const [isPaused, setIsPaused] = useState(false);
//   const progress = useMotionValue(0);
//   const elapsedRef = useRef(0);
//   const lastTimeRef = useRef<number | null>(null);
//   const directionRef = useRef(direction === 'left' ? 1 : -1);
//   const animationDuration = speed * 1000;
//   const delayDuration = delay * 1000;

//   useAnimationFrame(time => {
//     if (disabled || isPaused) { lastTimeRef.current = null; return; }
//     if (lastTimeRef.current === null) { lastTimeRef.current = time; return; }
//     const deltaTime = time - lastTimeRef.current;
//     lastTimeRef.current = time;
//     elapsedRef.current += deltaTime;

//     if (yoyo) {
//       const cycleDuration = animationDuration + delayDuration;
//       const fullCycle = cycleDuration * 2;
//       const cycleTime = elapsedRef.current % fullCycle;
//       if (cycleTime < animationDuration) {
//         const p = (cycleTime / animationDuration) * 100;
//         progress.set(directionRef.current === 1 ? p : 100 - p);
//       } else if (cycleTime < cycleDuration) {
//         progress.set(directionRef.current === 1 ? 100 : 0);
//       } else if (cycleTime < cycleDuration + animationDuration) {
//         const reverseTime = cycleTime - cycleDuration;
//         const p = 100 - (reverseTime / animationDuration) * 100;
//         progress.set(directionRef.current === 1 ? p : 100 - p);
//       } else {
//         progress.set(directionRef.current === 1 ? 0 : 100);
//       }
//     } else {
//       const cycleDuration = animationDuration + delayDuration;
//       const cycleTime = elapsedRef.current % cycleDuration;
//       if (cycleTime < animationDuration) {
//         const p = (cycleTime / animationDuration) * 100;
//         progress.set(directionRef.current === 1 ? p : 100 - p);
//       } else {
//         progress.set(directionRef.current === 1 ? 100 : 0);
//       }
//     }
//   });

//   useEffect(() => {
//     directionRef.current = direction === 'left' ? 1 : -1;
//     elapsedRef.current = 0;
//     progress.set(0);
//   }, [direction]);

//   const handleMouseEnter = useCallback(() => { if (pauseOnHover) setIsPaused(true); }, [pauseOnHover]);
//   const handleMouseLeave = useCallback(() => { if (pauseOnHover) setIsPaused(false); }, [pauseOnHover]);

//   const gradientStyle: React.CSSProperties = {
//     backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
//     backgroundSize: '200% auto',
//     WebkitBackgroundClip: 'text',
//     backgroundClip: 'text',
//     WebkitTextFillColor: 'transparent'
//   };

//   return (
//     <motion.span
//       className={`inline-block ${className}`}
//       style={{ ...gradientStyle, backgroundPosition: useTransform(progress, p => `${150 - p * 2}% center`) }}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {text}
//     </motion.span>
//   );
// };

// // ==========================================
// // COMPONENT: TextLoop
// // ==========================================
// const TextLoop = () => {
//   const [index, setIndex] = useState(0);
//   const items = [
//     "Curated PYQs to help you study what actually appears.",
//     "No clutter. No distractions. Just questions.",
//     "Learn From the Questions That Matter.",
//     "Stop Guessing. Start Practicing.",
//     "One platform. All PYQs. Zero confusion"
//   ];
//   useEffect(() => {
//     const timer = setInterval(() => { setIndex((prev) => (prev + 1) % items.length); }, 3500);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative h-12 w-full overflow-hidden flex justify-center items-center">
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={index}
//           initial={{ y: 20, opacity: 0, filter: 'blur(5px)' }}
//           animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
//           exit={{ y: -20, opacity: 0, filter: 'blur(5px)' }}
//           transition={{ duration: 0.5, ease: "easeInOut" }}
//           className="absolute w-full px-4"
//         >
//           <ShinyText 
//             text={items[index]}
//             disabled={false}
//             speed={3}
//             className="text-xl md:text-2xl font-normal"
//             color="#a1a1aa" 
//             shineColor="#ffffff" 
//           />
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// // ==========================================
// // DATA: Feature Sections
// // ==========================================
// const features = [
//   {
//     id: 1,
//     title: "PYQ Vault",
//     subtitle: "All Previous Year Questions. One Powerful Library.",
//     description: "Access a centralized vault of Previous Year Question Papers for all years, all exams, and the autonomous pattern. Study exactly what has appeared before and practice with confidence.",
//     tags: ["PYQs for Every Year", "All Exams Covered", "Distraction-Free"],
//     // image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
//     image: "https://iili.io/fOpPV3J.png",
//     icon: <BookOpen className="w-6 h-6 text-[#00ddeb]" />, 
//     color: "from-[#00ddeb]/20",
//     link: "/pyqs",
//     cta: "Enter Vault"
//   },
//   {
//     id: 2,
//     title: "Smart Dashboard",
//     subtitle: "Track Progress. Stay Consistent. Prepare Smarter.",
//     description: "Your personal space to monitor progress, maintain study streaks, and stay exam-ready. Everything you need to plan, track, and improve—at one place.",
//     tags: ["Streak Tracking", "Subject-wise Progress", "Exam Countdown"],
//     image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
//     icon: <Activity className="w-6 h-6 text-[#28c840]" />, 
//     color: "from-[#28c840]/20",
//     link: "/dashboard",
//     cta: "Go to Dashboard"
//   },
//   {
//     id: 3,
//     title: "Live Updates",
//     subtitle: "Never Miss an Exam or a New Paper.",
//     description: "Stay informed with real-time exam updates, new PYQ uploads, and important platform announcements—so you’re always a step ahead.",
//     tags: ["Exam Notifications", "New Upload Alerts", "Platform Updates"],
//     image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2573&auto=format&fit=crop",
//     icon: <Sparkles className="w-6 h-6 text-[#febc2e]" />, 
//     color: "from-[#febc2e]/20",
//     link: "/updates",
//     cta: "View Updates"
//   },
// ];

// // ==========================================
// // COMPONENT: Feature Row (Seamless)
// // ==========================================
// const FeatureRow = ({ data, index }: { data: typeof features[0]; index: number }) => {
//   const isEven = index % 2 === 0;
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);

//   // 1. Ref for the Container (Tracks both scroll AND mouse for proximity)
//   const rowContainerRef = useRef<HTMLDivElement>(null);

//   // 2. Track scroll for this row for the Parallax Title
//   const { scrollYProgress } = useScroll({
//     target: rowContainerRef,
//     offset: ["start end", "end start"],
//   });

//   // 3. Transform scroll progress to horizontal movement (Parallax)
//   const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", isEven ? "5%" : "-5%"]);

//   return (
//     <>
//       <ImagePreviewModal 
//         src={data.image} 
//         alt={data.title} 
//         isOpen={isPreviewOpen} 
//         onClose={() => setIsPreviewOpen(false)} 
//       />

//       <div 
//         ref={rowContainerRef} 
//         className="relative z-10 w-full flex items-center justify-center py-20 lg:py-32 bg-transparent"
//       >
//         <div className="container mx-auto px-6 lg:px-12">
//           <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>

//             {/* TEXT SIDE */}
//             <motion.div
//               initial={{ opacity: 0, x: isEven ? -50 : 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//               viewport={{ once: true, margin: "-100px" }}
//               className="w-full lg:w-1/2 space-y-8"
//             >
//               <h2 className="text-4xl md:text-5xl font-bold leading-tight pb-1">
//                  <motion.span 
//                    style={{ x: xTransform, display: "inline-block" }}
//                    className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 font-sans whitespace-nowrap"
//                  >
//                    {data.title}
//                  </motion.span>
//               </h2>

//               <div className="text-lg md:text-xl font-medium">
//                 <ShinyText 
//                     text={data.subtitle} 
//                     disabled={false} 
//                     speed={3} 
//                     className="" 
//                     color="#a1a1aa" 
//                     shineColor="#00ddeb"
//                 />
//               </div>

//               <div className="text-lg text-muted-foreground leading-relaxed cursor-default">
//                  <VariableProximity
//                    label={data.description}
//                    className="block"
//                    fromFontVariationSettings="'wght' 400, 'opsz' 10"
//                    toFontVariationSettings="'wght' 700, 'opsz' 12" 
//                    containerRef={rowContainerRef}
//                    radius={80} 
//                    falloff="linear"
//                   />
//               </div>

//               <div className="flex flex-wrap gap-3">
//                 {data.tags.map((tag, i) => (
//                   <div key={i} className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-lg border border-white/5 shadow-inner backdrop-blur-sm">
//                     <CheckCircle2 className="w-4 h-4 text-[#00ddeb]" />
//                     {tag}
//                   </div>
//                 ))}
//               </div>

//               <Link to={data.link}>
//                 <Button 
//                   variant="outline" 
//                   className="h-12 px-8 rounded-full border-white/10 hover:bg-white/10 hover:text-[#00ddeb] transition-all group backdrop-blur-md bg-white/5"
//                 >
//                   {data.cta}
//                   <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </Link>
//             </motion.div>

//             {/* IMAGE SIDE */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 50 }}
//               whileInView={{ opacity: 1, scale: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               viewport={{ once: true, margin: "-100px" }}
//               className="w-full lg:w-1/2 relative perspective-1000"
//             >
//               <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr ${data.color} to-transparent blur-[100px] rounded-full -z-10 opacity-60`} />
//               <MacbookMockup 
//                 src={data.image} 
//                 alt={data.title} 
//                 onPreview={() => setIsPreviewOpen(true)}
//               />
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// // ==========================================
// // MAIN COMPONENT: Hero Section
// // ==========================================
// const HeroSection = () => {
//   const containerRef = useRef<HTMLDivElement>(null); 
//   const { scrollYProgress } = useScroll(); // Global scroll

//   const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

//   return (
//     // ROOT: Uses absolute positioning for background to ensure seamlessness
//     <div className="relative w-full min-h-screen bg-black selection:bg-[#00ddeb]/30 overflow-x-hidden">
//       <style>
//         {`
//         @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap');

//         /* STATIC STAR BACKGROUND CSS */
//         .stars-static {
//           background-image: 
//             radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
//             radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
//             radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
//             radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
//             radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)),
//             radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0));
//           background-repeat: repeat;
//           background-size: 200px 200px;
//           animation: twinkle 5s ease-in-out infinite;
//           opacity: 0.3;
//         }

//         @keyframes twinkle {
//           0% { opacity: 0.3; }
//           50% { opacity: 0.6; }
//           100% { opacity: 0.3; }
//         }
//         `}
//       </style>

//       {/* 1. FIXED BACKGROUND LAYER */}
//       <div className="fixed inset-0 z-0 pointer-events-none bg-black">
//          {/* Deep space radial gradient base */}
//          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_80%)]" />

//          {/* Static twinkling stars (The 'ideal' stars backdrop) */}
//          <div className="stars-static absolute inset-0" />

//          {/* Moving Shooting Stars - Layer 1 (Cyan Theme) */}
//          <ShootingStars
//            starColor="#00ddeb"
//            trailColor="#2EB9DF"
//            minSpeed={15}
//            maxSpeed={35}
//            minDelay={1000}
//            maxDelay={3000}
//          />

//          {/* Moving Shooting Stars - Layer 2 (Purple Theme) */}
//          <ShootingStars
//            starColor="#af40ff"
//            trailColor="#5b42f3"
//            minSpeed={10}
//            maxSpeed={25}
//            minDelay={2000}
//            maxDelay={4000}
//          />

//          {/* Moving Shooting Stars - Layer 3 (White/Blue Theme) */}
//          <ShootingStars
//            starColor="#ffffff"
//            trailColor="#00ddeb"
//            minSpeed={20}
//            maxSpeed={40}
//            minDelay={1500}
//            maxDelay={3500}
//          />
//       </div>

//       {/* 2. SCROLLABLE CONTENT LAYER */}
//       <div className="relative z-10 w-full flex flex-col">

//         {/* HERO */}
//         <section 
//           ref={containerRef} 
//           className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-[15vh] pb-20"
//         >
//           <motion.div 
//             style={{ opacity, scale }}
//             className="container mx-auto text-center space-y-8"
//           >
//              <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//             >
//               <h1 
//                 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-center max-w-5xl mx-auto cursor-default"
//                 style={{ lineHeight: 1.1 }}
//               >
//                 <VariableProximity
//                   label="Practice Smarter"
//                   className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/40"
//                   fromFontVariationSettings="'wght' 400, 'opsz' 9"
//                   toFontVariationSettings="'wght' 900, 'opsz' 40"
//                   containerRef={containerRef}
//                   radius={100}
//                   falloff="linear"
//                 />
//                 <br className="hidden md:block" />
//                 <VariableProximity
//                   label="Learn From Real Exam Questions"
//                   className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/40"
//                   fromFontVariationSettings="'wght' 400, 'opsz' 9"
//                   toFontVariationSettings="'wght' 900, 'opsz' 40"
//                   containerRef={containerRef}
//                   radius={100}
//                   falloff="linear"
//                 />
//               </h1>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="max-w-2xl mx-auto"
//             >
//               <TextLoop />
//             </motion.div>

//             <motion.div 
//                initial={{ opacity: 0, y: 20 }}
//                animate={{ opacity: 1, y: 0 }}
//                transition={{ duration: 0.5, delay: 0.3 }}
//                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
//             >
//               <CosmicButton />
//             </motion.div>
//           </motion.div>
//           <ScrollDownIndicator />
//         </section>

//         {/* FEATURES - Seamless List */}
//         <div className="flex flex-col">
//           {features.map((feature, index) => (
//             <FeatureRow key={feature.id} data={feature} index={index} />
//           ))}
//         </div>

//         {/* Bottom Spacer */}
//         <div className="h-24" />
//       </div>
//     </div>
//   );
// };

// export default HeroSection;




















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
import { useTheme } from 'next-themes';

// ==================================================================================
// 1. CUSTOM STARS BACKGROUND (Fixed Types, Reversed Direction, Low Density)
// ==================================================================================

// FIX: Use HTMLMotionProps<'div'> to satisfy framer-motion types
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
      // REVERSED DIRECTION: Moving from -2000 to 0 makes stars flow DOWN
      animate={{ y: [-2000, 0] }}
      transition={transition}
      className={cn('absolute top-0 left-0 w-full h-[2000px]', className)}
      {...props}
    >
      <div
        className="absolute bg-transparent rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
      <div
        className="absolute bg-transparent rounded-full top-[2000px]"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
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
        'relative size-full overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_#1a1a1a_0%,_#000_100%)]',
        className,
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className={cn("w-full h-full", { 'pointer-events-none': !pointerEvents })}
      >
        {/* Layer 1: Small, slow, VERY LOW DENSITY (150 count) */}
        <StarLayer
          count={150}
          size={1}
          transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
          starColor={starColor}
        />
        {/* Layer 2: Medium, faster, 50 count */}
        <StarLayer
          count={50}
          size={2}
          transition={{
            repeat: Infinity,
            duration: speed * 0.8,
            ease: 'linear',
          }}
          starColor={starColor}
        />
        {/* Layer 3: Large, fastest, 20 count */}
        <StarLayer
          count={20}
          size={3}
          transition={{
            repeat: Infinity,
            duration: speed * 0.6,
            ease: 'linear',
          }}
          starColor={starColor}
        />
      </motion.div>
      {children}
    </div>
  );
}

// ==========================================
// 2. HELPER COMPONENTS (Modals, Buttons, etc.)
// ==========================================

const ImagePreviewModal = ({ src, alt, isOpen, onClose }: { src: string; alt: string; isOpen: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
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
            <img
              src={src}
              alt={alt}
              className="w-auto h-auto max-h-[85vh] max-w-full rounded-lg shadow-2xl border border-white/10 object-contain"
            />
            <div className="absolute -bottom-10 text-white/50 text-sm font-medium tracking-widest uppercase">
              {alt} Preview
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ScrollDownIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none"
    >
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-light">
        Scroll
      </span>
      <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent relative overflow-hidden">
        <motion.div
          animate={{ y: [-20, 40] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.5
          }}
          className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#00ddeb] to-transparent"
        />
      </div>
    </motion.div>
  );
};

const CosmicButton = () => {
  return (
    <Link to="/pyqs" className="pointer-events-auto">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group cursor-pointer"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ddeb] via-[#5b42f3] to-[#af40ff] rounded-full blur opacity-30 group-hover:opacity-75 transition duration-500 group-hover:duration-200" />
        <div className="relative flex items-center gap-3 px-8 py-4 bg-black/90 rounded-full ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
          <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 group-hover:to-white">
            Explore PYQs
          </span>
          <ArrowRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 group-hover:text-[#00ddeb] transition-all duration-300" />
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </motion.div>
    </Link>
  );
};

interface MacbookMockupProps {
  src: string;
  alt: string;
  onPreview: () => void;
}

const MacbookMockup = ({ src, alt, onPreview }: MacbookMockupProps) => {
  return (
    <div className="relative w-full max-w-[90%] md:max-w-full mx-auto perspective-[2000px] group/laptop pointer-events-auto">
      <div className="relative bg-[#0f0f10] rounded-[14px] p-[2%] ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] border-t border-white/5">
        <div className="relative w-full aspect-[16/10] bg-black rounded-[6px] overflow-hidden border border-white/5 shadow-inner">
          <div className="absolute top-3 left-3 md:top-4 md:left-4 flex gap-1.5 md:gap-2 z-20 pointer-events-none">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f57] border border-[#e33e32] shadow-sm" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#febc2e] border border-[#dba026] shadow-sm" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#28c840] border border-[#1fa733] shadow-sm" />
          </div>
          <div
            className="relative w-full h-full bg-[#1e1e1e] cursor-zoom-in"
            onClick={onPreview}
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover object-top transform transition-transform duration-700 group-hover/laptop:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/laptop:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                <Maximize2 className="w-3 h-3" /> Click to Preview
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-30 pointer-events-none" />
          </div>
        </div>
        <div className="absolute bottom-[0.5%] left-1/2 -translate-x-1/2 text-[8px] text-white/10 font-medium tracking-widest uppercase">
          MacBook Pro
        </div>
      </div>
      <div className="relative -mt-[1px] mx-auto w-full">
        <div className="h-[12px] md:h-[16px] w-full bg-[#151516] rounded-b-[10px] md:rounded-b-[16px] border-x border-b border-white/10 shadow-2xl relative z-10">
          <div className="absolute top-0 inset-x-[2%] h-[1px] bg-white/20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[15%] h-[40%] bg-[#0f0f10] rounded-b-md border-b border-x border-white/5" />
        </div>
        <div className="absolute -bottom-8 left-[5%] right-[5%] h-8 bg-black/80 blur-xl rounded-[100%]" />
      </div>
    </div>
  );
};

// ==========================================
// 3. TEXT ANIMATIONS (VariableProximity, ShinyText, Loop)
// ==========================================

function useRafLoop(callback: () => void) {
  useEffect(() => {
    let frameId: number;
    const loop = () => {
      callback();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);
}

function useMousePositionRef(containerRef: MutableRefObject<HTMLElement | null>) {
  const positionRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };
    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef]);
  return positionRef;
}

interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: MutableRefObject<HTMLElement | null>;
  radius?: number;
  falloff?: 'linear' | 'exponential' | 'gaussian';
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 50,
    falloff = 'linear',
    className = '',
    onClick,
    style,
    ...restProps
  } = props;

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const interpolatedSettingsRef = useRef<string[]>([]);
  const mousePositionRef = useMousePositionRef(containerRef);
  const lastPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr: string) =>
      new Map(
        settingsStr.split(',').map(s => s.trim()).map(s => {
          const [name, value] = s.split(' ');
          return [name.replace(/['"]/g, ''), parseFloat(value)];
        })
      );
    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);
    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const calculateFalloff = (distance: number) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    switch (falloff) {
      case 'exponential': return norm ** 2;
      case 'gaussian': return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      case 'linear': default: return norm;
    }
  };

  useRafLoop(() => {
    if (!containerRef?.current) return;
    const { x, y } = mousePositionRef.current;
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) return;
    lastPositionRef.current = { x, y };
    const containerRect = containerRef.current.getBoundingClientRect();

    letterRefs.current.forEach((letterRef, index) => {
      if (!letterRef) return;
      const rect = letterRef.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
      const letterCenterY = rect.top + rect.height / 2 - containerRect.top;
      const distance = calculateDistance(mousePositionRef.current.x, mousePositionRef.current.y, letterCenterX, letterCenterY);
      if (distance >= radius) {
        letterRef.style.fontVariationSettings = fromFontVariationSettings;
        return;
      }
      const falloffValue = calculateFalloff(distance);
      const newSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
          return `'${axis}' ${interpolatedValue}`;
        })
        .join(', ');
      interpolatedSettingsRef.current[index] = newSettings;
      letterRef.style.fontVariationSettings = newSettings;
    });
  });

  const words = label.split(' ');
  let letterIndex = 0;

  return (
    <span ref={ref} onClick={onClick} style={{ display: 'inline', fontFamily: '"Roboto Flex", sans-serif', ...style }} className={className} {...restProps}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map(letter => {
            const currentLetterIndex = letterIndex++;
            return (
              <motion.span
                key={currentLetterIndex}
                ref={el => { letterRefs.current[currentLetterIndex] = el; }}
                style={{ display: 'inline-block', fontVariationSettings: interpolatedSettingsRef.current[currentLetterIndex] }}
                aria-hidden="true"
              >
                {letter}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});
VariableProximity.displayName = 'VariableProximity';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
  delay?: number;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text, disabled = false, speed = 2, className = '', color = '#b5b5b5', shineColor = '#ffffff', spread = 120, yoyo = false, pauseOnHover = false, direction = 'left', delay = 0
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const directionRef = useRef(direction === 'left' ? 1 : -1);
  const animationDuration = speed * 1000;
  const delayDuration = delay * 1000;

  useAnimationFrame(time => {
    if (disabled || isPaused) { lastTimeRef.current = null; return; }
    if (lastTimeRef.current === null) { lastTimeRef.current = time; return; }
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    if (yoyo) {
      const cycleDuration = animationDuration + delayDuration;
      const fullCycle = cycleDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;
      if (cycleTime < animationDuration) {
        const p = (cycleTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else if (cycleTime < cycleDuration) {
        progress.set(directionRef.current === 1 ? 100 : 0);
      } else if (cycleTime < cycleDuration + animationDuration) {
        const reverseTime = cycleTime - cycleDuration;
        const p = 100 - (reverseTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else {
        progress.set(directionRef.current === 1 ? 0 : 100);
      }
    } else {
      const cycleDuration = animationDuration + delayDuration;
      const cycleTime = elapsedRef.current % cycleDuration;
      if (cycleTime < animationDuration) {
        const p = (cycleTime / animationDuration) * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else {
        progress.set(directionRef.current === 1 ? 100 : 0);
      }
    }
  });

  useEffect(() => {
    directionRef.current = direction === 'left' ? 1 : -1;
    elapsedRef.current = 0;
    progress.set(0);
  }, [direction]);

  const handleMouseEnter = useCallback(() => { if (pauseOnHover) setIsPaused(true); }, [pauseOnHover]);
  const handleMouseLeave = useCallback(() => { if (pauseOnHover) setIsPaused(false); }, [pauseOnHover]);

  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{ ...gradientStyle, backgroundPosition: useTransform(progress, p => `${150 - p * 2}% center`) }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </motion.span>
  );
};

const TextLoop = () => {
  const [index, setIndex] = useState(0);
  const items = [
    "Curated PYQs to help you study what actually appears.",
    "No clutter. No distractions. Just questions.",
    "Learn From the Questions That Matter.",
    "Stop Guessing. Start Practicing.",
    "One platform. All PYQs. Zero confusion"
  ];
  useEffect(() => {
    const timer = setInterval(() => { setIndex((prev) => (prev + 1) % items.length); }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-12 w-full overflow-hidden flex justify-center items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0, filter: 'blur(5px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -20, opacity: 0, filter: 'blur(5px)' }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute w-full px-4"
        >
          <ShinyText
            text={items[index]}
            disabled={false}
            speed={3}
            className="text-xl md:text-2xl font-normal"
            color="#a1a1aa"
            shineColor="#ffffff"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// 4. MAIN HERO SECTION LOGIC
// ==========================================

const features = [
  {
    id: 1,
    title: "PYQ Vault",
    subtitle: "All Previous Year Questions. One Powerful Library.",
    description: "Access a centralized vault of Previous Year Question Papers for all years, all exams, and the autonomous pattern. Study exactly what has appeared before and practice with confidence.",
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
    description: "Your personal space to monitor progress, maintain study streaks, and stay exam-ready. Everything you need to plan, track, and improve—at one place.",
    tags: ["Streak Tracking", "Subject-wise Progress", "Exam Countdown"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
    icon: <Activity className="w-6 h-6 text-[#28c840]" />,
    color: "from-[#28c840]/20",
    link: "/dashboard",
    cta: "Go to Dashboard"
  },
  {
    id: 3,
    title: "Live Updates",
    subtitle: "Never Miss an Exam or a New Paper.",
    description: "Stay informed with real-time exam updates, new PYQ uploads, and important platform announcements—so you’re always a step ahead.",
    tags: ["Exam Notifications", "New Upload Alerts", "Platform Updates"],
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2573&auto=format&fit=crop",
    icon: <Sparkles className="w-6 h-6 text-[#febc2e]" />,
    color: "from-[#febc2e]/20",
    link: "/updates",
    cta: "View Updates"
  },
];

const FeatureRow = ({ data, index }: { data: typeof features[0]; index: number }) => {
  const isEven = index % 2 === 0;
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // 1. Ref for the Container (Tracks both scroll AND mouse for proximity)
  const rowContainerRef = useRef<HTMLDivElement>(null);

  // 2. Track scroll for this row for the Parallax Title
  const { scrollYProgress } = useScroll({
    target: rowContainerRef,
    offset: ["start end", "end start"],
  });

  // 3. Transform scroll progress to horizontal movement (Parallax)
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", isEven ? "5%" : "-5%"]);

  return (
    <>
      <ImagePreviewModal
        src={data.image}
        alt={data.title}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />

      <div
        ref={rowContainerRef}
        className="relative z-10 w-full flex items-center justify-center py-20 lg:py-32 bg-transparent pointer-events-none"
      >
        <div className="container mx-auto px-6 lg:px-12 pointer-events-none">
          <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>

            {/* TEXT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full lg:w-1/2 space-y-8 pointer-events-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold leading-tight pb-1">
                <motion.span
                  style={{ x: xTransform, display: "inline-block" }}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 font-sans whitespace-nowrap"
                >
                  {data.title}
                </motion.span>
              </h2>

              <div className="text-lg md:text-xl font-medium">
                <ShinyText
                  text={data.subtitle}
                  disabled={false}
                  speed={3}
                  className=""
                  color="#a1a1aa"
                  shineColor="#00ddeb"
                />
              </div>

              <div className="text-lg text-muted-foreground leading-relaxed cursor-default">
                <VariableProximity
                  label={data.description}
                  className="block"
                  fromFontVariationSettings="'wght' 400, 'opsz' 10"
                  toFontVariationSettings="'wght' 700, 'opsz' 12"
                  containerRef={rowContainerRef}
                  radius={80}
                  falloff="linear"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                {data.tags.map((tag, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-lg border border-white/5 shadow-inner backdrop-blur-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#00ddeb]" />
                    {tag}
                  </div>
                ))}
              </div>

              <Link to={data.link}>
                <Button
                  variant="outline"
                  className="h-12 px-8 rounded-full border-white/10 hover:bg-white/10 hover:text-[#00ddeb] transition-all group backdrop-blur-md bg-white/5"
                >
                  {data.cta}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            {/* IMAGE SIDE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full lg:w-1/2 relative perspective-1000 pointer-events-auto"
            >
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr ${data.color} to-transparent blur-[100px] rounded-full -z-10 opacity-60`} />
              <MacbookMockup
                src={data.image}
                alt={data.title}
                onPreview={() => setIsPreviewOpen(true)}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll(); // Global scroll
  const { resolvedTheme } = useTheme();

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    // ROOT: Uses absolute positioning for background to ensure seamlessness
    <div className="relative w-full bg-black overflow-x-hidden min-h-screen">

      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap');
        `}
      </style>

      {/* 1. BLENDED BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        {/* Base Star Field (Interative) */}
        <StarsBackground
          starColor="#FFFFFF"
          factor={0.02} // Sensitivity of hover movement
          speed={80} // Slower speed for distant stars
          className={cn(
            'absolute inset-0 flex items-center justify-center pointer-events-auto', // pointer-events-auto here enables the hover effect
            'bg-[radial-gradient(ellipse_at_bottom,_#1a1a1a_0%,_#000_100%)]',
          )}
        />

        {/* Moving Shooting Stars - Layer 1 (Cyan Theme) */}
        <div className="absolute inset-0 pointer-events-none mix-blend-screen">
          <ShootingStars
            starColor="#00ddeb"
            trailColor="#2EB9DF"
            minSpeed={15}
            maxSpeed={35}
            minDelay={1000}
            maxDelay={3000}
          />
        </div>

        {/* Moving Shooting Stars - Layer 2 (Purple Theme) */}
        <div className="absolute inset-0 pointer-events-none mix-blend-screen">
          <ShootingStars
            starColor="#af40ff"
            trailColor="#5b42f3"
            minSpeed={10}
            maxSpeed={25}
            minDelay={2000}
            maxDelay={4000}
          />
        </div>

        {/* Moving Shooting Stars - Layer 3 (White/Blue Theme) */}
        <div className="absolute inset-0 pointer-events-none mix-blend-screen">
          <ShootingStars
            starColor="#ffffff"
            trailColor="#00ddeb"
            minSpeed={20}
            maxSpeed={40}
            minDelay={1500}
            maxDelay={3500}
          />
        </div>
      </div>

      {/* 2. SCROLLABLE CONTENT LAYER */}
      {/* pointer-events-none on container so mouse passes through to stars, but enabled on children */}
      <div className="relative z-10 w-full flex flex-col pointer-events-none">

        {/* HERO */}
        <section
          ref={containerRef}
          className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-[15vh] pb-20"
        >
          <motion.div
            style={{ opacity, scale }}
            className="container mx-auto text-center space-y-8 pointer-events-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-center max-w-5xl mx-auto cursor-default"
                style={{ lineHeight: 1.1 }}
              >
                <VariableProximity
                  label=" Smarter"
                  className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/40"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 900, 'opsz' 40"
                  containerRef={containerRef}
                  radius={100}
                  falloff="linear"
                />
                <br className="hidden md:block" />
                <VariableProximity
                  label="Learn From Real Exam Questions"
                  className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/40"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 900, 'opsz' 40"
                  containerRef={containerRef}
                  radius={100}
                  falloff="linear"
                />
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <TextLoop />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <CosmicButton />
            </motion.div>
          </motion.div>
          <ScrollDownIndicator />
        </section>

        {/* FEATURES - Seamless List */}
        <div className="flex flex-col">
          {features.map((feature, index) => (
            <FeatureRow key={feature.id} data={feature} index={index} />
          ))}
        </div>

        {/* Bottom Spacer */}
        <div className="h-24" />
      </div>
    </div>
  );
};

export default HeroSection;