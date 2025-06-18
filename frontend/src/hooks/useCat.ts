import {useState, useCallback} from 'react';
import type {Cat, CatStats} from "@/types/cat.types";
import type {ApiError} from "@/types/api.types";
import {catsService} from "@/services/catsService";

export const useCat = () => {
    const [cats, setCats] = useState<Cat[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ApiError | null>(null);
    const [stats, setStats] = useState<CatStats | null>(null);

    /**
     * Récupérer tous les chats
     */
    const fetchCats = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedCats = await catsService.getAllCats();
            setCats(fetchedCats);
            return fetchedCats;
        } catch (err) {
            console.error('Error fetching cats:', err);
            setError(err as ApiError);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Récupérer les statistiques globales des chats
     */
    const fetchStats = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedStats = await catsService.getStats();
            setStats(fetchedStats);
            return fetchedStats;
        } catch (err) {
            console.error('Error fetching cat stats:', err);
            setError(err as ApiError);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Récupérer le classement des chats
     */
    const fetchRanking = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const ranking = await catsService.getRanking();
            setCats(ranking);
            return ranking;
        } catch (err) {
            console.error('Error fetching cat ranking:', err);
            setError(err as ApiError);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Récupérer un chat par son ID
     */
    const getCatById = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const cat = await catsService.getCatById(id);
            return cat;
        } catch (err) {
            console.error(`Error fetching cat with ID ${id}:`, err);
            setError(err as ApiError);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Réinitialiser l'état
     */
    const resetState = useCallback(() => {
        setCats([]);
        setStats(null);
        setError(null);
    }, []);

    return {
        // État des données
        cats,
        loading,
        error,
        stats,

        // Actions
        fetchCats,
        fetchStats,
        fetchRanking,
        getCatById,
        resetState,

        // États dérivés
        totalCats: cats.length,
        hasStats: !!stats,
        isEmpty: cats.length === 0,
    };
};