import path from "node:path"
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        host: '0.0.0.0'
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // React core
                    'react-vendor': ['react', 'react-dom'],

                    // Router
                    'router': ['react-router-dom'],

                    // Animation libraries (these are heavy)
                    'animations': ['framer-motion', 'react-confetti'],

                    // UI libraries
                    'ui-radix': [
                        '@radix-ui/react-label',
                        '@radix-ui/react-slot',
                        '@radix-ui/react-switch'
                    ],
                    'ui-headless': ['@headlessui/react'],

                    // Utilities
                    'utils': [
                        'clsx',
                        'class-variance-authority',
                        'tailwind-merge',
                        'axios'
                    ],

                    // Icons and theming
                    'icons-theme': ['lucide-react', 'next-themes', 'sonner'],
                },
            },
        },
        // Increase chunk size warning limit since we're splitting chunks
        chunkSizeWarningLimit: 600,
    },
    // Performance optimizations
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            'react-router-dom',
            'framer-motion',
            'lucide-react'
        ],
    },
})
