import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/layout/Navbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  // Standard UI Icons
  FileText, Folder, Monitor, X, Loader2, BookOpen, Plus,
  // Subject Specific Icons
  Calculator, Atom, Bot, Zap, Terminal, FlaskConical, Palette,
  Code2, Leaf, Cpu, Wifi, Activity, BrainCircuit, Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// --- Configuration ---
const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/pyqs`
  : "http://localhost:5000/api/pyqs";

// --- Data Definitions ---
const years = [
  { id: "1", label: "Year 1", short: "FE" },
  { id: "2", label: "Year 2", short: "SE" },
  { id: "3", label: "Year 3", short: "TE" },
  { id: "4", label: "Year 4", short: "BE" },
];

const year1Subjects = [
  "Linear Algebra and Calculus (LAC)", "Quantum Physics (QP)", "Mechanics for Robotics (MFR)",
  "Integrated Electrical and Electronics Engineering (IEEE)", "C Programming for Problem Solving (CPPS)",
  "Statistics and Integral Calculus (SIC)", "Chemical Science and Technology (CST)",
  "Computer Graphics and Design (CGD)", "Object Oriented Programming Using C++ (OOPC)",
  "Environment and Sustainable Engineering (ESE)"
];

const branches = [
  "Computer Engineering", "Information Technology", "Electronics and Telecommunication Engineering",
  "Artificial Intelligence & Data Science", "Electronics & Computer Engineering"
];

const year2Subjects: Record<string, string[]> = {
  "Computer Engineering": ["Data Structures (DS)", "Computer Organisation and Architecture (COA)", "Discrete Mathematics (DM)"],
  "Information Technology": ["Data Structures & Applications (DSA)", "Computer Network Technology (CNT)", "Entrepreneurial Software Development and Management (ESDM)"],
  "Electronics and Telecommunication Engineering": ["Signals and Systems (S&S)", "Analog Circuit Design (ACD)", "Network Analysis and Synthesis (NAS)"],
  "Artificial Intelligence & Data Science": ["Discrete Mathematics (DM)", "Data Structures (DS)", "Artificial Intelligence (AI)"],
  "Electronics & Computer Engineering": ["Analog and Digital Electronics (ADE)", "Analog and Digital Electronics Lab (ADEL)", "Operating System (OS)", "Principles of Data Structure (PDS)"]
};

// --- Components ---
const SubjectIcon = ({ name }: { name: string }) => {
  const n = name.toLowerCase();
  const iconBase = "w-4 h-4 mr-2.5 shrink-0";
  if (n.includes("calculus") || n.includes("algebra") || n.includes("statistics") || n.includes("math")) return <Calculator className={`${iconBase} text-pink-500`} />;
  if (n.includes("physics") || n.includes("quantum")) return <Atom className={`${iconBase} text-cyan-500`} />;
  if (n.includes("chemical") || n.includes("chemistry")) return <FlaskConical className={`${iconBase} text-teal-500`} />;
  if (n.includes("data structure") || n.includes("dsa") || n.includes("algorithm")) return <Code2 className={`${iconBase} text-indigo-500`} />;
  if (n.includes("programming") || n.includes("cpp") || n.includes("oop") || n.includes("java")) return <Terminal className={`${iconBase} text-violet-600`} />;
  if (n.includes("operating system") || n.includes("os")) return <Monitor className={`${iconBase} text-slate-600`} />;
  if (n.includes("intelligence") || n.includes("ai") || n.includes("data science")) return <BrainCircuit className={`${iconBase} text-purple-600`} />;
  if (n.includes("circuit") || n.includes("analog") || n.includes("digital")) return <Zap className={`${iconBase} text-yellow-600`} />;
  if (n.includes("processor") || n.includes("architecture") || n.includes("coa") || n.includes("hardware")) return <Cpu className={`${iconBase} text-orange-500`} />;
  if (n.includes("signals") || n.includes("systems")) return <Activity className={`${iconBase} text-amber-600`} />;
  if (n.includes("network") || n.includes("internet") || n.includes("iot")) return <Wifi className={`${iconBase} text-blue-500`} />;
  if (n.includes("mechanics") || n.includes("robotics")) return <Bot className={`${iconBase} text-slate-700`} />;
  if (n.includes("graphics") || n.includes("design")) return <Palette className={`${iconBase} text-rose-400`} />;
  if (n.includes("environment") || n.includes("sustainable")) return <Leaf className={`${iconBase} text-green-600`} />;
  if (n.includes("management") || n.includes("entrepreneurial")) return <Briefcase className={`${iconBase} text-amber-800`} />;
  return <BookOpen className={`${iconBase} text-neutral-500`} />;
};

const PYQs = () => {
  const [selectedYear, setSelectedYear] = useState("1");
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkedPapers, setBookmarkedPapers] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("bookmarkedPapers");
    if (saved) setBookmarkedPapers(JSON.parse(saved));
  }, []);

  const toggleBookmark = (e: React.MouseEvent, paperId: string) => {
    e.stopPropagation();
    const isBookmarked = bookmarkedPapers.includes(paperId);
    const newBookmarks = isBookmarked
      ? bookmarkedPapers.filter(id => id !== paperId)
      : [...bookmarkedPapers, paperId];
    setBookmarkedPapers(newBookmarks);
    localStorage.setItem("bookmarkedPapers", JSON.stringify(newBookmarks));
    if (isBookmarked) toast("Removed from bookmarks", { duration: 2000 });
    else toast.success("Added to bookmarks", { duration: 2000 });
  };

  // --- TAB STATE MANAGEMENT ---
  const [tabs, setTabs] = useState<{ id: number; file: any }[]>([{ id: Date.now(), file: null }]);
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  // --- API CALLS ---
  const fetchPapers = async () => {
    try {
      const res = await axios.get(API_URL);
      setPapers(res.data);
    } catch (err) {
      console.error("Failed to fetch papers", err);
      toast.error("Could not load papers. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  // --- TAB ACTIONS ---
  const handleAddTab = () => {
    const newTab = { id: Date.now(), file: null };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const handleCloseTab = (e: React.MouseEvent, tabId: number) => {
    e.stopPropagation();
    if (tabs.length === 1) {
      setTabs([{ id: Date.now(), file: null }]);
      return;
    }
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const handleFileSelect = (paper: any) => {
    const fileData = { title: paper.title, subject: paper.subject, url: paper.fileUrl };
    setTabs(tabs.map(tab =>
      tab.id === activeTabId ? { ...tab, file: fileData } : tab
    ));
  };

  // --- RENDERING HELPERS ---
  const getPapersForSubject = (subjectName: string) => {
    return papers.filter(p => p.subject === subjectName && p.year === selectedYear);
  };

  const renderPapersList = (subjectName: string) => {
    const subjectPapers = getPapersForSubject(subjectName);
    const activeTab = tabs.find(t => t.id === activeTabId);

    if (subjectPapers.length === 0) {
      return <div className="pl-9 py-2 text-xs text-neutral-600 italic">No papers available yet...</div>;
    }

    return (
      <div className="pl-4 flex flex-col gap-1 py-1">
        {subjectPapers.map((paper) => (
          <button
            key={paper._id}
            onClick={() => handleFileSelect(paper)}
            className={cn(
              "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors group text-left border border-transparent",
              activeTab?.file?.url === paper.fileUrl
                ? "bg-white/[0.08] text-white border-white/[0.05]"
                : "text-neutral-400 hover:text-white hover:bg-white/[0.03]"
            )}
          >
            <FileText className="w-3.5 h-3.5 mr-2.5 text-indigo-400 shrink-0" />
            <span className="truncate flex-1">{paper.title}</span>
            <span className="max-w-20 ml-2 truncate text-[10px] text-neutral-500 border border-white/[0.1] px-1.5 py-0.5 rounded mr-2">{paper.paperType}</span>
            <div
              onClick={(e) => toggleBookmark(e, paper._id)}
              className="p-1 rounded hover:bg-white/[0.1] transition-colors flex-shrink-0"
            >
              <svg className={`w-3.5 h-3.5 ${bookmarkedPapers.includes(paper._id) ? "fill-yellow-500 text-yellow-500" : "text-neutral-500 hover:text-yellow-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            </div>
          </button>
        ))}
      </div>
    );
  };

  const renderExplorerContent = () => {
    if (selectedYear === "1") {
      return (
        <Accordion type="multiple" className="w-full px-2">
          {year1Subjects.map((subject, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-white/[0.05]">
              <AccordionTrigger className="px-3 py-3 hover:bg-white/[0.02] text-sm font-medium text-neutral-400 hover:text-neutral-200 hover:no-underline rounded-lg transition-colors [&[data-state=open]]:text-white [&[data-state=open]]:bg-white/[0.03]">
                <div className="flex items-center text-left gap-2">
                  <SubjectIcon name={subject} />
                  <span className="line-clamp-1">{subject}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-1 pb-2">
                {renderPapersList(subject)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      );
    }
    return (
      <Accordion type="multiple" className="w-full px-2">
        {branches.map((branch, branchIndex) => (
          <AccordionItem key={branchIndex} value={`branch-${branchIndex}`} className="border-b border-white/[0.05]">
            <AccordionTrigger className="px-3 py-3 hover:bg-white/[0.02] text-sm font-medium text-neutral-300 hover:text-white hover:no-underline rounded-lg transition-colors">
              <div className="flex items-center text-left gap-2">
                <Folder className="w-4 h-4 text-indigo-400/80 fill-indigo-400/10" />
                <span>{branch}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0 pt-1">
              <div className="pl-3 border-l ml-5 border-white/[0.08]">
                {selectedYear === "2" ? (
                  <Accordion type="multiple" className="w-full">
                    {year2Subjects[branch]?.map((subject, subIndex) => (
                      <AccordionItem key={subIndex} value={`sub-${branchIndex}-${subIndex}`} className="border-b-0">
                        <AccordionTrigger className="px-3 py-2 hover:bg-white/[0.02] text-sm font-normal text-neutral-500 hover:text-neutral-300 hover:no-underline rounded-lg data-[state=open]:text-white">
                          <div className="flex items-center text-left gap-2">
                            <SubjectIcon name={subject} />
                            <span className="line-clamp-1">{subject}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {renderPapersList(subject)}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="px-4 py-3 text-xs text-neutral-600 italic">Coming soon...</div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  const isImage = (url: string) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i) != null;
  };

  const activeTab = tabs.find(t => t.id === activeTabId);

  const renderSidebar = () => (
    <div className="flex flex-col h-full overflow-hidden w-full bg-neutral-950/50">
      {/* Year Selector */}
      <div className="p-3 border-b border-white/[0.08] bg-neutral-950/80 backdrop-blur-md">
        <div className="grid grid-cols-4 gap-1 p-1 bg-white/[0.03] rounded-lg border border-white/[0.05]">
          {years.map((year) => (
            <button
              key={year.id}
              onClick={() => setSelectedYear(year.id)}
              className={cn(
                "py-1.5 px-2 text-[10px] font-semibold rounded-md transition-all uppercase tracking-wider",
                selectedYear === year.id
                  ? "bg-white text-black shadow-sm"
                  : "text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.05]"
              )}
            >
              {year.short}
            </button>
          ))}
        </div>
      </div>

      {/* Explorer Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-white/[0.05] shrink-0">
        <span className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase">
          Subject Explorer
        </span>
        {loading && <Loader2 className="w-3 h-3 animate-spin text-neutral-500" />}
      </div>

      <ScrollArea className="flex-1">
        <div className="py-2">{renderExplorerContent()}</div>
      </ScrollArea>
    </div>
  );

  const renderViewer = () => (
    <div className="flex flex-col h-full bg-[#0c0c0c] relative w-full overflow-hidden">
      {/* Tab Bar */}
      <div className="h-10 bg-neutral-950 border-b border-white/[0.08] flex items-end px-2 shrink-0 gap-1 overflow-x-auto no-scrollbar">
        {/* Mobile Back Button */}
        <button
          onClick={() => {
            // Close active tab on mobile to return to explorer
            if (activeTab) handleCloseTab({ stopPropagation: () => { } } as any, activeTab.id);
          }}
          className="md:hidden flex shrink-0 items-center justify-center mr-2 mb-1 px-2 h-8 rounded bg-white/5 border border-white/10 text-neutral-400 font-semibold text-xs"
        >
          ← Back
        </button>

        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={cn(
              "group relative flex shrink-0 items-center gap-2 px-3 py-2 min-w-[120px] max-w-[200px] h-9 text-xs font-medium rounded-t-lg cursor-pointer border border-b-0 transition-all select-none",
              activeTabId === tab.id
                ? "bg-[#0c0c0c] border-white/[0.08] text-white z-10 mt-[1px]"
                : "bg-neutral-900 border-transparent text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300 mt-2"
            )}
          >
            <FileText className={cn("w-3 h-3 shrink-0", activeTabId === tab.id ? "text-indigo-400" : "opacity-50")} />
            <span className="truncate flex-1">{tab.file ? tab.file.title : "Welcome"}</span>
            <div
              onClick={(e) => handleCloseTab(e, tab.id)}
              className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-white/[0.1] rounded transition-all text-neutral-400"
            >
              <X className="w-3 h-3" />
            </div>
          </div>
        ))}

        <button onClick={handleAddTab} className="h-6 w-6 flex shrink-0 items-center justify-center rounded-md hover:bg-white/[0.05] text-neutral-500 hover:text-white transition-colors ml-1 mb-1">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Viewer Content */}
      <div className="flex-1 w-full h-full overflow-hidden flex flex-col items-center justify-center bg-[#0c0c0c] bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:20px_20px] relative">
        {activeTab && activeTab.file ? (
          isImage(activeTab.file.url) ? (
            <img src={activeTab.file.url} alt="Paper" className="max-w-full max-h-full object-contain p-4 md:p-8" />
          ) : (
            <div className="relative w-full h-full overflow-hidden bg-white">
              <div className="pointer-events-none absolute inset-0 z-50 flex flex-wrap items-center justify-center opacity-[0.05] select-none overflow-hidden mix-blend-multiply">
                {Array.from({ length: 20 }).map((_, i) => (
                  <span key={i} className="text-3xl md:text-5xl font-black text-black -rotate-45 whitespace-nowrap p-6 md:p-12">
                    PICT-ACADVERSE
                  </span>
                ))}
              </div>
              {/* Mobile uses standard iframe since object tag is buggy on mobile PDF */}
              <iframe src={`${activeTab.file.url}#toolbar=0`} className="w-full h-full border-0 block relative z-10" title="PDF Preview" />
            </div>
          )
        ) : (
          <div className="hidden md:flex flex-col items-center justify-center text-center p-8 max-w-md animate-in fade-in zoom-in-95 duration-500">
            <div className="w-20 h-20 rounded-2xl bg-neutral-900/50 border border-white/[0.05] flex items-center justify-center mb-8 shadow-2xl relative">
              <div className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-full"></div>
              <BookOpen className="w-8 h-8 text-neutral-400 relative z-10" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">Select a Document</h3>
            <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
              Choose a year and subject from the explorer sidebar to view Previous Year Questions.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-white/20 flex flex-col overflow-hidden relative">
      <Navbar />

      {/* Global Noise Overlay */}
      <div className="fixed inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

      <div className="flex-1 flex pt-[84px] h-[calc(100vh-84px)] overflow-hidden relative z-10 p-0 md:px-2 md:pb-2">

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col w-full h-full bg-neutral-950 border-t border-white/[0.05] overflow-hidden relative z-20">
          {!activeTab?.file ? renderSidebar() : renderViewer()}
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex w-full flex-1 overflow-hidden md:rounded-xl border border-white/[0.08] bg-neutral-900/50 backdrop-blur-sm shadow-2xl">
          <ResizablePanelGroup direction="horizontal" className="h-full w-full">
            {/* COLUMN 1: Sidebar (Explorer) */}
            <ResizablePanel defaultSize={22} minSize={18} maxSize={40} className="w-full flex">
              {renderSidebar()}
            </ResizablePanel>



            <ResizableHandle withHandle className="bg-transparent border-r border-white/[0.08] w-[1px] hidden md:flex" />

            {/* COLUMN 2: PDF Viewer */}
            <ResizablePanel defaultSize={78} className="flex h-full relative w-full">
              {renderViewer()}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div >
  );
};

export default PYQs;