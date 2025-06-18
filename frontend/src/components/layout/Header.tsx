import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {useAuth} from '@/hooks/useAuth';
import {useTheme} from "@/context/themeContext.tsx";
import {Home, Vote, Trophy, User, LogOut, Menu, X, Sun, Moon} from 'lucide-react';
import {Dialog, DialogPanel} from '@headlessui/react';
import {useState} from "react";
import {cn} from "@/lib/utils";
import logo from '@/assets/kitty.svg';
import {Switch} from '@/components/ui/switch.tsx';

export default function Header() {
    const {logout, isAuthenticated} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const {theme, setTheme, actualTheme} = useTheme();

    const navigation = [
        {name: 'Accueil', href: '/', icon: Home, public: true},
        {name: 'Voter', href: '/app/vote', icon: Vote, public: false},
        {name: 'Classement', href: '/ranking', icon: Trophy, public: true},
        {name: 'Profil', href: '/app/profile', icon: User, public: false},
    ];

    const filteredNavigation = navigation.filter(item =>
        item.public || isAuthenticated
    );

    const isActive = (href: string) => {
        if (href === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(href);
    };

    const handleLogout = () => {
        logout();
        navigate('/login', {replace: true});
        setMobileMenuOpen(false);
    };

    const handleMobileNavClick = (href: string) => {
        navigate(href);
        setMobileMenuOpen(false);
    };

    const handleThemeToggle = (checked: boolean) => {
        setTheme(checked ? 'dark' : 'light');
    };

    const isDarkMode = theme === 'dark' || (theme === 'system' && actualTheme === 'dark');

    return (
        <header
            className="bg-card py-2 border-b border-border sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-card/95">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
                {/* Logo */}
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                        <img src={logo} alt="CatVote Logo" className="h-10 w-10 "/>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="flex lg:hidden">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setMobileMenuOpen(true)}
                        className="p-2"
                    >
                        <span className="sr-only">Ouvrir le menu</span>
                        <Menu className="h-6 w-6"/>
                    </Button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex lg:gap-x-8">
                    {filteredNavigation.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                    active
                                        ? "bg-accent text-accent-foreground"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                )}
                            >
                                <Icon className="h-4 w-4"/>
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop Auth Actions */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
                    <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-muted-foreground"/>
                        <Switch
                            checked={isDarkMode}
                            onCheckedChange={handleThemeToggle}
                            aria-label="Basculer entre mode clair et sombre"
                        />
                        <Moon className="h-4 w-4 text-muted-foreground"/>
                    </div>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
                                className="flex items-center gap-2"
                            >
                                <LogOut className="h-4 w-4"/>
                                Déconnexion
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                asChild
                            >
                                <Link to="/login">Connexion</Link>
                            </Button>
                            <Button
                                size="sm"
                                asChild
                            >
                                <Link to="/register">Inscription</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile Menu Dialog */}
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"/>
                <DialogPanel
                    className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-card p-6 sm:max-w-sm border-l border-border">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between">
                        <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                            <img src={logo} alt="CatVote Logo" className="h-10   w-10 "/>
                        </Link>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2"
                        >
                            <span className="sr-only">Fermer le menu</span>
                            <X className="h-6 w-6"/>
                        </Button>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-border">
                            {/* Navigation Links */}
                            <div className="space-y-2 py-6">
                                {filteredNavigation.map((item) => {
                                    const Icon = item.icon;
                                    const active = isActive(item.href);

                                    return (
                                        <button
                                            key={item.name}
                                            onClick={() => handleMobileNavClick(item.href)}
                                            className={cn(
                                                "flex items-center gap-3 w-full px-3 py-3 text-base font-semibold rounded-lg transition-colors",
                                                active
                                                    ? "bg-accent text-accent-foreground"
                                                    : "text-foreground hover:bg-accent/50"
                                            )}
                                        >
                                            <Icon className="h-5 w-5"/>
                                            {item.name}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="py-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Sun className="h-5 w-5"/>
                                        <span className="text-base font-medium">Mode sombre</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Switch
                                            checked={isDarkMode}
                                            onCheckedChange={handleThemeToggle}
                                            aria-label="Basculer entre mode clair et sombre"
                                        />
                                        <Moon className="h-5 w-5"/>
                                    </div>
                                </div>
                            </div>

                            {/* Auth Section */}
                            <div className="py-6">
                                {isAuthenticated ? (
                                    <div className="space-y-3">
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start gap-3"
                                            onClick={handleLogout}
                                        >
                                            <LogOut className="h-5 w-5"/>
                                            Déconnexion
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => handleMobileNavClick('/login')}
                                        >
                                            Connexion
                                        </Button>
                                        <Button
                                            className="w-full"
                                            onClick={() => handleMobileNavClick('/register')}
                                        >
                                            Inscription
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}