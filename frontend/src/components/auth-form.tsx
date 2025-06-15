import {useState} from 'react';
import {Link} from 'react-router-dom';
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {useAuth} from '@/hooks/useAuth';
import type {LoginCredentials, RegisterCredentials} from '@/types/auth.types';
import LoginCat from "@/assets/login-cat.webp";
import RegisterCat from "@/assets/register-cat.webp";
import {AlertCircle} from 'lucide-react';

interface AuthFormProps {
    mode: 'login' | 'register';
    className?: string;
}

export function AuthForm({mode, className, ...props}: AuthFormProps & React.ComponentProps<"div">) {
    const {login, register, isLoading} = useAuth();
    const [error, setError] = useState<string>('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const isLogin = mode === 'login';

    const config = {
        login: {
            title: 'Re bonjour',
            subtitle: 'Trouvez le chat le plus mignon !',
            submitText: 'Connectez-vous',
            switchText: "Vous n'avez pas de compte ?",
            switchLink: '/register',
            switchLabel: 'Inscrivez-vous',
            image: LoginCat,
        },
        register: {
            title: 'Bonjour',
            subtitle: 'Rejoignez la communauté des amoureux de chats !',
            submitText: 'S\'inscrire',
            switchText: 'Vous avez déjà un compte ?',
            switchLink: '/login',
            switchLabel: 'Connectez-vous',
            image: RegisterCat,
        },
    };

    const currentConfig = config[mode];

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({...prev, [field]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                const credentials: LoginCredentials = {
                    email: formData.email,
                    password: formData.password,
                };
                await login(credentials);
            } else {
                const credentials: RegisterCredentials = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                };
                await register(credentials);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : `Erreur lors de ${isLogin ? 'la connexion' : 'l\'inscription'}`);
        } finally {
            setFormData({
                name: '',
                email: '',
                password: '',
            });
        }
    };

    const handleGoogleAuth = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    };

    const handleGithubAuth = () => {
        window.location.href = 'http://localhost:3000/auth/github';
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            {/* Header */}
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">{currentConfig.title}</h1>
                                <p className="text-muted-foreground text-balance">
                                    {currentConfig.subtitle}
                                </p>
                            </div>

                            {/* Name field (only for register) */}
                            {!isLogin && (
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        required
                                    />
                                </div>
                            )}

                            {/* Email field */}
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="johndoe@example.com"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    required
                                />
                            </div>

                            {/* Password field */}
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {isLogin && (
                                        <a
                                            href="#"
                                            className="ml-auto text-sm underline-offset-2 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    required
                                    minLength={!isLogin ? 8 : undefined}
                                />
                                {!isLogin && (
                                    <p className="text-xs text-muted-foreground">
                                        Au moins 8 caractères avec une majuscule, une minuscule et un chiffre
                                    </p>
                                )}
                            </div>

                            {/* Error Alert */}
                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4"/>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {/* Submit Button */}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Chargement...' : currentConfig.submitText}
                            </Button>

                            {/* Separator */}
                            <div
                                className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-card text-muted-foreground relative z-10 px-2">
                                  Or continue with
                                </span>
                            </div>

                            {/* OAuth Buttons */}
                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    variant="outline"
                                    type="button"
                                    className="w-full"
                                    onClick={handleGithubAuth}
                                    disabled={isLoading}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_199_1298)">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M12 0C5.3724 0 0 5.3808 0 12.0204C0 17.3304 3.438 21.8364 8.2068 23.4252C8.8068 23.5356 9.0252 23.1648 9.0252 22.8456C9.0252 22.5612 9.0156 21.804 9.0096 20.802C5.6712 21.528 4.9668 19.1904 4.9668 19.1904C4.422 17.8008 3.6348 17.4312 3.6348 17.4312C2.5452 16.6872 3.7176 16.7016 3.7176 16.7016C4.9212 16.7856 5.5548 17.94 5.5548 17.94C6.6252 19.776 8.364 19.2456 9.0468 18.9384C9.1572 18.162 9.4668 17.6328 9.81 17.3328C7.146 17.0292 4.344 15.9972 4.344 11.3916C4.344 10.08 4.812 9.006 5.5788 8.166C5.4552 7.8624 5.0436 6.6396 5.6964 4.986C5.6964 4.986 6.7044 4.662 8.9964 6.2172C9.97532 5.95022 10.9853 5.81423 12 5.8128C13.02 5.8176 14.046 5.9508 15.0048 6.2172C17.2956 4.662 18.3012 4.9848 18.3012 4.9848C18.9564 6.6396 18.5436 7.8624 18.4212 8.166C19.1892 9.006 19.6548 10.08 19.6548 11.3916C19.6548 16.0092 16.848 17.0256 14.1756 17.3232C14.6064 17.694 14.9892 18.4272 14.9892 19.5492C14.9892 21.1548 14.9748 22.452 14.9748 22.8456C14.9748 23.1672 15.1908 23.5416 15.8004 23.424C18.19 22.6225 20.2672 21.0904 21.7386 19.0441C23.2099 16.9977 24.001 14.5408 24 12.0204C24 5.3808 18.6264 0 12 0Z"
                                                  fill="currentColor"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_199_1298">
                                                <rect width="24" height="24" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span className="sr-only">{currentConfig.submitText} with Github</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    type="button"
                                    className="w-full"
                                    onClick={handleGoogleAuth}
                                    disabled={isLoading}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <span className="sr-only">{currentConfig.submitText} with Google</span>
                                </Button>
                            </div>

                            {/* Switch mode link */}
                            <div className="text-center text-sm">
                                {currentConfig.switchText}{" "}
                                <Link to={currentConfig.switchLink} className="underline underline-offset-4">
                                    {currentConfig.switchLabel}
                                </Link>
                            </div>
                        </div>
                    </form>

                    {/* Image side */}
                    <div className="bg-muted relative hidden md:block">
                        <img
                            src={currentConfig.image}
                            alt="Cute cat"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}