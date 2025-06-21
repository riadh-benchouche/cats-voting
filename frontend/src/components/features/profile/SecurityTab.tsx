import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {toast} from 'sonner';
import type {UpdatePasswordDto} from '@/types/auth.types';

interface SecurityTabProps {
    loading: boolean;
    onUpdatePassword: (data: UpdatePasswordDto) => Promise<void>;
}

export function SecurityTab({loading, onUpdatePassword}: SecurityTabProps) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Les mots de passe ne correspondent pas');
            return;
        }
        if (newPassword.length < 6) {
            toast.error('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }
        try {
            await onUpdatePassword({oldPassword, newPassword, confirmPassword});
            toast.success('Mot de passe mis à jour avec succès !');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            toast.error('Erreur lors de la mise à jour du mot de passe');
        }
    };

    return (
        <div>
            <h2 className="text-base font-semibold text-foreground">Sécurité</h2>
            <p className="mt-1 text-sm text-muted-foreground">
                Changez votre mot de passe pour sécuriser votre compte.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <Label htmlFor="oldPassword">Mot de passe actuel</Label>
                    <Input
                        id="oldPassword"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="mt-1"
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1"
                        minLength={6}
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1"
                        minLength={6}
                        required
                    />
                </div>

                <Button type="submit" disabled={loading}>
                    {loading ? 'Mise à jour...' : 'Changer le mot de passe'}
                </Button>
            </form>
        </div>
    );
}