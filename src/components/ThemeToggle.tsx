import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="text-gray-400 hover:text-white rounded-full bg-transparent hover:bg-white/5 h-10 w-10 relative overflow-hidden group"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 drop-shadow-[0_0_8px_rgba(147,197,253,0.5)]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
