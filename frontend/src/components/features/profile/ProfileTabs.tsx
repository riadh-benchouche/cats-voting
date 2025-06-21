import {UserCircleIcon, SettingsIcon, KeyIcon} from 'lucide-react';

export type TabType = 'general' | 'security' | 'history';

export const TABS = [
    {id: 'general' as TabType, name: 'Profile', icon: UserCircleIcon},
    {id: 'security' as TabType, name: 'Sécurité', icon: KeyIcon},
    {id: 'history' as TabType, name: 'Historique', icon: SettingsIcon},
];

interface ProfileTabsProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export function ProfileTabs({activeTab, onTabChange}: ProfileTabsProps) {
    return (
        <aside className="flex overflow-x-auto border-b border-border lg:block lg:w-64 lg:flex-none lg:border-0">
            <nav className="flex-none px-4 sm:px-6 lg:px-0">
                <ul className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                    {TABS.map((tab) => (
                        <li key={tab.id}>
                            <button
                                onClick={() => onTabChange(tab.id)}
                                className={`group flex gap-x-3 rounded-md py-2 pr-3 pl-2 text-sm font-semibold w-full text-left transition-colors ${
                                    activeTab === tab.id
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                            >
                                <tab.icon
                                    className={`size-6 shrink-0 ${
                                        activeTab === tab.id ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                                    }`}
                                />
                                {tab.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}