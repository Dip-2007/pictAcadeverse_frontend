import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Search, FileText } from "lucide-react"
import { DialogTitle } from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

// All subjects compiled for search
const searchableSubjects = [
  "Linear Algebra and Calculus (LAC) - FE", "Quantum Physics (QP) - FE", "Mechanics for Robotics (MFR) - FE",
  "Integrated Electrical and Electronics (IEEE) - FE", "C Programming (CPPS) - FE",
  "Statistics and Integral Calculus (SIC) - FE", "Chemical Science and Technology (CST) - FE",
  "Computer Graphics and Design (CGD) - FE", "OOP Using C++ (OOPC) - FE", "Environment Engineering (ESE) - FE",

  "Data Structures (DS) - CS", "Comp. Org. and Architecture (COA) - CS", "Discrete Mathematics (DM) - CS",
  "Database Management (DBMS) - CS", "Theory of Computation (TOC) - CS", "Systems Programming (SPOS) - CS",
  "Machine Learning (ML) - CS", "Information Security (IS) - CS", "Compilers (CD) - CS",

  "Data Structures & Applications (DSA) - IT", "Computer Network Technology (CNT) - IT", "Entrepreneurial Software Dev (ESDM) - IT",
  "Web Technology (WT) - IT", "Software Engineering (SE) - IT", "Design & Analysis of Algo (DAA) - IT",
  "Distributed Systems (DS) - IT", "Mobile Computing (MC) - IT", "Software Testing (STQA) - IT",

  "Signals and Systems (S&S) - ENTC", "Analog Circuit Design (ACD) - ENTC", "Network Analysis and Synthesis (NAS) - ENTC",
  "Digital Communication (DC) - ENTC", "Microcontrollers (MC) - ENTC", "Electromagnetics (EM) - ENTC",
  "VLSI Design - ENTC", "Mobile Communication - ENTC", "Broadband Comm - ENTC",

  "Discrete Mathematics (DM) - AIDS", "Data Structures (DS) - AIDS", "Artificial Intelligence (AI) - AIDS",
  "Data Science (DS) - AIDS", "Neural Networks (NN) - AIDS", "Software Engg (SE) - AIDS",
  "Deep Learning (DL) - AIDS", "Natural Language Proc. (NLP) - AIDS", "Big Data (BD) - AIDS",

  "Analog and Digital Electronics (ADE) - ECE", "Operating System (OS) - ECE", "Principles of Data Structure (PDS) - ECE",
  "Database Mgmt (DBMS) - ECE", "Microprocessors (MP) - ECE", "Data Comm (DC) - ECE",
  "Embedded Systems (ES) - ECE", "System on Chip (SoC) - ECE", "Cloud Computing (CC) - ECE"
]

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <>
      <button
        onClick={() => setOpen((open) => !open)}
        className={cn(
          "flex items-center justify-center gap-2 group border border-white/10 bg-transparent hover:bg-white/5 rounded-full p-2 transition-all duration-300",
          isScrolled ? "w-10 h-10" : "w-10 h-10 lg:w-36 lg:px-4 lg:py-2"
        )}
      >
        <Search className="w-4 h-4 text-gray-400 group-hover:text-white" />
        {!isScrolled && (
          <>
            <span className="hidden lg:inline text-sm text-gray-400 group-hover:text-white relative top-[1px] whitespace-nowrap">Search...</span>
            <span className="hidden lg:inline ml-auto text-[10px] text-gray-500 bg-white/5 px-1.5 py-0.5 rounded border border-white/10 group-hover:text-white/70">⌘K</span>
          </>
        )}
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Global Search</DialogTitle>
        <CommandInput placeholder="Type a subject or subject code..." />
        <CommandList className="max-h-[300px] overflow-y-auto">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Subjects">
            {searchableSubjects.map((item) => (
              <CommandItem
                key={item}
                onSelect={() => runCommand(() => navigate("/pyqs"))}
                className="cursor-pointer flex items-center gap-2 text-foreground hover:bg-white/[0.05]"
              >
                <div className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-md">
                  <FileText className="w-4 h-4" />
                </div>
                <span>{item}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
