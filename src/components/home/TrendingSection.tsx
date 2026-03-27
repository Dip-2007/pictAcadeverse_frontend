import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight, Eye, Download, Star } from "lucide-react";

const trendingSubjects = [
  { 
    name: "Data Structures & Algorithms", 
    code: "DSA", 
    papers: 45, 
    views: "12.5K",
    trending: true,
    color: "from-blue-500 to-indigo-500"
  },
  { 
    name: "Database Management Systems", 
    code: "DBMS", 
    papers: 38, 
    views: "9.8K",
    trending: true,
    color: "from-emerald-500 to-teal-500"
  },
  { 
    name: "Operating Systems", 
    code: "OS", 
    papers: 42, 
    views: "8.2K",
    trending: false,
    color: "from-orange-500 to-amber-500"
  },
  { 
    name: "Computer Networks", 
    code: "CN", 
    papers: 35, 
    views: "7.5K",
    trending: true,
    color: "from-purple-500 to-pink-500"
  },
];

const topNotes = [
  { title: "Complete DSA Notes", author: "Rahul M.", rating: 4.9, downloads: "2.3K" },
  { title: "DBMS One-Shot Notes", author: "Priya S.", rating: 4.8, downloads: "1.8K" },
  { title: "OS Important Topics", author: "Amit K.", rating: 4.7, downloads: "1.5K" },
];

const TrendingSection = () => {
  return (
    <section className="py-16 md:py-24 bg-black overflow-hidden relative z-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          
          {/* Trending Subjects */}
          <div className="w-full">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-[#00ddeb]" />
              <h3 className="text-2xl md:text-3xl font-bold text-white">Trending Subjects</h3>
            </div>
            <div className="space-y-4">
              {trendingSubjects.map((subject, index) => (
                <Card 
                  key={subject.code} 
                  className="bg-[#0f0f10] border-white/10 hover:border-white/20 transition-all cursor-pointer group animate-slide-in overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex flex-row items-center gap-4">
                      <div className={`w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                        {subject.code.slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white truncate text-sm sm:text-base">{subject.name}</h4>
                          {subject.trending && (
                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-none text-[10px] uppercase px-1.5 py-0 h-4">Hot</Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-400">
                          <span>{subject.papers} Papers</span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {subject.views}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-[#00ddeb] transition-colors flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button variant="ghost" className="mt-6 w-full text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 rounded-xl h-12">
                View All Subjects
                <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Top Notes This Week */}
          <div className="w-full">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-6 h-6 text-amber-500" />
              <h3 className="text-2xl md:text-3xl font-bold text-white">Top Notes This Week</h3>
            </div>
            <Card className="p-4 sm:p-6 bg-[#0f0f10] border-white/10 relative overflow-hidden h-fit">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 pointer-events-none" />
              <div className="space-y-3 relative z-10">
                {topNotes.map((note, index) => (
                  <div 
                    key={note.title}
                    className="flex flex-row items-center justify-between p-3 sm:p-4 bg-black/50 border border-white/5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                      <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {index + 1}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-white text-sm sm:text-base truncate">{note.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-400 truncate">by {note.author}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 pl-2">
                      <div className="flex items-center justify-end gap-1 text-amber-500 mb-0.5">
                        <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                        <span className="font-medium text-sm sm:text-base">{note.rating}</span>
                      </div>
                      <div className="flex items-center justify-end gap-1 text-[10px] sm:text-xs text-slate-400">
                        <Download className="w-3 h-3" />
                        {note.downloads}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-none rounded-xl h-12 shadow-lg shadow-orange-500/20 relative z-10">
                  Explore Notes Vault
                  <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrendingSection;