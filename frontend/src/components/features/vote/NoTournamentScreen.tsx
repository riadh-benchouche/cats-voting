import React from 'react';
import { Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoTournamentScreenProps {
    onStartTournament: () => void;
    loading: boolean;
}

export const NoTournamentScreen: React.FC<NoTournamentScreenProps> = ({ onStartTournament, loading }) => (
    <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-6">
            <Crown className="w-16 h-16 text-yellow-500 mx-auto animate-pulse" />
            <h1 className="text-3xl font-bold">Prêt pour un nouveau tournoi ?</h1>
            <p className="text-muted-foreground">Affrontez tous les chats dans un tournoi complet !</p>
            <Button
                onClick={onStartTournament}
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
            >
                {loading ? 'Préparation...' : 'Démarrer le tournoi 🚀'}
            </Button>
        </div>
    </div>
);