import { useState, useEffect, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Mail, Lock, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

const AuthLanding = () => {
    const navigate = useNavigate();
    const { login, register, googleLogin, isAuthenticated } = useAuth();
    const [isExiting, setIsExiting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [screenState, setScreenState] = useState<'locked' | 'unlocked'>('locked');

    // Login form state
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Register form state
    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    // ✅ FIXED: Only redirect if authenticated AND NOT currently loading (animating)
    // This prevents the redirect from cutting off the entry sequence animation during login
    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            navigate("/home");
        }
    }, [isAuthenticated, navigate, isLoading]);

    // ✅ 1. Force top scroll on mount to ensure AuthLanding starts clean
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // ✅ 2. Manage Scroll Restoration to prevent browser from remembering the scroll position
    useEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        const timer = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10);

        return () => {
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'auto';
            }
            clearTimeout(timer);
        };
    }, []);

    // Function to handle the scroll-and-enter sequence
    const triggerEntrySequence = () => {
        // 1. Scroll down to straighten the screen (Animation)
        window.scrollTo({
            top: window.innerHeight * 1.2,
            behavior: "smooth"
        });

        // 2. Unlock screen (visual change)
        setTimeout(() => {
            setScreenState('unlocked');
        }, 600);

        // 3. Trigger Zoom In (Exit) animation
        setTimeout(() => {
            setIsExiting(true);
        }, 1300);

        // 4. Navigate & RESET SCROLL
        setTimeout(() => {
            // ❗ CRITICAL FIX: Instantly jump to top before route change
            // This ensures /home loads at the Hero section, not scrolled down.
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });

            navigate("/home");
        }, 3600);
    };

    const handleGuestLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            triggerEntrySequence();
        }, 800);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!loginEmail || !loginPassword) {
            toast.error("Validation Error", { description: "Please fill in all fields" });
            return;
        }

        setIsLoading(true);
        try {
            await login(loginEmail, loginPassword);
            // Success toast is handled in AuthContext
            triggerEntrySequence();
        } catch (error) {
            // Error toast is handled in AuthContext
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
        if (!credentialResponse.credential) {
            toast.error("Google Sign-In Failed", { description: "No credential received" });
            return;
        }

        setIsLoading(true);
        try {
            await googleLogin(credentialResponse.credential);
            triggerEntrySequence();
        } catch (error) {
            toast.error("Google Sign-In Failed", {
                description: error instanceof Error ? error.message : "Please try again"
            });
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!registerName || !registerEmail || !registerPassword) {
            toast.error("Validation Error", { description: "Please fill in all fields" });
            return;
        }

        if (registerPassword.length < 6) {
            toast.error("Validation Error", { description: "Password must be at least 6 characters" });
            return;
        }

        setIsLoading(true);
        try {
            await register(registerName, registerEmail, registerPassword);
            // Success toast is handled in AuthContext
            triggerEntrySequence();
        } catch (error) {
            // Error toast is handled in AuthContext
            setIsLoading(false);
        }
    };

    return (
        <div className="relative bg-[#030303] flex flex-col items-center justify-center font-sans selection:bg-indigo-500/30 overflow-x-hidden min-h-screen">

            {/* Background Effects */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.05),transparent_70%)] pointer-events-none" />
            <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20" />

            <motion.div
                className="w-full"
                initial={{ y: "100%" }}
                animate={isExiting ? { scale: 15, opacity: 0 } : { y: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                style={{ transformOrigin: "center 75%" }}
            >
                <ContainerScroll
                    titleComponent={
                        <div className="flex flex-col items-center justify-center min-h-[40vh] md:min-h-[60vh] pb-10 md:pb-20 pt-8 md:pt-16">
                            {/* Header Text */}
                            <div className="mb-6 md:mb-12 text-center">
                                <div className="inline-flex items-center gap-2 mb-6">
                                    <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                                    <span className="text-[10px] font-mono text-primary/80 tracking-widest uppercase">Welcome to PICT</span>
                                </div>
                                <h1 className="text-4xl md:text-8xl font-bold text-white tracking-tight mb-4 leading-[1.1]">
                                    Acad<span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">verse</span>
                                </h1>
                                <p className="text-sm md:text-base text-neutral-400 font-light tracking-wide">
                                    Your Academic Universe
                                </p>
                            </div>

                            {/* Auth Forms */}
                            <div className="w-full max-w-[90vw] sm:max-w-sm relative z-20">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000" />
                                    <Card className="bg-[#0A0A0A]/80 border-white/[0.08] shadow-2xl relative backdrop-blur-3xl">
                                        <CardHeader className="pt-6 pb-4 text-center border-b border-white/[0.03]">
                                            <CardTitle className="text-white text-sm font-medium tracking-wide">Identity Verification</CardTitle>
                                            <CardDescription className="text-neutral-600 text-[10px] uppercase tracking-wider">Secure Access Protocol</CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-6 space-y-4">
                                            <Tabs defaultValue="login" className="w-full">
                                                <TabsList className="grid w-full grid-cols-2 h-8 bg-white/[0.03] p-1 border border-white/[0.05] rounded-lg">
                                                    <TabsTrigger value="login" className="text-[10px] h-6 data-[state=active]:bg-neutral-800 data-[state=active]:text-white text-neutral-500">LOGIN</TabsTrigger>
                                                    <TabsTrigger value="register" className="text-[10px] h-6 data-[state=active]:bg-neutral-800 data-[state=active]:text-white text-neutral-500">REGISTER</TabsTrigger>
                                                </TabsList>

                                                {/* LOGIN SECTION */}
                                                <TabsContent value="login">
                                                    <form onSubmit={handleLogin} className="space-y-4 mt-6">
                                                        <div className="space-y-4">

                                                            {/* Email Input Field */}
                                                            <div className="relative group">
                                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-300">
                                                                    <Mail className="w-4 h-4" />
                                                                </div>
                                                                <Input
                                                                    type="email"
                                                                    placeholder="user@pict.edu"
                                                                    value={loginEmail}
                                                                    onChange={(e) => setLoginEmail(e.target.value)}
                                                                    className="pl-10 h-11 bg-white/[0.03] border-white/[0.1] text-white text-xs placeholder:text-neutral-600 focus:border-indigo-500/80 focus:bg-white/[0.08] focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 rounded-xl"
                                                                />
                                                            </div>

                                                            {/* Password Input Field */}
                                                            <div className="relative group">
                                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-300">
                                                                    <Lock className="w-4 h-4" />
                                                                </div>
                                                                <Input
                                                                    type="password"
                                                                    placeholder="••••••••"
                                                                    value={loginPassword}
                                                                    onChange={(e) => setLoginPassword(e.target.value)}
                                                                    className="pl-10 h-11 bg-white/[0.03] border-white/[0.1] text-white text-xs placeholder:text-neutral-600 focus:border-indigo-500/80 focus:bg-white/[0.08] focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 rounded-xl"
                                                                />
                                                            </div>

                                                        </div>

                                                        <Button disabled={isLoading} className="w-full h-11 mt-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] border border-indigo-500/30">
                                                            {isLoading ? (
                                                                <span className="animate-pulse flex items-center gap-2">
                                                                    VERIFYING <span className="w-1 h-1 bg-white rounded-full animate-bounce" />
                                                                </span>
                                                            ) : "ACCESS TERMINAL"}
                                                        </Button>
                                                    </form>
                                                </TabsContent>

                                                <TabsContent value="register">
                                                    <form onSubmit={handleRegister} className="space-y-4 mt-6">
                                                        <div className="space-y-4">

                                                            {/* Name Input Field */}
                                                            <div className="relative group">
                                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-300">
                                                                    <User className="w-4 h-4" />
                                                                </div>
                                                                <Input
                                                                    placeholder="Full Name"
                                                                    value={registerName}
                                                                    onChange={(e) => setRegisterName(e.target.value)}
                                                                    className="pl-10 h-11 bg-white/[0.03] border-white/[0.1] text-white text-xs placeholder:text-neutral-600 focus:border-indigo-500/80 focus:bg-white/[0.08] focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 rounded-xl"
                                                                />
                                                            </div>

                                                            {/* Email Input Field */}
                                                            <div className="relative group">
                                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-300">
                                                                    <Mail className="w-4 h-4" />
                                                                </div>
                                                                <Input
                                                                    type="email"
                                                                    placeholder="user@pict.edu"
                                                                    value={registerEmail}
                                                                    onChange={(e) => setRegisterEmail(e.target.value)}
                                                                    className="pl-10 h-11 bg-white/[0.03] border-white/[0.1] text-white text-xs placeholder:text-neutral-600 focus:border-indigo-500/80 focus:bg-white/[0.08] focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 rounded-xl"
                                                                />
                                                            </div>

                                                            {/* Password Input Field */}
                                                            <div className="relative group">
                                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-300">
                                                                    <Lock className="w-4 h-4" />
                                                                </div>
                                                                <Input
                                                                    type="password"
                                                                    placeholder="••••••••"
                                                                    value={registerPassword}
                                                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                                                    className="pl-10 h-11 bg-white/[0.03] border-white/[0.1] text-white text-xs placeholder:text-neutral-600 focus:border-indigo-500/80 focus:bg-white/[0.08] focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 rounded-xl"
                                                                />
                                                            </div>

                                                        </div>

                                                        <Button disabled={isLoading} className="w-full h-11 mt-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] border border-indigo-500/30">
                                                            {isLoading ? (
                                                                <span className="animate-pulse flex items-center gap-2">
                                                                    CREATING ACCOUNT <span className="w-1 h-1 bg-white rounded-full animate-bounce" />
                                                                </span>
                                                            ) : "CREATE ACCOUNT"}
                                                        </Button>
                                                    </form>
                                                </TabsContent>
                                            </Tabs>

                                            <div className="relative py-2">
                                                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/[0.05]"></span></div>
                                                <div className="relative flex justify-center text-[8px] uppercase tracking-widest"><span className="bg-[#0A0A0A] px-2 text-neutral-600">Or Continue With</span></div>
                                            </div>

                                            {/* Google Sign-In Button */}
                                            <div className="flex justify-center w-full">
                                                <GoogleLogin
                                                    onSuccess={handleGoogleLogin}
                                                    onError={() => {
                                                        toast.error("Google Sign-In Failed", { description: "Please try again" });
                                                    }}
                                                    theme="filled_black"
                                                    size="large"
                                                    text="continue_with"
                                                    shape="rectangular"
                                                    width="100%"
                                                />
                                            </div>

                                            <div className="relative py-2">
                                                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/[0.05]"></span></div>
                                                <div className="relative flex justify-center text-[8px] uppercase tracking-widest"><span className="bg-[#0A0A0A] px-2 text-neutral-600">Guest Access</span></div>
                                            </div>

                                            <Button variant="ghost" onClick={handleGuestLogin} disabled={isLoading} className="w-full h-9 border border-white/[0.05] bg-transparent hover:bg-white/[0.03] text-neutral-500 hover:text-white text-[10px] font-medium tracking-wider rounded-lg uppercase">
                                                Guest Session
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <div className="w-full h-full bg-[#0A0A0A] relative overflow-hidden flex flex-col">
                        {/* Top Bar of the 'MacBook' */}
                        <div className="h-6 bg-[#1a1a1a] flex items-center px-4 gap-2 border-b border-white/5">
                            <div className="w-2 h-2 rounded-full bg-red-500/20" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                            <div className="w-2 h-2 rounded-full bg-green-500/20" />
                        </div>

                        {/* Main Screen Content - Dashboard Preview */}
                        <div className="flex-1 relative bg-black flex items-center justify-center">

                            {/* Locked State */}
                            {screenState === 'locked' && (
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <div className="w-16 h-16 mb-4 rounded-full border border-white/10 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                                    </div>
                                    <div className="text-neutral-500 font-mono text-xs tracking-[0.2em]">SYSTEM LOCKED</div>
                                </div>
                            )}

                            {/* Validated/Unlocked State */}
                            {screenState === 'unlocked' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 z-20 bg-cover bg-center"
                                    style={{
                                        backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000 100%)'
                                    }}
                                >
                                    {/* Mock Dashboard UI */}
                                    <div className="p-8">
                                        <div className="h-20 w-3/4 bg-white/5 rounded-xl mb-4 animate-pulse" />
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-32 bg-white/5 rounded-xl animate-pulse delay-75" />
                                            <div className="h-32 bg-white/5 rounded-xl animate-pulse delay-100" />
                                            <div className="h-32 bg-white/5 rounded-xl animate-pulse delay-150" />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                        <div className="text-center">
                                            <div className="text-4xl font-bold text-white mb-2 tracking-tighter">PICT ExamOrbit</div>
                                            <div className="text-sm text-green-500 font-mono">ACCESS GRANTED</div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                        </div>
                    </div>
                </ContainerScroll>
            </motion.div>
        </div>
    );
};

export default AuthLanding;