



import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RippleButton } from "@/components/ui/ripple-button";
import {
  Home,
  BookOpen,
  Bell,
  LayoutDashboard,
  Plus
} from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import styled from "styled-components";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { GlobalSearch } from "./GlobalSearch";
import { ThemeToggle } from "@/components/ThemeToggle";

// ------------------------------------
// 1. Data & Types
// ------------------------------------
interface NavItem {
  name: string;
  href: string;
  icon: any;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/home", icon: Home },
  { name: "PYQs", href: "/pyqs", icon: BookOpen },
  { name: "Updates", href: "/updates", icon: Bell },
];

// ------------------------------------
// 2. Constants for Smooth Notch Math
// ------------------------------------
const NAV_WIDTH = 320;
const NAV_HEIGHT = 64;
const CORNER_RADIUS = 32;

// The geometry for the smooth notch
const NOTCH_WIDTH = 120; // Width of the curve influence
const NOTCH_DEPTH = 36; // How deep the notch goes relative to top edge
const cx = NAV_WIDTH / 2;

// Smooth Bezier Notch Path
const notchPath = `
  M ${CORNER_RADIUS} 0
  L ${cx - NOTCH_WIDTH / 2} 0
  C ${cx - NOTCH_WIDTH / 2 + 20} 0, ${cx - 30} ${NOTCH_DEPTH}, ${cx} ${NOTCH_DEPTH}
  C ${cx + 30} ${NOTCH_DEPTH}, ${cx + NOTCH_WIDTH / 2 - 20} 0, ${cx + NOTCH_WIDTH / 2} 0
  L ${NAV_WIDTH - CORNER_RADIUS} 0
  A ${CORNER_RADIUS} ${CORNER_RADIUS} 0 0 1 ${NAV_WIDTH} ${CORNER_RADIUS}
  L ${NAV_WIDTH} ${NAV_HEIGHT - CORNER_RADIUS}
  A ${CORNER_RADIUS} ${CORNER_RADIUS} 0 0 1 ${NAV_WIDTH - CORNER_RADIUS} ${NAV_HEIGHT}
  L ${CORNER_RADIUS} ${NAV_HEIGHT}
  A ${CORNER_RADIUS} ${CORNER_RADIUS} 0 0 1 0 ${NAV_HEIGHT - CORNER_RADIUS}
  L 0 ${CORNER_RADIUS}
  A ${CORNER_RADIUS} ${CORNER_RADIUS} 0 0 1 ${CORNER_RADIUS} 0
  Z
`;

// ------------------------------------
// 3. Main Navbar Component
// ------------------------------------
const Navbar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const location = useLocation();

  const isLoginPage = location.pathname === '/';
  if (isLoginPage) return null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ========================================================
          MOBILE VIEW: TOP NOTCH & NOTCHED BOTTOM NAV
      ======================================================== */}

      {/* 1. Mobile Top Notch (Branding) */}
      <div className="lg:hidden fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none">
        <div className="bg-[#0f0f10]/95 backdrop-blur-xl border-b border-x border-white/10 rounded-b-[24px] px-8 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.4)] pointer-events-auto mt-[-1px]">
          <Link to="/home">
            <LogoLoader>
              <div className="loader" style={{ fontSize: '1.35rem', height: '2rem' }}>
                <p className="prefix">ACADVERSE-</p>
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
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>
      </div>

      {/* 2. Mobile Bottom Notched Navbar & Circular Menu */}
      <div className="lg:hidden fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none">

        {/* Navbar Container */}
        <div className="relative pointer-events-auto" style={{ width: NAV_WIDTH, height: NAV_HEIGHT }}>

          {/* A. Background with Notch Shape */}
          <div
            className="absolute rounded-full inset-0 bg-[#0f0f10]/80 backdrop-blur-2xl"
            style={{ clipPath: `path('${notchPath}')` }}
          />

          {/* B. SVG Border Overlay */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width={NAV_WIDTH}
            height={NAV_HEIGHT}
          >
            <path
              d={notchPath}
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
          </svg>

          {/* C. Circular Menu Items (The Orbit) */}
          {/* We position this exactly where the Plus button is: left-1/2, top: -8 (relative to nav container) */}
          <div className="absolute left-1/2 -top-8 -translate-x-1/2 z-10">
            <AnimatePresence>
              {mobileNavOpen && navItems.map((item, index) => {
                // Logic to distribute items in a semi-circle (fan)
                const totalItems = navItems.length;
                // Angles: -60 (Left), 0 (Top), 60 (Right)
                const angleStep = 60;
                const startAngle = -60;
                const angleDeg = startAngle + (index * angleStep);
                const angleRad = (angleDeg * Math.PI) / 180;

                const radius = 90; // Distance from center button

                // Calculate target position (0 is straight up for Y in math, but in CSS Y is inverted)
                // x = sin(angle) * r
                // y = -cos(angle) * r
                const targetX = Math.sin(angleRad) * radius;
                const targetY = -Math.cos(angleRad) * radius;

                const Icon = item.icon;
                const isActive = location.pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="absolute top-0 left-0" // anchor to center
                  >
                    <motion.div
                      initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                      animate={{
                        x: targetX,
                        y: targetY,
                        scale: 1,
                        opacity: 1
                      }}
                      exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: index * 0.05
                      }}
                      // Centering the bubble itself (-translate-x/y-1/2)
                      className="w-12 h-12 -ml-6 -mt-6 rounded-full flex items-center justify-center bg-[#1a1a1d] border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                    >
                      <Icon className={cn("w-5 h-5", isActive ? "text-[#956afa]" : "text-gray-400")} />

                      {/* Floating Label below the bubble */}
                      <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 16 }} // Push text down
                        className={cn(
                          "absolute whitespace-nowrap text-[10px] bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm",
                          isActive ? "text-[#956afa] font-bold" : "text-white/80 font-medium"
                        )}
                      >
                        {item.name}
                      </motion.span>

                      {isActive && (
                        <div className="absolute inset-0 rounded-full ring-2 ring-[#956afa]/50" />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </AnimatePresence>
          </div>

          {/* D. Static Nav Buttons (Dashboard/Profile) */}
          <div className="absolute inset-0 flex items-center justify-between px-6 z-10">
            {/* Left: Dashboard */}
            <div className="w-[60px] flex justify-center">
              <Link to="/dashboard" onClick={() => setMobileNavOpen(false)}>
                <div className={cn(
                  "flex flex-col items-center justify-center h-12 w-12 rounded-full transition-colors duration-300",
                  location.pathname === '/dashboard' ? "text-purple-400 bg-purple-500/10" : "text-gray-400 hover:text-white hover:bg-white/5"
                )}>
                  <LayoutDashboard className="w-6 h-6" />
                </div>
              </Link>
            </div>

            {/* Right: Profile */}
            <div className="w-[60px] flex justify-center">
              <ProfileDropdown />
            </div>
          </div>

          {/* E. Center Plus Button (Main Trigger) */}
          <div className="absolute left-1/2 -top-8 -translate-x-1/2 z-20">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="h-14 w-14 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,99,235,0.5)] ring-2 ring-black/50"
            >
              <div className="absolute inset-0 rounded-full border border-white/20" />
              <motion.div
                animate={{ rotate: mobileNavOpen ? 135 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Plus className="w-7 h-7" />
              </motion.div>
            </motion.button>
          </div>

        </div>
      </div>


      {/* ========================================================
          DESKTOP VIEW (Unchanged)
      ======================================================== */}
      <header className={cn(
        "hidden lg:block fixed top-0 left-0 right-0 z-50 w-full px-4 pt-6"
      )}>
        <nav
          className={cn(
            "mx-auto transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] border border-transparent will-change-transform",
            isScrolled
              ? "bg-black/10 backdrop-blur-md border-white/10 max-w-5xl rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]"
              : "bg-black/10 backdrop-blur-md border-white/10 max-w-7xl rounded-full shadow-lg"
          )}
        >
          <div className={cn(
            "relative flex items-center justify-between px-6",
            isScrolled ? "h-16" : "h-20"
          )}>

            {/* LEFT: Logo Section */}
            <div className="flex-shrink-0 z-20">
              <Link to="/home" className="group block">
                <div className="px-2 py-1">
                  <div className="flex items-center gap-2">
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
                  </div>
                </div>
              </Link>
            </div>

            {/* CENTER: Navigation (Ripple Buttons) */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 gap-3">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.href;

                return (
                  <Link key={item.name} to={item.href}>
                    <RippleButton
                      rippleColor={isActive ? "#956afa" : "#ADD8E6"}
                      className={cn(
                        "group relative flex items-center justify-center min-w-[90px] h-10 rounded-full border bg-transparent overflow-hidden",
                        "text-sm tracking-wide transition-all duration-300 hover:bg-white/5 hover:text-white",
                        isActive
                          ? "text-[#956afa] font-bold border-white/5 bg-white/[0.02]"
                          : "text-gray-400 font-medium border-transparent hover:shadow-[0_0_20px_rgba(173,216,230,0.4)]"
                      )}
                    >
                      <span className="relative z-10 block transition-all duration-300 ease-in-out group-hover:-translate-y-8 group-hover:opacity-0">
                        {item.name}
                      </span>
                      <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                        <IconComponent className={cn("w-4 h-4", isActive ? "text-[#956afa]" : "text-blue-200 drop-shadow-[0_0_8px_rgba(147,197,253,0.8)]")} />
                      </div>
                    </RippleButton>
                  </Link>
                );
              })}
            </div>

            {/* RIGHT: Dashboard, Profile */}
            <div className="flex items-center gap-2 lg:gap-4 z-20">
              <GlobalSearch />
              <ThemeToggle />
              <div className="hidden md:flex items-center gap-4">
                <Link to="/dashboard">
                  <UniverseButtonWrapper>
                    <button className="uiverse">
                      <div className="wrapper">
                        <span>Dashboard</span>
                        <div className="circle circle-12" />
                        <div className="circle circle-11" />
                        <div className="circle circle-10" />
                        <div className="circle circle-9" />
                        <div className="circle circle-8" />
                        <div className="circle circle-7" />
                        <div className="circle circle-6" />
                        <div className="circle circle-5" />
                        <div className="circle circle-4" />
                        <div className="circle circle-3" />
                        <div className="circle circle-2" />
                        <div className="circle circle-1" />
                      </div>
                    </button>
                  </UniverseButtonWrapper>
                </Link>
                <ProfileDropdown />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

// ------------------------------------
// 4. Styled Components
// ------------------------------------

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

const UniverseButtonWrapper = styled.div`
  .uiverse {
    --duration: 7s;
    --easing: linear;
    --c-color-1: rgba(91, 66, 243, 0.7);
    --c-color-2: #af40ff;
    --c-color-3: #00ddeb;
    --c-color-4: rgba(46, 142, 255, 0.7);
    
    --c-shadow: rgba(175, 64, 255, 0.4);
    --c-shadow-inset-top: rgba(91, 66, 243, 0.9);
    --c-shadow-inset-bottom: rgba(0, 221, 235, 0.8);
    
    --c-radial-inner: #202025;
    --c-radial-outer: #09090b;
    --c-color: #fff;
    
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
    outline: none;
    position: relative;
    cursor: pointer;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    padding: 0;
    margin: 0;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.02em;
    line-height: 1.5;
    color: var(--c-color);
    background: radial-gradient(
      circle,
      var(--c-radial-inner),
      var(--c-radial-outer) 80%
    );
    box-shadow: 0 0 14px var(--c-shadow);
    transition: all 0.3s ease;
  }

  .uiverse:before {
    content: "";
    pointer-events: none;
    position: absolute;
    z-index: 3;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 9999px;
    box-shadow:
      inset 0 3px 12px var(--c-shadow-inset-top),
      inset 0 -3px 4px var(--c-shadow-inset-bottom);
  }

  .uiverse .wrapper {
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    overflow: hidden;
    border-radius: 9999px;
    min-width: 120px;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .uiverse .wrapper span {
    display: inline-block;
    position: relative;
    z-index: 1;
  }

  .uiverse:hover {
    --duration: 1400ms;
    box-shadow: 0 0 20px var(--c-shadow);
    transform: translateY(-1px);
  }

  .uiverse .wrapper .circle {
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    filter: blur(var(--blur, 8px));
    background: var(--background, transparent);
    transform: translate(var(--x, 0), var(--y, 0)) translateZ(0);
    animation: var(--animation, none) var(--duration) var(--easing) infinite;
  }

  .uiverse .wrapper .circle.circle-1,
  .uiverse .wrapper .circle.circle-9,
  .uiverse .wrapper .circle.circle-10 { --background: var(--c-color-4); }
  .uiverse .wrapper .circle.circle-3,
  .uiverse .wrapper .circle.circle-4 { --background: var(--c-color-2); --blur: 14px; }
  .uiverse .wrapper .circle.circle-5,
  .uiverse .wrapper .circle.circle-6 { --background: var(--c-color-3); --blur: 16px; }
  .uiverse .wrapper .circle.circle-2,
  .uiverse .wrapper .circle.circle-7,
  .uiverse .wrapper .circle.circle-8,
  .uiverse .wrapper .circle.circle-11,
  .uiverse .wrapper .circle.circle-12 { --background: var(--c-color-1); --blur: 12px; }
  
  .uiverse .wrapper .circle.circle-1 { --x: 0; --y: -40px; --animation: circle-1; }
  .uiverse .wrapper .circle.circle-2 { --x: 92px; --y: 8px; --animation: circle-2; }
  .uiverse .wrapper .circle.circle-3 { --x: -12px; --y: -12px; --animation: circle-3; }
  .uiverse .wrapper .circle.circle-4 { --x: 80px; --y: -12px; --animation: circle-4; }
  .uiverse .wrapper .circle.circle-5 { --x: 12px; --y: -4px; --animation: circle-5; }
  .uiverse .wrapper .circle.circle-6 { --x: 56px; --y: 16px; --animation: circle-6; }
  .uiverse .wrapper .circle.circle-7 { --x: 8px; --y: 28px; --animation: circle-7; }
  .uiverse .wrapper .circle.circle-8 { --x: 28px; --y: -4px; --animation: circle-8; }
  .uiverse .wrapper .circle.circle-9 { --x: 20px; --y: -12px; --animation: circle-9; }
  .uiverse .wrapper .circle.circle-10 { --x: 64px; --y: 16px; --animation: circle-10; }
  .uiverse .wrapper .circle.circle-11 { --x: 4px; --y: 4px; --animation: circle-11; }
  .uiverse .wrapper .circle.circle-12 { --blur: 14px; --x: 52px; --y: 4px; --animation: circle-12; }

  @keyframes circle-1 { 33% { transform: translate(0px, 16px) translateZ(0); } 66% { transform: translate(12px, 64px) translateZ(0); } }
  @keyframes circle-2 { 33% { transform: translate(80px, -10px) translateZ(0); } 66% { transform: translate(72px, -48px) translateZ(0); } }
  @keyframes circle-3 { 33% { transform: translate(20px, 12px) translateZ(0); } 66% { transform: translate(12px, 4px) translateZ(0); } }
  @keyframes circle-4 { 33% { transform: translate(76px, -12px) translateZ(0); } 66% { transform: translate(112px, -8px) translateZ(0); } }
  @keyframes circle-5 { 33% { transform: translate(84px, 28px) translateZ(0); } 66% { transform: translate(40px, -32px) translateZ(0); } }
  @keyframes circle-6 { 33% { transform: translate(28px, -16px) translateZ(0); } 66% { transform: translate(76px, -56px) translateZ(0); } }
  @keyframes circle-7 { 33% { transform: translate(8px, 28px) translateZ(0); } 66% { transform: translate(20px, -60px) translateZ(0); } }
  @keyframes circle-8 { 33% { transform: translate(32px, -4px) translateZ(0); } 66% { transform: translate(56px, -20px) translateZ(0); } }
  @keyframes circle-9 { 33% { transform: translate(20px, -12px) translateZ(0); } 66% { transform: translate(80px, -8px) translateZ(0); } }
  @keyframes circle-10 { 33% { transform: translate(68px, 20px) translateZ(0); } 66% { transform: translate(100px, 28px) translateZ(0); } }
  @keyframes circle-11 { 33% { transform: translate(4px, 4px) translateZ(0); } 66% { transform: translate(68px, 20px) translateZ(0); } }
  @keyframes circle-12 { 33% { transform: translate(56px, 0px) translateZ(0); } 66% { transform: translate(60px, -32px) translateZ(0); } }
`;

export default Navbar;