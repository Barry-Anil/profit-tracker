'use client';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import useThemeConfigStore from '@/store/themeConfig';
import { Calendar, ChevronFirst, ChevronRight, DollarSign, File, Home, PencilRuler, UserRoundCog } from 'lucide-react';
import { sidebarData } from '../../data/sidebarData';

const Sidebar = () => {
    const dispatch = useDispatch();
    const { sidebar, toggleSidebar } = useThemeConfigStore();
    const router = useRouter();
    const pathname = usePathname();
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    // const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    const setActiveRoute = () => {
        let allLinks = document.querySelectorAll('.sidebar ul a.active');
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            element?.classList?.remove('active');
        }
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        selector?.classList?.add('active');
    };

    const { t } = useTranslation();

    useEffect(() => {
        setActiveRoute();
        if (window.innerWidth < 1024 && sidebar) {
            toggleSidebar();
        }
    }, [dispatch, pathname, sidebar, toggleSidebar]);

    const icons: { [key: string]: JSX.Element } = {
        Home: <Home className="h-4 w-4" />,
        DollarSign: <DollarSign className="h-4 w-4" />,
        Calendar: <Calendar className="h-4 w-4" />,
        File: <File className="h-4 w-4" />,
        UserRoundCog: <UserRoundCog className="h-4 w-4" />,
        PencilRuler: <PencilRuler className="h-4 w-4" />,
    };

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed top-0 bottom-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="h-full bg-white dark:bg-black">
                    <div className="flex items-center justify-between px-4 py-3">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                            <Image quality={100} width={40} height={40} className="ml-[5px] w-8 flex-none" src="/assets/images/logo.png" alt="logo" />
                            <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">{t('VG Industrial')}</span>
                        </Link>

                        <button
                            type="button"
                            className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                            onClick={() => {
                                toggleSidebar();
                            }}
                        >
                            <ChevronFirst className="h-6 w-6" />
                        </button>
                    </div>
                    <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                        <ul className="relative space-y-0.5 px-3.5 py-0 font-semibold">
                            {sidebarData.map((item, index) => {
                                return (
                                    <div key={index}>
                                        {item.heading === '' ? null : (
                                            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 py-3 px-4 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                                {/* <svg
                                                    className="hidden h-5 w-4 flex-none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                </svg> */}
                                                <span>{t(item.heading)}</span>
                                            </h2>
                                        )}
                                        {item.children.length > 0 &&
                                            item.children.map((child, index) => {
                                                return child.children.length > 0 ? (
                                                    <li key={index} className="menu nav-item">
                                                        <button
                                                            type="button"
                                                            className={`${currentMenu === child.value ? 'active' : ''} nav-link group w-full`}
                                                            onClick={() => toggleMenu(child.value)}
                                                        >
                                                            <div className="flex items-center">
                                                                {icons[child.icon]}
                                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t(child.title)}</span>
                                                            </div>

                                                            <div className={currentMenu === child.value ? 'rotate-90' : 'rtl:rotate-180'}>
                                                                <ChevronRight className="h-4 w-4" />
                                                            </div>
                                                        </button>

                                                        <AnimateHeight duration={300} height={currentMenu === child.value ? 'auto' : 0}>
                                                            <ul className="sub-menu text-gray-500 list-none">
                                                                {child.children.map((subchild, index) => {
                                                                    return (
                                                                        <li key={index}>
                                                                            <Link href={subchild.link}>{t(subchild.title)} </Link>
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        </AnimateHeight>
                                                    </li>
                                                ) : (
                                                    <li key={index} className="nav-item">
                                                        <Link href={child.link} className="group">
                                                            <div className="flex items-center">
                                                                {icons[child.icon]}
                                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t(child.title)}</span>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                    </div>
                                );
                            })}
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
