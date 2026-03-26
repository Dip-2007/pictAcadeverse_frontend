
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Progress } from "@/components/ui/progress";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BrainCircuit,
  BookOpen,
  X,
  Mail,
  ArrowRight,
  HelpCircle,
  Construction,
  Lock,
  Clock,
  Flame,
  Phone,
  Sparkles,
  FileText
} from "lucide-react";
import {
  motion,
  useSpring,
  useMotionValue,
  type SpringOptions,
  type Transition,
  type HTMLMotionProps
} from "motion/react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

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
        <StarLayer
          count={150}
          size={1}
          transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
          starColor={starColor}
        />
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

// --- DATA SECTION --- 

const firstYearSubjects = [
  { name: "Linear Algebra and Calculus (LAC)", total: 50, present: 45 },
  { name: "Quantum Physics (QP)", total: 40, present: 32 },
  { name: "Mechanics for Robotics (MFR)", total: 35, present: 35 },
  { name: "Integrated Electrical and Electronics (IEEE)", total: 45, present: 28 },
  { name: "C Programming (CPPS)", total: 60, present: 55 },
  { name: "Statistics and Integral Calculus (SIC)", total: 40, present: 12 },
  { name: "Chemical Science and Technology (CST)", total: 30, present: 29 },
  { name: "Computer Graphics and Design (CGD)", total: 25, present: 20 },
  { name: "OOP Using C++ (OOPC)", total: 55, present: 48 },
  { name: "Environment Engineering (ESE)", total: 20, present: 18 },
];

// Short codes for branches
const branchSubjectsData: Record<string, any> = {
  "CS": {
    "2nd Year": [
      { name: "Data Structures (DS)", total: 80, present: 75 },
      { name: "Comp. Org. and Architecture (COA)", total: 60, present: 45 },
      { name: "Discrete Mathematics (DM)", total: 50, present: 48 }
    ],
    "3rd Year": [
      { name: "Database Management (DBMS)", total: 70, present: 60 },
      { name: "Theory of Computation (TOC)", total: 65, present: 55 },
      { name: "Systems Programming (SPOS)", total: 60, present: 40 }
    ],
    "4th Year": [
      { name: "Machine Learning (ML)", total: 55, present: 20 },
      { name: "Information Security (IS)", total: 50, present: 30 },
      { name: "Compilers (CD)", total: 45, present: 15 }
    ]
  },
  "IT": {
    "2nd Year": [
      { name: "Data Structures & Applications (DSA)", total: 75, present: 70 },
      { name: "Computer Network Technology (CNT)", total: 65, present: 62 },
      { name: "Entrepreneurial Software Dev (ESDM)", total: 40, present: 30 }
    ],
    "3rd Year": [
      { name: "Web Technology (WT)", total: 60, present: 55 },
      { name: "Software Engineering (SE)", total: 55, present: 45 },
      { name: "Design & Analysis of Algo (DAA)", total: 50, present: 35 }
    ],
    "4th Year": [
      { name: "Distributed Systems (DS)", total: 45, present: 10 },
      { name: "Mobile Computing (MC)", total: 40, present: 5 },
      { name: "Software Testing (STQA)", total: 35, present: 15 }
    ]
  },
  "ENTC": {
    "2nd Year": [
      { name: "Signals and Systems (S&S)", total: 70, present: 70 },
      { name: "Analog Circuit Design (ACD)", total: 60, present: 55 },
      { name: "Network Analysis and Synthesis (NAS)", total: 50, present: 42 }
    ],
    "3rd Year": [
      { name: "Digital Communication (DC)", total: 60, present: 40 },
      { name: "Microcontrollers (MC)", total: 55, present: 30 },
      { name: "Electromagnetics (EM)", total: 50, present: 20 }
    ],
    "4th Year": [
      { name: "VLSI Design", total: 45, present: 15 },
      { name: "Mobile Communication", total: 40, present: 10 },
      { name: "Broadband Comm", total: 35, present: 5 }
    ]
  },
  "AIDS": {
    "2nd Year": [
      { name: "Discrete Mathematics (DM)", total: 45, present: 40 },
      { name: "Data Structures (DS)", total: 80, present: 65 },
      { name: "Artificial Intelligence (AI)", total: 90, present: 12 }
    ],
    "3rd Year": [
      { name: "Data Science (DS)", total: 60, present: 30 },
      { name: "Neural Networks (NN)", total: 55, present: 20 },
      { name: "Software Engg (SE)", total: 50, present: 25 }
    ],
    "4th Year": [
      { name: "Deep Learning (DL)", total: 45, present: 5 },
      { name: "Natural Language Proc. (NLP)", total: 40, present: 8 },
      { name: "Big Data (BD)", total: 35, present: 12 }
    ]
  },
  "ECE": {
    "2nd Year": [
      { name: "Analog and Digital Electronics (ADE)", total: 55, present: 50 },
      { name: "Operating System (OS)", total: 70, present: 68 },
      { name: "Principles of Data Structure (PDS)", total: 60, present: 55 }
    ],
    "3rd Year": [
      { name: "Database Mgmt (DBMS)", total: 55, present: 40 },
      { name: "Microprocessors (MP)", total: 50, present: 35 },
      { name: "Data Comm (DC)", total: 45, present: 25 }
    ],
    "4th Year": [
      { name: "Embedded Systems (ES)", total: 40, present: 15 },
      { name: "System on Chip (SoC)", total: 35, present: 10 },
      { name: "Cloud Computing (CC)", total: 30, present: 5 }
    ]
  }
};

const branchFullNames: Record<string, string> = {
  "CS": "Computer Engineering",
  "IT": "Information Technology",
  "ENTC": "Electronics & Telecommunication Engineering",
  "AIDS": "Artificial Intelligence & Data Science",
  "ECE": "Electronics & Computer Engineering"
};

// --- COMPONENTS ---

const SubjectProgressItem = ({ name, total, present }: { name: string, total: number, present: number }) => {
  const percentage = Math.round((present / total) * 100);
  const indicatorColor = percentage > 80 ? 'bg-emerald-400' : percentage > 40 ? 'bg-indigo-400' : 'bg-amber-400';

  return (
    <div className="group p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="font-medium text-slate-300 group-hover:text-white transition-colors">{name}</span>
        <span className="text-slate-400 text-xs font-mono">
          {present}/{total} ({percentage}%)
        </span>
      </div>
      <Progress value={percentage} className="h-1.5 bg-slate-800" indicatorClassName={indicatorColor} />
    </div>
  );
};

const RepoSummaryCard = ({
  title,
  subtitle,
  progress,
  colorClass,
  bgClass,
  onClick,
  isActive
}: {
  title: string,
  subtitle: string,
  progress: number,
  colorClass: string,
  bgClass: string,
  onClick: () => void,
  isActive: boolean
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 group
        ${isActive
          ? "bg-white/10 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)] scale-[1.02]"
          : "bg-[#0f0c29]/40 border-white/5 hover:border-white/20 hover:bg-[#0f0c29]/60"
        } border backdrop-blur-md`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`font-bold text-lg ${isActive ? "text-white" : "text-slate-200"} group-hover:text-white transition-colors`}>{title}</h3>
          <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">{subtitle}</p>
        </div>
        <div className={`text-2xl font-bold ${colorClass}`}>{progress}%</div>
      </div>

      <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${bgClass} transition-all duration-1000`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {isActive && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-purple-500/50"></div>
      )}
    </div>
  );
};

const ComingSoonCard = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="relative rounded-3xl border border-white/5 bg-[#0f0c29]/20 backdrop-blur-sm p-4 flex flex-col justify-center items-center text-center overflow-hidden h-full group">
    <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)] pointer-events-none" />
    <div className="relative z-10 flex flex-col items-center gap-3">
      <div className="p-3 rounded-full bg-white/5 text-white/20 group-hover:text-white/40 transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">{title}</h3>
        <div className="flex items-center justify-center gap-1.5 text-xs text-amber-500/80 font-medium bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
          <Construction className="w-3 h-3" /> Coming Soon
        </div>
      </div>
    </div>
  </div>
);

// --- REUSABLE DETAIL VIEW COMPONENT ---
const SubjectDetailView = ({ activeBranch, selectedYear, onClose }: { activeBranch: string, selectedYear: string, onClose: () => void }) => {
  return (
    <div className="mt-6 mb-8 animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="rounded-2xl bg-[#0f0c29]/60 border border-purple-500/20 backdrop-blur-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            {activeBranch === "First Year"
              ? "First Year Common"
              : branchFullNames[activeBranch] || `${activeBranch} Engineering`
            }

            {activeBranch !== "First Year" && (
              <span className="text-sm font-normal text-slate-500 bg-white/5 px-3 py-1 rounded-full">{selectedYear}</span>
            )}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeBranch === "First Year"
            ? firstYearSubjects.map((sub) => (
              <SubjectProgressItem key={sub.name} {...sub} />
            ))
            : (branchSubjectsData[activeBranch]?.[selectedYear] || []).map((sub: any) => (
              <SubjectProgressItem key={sub.name} {...sub} />
            ))
          }

          {(activeBranch !== "First Year" && (!branchSubjectsData[activeBranch]?.[selectedYear] || branchSubjectsData[activeBranch]?.[selectedYear].length === 0)) && (
            <div className="col-span-full text-center py-10 text-slate-500 italic flex flex-col items-center">
              <BookOpen className="w-8 h-8 mb-2 opacity-50" />
              No subjects data found for {selectedYear}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState("2nd Year");
  const [activeBranch, setActiveBranch] = useState<string | null>(null);
  const [bookmarkedPapers, setBookmarkedPapers] = useState<any[]>([]);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const saved = localStorage.getItem("bookmarkedPapers");
    if (saved) setBookmarkedPapers(JSON.parse(saved));
  }, []);

  const getBranchProgress = (branch: string) => {
    if (branch === "First Year") {
      const totalDocs = firstYearSubjects.reduce((acc, curr) => acc + curr.total, 0);
      const totalPresent = firstYearSubjects.reduce((acc, curr) => acc + curr.present, 0);
      return Math.round((totalPresent / totalDocs) * 100);
    }

    const subjects = branchSubjectsData[branch]?.[selectedYear] || [];
    if (subjects.length === 0) return 0;

    const totalDocs = subjects.reduce((acc: number, curr: any) => acc + curr.total, 0);
    const totalPresent = subjects.reduce((acc: number, curr: any) => acc + curr.present, 0);
    return Math.round((totalPresent / totalDocs) * 100);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#00ddeb]/30 overflow-x-hidden relative">
      {/* GLOBAL BACKGROUND STYLES */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap');
        `}
      </style>

      {/* FIXED BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <StarsBackground
          starColor={resolvedTheme === 'dark' ? '#fff' : '#fff'}
          factor={0.02}
          speed={80}
          className={cn(
            'absolute inset-0 flex items-center justify-center pointer-events-auto',
            'bg-[radial-gradient(ellipse_at_bottom,_#1a1a1a_0%,_#000_100%)]'
          )}
        />
        <div className="absolute inset-0 pointer-events-none mix-blend-screen">
          <ShootingStars starColor="#00ddeb" trailColor="#2EB9DF" minSpeed={15} maxSpeed={35} minDelay={1000} maxDelay={3000} />
        </div>
        <div className="absolute inset-0 pointer-events-none mix-blend-screen">
          <ShootingStars starColor="#af40ff" trailColor="#5b42f3" minSpeed={10} maxSpeed={25} minDelay={2000} maxDelay={4000} />
        </div>
        <div className="absolute inset-0 pointer-events-none mix-blend-screen">
          <ShootingStars starColor="#ffffff" trailColor="#00ddeb" minSpeed={20} maxSpeed={40} minDelay={1500} maxDelay={3500} />
        </div>
      </div>

      <Navbar />

      <main className="relative z-10 pt-24 pb-20 pointer-events-none">
        <div className="container mx-auto px-4 max-w-7xl space-y-8 pointer-events-auto">

          {/* --- SECTION 1: THE COMMAND CENTER --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">

            {/* LEFT: Recently Added Updates (Spans 2 cols) */}
            <div className="md:col-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 hover:border-[#956afa]/30 transition-all duration-500 shadow-2xl flex flex-col">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#956afa]/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>

              {/* Header */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#956afa]" /> Recently Added
                </h3>
                <Link to="/pyqs" className="text-xs text-[#956afa] hover:text-white flex items-center gap-1 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
                  View All <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* List */}
              <div className="space-y-3 relative z-10">
                {/* Item 1 */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group/item cursor-default">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/10">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover/item:text-purple-200 transition-colors">End Sem 2024 - Data Structures</div>
                      <div className="text-xs text-slate-400">Computer Engineering • SE</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20 font-medium">New</span>
                </div>

                {/* Item 2 */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group/item cursor-default">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/10">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover/item:text-blue-200 transition-colors">In Sem 2024 - Signals & Systems</div>
                      <div className="text-xs text-slate-400">ENTC • SE</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full border border-blue-500/20 font-medium">Update</span>
                </div>

                {/* Item 3 */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group/item cursor-default">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/10">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover/item:text-pink-200 transition-colors">End Sem 2023 - Engineering Math III</div>
                      <div className="text-xs text-slate-400">First Year • FE</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-slate-500/10 text-slate-400 px-2 py-1 rounded-full border border-slate-500/20 font-medium">Archive</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Status & Support */}
            <div className="flex flex-col gap-6 h-full">

              {/* Row 1: Coming Soon Section */}
              <div className="grid grid-cols-2 gap-4 min-h-[120px]">
                <ComingSoonCard title="Countdown" icon={Clock} />
                <ComingSoonCard title="Streaks" icon={Flame} />
              </div>

              {/* Row 2: REDESIGNED QUERY CARD - Compact & Contact Focused */}
              <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-5 hover:border-[#00ddeb]/30 transition-all shadow-xl flex flex-col justify-between min-h-[140px]">
                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ddeb]/10 blur-[60px] rounded-full pointer-events-none -mr-10 -mt-10 transition-all group-hover:bg-[#00ddeb]/20" />

                {/* Header */}
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-white text-sm">Help Center</h3>
                  </div>
                </div>

                {/* Content: Contact Details */}
                <div className="relative z-10 flex flex-col gap-2 mt-2">
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group/item cursor-pointer">
                    <Mail className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-blue-400 transition-colors" />
                    <span className="text-xs text-slate-300 font-mono tracking-tight">support@pict.edu</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group/item cursor-pointer">
                    <Phone className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-green-400 transition-colors" />
                    <span className="text-xs text-slate-300 font-mono tracking-tight">+91 98765 43210</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row - Bookmarks */}
            <div className="md:col-span-3 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 flex flex-col group hover:border-[#956afa]/30 transition-all shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4 relative z-10">
                <Flame className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <h3 className="text-xl font-bold text-white">Your Bookmarked Papers</h3>
              </div>
              {bookmarkedPapers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 relative z-10">
                  {bookmarkedPapers.map((paper: any) => (
                    <Link to="/pyqs" key={paper._id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="p-2.5 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/10 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-sm font-medium text-white hover:text-yellow-200 transition-colors truncate">{paper.title}</div>
                        <div className="text-xs text-slate-400 truncate mt-0.5">{paper.subject} • {paper.paperType}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-slate-500 text-sm flex items-center gap-2 italic relative z-10">
                  <BookOpen className="w-4 h-4" /> You haven't bookmarked any papers yet. Head over to PYQs to star your important papers!
                </div>
              )}
            </div>
          </div>

          {/* --- SECTION 2: REPOSITORY STATS --- */}
          <div className="animate-fade-in-up delay-100">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b border-white/5 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Repository Stats</h2>
                <p className="text-slate-400 text-sm mt-1">Select a branch to view detailed subject availability.</p>
              </div>

              {/* Year Filter Dropdown */}
              <div className="mt-4 sm:mt-0">
                <Select value={selectedYear} onValueChange={(val) => {
                  setSelectedYear(val);
                  setActiveBranch(null);
                }}>
                  <SelectTrigger className="w-[140px] bg-slate-900 border-white/10 text-slate-200 focus:ring-purple-500">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* UNGROUPED: First Year Section */}
            <div className="mb-10">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Basic Sciences
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <RepoSummaryCard
                  title="First Year"
                  subtitle="10 SUBJECTS"
                  progress={getBranchProgress("First Year")}
                  colorClass="text-cyan-400"
                  bgClass="bg-cyan-400"
                  isActive={activeBranch === "First Year"}
                  onClick={() => setActiveBranch(activeBranch === "First Year" ? null : "First Year")}
                />
              </div>

              {/* DETAIL VIEW FOR FIRST YEAR (Appears immediately below the card) */}
              {activeBranch === "First Year" && (
                <SubjectDetailView
                  activeBranch={activeBranch}
                  selectedYear={selectedYear}
                  onClose={() => setActiveBranch(null)}
                />
              )}
            </div>

            {/* UNGROUPED: Branches Section */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                Engineering Departments
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(branchSubjectsData).map((branch, index) => {
                  const colorVariants = [
                    { text: "text-purple-400", bg: "bg-purple-400" },  // CS
                    { text: "text-pink-400", bg: "bg-pink-400" },    // IT
                    { text: "text-amber-400", bg: "bg-amber-400" },   // ENTC
                    { text: "text-emerald-400", bg: "bg-emerald-400" }, // AIDS
                    { text: "text-sky-400", bg: "bg-sky-400" }      // ECE
                  ];

                  const variant = colorVariants[index % colorVariants.length];
                  const subjectCount = branchSubjectsData[branch][selectedYear]?.length || 0;

                  return (
                    <RepoSummaryCard
                      key={branch}
                      title={branch}
                      subtitle={`${subjectCount} Subjects`}
                      progress={getBranchProgress(branch)}
                      colorClass={variant.text}
                      bgClass={variant.bg}
                      isActive={activeBranch === branch}
                      onClick={() => setActiveBranch(activeBranch === branch ? null : branch)}
                    />
                  )
                })}
              </div>
            </div>

            {/* DETAIL VIEW FOR BRANCHES (Appears at the bottom) */}
            {activeBranch && activeBranch !== "First Year" && (
              <SubjectDetailView
                activeBranch={activeBranch}
                selectedYear={selectedYear}
                onClose={() => setActiveBranch(null)}
              />
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
