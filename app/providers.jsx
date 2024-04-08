'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
const queryClient = new QueryClient();
export default function Providers({ children, ...props }) {
    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <NextThemesProvider {...props}>
                    {children}
                    <ReactQueryDevtools initialIsOpen={false} />
                </NextThemesProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
}
