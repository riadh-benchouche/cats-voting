import {useEffect, useState} from 'react';
import {LoadingScreen} from '@/components/shared';
import {ProfileTabs, GeneralTab, SecurityTab, HistoryTab, type TabType} from '@/components/features/profile';
import {useProfile} from '@/hooks/useProfile';
import {useVote} from '@/hooks/useVote';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<TabType>('general');
    const {user, loading, updateAccount, updatePassword, passwordLoading} = useProfile();
    const {votesHistory, fetchVotesHistory, loading: votesLoading} = useVote();

    useEffect(() => {
        if (activeTab === 'history' && !votesHistory) {
            fetchVotesHistory();
        }
    }, [activeTab, votesHistory, fetchVotesHistory]);

    if (!user) {
        return <LoadingScreen message="Chargement du profil..."/>;
    }

    return (
        <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
            <h1 className="sr-only">Paramètres du profil</h1>

            <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="px-4 sm:px-6 lg:flex-auto lg:px-0">
                <div className="mx-auto max-w-2xl space-y-8 lg:mx-0 lg:max-w-none">
                    {activeTab === 'general' && (
                        <GeneralTab
                            user={user}
                            loading={loading}
                            onUpdateAccount={updateAccount}
                        />
                    )}

                    {activeTab === 'security' && (
                        <SecurityTab
                            loading={passwordLoading}
                            onUpdatePassword={updatePassword}
                        />
                    )}

                    {activeTab === 'history' && (
                        <HistoryTab
                            votesHistory={votesHistory}
                            loading={votesLoading}
                            onRetry={fetchVotesHistory}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}