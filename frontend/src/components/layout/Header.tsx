import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Heart, Home, Vote, Trophy, User, LogOut } from 'lucide-react';

export default function Header() {
    const { user, logout } = useAuth();
    const location = useLocation();

    const navigation = [
        { name: 'Accueil', href: '/', icon: Home },
        { name: 'Voter', href: '/vote', icon: Vote },
        { name: 'Classement', href: '/ranking', icon: Trophy },
        { name: 'Profil', href: '/profile', icon: User },
    ];

    const isActive = (href: string) => {
        if (href === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(href);
    };

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <Heart className="h-8 w-8 text-pink-500" />
                        <span className="text-xl font-bold text-gray-900">CatMash</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex space-x-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive(item.href)
                                            ? 'bg-pink-100 text-pink-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User menu */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-600" />
                            <span className="text-sm text-gray-700">{user?.name}</span>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={logout}
                            className="flex items-center space-x-1"
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="hidden sm:inline">Déconnexion</span>
                        </Button>
                    </div>
                </div>

                {/* Mobile navigation */}
                <div className="md:hidden py-2">
                    <div className="flex space-x-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-md text-xs transition-colors ${
                                        isActive(item.href)
                                            ? 'bg-pink-100 text-pink-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </header>
    );
}