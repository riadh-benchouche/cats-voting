import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-yellow-950/20">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-16 md:px-8 lg:px-16 md:py-20 lg:py-24">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}