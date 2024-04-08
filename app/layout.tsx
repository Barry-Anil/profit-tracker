import { GeistSans } from 'geist/font/sans';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import ReduxProvider from '../store/ReduxProvider';
import Providers from './providers';

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

import { Toaster } from 'sonner';
import '../styles/tailwind.css';

export const metadata = {
    title: 'Profit Tracker',
    description: 'Profit Tracker',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${GeistSans.variable}`}>
            <body className='bg-gray-50 dark:bg-black'>
                <ReduxProvider>
                    <Providers attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <DefaultLayout>
                            {children}
                            <Toaster richColors position="top-center" />
                        </DefaultLayout>
                    </Providers>
                </ReduxProvider>
            </body>
        </html>
    );
}
