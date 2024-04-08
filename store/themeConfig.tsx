import { create } from 'zustand';

interface ThemeConfigState {
    isDarkMode: boolean;
    sidebar: boolean;
    theme: string;
    menu: string;
    layout: string;
    rtlClass: string;
    animation: string;
    navbar: string;
    locale: string;
    semidark: boolean;
    languageList: { code: string; name: string }[];
}

interface ThemeConfigActions {
    toggleTheme: (payload?: string) => void;
    toggleMenu: (payload?: string) => void;
    toggleLayout: (payload?: string) => void;
    toggleRTL: (payload?: string) => void;
    toggleAnimation: (payload?: string) => void;
    toggleNavbar: (payload?: string) => void;
    toggleSemidark: (payload?: boolean) => void;
    toggleLocale: (payload?: string) => void;
    toggleSidebar: () => void;
    setPageTitle: (payload: string) => void;
}

const useThemeConfigStore = create<ThemeConfigState & ThemeConfigActions>((set) => ({
    isDarkMode: false,
    sidebar: false,
    theme: 'light',
    menu: 'vertical',
    layout: 'full',
    rtlClass: 'ltr',
    animation: '',
    navbar: 'navbar-sticky',
    locale: 'en',
    semidark: false,
    languageList: [
        { code: 'zh', name: 'Chinese' },
        { code: 'da', name: 'Danish' },
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'el', name: 'Greek' },
        { code: 'hu', name: 'Hungarian' },
        { code: 'it', name: 'Italian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'pl', name: 'Polish' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'es', name: 'Spanish' },
        { code: 'sv', name: 'Swedish' },
        { code: 'tr', name: 'Turkish' },
        { code: 'ae', name: 'Arabic' },
    ],

    // Actions
    toggleTheme: (payload = 'light') => set((state) => ({ ...state, ...handleToggleTheme(payload) })),
    toggleMenu: (payload = 'vertical') => set((state) => ({ ...state, menu: payload })),
    toggleLayout: (payload = 'full') => set((state) => ({ ...state, layout: payload })),
    toggleRTL: (payload = 'ltr') => set((state) => ({ ...state, rtlClass: payload })),
    toggleAnimation: (payload = '') => set((state) => ({ ...state, animation: payload })),
    toggleNavbar: (payload = 'navbar-sticky') => set((state) => ({ ...state, navbar: payload })),
    toggleSemidark: (payload = false) => set((state) => ({ ...state, semidark: payload })),
    toggleLocale: (payload = 'en') => set((state) => ({ ...state, locale: payload })),
    toggleSidebar: () => set((state) => ({ ...state, sidebar: !state.sidebar })),
    setPageTitle: (payload) => {
        document.title = `${payload} | VG Industrial ERP`;
    },
}));

const handleToggleTheme = (payload: string) => {
    payload = payload || 'light';
    const isDarkMode = payload === 'dark' || (payload === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDarkMode) {
        document.querySelector('body')?.classList.add('dark');
    } else {
        document.querySelector('body')?.classList.remove('dark');
    }

    return {
        theme: payload,
        isDarkMode,
    };
};

export default useThemeConfigStore;
