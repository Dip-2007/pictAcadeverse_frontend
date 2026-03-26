// import React, { useRef, useState, useEffect, Children, cloneElement } from 'react';
// import { Link } from "react-router-dom";
// import {
//   GraduationCap,
//   Instagram,
//   Mail,
//   MessageSquare,
//   Send,
//   ArrowUpRight,
//   Github,
//   Linkedin,
//   X,
//   User // Unified Member Icon
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { 
//   motion, 
//   useMotionValue, 
//   useSpring, 
//   useTransform, 
//   AnimatePresence, 
//   MotionValue, 
//   SpringOptions 
// } from "framer-motion";

// // ==================================================================================
// // DOCK LOGIC (Physics Based Animation)
// // ==================================================================================

// type DockItemProps = {
//   children: React.ReactNode;
//   className?: string;
//   onClick?: () => void;
//   mouseX: MotionValue<number>;
//   spring: SpringOptions;
//   distance: number;
//   baseItemSize: number;
//   magnification: number;
// };

// function DockItem({
//   children,
//   className = '',
//   onClick,
//   mouseX,
//   spring,
//   distance,
//   magnification,
//   baseItemSize
// }: DockItemProps) {
//   const ref = useRef<HTMLDivElement>(null);
//   const isHovered = useMotionValue(0);

//   const mouseDistance = useTransform(mouseX, val => {
//     const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
//     return val - rect.x - baseItemSize / 2;
//   });

//   const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
//   const size = useSpring(targetSize, spring);

//   return (
//     <motion.div
//       ref={ref}
//       style={{ width: size, height: size }}
//       onHoverStart={() => isHovered.set(1)}
//       onHoverEnd={() => isHovered.set(0)}
//       onClick={onClick}
//       className={`relative inline-flex items-center justify-center rounded-full border-2 border-white/10 bg-[#0f0f10] shadow-lg cursor-pointer transition-colors z-20 ${className}`}
//     >
//       {Children.map(children, child =>
//         React.isValidElement(child)
//           ? cloneElement(child as React.ReactElement<any>, { isHovered })
//           : child
//       )}
//     </motion.div>
//   );
// }

// // The Popup Bubble for Social Icons
// function DockSocialPopup({ isHovered, label, role, socials }: { isHovered?: MotionValue<number>; label: string; role: string; socials: any }) {
//   const [isOpen, setIsOpen] = useState(false);
  
//   useEffect(() => {
//     if (!isHovered) return;
//     const unsubscribe = isHovered.on('change', latest => setIsOpen(latest === 1));
//     return () => unsubscribe();
//   }, [isHovered]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: 10, x: "-50%", scale: 0.9 }}
//           animate={{ opacity: 1, y: -24, x: "-50%", scale: 1 }}
//           exit={{ opacity: 0, y: 10, x: "-50%", scale: 0.9 }}
//           transition={{ duration: 0.2, ease: "easeOut" }}
//           className="absolute -top-12 left-1/2 w-max flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl p-3 shadow-2xl z-50 pointer-events-auto"
//         >
//           {/* Label Section */}
//           <div className="text-center">
//             <span className="block text-[10px] font-bold text-white/90 tracking-wide uppercase">
//               {label}
//             </span>
//             <span className="block text-[8px] text-slate-400 font-medium">
//               {role}
//             </span>
//           </div>
          
//           <div className="w-full h-px bg-white/10" />

//           {/* Social Icons */}
//           <div className="flex items-center gap-3 px-1">
//              <a href={socials?.github} className="text-slate-400 hover:text-white transition-colors hover:scale-125 transform"><Github className="w-3.5 h-3.5" /></a>
//              <a href={socials?.linkedin} className="text-slate-400 hover:text-[#00ddeb] transition-colors hover:scale-125 transform"><Linkedin className="w-3.5 h-3.5" /></a>
//              <a href={socials?.instagram} className="text-slate-400 hover:text-pink-500 transition-colors hover:scale-125 transform"><Instagram className="w-3.5 h-3.5" /></a>
//           </div>
          
//           {/* Arrow */}
//           <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a0a0a]/95 rotate-45 border-r border-b border-white/10"></div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// function DockIcon({ children, className = '' }: { children: React.ReactNode; className?: string }) {
//   return <div className={`flex items-center justify-center ${className}`}>{children}</div>;
// }

// function Dock({
//   items,
//   className = '',
//   spring = { mass: 0.1, stiffness: 150, damping: 12 },
//   magnification = 60,
//   distance = 140,
//   panelHeight = 64,
//   baseItemSize = 40
// }: { items: any[]; className?: string; spring?: SpringOptions; magnification?: number; distance?: number; panelHeight?: number; baseItemSize?: number }) {
//   const mouseX = useMotionValue(Infinity);
//   const isHovered = useMotionValue(0);

//   return (
//     <motion.div className="flex items-center w-full h-full justify-center">
//       <motion.div
//         onMouseMove={({ pageX }) => {
//           isHovered.set(1);
//           mouseX.set(pageX);
//         }}
//         onMouseLeave={() => {
//           isHovered.set(0);
//           mouseX.set(Infinity);
//         }}
//         className={`${className} flex items-end gap-6 pb-2 pt-4 px-4`} 
//         style={{ height: panelHeight }} 
//       >
//         {items.map((item, index) => (
//           <DockItem
//             key={index}
//             onClick={item.onClick}
//             className={item.className}
//             mouseX={mouseX}
//             spring={spring}
//             distance={distance}
//             magnification={magnification}
//             baseItemSize={baseItemSize}
//           >
//             <DockIcon className="text-white/80 group-hover:text-white transition-colors">{item.icon}</DockIcon>
//             <DockSocialPopup label={item.label} role={item.role} socials={item.socials} />
//           </DockItem>
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// }

// // ==================================================================================
// // LEGAL MODAL
// // ==================================================================================

// const LegalModal = ({ title, content, isOpen, onClose }: { title: string; content: React.ReactNode; isOpen: boolean; onClose: () => void }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
//           onClick={onClose}
//         >
//           <motion.div
//             initial={{ scale: 0.95, opacity: 0, y: 20 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.95, opacity: 0, y: 20 }}
//             onClick={(e) => e.stopPropagation()}
//             className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
//           >
//             <div className="relative flex items-center justify-center p-6 border-b border-white/10 bg-white/[0.02]">
//               <h3 className="text-lg font-bold text-white text-center tracking-wide">{title}</h3>
//               <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="p-8 text-sm text-slate-300 leading-relaxed space-y-4 text-center overflow-y-auto custom-scrollbar">
//               {content}
//             </div>
//             <div className="p-4 bg-white/[0.02] border-t border-white/10 flex justify-center">
//               <Button onClick={onClose} variant="secondary" className="h-8 text-xs bg-white/10 hover:bg-white/20 text-white border-none">Close</Button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// // ==================================================================================
// // FOOTER COMPONENT
// // ==================================================================================

// const Footer = () => {
//   const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
//   const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

//   // Team Data
//   const teamItems = [
//     { 
//       icon: <User className="w-full h-full p-2.5" />, 
//       label: "Alex", 
//       role: "Frontend",
//       className: "bg-black hover:bg-white/10 hover:border-[#00ddeb] text-white hover:text-[#00ddeb]",
//       socials: { github: "#", linkedin: "#", instagram: "#" }
//     },
//     { 
//       icon: <User className="w-full h-full p-2.5" />, 
//       label: "Sam", 
//       role: "Backend",
//       className: "bg-black hover:bg-white/10 hover:border-[#af40ff] text-white hover:text-[#af40ff]",
//       socials: { github: "#", linkedin: "#", instagram: "#" }
//     },
//     { 
//       icon: <User className="w-full h-full p-2.5" />, 
//       label: "Jordan", 
//       role: "Design",
//       className: "bg-black hover:bg-white/10 hover:border-pink-500 text-white hover:text-pink-500",
//       socials: { github: "#", linkedin: "#", instagram: "#" }
//     },
//     { 
//       icon: <User className="w-full h-full p-2.5" />, 
//       label: "Casey", 
//       role: "AI Model",
//       className: "bg-black hover:bg-white/10 hover:border-blue-500 text-white hover:text-blue-500",
//       socials: { github: "#", linkedin: "#", instagram: "#" }
//     },
//   ];

//   // Legal Content
//   const privacyContent = (
//     <>
//       <p><strong>PICT-ACADVERSE</strong> is a student-run academic website created for educational purposes only. We are not officially affiliated with or endorsed by any college or educational authority.</p>
//       <p>We do not collect sensitive personal information. Any details shared voluntarily (such as email via contact forms) are used only to respond to queries or improve the website and are never shared with third parties.</p>
//       <p>All study materials and PYQs are provided for reference only and may not be accurate or officially verified. If any content violates copyright or ownership rights, it will be removed upon request.</p>
//       <p className="pt-4 border-t border-white/10 mt-6 text-xs text-slate-500 font-medium">
//         By using this website, you agree to this Privacy Policy.<br/>
//         📧 Contact: support@acadverse.com
//       </p>
//     </>
//   );

//   const termsContent = (
//     <>
//       <p><strong>PICT-ACADVERSE</strong> is an independent, student-managed platform created to help students access PYQs and academic resources.</p>
//       <div className="inline-block text-left">
//         <ul className="list-disc pl-5 space-y-2 marker:text-[#00ddeb]">
//           <li>This website is unofficial and not connected to any college administration.</li>
//           <li>Content is shared for educational reference only and should not be treated as official material.</li>
//           <li>We do not guarantee accuracy or completeness of the content.</li>
//           <li>The creators are not responsible for academic outcomes or losses.</li>
//           <li>Any copyrighted content will be removed upon valid request.</li>
//         </ul>
//       </div>
//       <p className="pt-4 border-t border-white/10 mt-6 text-xs text-slate-500 font-medium">Continued use of this website means you accept these terms.</p>
//     </>
//   );

//   return (
//     <>
//       {/* FIX APPLIED HERE: Added 'overflow-hidden' to the footer class list.
//         This prevents the absolute positioned decorative blobs from overflowing 
//         and creating empty space below the page.
//       */}
//       <footer className="relative w-full border-t border-white/10 bg-black pt-12 pb-2 z-50 overflow-hidden">
        
//         {/* --- Aesthetic Background Elements --- */}
//         <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ddeb]/50 to-transparent opacity-100 shadow-[0_0_10px_#00ddeb]" />
//         <div className="absolute bottom-[-20%] left-0 w-[600px] h-[400px] bg-[#af40ff]/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
//         <div className="absolute top-[-10%] right-0 w-[500px] h-[300px] bg-[#00ddeb]/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

//         <div className="container relative mx-auto px-6 md:px-12 z-10">
          
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 items-start">

//             {/* 1. BRAND & CARDS SECTION (Span 5) */}
//             <div className="lg:col-span-5 flex flex-col items-start space-y-8">
              
//               {/* Brand Logo */}
//               <Link to="/home" onClick={scrollToTop} className="flex items-center gap-3 group">
//                 <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] group-hover:bg-[#00ddeb]/10 group-hover:border-[#00ddeb]/20 transition-all duration-500 relative overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-tr from-[#00ddeb]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//                     <GraduationCap className="h-6 w-6 text-white/90 group-hover:text-[#00ddeb] transition-colors relative z-10" />
//                 </div>
//                 <span className="text-xl font-bold tracking-wide text-white">
//                   PICT-ACADVERSE<span className="text-[#00ddeb]">.</span>
//                 </span>
//               </Link>
              
//               <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-light">
//                Designed to simplify exam preparation by giving PICT students access to curated PYQs, progress tracking, and timely academic updates—all in one place.
//               </p>

//               {/* FEATURE CARDS GRID */}
//               <div className="flex flex-col sm:flex-row gap-5 w-full max-w-lg items-stretch">
                
//                 {/* CARD 1: SOCIALS */}
//                 <div className="w-full sm:w-1/2 group relative p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-[#af40ff]/30 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-40">
                  
//                   {/* Arrow Icon */}
//                   <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0 translate-x-2">
//                     <ArrowUpRight className="w-4 h-4 text-white" />
//                   </div>
                  
//                   {/* 1. TEXT SECTION */}
//                   <div className="flex-1 flex flex-col items-center justify-start pt-2 space-y-1">
//                     <h4 className="text-white text-sm font-semibold group-hover:text-[#af40ff] transition-colors">Social Hub</h4>
//                     <p className="text-[11px] text-slate-500 group-hover:text-slate-400 leading-tight">Connect via Email & Insta</p>
//                   </div>
                  
//                   {/* 2. ICONS SECTION */}
//                   <div className="flex justify-between items-end w-full mt-auto px-5 pb-5">
//                     {/* Instagram */}
//                     <div className="p-2.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 hover:scale-110 transition-transform duration-300">
//                       <Instagram className="w-6 h-6" />
//                     </div>
                    
//                     {/* Mail */}
//                     <div className="p-2.5 rounded-full bg-[#af40ff]/10 text-[#af40ff] border border-[#af40ff]/20 hover:scale-110 transition-transform duration-300">
//                       <Mail className="w-6 h-6" />
//                     </div>
//                   </div>

//                 </div>

//                 {/* CARD 2: TEAM DOCK */}
//                 <div className="w-full sm:w-1/2 flex flex-col justify-end h-40 pb-2 overflow-visible relative z-10 hover:z-20 pl-6">
                  
//                   {/* DOCK CONTAINER */}
//                   <div className="flex-1 flex items-center justify-center pt-4">
//                     <Dock 
//                       items={teamItems} 
//                       panelHeight={60} 
//                       baseItemSize={48} 
//                       magnification={70} 
//                       distance={80}
//                     />
//                   </div>

//                   {/* TEXT LABEL */}
//                   <div className="text-center pb-2 relative z-0">
//                       <h4 className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-[#00ddeb] transition-colors">The Team</h4>
//                   </div>
//                 </div>

//               </div>
//             </div>

//             {/* 2. NAVIGATION LINKS (Span 3) */}
//             <div className="lg:col-span-3 flex flex-col space-y-6 lg:pl-8 lg:pt-2">
//               <h4 className="font-semibold text-white tracking-wide text-sm flex items-center gap-2">
//                 Platform
//                 <span className="w-1.5 h-1.5 rounded-full bg-[#00ddeb] animate-pulse shadow-[0_0_8px_#00ddeb]"></span>
//               </h4>
//               <ul className="flex flex-col space-y-3">
//                 {['Home', 'PYQ Repository', 'Exam Updates', 'Dashboard'].map((item) => (
//                   <li key={item}>
//                     <Link
//                       to={`/${item.toLowerCase().replace(' ', '')}`}
//                       onClick={scrollToTop}
//                       className="text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2"
//                     >
//                       <span className="w-1 h-1 rounded-full bg-white/0 group-hover:bg-[#00ddeb] transition-colors"></span>
//                       {item}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* 3. FEEDBACK FORM (Span 4) */}
//             <div className="lg:col-span-4 flex flex-col space-y-6 lg:pt-2">
//               <div className="flex items-center gap-2 text-white">
//                 <div className="p-1.5 rounded-md bg-[#00ddeb]/10 text-[#00ddeb] border border-[#00ddeb]/20">
//                   <MessageSquare className="h-4 w-4" />
//                 </div>
//                 <h4 className="font-semibold tracking-wide text-sm">Have a Query?</h4>
//               </div>
//               <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
//                 <Input
//                   placeholder="Your email address"
//                   className="bg-white/[0.03] border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-[#00ddeb]/50 focus-visible:border-[#00ddeb]/50 transition-all h-10 text-xs rounded-xl backdrop-blur-sm"
//                 />
//                 <textarea
//                   placeholder="How can we help you?"
//                   className="flex h-24 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-xs text-white ring-offset-background placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ddeb]/50 resize-none transition-all backdrop-blur-sm"
//                 />
//                 <Button className="w-full bg-gradient-to-r from-[#00ddeb] via-[#5b42f3] to-[#af40ff] text-white hover:opacity-90 font-semibold h-10 text-xs rounded-xl shadow-lg shadow-[#00ddeb]/20 transition-all hover:scale-[1.02] border border-white/10">
//                   Send Message <Send className="ml-2 h-3 w-3" />
//                 </Button>
//               </form>
//             </div>

//           </div>

//           {/* Bottom Bar */}
//           <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-400">
//             <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
//               <p>© 2026 Acadverse. Made with <span className="text-red-500 animate-pulse">♥</span> for Engineers.</p>
//               <span className="hidden md:inline text-white/20">|</span>
//               <p className="text-slate-300/80 font-medium">This is an unofficial student initiative created solely to help juniors with academic preparation.</p>
//             </div>
            
//             <div className="flex gap-6">
//               <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors underline-offset-4 hover:underline">Privacy Policy</button>
//               <button onClick={() => setActiveModal('terms')} className="hover:text-white transition-colors underline-offset-4 hover:underline">Terms of Service</button>
//             </div>
//           </div>

//         </div>
//       </footer>

//       {/* Modals */}
//       <LegalModal 
//         title="Privacy Policy" 
//         content={privacyContent} 
//         isOpen={activeModal === 'privacy'} 
//         onClose={() => setActiveModal(null)} 
//       />
//       <LegalModal 
//         title="Terms & Conditions" 
//         content={termsContent} 
//         isOpen={activeModal === 'terms'} 
//         onClose={() => setActiveModal(null)} 
//       />
//     </>
//   );
// };

// export default Footer;


import React, { useRef, useState, useEffect, Children, cloneElement } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  GraduationCap,
  Instagram,
  Mail,
  MessageSquare,
  Send,
  ArrowUpRight,
  Github,
  Linkedin,
  X,
  User,
  Code2,
  Palette,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  AnimatePresence, 
  MotionValue, 
  SpringOptions 
} from "framer-motion";

// ==================================================================================
// DOCK COMPONENT (Physics Based)
// ==================================================================================

type DockItemProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
};

function DockItem({
  children,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full border border-white/10 bg-[#0f0f10] shadow-lg cursor-pointer transition-colors z-20 ${className}`}
    >
      {Children.map(children, child =>
        React.isValidElement(child)
          ? cloneElement(child as React.ReactElement<any>, { isHovered })
          : child
      )}
    </motion.div>
  );
}

function DockSocialPopup({ isHovered, label, role, socials }: { isHovered?: MotionValue<number>; label: string; role: string; socials: any }) {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', latest => setIsOpen(latest === 1));
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, x: "-50%", scale: 0.9 }}
          animate={{ opacity: 1, y: -24, x: "-50%", scale: 1 }}
          exit={{ opacity: 0, y: 10, x: "-50%", scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute -top-12 left-1/2 w-max flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl p-3 shadow-2xl z-50 pointer-events-auto"
        >
          <div className="text-center">
            <span className="block text-[10px] font-bold text-white/90 tracking-wide uppercase">
              {label}
            </span>
            <span className="block text-[8px] text-indigo-400 font-medium">
              {role}
            </span>
          </div>
          <div className="w-full h-px bg-white/10" />
          <div className="flex items-center gap-3 px-1">
             <a href={socials?.github} className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform"><Github className="w-3.5 h-3.5" /></a>
             <a href={socials?.linkedin} className="text-slate-400 hover:text-indigo-400 transition-colors hover:scale-110 transform"><Linkedin className="w-3.5 h-3.5" /></a>
             <a href={socials?.instagram} className="text-slate-400 hover:text-pink-500 transition-colors hover:scale-110 transform"><Instagram className="w-3.5 h-3.5" /></a>
          </div>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a0a0a]/90 rotate-45 border-r border-b border-white/10"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex items-center justify-center ${className}`}>{children}</div>;
}

function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 60,
  distance = 140,
  panelHeight = 64,
  baseItemSize = 40
}: { items: any[]; className?: string; spring?: SpringOptions; magnification?: number; distance?: number; panelHeight?: number; baseItemSize?: number }) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  return (
    <motion.div className="flex items-center w-full h-full justify-center">
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`${className} flex items-end gap-4 pb-2 pt-4 px-4`} 
        style={{ height: panelHeight }} 
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon className="text-white/80 group-hover:text-white transition-colors">{item.icon}</DockIcon>
            <DockSocialPopup label={item.label} role={item.role} socials={item.socials} />
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ==================================================================================
// LEGAL MODAL
// ==================================================================================

const LegalModal = ({ title, content, isOpen, onClose }: { title: string; content: React.ReactNode; isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="relative flex items-center justify-center p-6 border-b border-white/10 bg-white/[0.02]">
              <h3 className="text-lg font-bold text-white text-center tracking-wide">{title}</h3>
              <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 text-sm text-slate-300 leading-relaxed space-y-4 text-center overflow-y-auto custom-scrollbar">
              {content}
            </div>
            <div className="p-4 bg-white/[0.02] border-t border-white/10 flex justify-center">
              <Button onClick={onClose} variant="secondary" className="h-8 text-xs bg-white/10 hover:bg-white/20 text-white border-none">Close</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ==================================================================================
// FOOTER MAIN COMPONENT
// ==================================================================================

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  // Updated Team Data with INDIGO accents
  const teamItems = [
    { 
      icon: <Code2 className="w-full h-full p-2.5" />, 
      label: "Alex", 
      role: "Frontend",
      className: "bg-black hover:bg-indigo-500/20 hover:border-indigo-500 text-white hover:text-indigo-400",
      socials: { github: "#", linkedin: "#", instagram: "#" }
    },
    { 
      icon: <Cpu className="w-full h-full p-2.5" />, 
      label: "Sam", 
      role: "Backend",
      className: "bg-black hover:bg-cyan-500/20 hover:border-cyan-500 text-white hover:text-cyan-400",
      socials: { github: "#", linkedin: "#", instagram: "#" }
    },
    { 
      icon: <Palette className="w-full h-full p-2.5" />, 
      label: "Jordan", 
      role: "Design",
      className: "bg-black hover:bg-pink-500/20 hover:border-pink-500 text-white hover:text-pink-500",
      socials: { github: "#", linkedin: "#", instagram: "#" }
    },
    { 
      icon: <User className="w-full h-full p-2.5" />, 
      label: "Casey", 
      role: "AI Model",
      className: "bg-black hover:bg-white/20 hover:border-white text-white hover:text-white",
      socials: { github: "#", linkedin: "#", instagram: "#" }
    },
  ];

  // Legal Content
  const privacyContent = (
    <>
      <p><strong>PICT-ACADVERSE</strong> is a student-run academic website created for educational purposes only.</p>
      <p>We do not collect sensitive personal information. Any details shared voluntarily are used only to respond to queries.</p>
      <p className="pt-4 border-t border-white/10 mt-6 text-xs text-slate-500 font-medium">
        By using this website, you agree to this Privacy Policy.<br/>
        📧 Contact: support@acadverse.com
      </p>
    </>
  );

  const termsContent = (
    <>
      <p><strong>PICT-ACADVERSE</strong> is an independent platform. Content is for educational reference only.</p>
      <div className="inline-block text-left">
        <ul className="list-disc pl-5 space-y-2 marker:text-indigo-500">
          <li>Not officially affiliated with any college administration.</li>
          <li>We do not guarantee content accuracy.</li>
          <li>Copyrighted content removed upon request.</li>
        </ul>
      </div>
      <p className="pt-4 border-t border-white/10 mt-6 text-xs text-slate-500 font-medium">Continued use means acceptance of these terms.</p>
    </>
  );

  return (
    <>
      <footer className="relative w-full border-t border-white/10 bg-black pt-16 pb-6 z-50 overflow-hidden">
        <div className="container relative mx-auto px-6 md:px-12 z-10">
          
          {/* TOP SECTION: BRAND - PLATFORM - FEEDBACK */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-12 items-start">

            {/* 1. BRAND SECTION (Left - Span 4) */}
            <div className="lg:col-span-4 flex flex-col items-start space-y-6">
              
              {/* Brand Logo */}
              <Link to="/home" onClick={scrollToTop} className="flex items-center gap-3 group">
                <LogoLoader>
                  <div className="loader">
                    <p className="prefix hidden sm:block">ACADVERSE-</p>
                    <p className="prefix sm:hidden">PA-</p>
                    <div className="words">
                      <span className="word">PYQ'S</span>
                      <span className="word">UPDATES</span>
                      <span className="word">NOTES</span>
                      <span className="word">PYQ'S</span>
                      <span className="word">UPDATES</span>
                      <span className="word">NOTES</span>
                    </div>
                  </div>
                </LogoLoader>
              </Link>
              
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-light">
               Your academic co-pilot. Access curated PYQs, track your progress, and stay updated with college notices in one unified dashboard.
              </p>
            </div>

            {/* 2. PLATFORM LINKS (Center - Span 4) */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-6 lg:pt-2">
              <h4 className="font-semibold text-white tracking-wide text-sm flex items-center gap-2">
                Platform
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
              </h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-4 w-fit mx-auto">
                {[
                  { name: 'Home', path: '/home' },
                  { name: 'PYQ Repository', path: '/pyqs' },
                  { name: 'Exam Updates', path: '/updates' },
                  { name: 'Dashboard', path: '/dashboard' }
                ].map((item) => (
                  <li key={item.name} className="flex">
                    <Link
                      to={item.path}
                      onClick={scrollToTop}
                      className="w-full flex items-center justify-center text-center text-sm text-[#956afa] font-semibold border border-white/10 rounded-xl px-4 py-2 hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. FEEDBACK FORM (Right - Span 4) */}
            <div className="lg:col-span-4 flex flex-col items-end space-y-6 lg:pt-2">
              <div className="w-full flex justify-end items-center gap-2 text-white">
                <h4 className="font-semibold tracking-wide text-sm">Have a Query?</h4>
                <div className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <MessageSquare className="h-4 w-4" />
                </div>
              </div>
              <form className="flex flex-col gap-3 w-full" onSubmit={(e) => e.preventDefault()}>
                <Input
                  placeholder="Your email address"
                  className="bg-white/[0.03] border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 transition-all h-10 text-xs rounded-xl backdrop-blur-sm"
                />
                <textarea
                  placeholder="How can we help you?"
                  className="flex h-20 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-xs text-white ring-offset-background placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 resize-none transition-all backdrop-blur-sm"
                />
                <Button className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-500 text-white font-semibold h-9 text-xs rounded-xl shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] border border-white/10">
                  Send Message <Send className="ml-2 h-3 w-3" />
                </Button>
              </form>
            </div>

          </div>

          {/* MIDDLE SECTION: CENTERED CARDS (Below Platform) */}
          <div className="flex justify-center w-full mb-16">
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg items-stretch">
              
              {/* CARD 1: SOCIALS */}
              <div className="w-full sm:w-1/2 group relative p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between h-36">
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0 translate-x-2">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
                <div className="pt-1">
                  <h4 className="text-white text-sm font-semibold group-hover:text-indigo-400 transition-colors">Social Hub</h4>
                  <p className="text-[10px] text-slate-500 group-hover:text-slate-400 leading-tight mt-0.5">Connect with us</p>
                </div>
                <div className="flex justify-between items-end w-full px-1 pb-1">
                  <div className="p-2 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:scale-110 transition-transform duration-300">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="p-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:scale-110 transition-transform duration-300">
                    <Instagram className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* CARD 2: TEAM DOCK */}
              <div className="w-full sm:w-1/2 flex flex-col justify-end h-36 pb-2 overflow-visible relative z-10 hover:z-20">
                <div className="flex-1 flex items-center justify-center pt-2">
                  <Dock 
                    items={teamItems} 
                    panelHeight={50} 
                    baseItemSize={40} 
                    magnification={60} 
                    distance={80}
                  />
                </div>
                <div className="text-center pb-1 relative z-0">
                    <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-indigo-400 transition-colors">The Team</h4>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
              <p>© 2026 Acadverse. <span className="font-bold text-[#956afa]">For PICTIANS</span></p>
              <span className="hidden md:inline text-white/10">|</span>
              <p className="text-slate-500/80 font-medium">Unofficial student initiative.</p>
            </div>
            
            <div className="flex gap-6">
              <button onClick={() => setActiveModal('privacy')} className="hover:text-indigo-400 transition-colors">Privacy Policy</button>
              <button onClick={() => setActiveModal('terms')} className="hover:text-indigo-400 transition-colors">Terms of Service</button>
            </div>
          </div>

        </div>
      </footer>

      <LegalModal 
        title="Privacy Policy" 
        content={privacyContent} 
        isOpen={activeModal === 'privacy'} 
        onClose={() => setActiveModal(null)} 
      />
      <LegalModal 
        title="Terms & Conditions" 
        content={termsContent} 
        isOpen={activeModal === 'terms'} 
        onClose={() => setActiveModal(null)} 
      />
    </>
  );
};

const LogoLoader = styled.div`
  .loader {
    color: hsl(var(--foreground)); 
    font-family: inherit; 
    font-weight: 700;
    font-size: 1.25rem;
    box-sizing: content-box;
    height: 1.75rem;
    padding: 0;
    display: flex;
    align-items: center;
  }

  .prefix {
    margin: 0;
    white-space: nowrap;
    background: linear-gradient(110deg, #a1a1aa 45%, #ffffff 50%, #a1a1aa 55%);
    background-size: 250% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3.5s linear infinite;
  }

  .words {
    overflow: hidden;
    height: 100%;
    position: relative;
    padding-left: 2px;
    mask-image: linear-gradient(
      transparent 0%,
      black 20%,
      black 80%,
      transparent 100%
    );
  }

  .word {
    display: flex;
    align-items: center;
    height: 100%;
    white-space: nowrap;
    font-weight: 800; 
    background: linear-gradient(110deg, #956afa 45%, #ffffff 50%, #956afa 55%);
    background-size: 250% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: spin_logo 6s infinite cubic-bezier(0.23, 1, 0.32, 1.2), shimmer 3.5s linear infinite;
  }

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  @keyframes spin_logo {
    0% { transform: translateY(0); }
    15% { transform: translateY(-100%); }
    25% { transform: translateY(-100%); }
    40% { transform: translateY(-200%); }
    50% { transform: translateY(-200%); }
    65% { transform: translateY(-300%); }
    75% { transform: translateY(-300%); }
    90% { transform: translateY(-400%); }
    100% { transform: translateY(-400%); }
  }
`;

export default Footer;