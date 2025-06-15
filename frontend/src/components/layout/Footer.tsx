import {Heart} from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t mt-auto">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-center text-sm text-gray-600">
                    <span>Fait avec</span>
                    <Heart className="h-4 w-4 text-pink-500 mx-1"/>
                    <span>pour les amoureux des chats</span>
                </div>
            </div>
        </footer>
    );
}