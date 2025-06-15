import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {AppProvider} from "@/context/appProvider.tsx";
import {AppRouter} from "@/router.tsx";
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppProvider>
            <AppRouter />
        </AppProvider>
    </StrictMode>,
)
