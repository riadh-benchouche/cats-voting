import {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {toast} from 'sonner';
import type {UpdateAccountDto, User} from '@/types/auth.types';

interface GeneralTabProps {
    user: User;
    loading: boolean;
    onUpdateAccount: (data: UpdateAccountDto) => Promise<User>;
}

export function GeneralTab({user, loading, onUpdateAccount}: GeneralTabProps) {
    const [name, setName] = useState(user?.name || '');

    useEffect(() => {
        setName(user?.name || '');
    }, [user?.name]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error('Le nom est requis');
            return;
        }
        try {
            await onUpdateAccount({name: name.trim()});
            toast.success('Profil mis à jour avec succès !');
        } catch (error) {
            toast.error('Erreur lors de la mise à jour du profil');
        }
    };

    return (
        <div>
            <h2 className="text-base font-semibold text-foreground">Informations générales</h2>
            <p className="mt-1 text-sm text-muted-foreground">
                Mettez à jour vos informations personnelles.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1"
                        required
                    />
                </div>

                <Button type="submit" disabled={loading}>
                    {loading ? 'Mise à jour...' : 'Mettre à jour'}
                </Button>
            </form>
        </div>
    );
}