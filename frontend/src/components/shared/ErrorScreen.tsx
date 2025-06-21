import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LAYOUT_CONSTANTS } from '@/constants';

interface ErrorScreenProps {
    message?: string;
    onRetry?: () => void;
    retryText?: string;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({
                                                            message = "Une erreur est survenue",
                                                            onRetry,
                                                            retryText = "Réessayer"
                                                        }) => (
    <div className={`min-h-[${LAYOUT_CONSTANTS.MIN_SCREEN_HEIGHT}] flex items-center justify-center`}>
        <div className="text-center space-y-6 max-w-md mx-auto p-6">
            <AlertTriangle className="w-16 h-16 text-destructive mx-auto" />
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Oops !</h3>
                <p className="text-muted-foreground">{message}</p>
            </div>
            {onRetry && (
                <Button onClick={onRetry} variant="outline">
                    {retryText}
                </Button>
            )}
        </div>
    </div>
);