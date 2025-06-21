import type {LucideIcon} from 'lucide-react';

interface StatsCardProps {
    icon: LucideIcon;
    value: string | number;
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
}

export function StatsCard({ icon: Icon, value, label, color, bgColor, borderColor }: StatsCardProps) {
    return (
        <div className={`${bgColor} border ${borderColor} rounded-xl p-4 text-center`}>
            <Icon className={`w-8 h-8 ${color} mx-auto mb-2`} />
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
        </div>
    );
}