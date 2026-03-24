import { Link, useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuDescription } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, LogOut, Target, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const ProfileDropdown = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Generate initials from user name
    const getInitials = (name: string) => {
        if (!name) return "U";
        const parts = name.trim().split(" ");
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const handleLogout = () => {
        logout();
        toast.info("Successfully logged out.", { duration: 2000 });

        setTimeout(() => {
            navigate("/");
        }, 300);
    };

    // Fallback to default values if user is not loaded yet
    const displayName = user?.name || "Guest User";
    const displayEmail = user?.email || "guest@pict.edu";
    const initials = getInitials(displayName);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full overflow-hidden w-10 h-10 ml-2 hover:scale-105 transition-transform duration-300">
                    <Avatar className="w-10 h-10 border border-border">
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-semibold flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {displayName}
                </DropdownMenuLabel>
                <DropdownMenuDescription className="text-xs text-muted-foreground truncate px-2 mb-1">
                    {displayEmail}
                </DropdownMenuDescription>
                <DropdownMenuSeparator />

                {/* Progress Tracker Button */}
                <Link to="/dashboard">
                    <DropdownMenuItem className="cursor-pointer font-medium text-primary hover:!bg-primary/10">
                        <Target className="w-4 h-4 mr-2" />
                        Progress Tracker
                    </DropdownMenuItem>
                </Link>

                {user?.role === "admin" && (
                    <Link to="/admin">
                        <DropdownMenuItem className="cursor-pointer font-medium text-indigo-500 hover:!bg-indigo-500/10 hover:!text-indigo-400 mt-1">
                            <ShieldAlert className="w-4 h-4 mr-2" />
                            Admin Vault Access
                        </DropdownMenuItem>
                    </Link>
                )}

                <DropdownMenuSeparator />

                {/* Logout Button */}
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileDropdown;