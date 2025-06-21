import {Button} from '@/components/ui/button';
import {LoadingScreen} from '@/components/shared';
import type {UserVotesHistory} from "@/types/vote.types.ts";

interface HistoryTabProps {
    votesHistory: UserVotesHistory | null;
    loading: boolean;
    onRetry: () => void;
}

export function HistoryTab({votesHistory, loading, onRetry}: HistoryTabProps) {
    if (loading) {
        return (
            <div className="mt-6">
                <LoadingScreen message="Chargement de l'historique..."/>
            </div>
        );
    }

    if (!votesHistory) {
        return (
            <div>
                <h2 className="text-base font-semibold text-foreground">Historique des votes</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Consultez vos votes et statistiques.
                </p>
                <div className="mt-6">
                    <p className="text-muted-foreground">Impossible de charger l'historique des votes.</p>
                    <Button onClick={onRetry} className="mt-2">
                        Réessayer
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-base font-semibold text-foreground">Historique des votes</h2>
            <p className="mt-1 text-sm text-muted-foreground">
                Consultez vos votes et statistiques.
            </p>

            <div className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-card border border-border rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary">{votesHistory.totalVotes}</div>
                        <div className="text-sm text-muted-foreground">Votes totaux</div>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary">{votesHistory.favoriteCats.length}</div>
                        <div className="text-sm text-muted-foreground">Chats favoris</div>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary">{votesHistory.bestStreak}</div>
                        <div className="text-sm text-muted-foreground">Meilleur streak</div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Votes récents</h3>
                    {votesHistory.votes.length > 0 ? (
                        <div className="space-y-2">
                            {votesHistory.votes.slice(0, 10).map((vote) => (
                                <div key={vote.id}
                                     className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={vote.cat.image}
                                            alt={`Chat ${vote.cat.id}`}
                                            className="w-12 h-12 object-cover rounded-lg"
                                        />
                                        <div>
                                            <div className="font-medium">Chat #{vote.cat.id}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {new Date(vote.created_at).toLocaleDateString('fr-FR')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {vote.cat.votes} votes totaux
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">Aucun vote pour le moment.</p>
                    )}
                </div>
            </div>
        </div>
    );
}