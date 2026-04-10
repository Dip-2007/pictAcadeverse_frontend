import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { pyqAPI } from "@/lib/api";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import { ShieldAlert, Upload, FileText, CheckCircle2 } from "lucide-react";

const branchSubjectsData: Record<string, Record<string, string[]>> = {
  "CS": {
    "SE": ["Data Structures (DS)", "Comp. Org. and Architecture (COA)", "Discrete Mathematics (DM)"],
    "TE": ["Database Management (DBMS)", "Theory of Computation (TOC)", "Systems Programming (SPOS)"],
    "BE": ["Machine Learning (ML)", "Information Security (IS)", "Compilers (CD)"]
  },
  "IT": {
    "SE": ["Data Structures & Applications (DSA)", "Computer Network Technology (CNT)", "Entrepreneurial Software Dev (ESDM)"],
    "TE": ["Web Technology (WT)", "Software Engineering (SE)", "Design & Analysis of Algo (DAA)"],
    "BE": ["Distributed Systems (DS)", "Mobile Computing (MC)", "Software Testing (STQA)"]
  },
  "ENTC": {
    "SE": ["Signals and Systems (S&S)", "Analog Circuit Design (ACD)", "Network Analysis and Synthesis (NAS)"],
    "TE": ["Digital Communication (DC)", "Microcontrollers (MC)", "Electromagnetics (EM)"],
    "BE": ["VLSI Design", "Mobile Communication", "Broadband Comm"]
  },
  "AIDS": {
    "SE": ["Discrete Mathematics (DM)", "Data Structures (DS)", "Artificial Intelligence (AI)"],
    "TE": ["Data Science (DS)", "Neural Networks (NN)", "Software Engg (SE)"],
    "BE": ["Deep Learning (DL)", "Natural Language Proc. (NLP)", "Big Data (BD)"]
  },
  "ECE": {
    "SE": ["Analog and Digital Electronics (ADE)", "Operating System (OS)", "Principles of Data Structure (PDS)"],
    "TE": ["Database Mgmt (DBMS)", "Microprocessors (MP)", "Data Comm (DC)"],
    "BE": ["Embedded Systems (ES)", "System on Chip (SoC)", "Cloud Computing (CC)"]
  }
};

const firstYearSubjects = [
  "Linear Algebra and Calculus (LAC)", "Quantum Physics (QP)", "Mechanics for Robotics (MFR)",
  "Integrated Electrical and Electronics (IEEE)", "C Programming for Problem Solving (CPPS)",
  "Statistics and Integral Calculus (SIC)", "Chemical Science and Technology (CST)",
  "Computer Graphics and Design (CGD)", "OOP Using C++ (OOPC)", "Environment Engineering (ESE)"
];

const Admin = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    branch: "CS",
    year: "SE",
    paperType: "End-Sem",
    file: null as File | null,
  });

  const availableSubjects = formData.branch === "FE"
    ? firstYearSubjects.map(s => `${s} - FE`)
    : (branchSubjectsData[formData.branch]?.[formData.year] || []).map(s => `${s} - ${formData.branch}`);

  useEffect(() => {
    if (availableSubjects.length > 0 && !availableSubjects.includes(formData.subject)) {
      setFormData(prev => ({ ...prev, subject: availableSubjects[0] }));
    }
  }, [formData.branch, formData.year]);

  // Only allow admin role
  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      toast.error("Please select a precise PDF file first.");
      return;
    }

    setLoading(true);
    try {
      // Map frontend UI names to Backend DB exact schema
      const yearMapping: Record<string, string> = { "FE": "1", "SE": "2", "TE": "3", "BE": "4" };
      const cleanSubject = formData.subject.replace(/ - (FE|CS|IT|ENTC|AIDS|ECE)$/, "");

      const data = new FormData();
      data.append("title", formData.title);
      data.append("subject", cleanSubject);
      data.append("year", yearMapping[formData.year] || formData.year);
      data.append("paperType", formData.paperType);
      data.append("file", formData.file);

      await pyqAPI.uploadPaper(data);
      toast.success("Paper successfully uploaded to the database!");

      // Reset form
      setFormData({
        title: "",
        subject: "",
        branch: "CS",
        year: "SE",
        paperType: "End-Sem",
        file: null,
      });
    } catch (error: any) {
      toast.error("Upload failed", {
        description: error.response?.data?.message || "There was an issue securely uploading the file."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-indigo-500/30">
      {/* Background ambient light */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-violet-600/10 rounded-full blur-[100px] mix-blend-screen opacity-50"></div>
      </div>

      <Navbar />

      <div className="px-4 py-32 md:px-8 lg:px-12 max-w-4xl mx-auto relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-red-500/10 rounded-xl text-red-400 border border-red-500/20">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Admin Vault Access</h1>
            <p className="text-slate-400 mt-1">Authorized personnel only. Securely upload PYQs.</p>
          </div>
        </div>

        <div className="bg-[#0f0c29]/40 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleUpload} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Target Branch</label>
                <select
                  className="w-full bg-[#13111c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono"
                  value={formData.branch}
                  onChange={(e) => {
                    const newBranch = e.target.value;
                    const newYear = newBranch === "FE" ? "FE" : (formData.year === "FE" ? "SE" : formData.year);
                    setFormData(prev => ({ ...prev, branch: newBranch, year: newYear }));
                  }}
                >
                  <option value="FE">First Year (Core)</option>
                  <option value="CS">Computer Engineering (CS)</option>
                  <option value="IT">Information Technology (IT)</option>
                  <option value="ENTC">Electronics & Telecom (ENTC)</option>
                  <option value="AIDS">AI & Data Science (AIDS)</option>
                  <option value="ECE">Electronics & Computer (ECE)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Academic Year Node</label>
                <select
                  className="w-full bg-[#13111c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono"
                  value={formData.year}
                  disabled={formData.branch === "FE"}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                >
                  {formData.branch === "FE" ? (
                    <option value="FE">First Year (FE)</option>
                  ) : (
                    <>
                      <option value="SE">Second Year (SE)</option>
                      <option value="TE">Third Year (TE)</option>
                      <option value="BE">Final Year (BE)</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Target Subject Code & Name</label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full bg-[#13111c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono"
                >
                  {availableSubjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Assessment Type</label>
                <select
                  className="w-full bg-[#13111c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono"
                  value={formData.paperType}
                  onChange={(e) => setFormData(prev => ({ ...prev, paperType: e.target.value }))}
                >
                  <option value="In-Sem">In-Semester</option>
                  <option value="End-Sem">End-Semester</option>
                  <option value="Unit Test">Unit Test</option>
                  <option value="Prelim">Prelim</option>
                </select>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <label className="text-sm font-medium text-slate-300">Secure File Payload (PDF)</label>
              <div className="relative group overflow-hidden rounded-xl border-2 border-dashed border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10 transition-colors h-32 flex flex-col items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  required
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setFormData(prev => ({ ...prev, file: e.target.files![0] }))
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {formData.file ? (
                  <div className="flex flex-col items-center gap-2 text-indigo-300">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                    <span className="font-mono text-sm">{formData.file.name}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-indigo-300/60 group-hover:text-indigo-300 transition-colors">
                    <Upload className="w-6 h-6" />
                    <span className="font-mono text-sm">Click or Drag PDF payload here</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full relative group overflow-hidden bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl py-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      Execute Upload Protocol
                    </>
                  )}
                </span>
                {/* Button Glow Effect */}
                <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[45deg] -translate-x-[150%] group-hover:translate-x-[400%] transition-transform duration-700 ease-out z-0"></div>
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
