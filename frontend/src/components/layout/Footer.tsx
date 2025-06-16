import {Heart} from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-card border-t border-border sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-card/95">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <span>Fait avec</span>
                    <Heart className="h-4 w-4 text-primary mx-1"/>
                    <span>pour les amoureux des chats</span>
                </div>
            </div>
        </footer>
    );
}