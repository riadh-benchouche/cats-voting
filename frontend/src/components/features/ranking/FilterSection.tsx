import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import type { FilterOption } from '@/types/shared.types';

interface FilterSectionProps {
    filterOption: FilterOption;
    onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({ filterOption, onFilterChange }) => (
    <motion.div
        className="flex justify-center md:justify-end max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
    >
        <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <select
                value={filterOption}
                onChange={onFilterChange}
                className="px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            >
                <option value="all">Tous les chats</option>
                <option value="top10">Top 10</option>
                <option value="rising">En progression</option>
            </select>
        </div>
    </motion.div>
);