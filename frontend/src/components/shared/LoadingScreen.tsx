interface LoadingScreenProps {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
    fullScreen?: boolean;
}

const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-20 w-20'
} as const;

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
                                                                message = "Chargement...",
                                                                size = 'md',
                                                                fullScreen = true
                                                            }) => {
    const containerClass = fullScreen
        ? "min-h-[70vh] flex items-center justify-center"
        : "flex items-center justify-center p-8";

    return (
        <div className={containerClass}>
            <div className="text-center space-y-4">
                <div
                    className={`animate-spin rounded-full ${sizeClasses[size]} border-4 border-primary border-t-transparent mx-auto`}/>
                <p className="text-xl font-semibold text-muted-foreground">{message}</p>
            </div>
        </div>
    );
};