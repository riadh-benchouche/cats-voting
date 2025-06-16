import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-muted">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}