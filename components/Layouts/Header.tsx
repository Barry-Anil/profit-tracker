'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { IRootState } from '../../store';
import { toggleLocale, toggleTheme, toggleRTL } from '../../store/themeConfigSlice';
import { useTranslation } from 'react-i18next';
import Dropdown from '../Dropdown';
import useThemeConfigStore from '@/store/themeConfig';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { Calendar, ChevronDownIcon, ChevronRightIcon, DollarSign, File, Home, Inbox, LayoutGrid, Lock, LogOut, Menu, Moon, PencilRuler, Sun, User, UserRoundCog } from 'lucide-react';
import { useTheme } from 'next-themes';
import { sidebarData } from '@/data/sidebarData';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Header = () => {
    const session = useSession();
    const { setTheme, themes } = useTheme();
    const router = useRouter();
    const pathname = usePathname();
    const { sidebar, toggleSidebar } = useThemeConfigStore();
    useEffect(() => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList?.remove('active');
            }

            let allLinks = document.querySelectorAll('ul.horizontal-menu a.active');
            for (let i = 0; i < allLinks.length; i++) {
                const element = allLinks[i];
                element?.classList?.remove('active');
            }
            selector?.classList?.add('active');

            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList?.add('active');
                    });
                }
            }
        }
    }, [pathname]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState('');
    useEffect(() => {
        setLocale(localStorage.getItem('i18nextLng') || themeConfig.locale);
    });
    const dispatch = useDispatch();

    const { t, i18n } = useTranslation();
    const icons: { [key: string]: JSX.Element } = {
        Home: <Home className="h-4 w-4" />,
        DollarSign: <DollarSign className="h-4 w-4" />,
        Calendar: <Calendar className="h-4 w-4" />,
        File: <File className="h-4 w-4" />,
        UserRoundCog: <UserRoundCog className="h-4 w-4" />,
        PencilRuler: <PencilRuler className="h-4 w-4" />,
    };
    return (
        <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
            <div className="shadow-sm">
                <div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black">
                    <div className="horizontal-logo flex items-center justify-between ltr:mr-2 rtl:ml-2 lg:hidden">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                            <Image quality={100} width={32} height={32} className="inline w-8 ltr:-ml-1 rtl:-mr-1" src="/assets/images/logo.png" alt="logo" />
                            <span className="hidden align-middle text-2xl  font-semibold  transition-all duration-300 ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light md:inline">VG Industrial</span>
                        </Link>
                        <button
                            type="button"
                            className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary ltr:ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden"
                            onClick={() => toggleSidebar()}
                        >
                            <Menu className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
                        <div className="sm:ltr:mr-auto sm:rtl:ml-auto"></div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="dropdown flex shrink-0">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="relative group block"
                                button={
                                    <Image
                                        width={40}
                                        height={40}
                                        className="h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                        src="/assets/images/user-profile.jpeg"
                                        alt="userProfile"
                                    />
                                }
                            >
                                <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                                    <li>
                                        <div className="flex items-start px-4 py-4">
                                            <Image width={40} height={40} className="rounded-md object-cover" src="/assets/images/user-profile.jpeg" alt="userProfile" />
                                            <div className="ltr:pl-4 rtl:pr-4">
                                                <h4 className="text-base truncate">
                                                    {session?.data?.user?.name}
                                                    {/* <span className="rounded bg-success-light px-1 text-xs text-success ltr:ml-2 rtl:ml-2">Pro</span> */}
                                                </h4>
                                                <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white truncate max-w-[14ch]">
                                                    {session?.data?.user?.email}
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Link href="/users/profile" className="dark:hover:text-white">
                                            <User className="w-4 h-4 mr-2" />
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/apps/mailbox" className="dark:hover:text-white">
                                            <Inbox className="w-4 h-4 mr-2" />
                                            Inbox
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/auth/boxed-lockscreen" className="dark:hover:text-white">
                                            <Lock className="w-4 h-4 mr-2" />
                                            Lock Screen
                                        </Link>
                                    </li>
                                    <li className="border-t border-white-light dark:border-white-light/10">
                                        <button className="!py-3 text-danger" onClick={() => signOut({ callbackUrl: '/' })}>
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                </div>

                {/* horizontal menu */}
                <ul className="horizontal-menu hidden border-t border-[#ebedf2] bg-white py-1.5 px-6 font-semibold text-black rtl:space-x-reverse dark:border-[#191e3a] dark:bg-black dark:text-white-dark lg:space-x-1.5 xl:space-x-8">
                    {sidebarData.map((item, index) =>
                        item.heading === '' ? (
                            item.children.length > 0 ? (
                                item.children.map((child, index) => (
                                    <li className="menu nav-item relative" key={index}>
                                        <button type="button" className="nav-link">
                                            <div className="flex items-center">
                                                {icons[child.icon]}
                                                <span className="px-1">{t(child.title)}</span>
                                            </div>
                                            <ChevronDownIcon className="w-4 h-4" />
                                        </button>
                                        <ul className="sub-menu">
                                            {child.children.map((subchild, index) => (
                                                <li>
                                                    <Link href={subchild.link}>{t(subchild.title)}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))
                            ) : (
                                ''
                            )
                        ) : (
                            <li className="menu nav-item relative" key={index}>
                                <button type="button" className="nav-link">
                                    <div className="flex items-center">
                                        <LayoutGrid className="w-4 h-4" />
                                        <span className="px-1">{t(item.heading)}</span>
                                    </div>
                                    <ChevronDownIcon className="w-4 h-4" />
                                </button>
                                <ul className="sub-menu">
                                    {item.children.map((child, index) =>
                                        child.children.length > 0 ? (
                                            <li className="relative" key={index}>
                                                <button type="button">
                                                    {t(child.title)}
                                                    <ChevronRightIcon className="w-4 h-4" />
                                                </button>
                                                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                                                    {child.children.map((subchild, index) => {
                                                        return (
                                                            <li key={index}>
                                                                <Link href={subchild.link}>{t(subchild.title)}</Link>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </li>
                                        ) : (
                                            <li key={index}>
                                                <Link href={child.link}>{t(child.title)}</Link>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </header>
    );
};

export default Header;
