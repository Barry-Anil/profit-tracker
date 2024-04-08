'use client';

import { Laptop2, Moon, Settings, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { toggleAnimation, toggleLayout, toggleMenu, toggleNavbar, toggleSemidark, toggleTheme } from '../../store/themeConfigSlice';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const Setting = () => {
    const { theme, setTheme } = useTheme();
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    const [showCustomizer, setShowCustomizer] = useState(false);

    return (
        <div>
            <div className={`${(showCustomizer && '!block') || ''} fixed inset-0 z-50 hidden bg-[black]/60 px-4 transition-[display]`} onClick={() => setShowCustomizer(false)}></div>

            <nav
                className={`${
                    (showCustomizer && 'ltr:!right-0 rtl:!left-0') || ''
                } fixed top-0 bottom-0 z-50 w-full max-w-[400px] bg-white p-4 shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 ltr:-right-[400px] rtl:-left-[400px] dark:bg-black`}
            >
                <button
                    type="button"
                    className="absolute top-0 bottom-0 my-auto flex h-10 w-12 cursor-pointer items-center justify-center bg-primary text-white ltr:-left-12 ltr:rounded-tl-full ltr:rounded-bl-full rtl:-right-12 rtl:rounded-tr-full rtl:rounded-br-full"
                    onClick={() => setShowCustomizer(!showCustomizer)}
                >
                    <Settings size={18} className="dark:text-black animate-[spin_5s_linear_infinite]" />
                </button>

                <div className="perfect-scrollbar h-full overflow-y-auto overflow-x-hidden">
                    <div className="relative pb-5 text-center">
                        <button type="button" className="absolute top-0 opacity-30 hover:opacity-100 ltr:right-0 rtl:left-0 dark:text-white" onClick={() => setShowCustomizer(false)}>
                            <X className="h-4 w-4" />
                        </button>

                        <h4 className="mb-1 dark:text-white">TEMPLATE CUSTOMIZER</h4>
                        <p className="text-white-dark">Set preferences that will be cookied for your live preview demonstration.</p>
                    </div>

                    <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                        <h5 className="mb-1 text-base leading-none dark:text-white">Color Scheme</h5>
                        <p className="text-xs text-white-dark">Overall light or dark presentation.</p>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                            <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')}>
                                <Sun className="h-4 w-4 mr-1" />
                                Light
                            </Button>

                            <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')}>
                                <Moon className="h-4 w-4 mr-1" />
                                Dark
                            </Button>

                            <Button variant={theme === 'system' ? 'default' : 'outline'} onClick={() => setTheme('system')}>
                                <Laptop2 className="h-4 w-4 mr-1" />
                                System
                            </Button>
                        </div>
                    </div>

                    <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                        <h5 className="mb-1 text-base leading-none dark:text-white">Navigation Position</h5>
                        <p className="text-xs text-white-dark">Select the primary navigation paradigm for your app.</p>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                            <Button variant={`${themeConfig.menu === 'horizontal' ? 'default' : 'outline'}`} onClick={() => dispatch(toggleMenu('horizontal'))}>
                                Horizontal
                            </Button>

                            <Button variant={`${themeConfig.menu === 'vertical' ? 'default' : 'outline'}`} onClick={() => dispatch(toggleMenu('vertical'))}>
                                Vertical
                            </Button>

                            <Button variant={`${themeConfig.menu === 'collapsible-vertical' ? 'default' : 'outline'}`} onClick={() => dispatch(toggleMenu('collapsible-vertical'))}>
                                Collapsible
                            </Button>
                        </div>
                        <div className="mt-5 text-primary">
                            <Label className="mb-0 inline-flex gap-1" id="semi-dark">
                                <Checkbox name="semi-dark" defaultChecked={themeConfig.semidark} onCheckedChange={(value: any) => dispatch(toggleSemidark(value))} />
                                <span>Semi Dark (Sidebar & Header)</span>
                            </Label>
                        </div>
                    </div>

                    <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                        <h5 className="mb-1 text-base leading-none dark:text-white">Layout Style</h5>
                        <p className="text-xs text-white-dark">Select the primary layout style for your app.</p>
                        <div className="mt-3 flex gap-2">
                            <Button variant={`${themeConfig.layout === 'boxed-layout' ? 'default' : 'outline'}`} className="flex-auto" onClick={() => dispatch(toggleLayout('boxed-layout'))}>
                                Box
                            </Button>

                            <Button variant={`${themeConfig.layout === 'full' ? 'default' : 'outline'}`} className="flex-auto" onClick={() => dispatch(toggleLayout('full'))}>
                                Full
                            </Button>
                        </div>
                    </div>

                    <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                        <h5 className="mb-1 text-base leading-none dark:text-white">Navbar Type</h5>
                        <p className="text-xs text-white-dark">Sticky or Floating.</p>
                        <div className="mt-3 flex items-center gap-3 text-primary">
                            <RadioGroup defaultValue="navbar-sticky" className="flex w-full justify-evenly">
                                <div className="flex items-center gap-1">
                                    <RadioGroupItem value="navbar-sticky" id="r1" onClick={() => dispatch(toggleNavbar('navbar-sticky'))} />
                                    <Label className="m-0 text-md" htmlFor="r1">
                                        Sticky
                                    </Label>
                                </div>
                                <div className="flex items-center gap-1">
                                    <RadioGroupItem value="navbar-floating" id="r2" onClick={() => dispatch(toggleNavbar('navbar-floating'))} />
                                    <Label className="m-0 text-md" htmlFor="r2">
                                        Floating
                                    </Label>
                                </div>
                                <div className="flex items-center gap-1">
                                    <RadioGroupItem value="navbar-static" id="r3" onClick={() => dispatch(toggleNavbar('navbar-static'))} />
                                    <Label className="m-0 text-md" htmlFor="r3">
                                        Static
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                        <h5 className="mb-1 text-base leading-none dark:text-white">Router Transition</h5>
                        <p className="text-xs text-white-dark">Animation of main content.</p>
                        <div className="mt-3">
                            <Select defaultValue={themeConfig.animation} onValueChange={(value) => dispatch(toggleAnimation(value))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Animation" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="animate__fadeIn">Fade</SelectItem>
                                        <SelectItem value="animate__fadeInDown">Fade Down</SelectItem>
                                        <SelectItem value="animate__fadeInUp">Fade Up</SelectItem>
                                        <SelectItem value="animate__fadeInLeft">Fade Left</SelectItem>
                                        <SelectItem value="animate__fadeInRight">Fade Right</SelectItem>
                                        <SelectItem value="animate__slideInDown">Slide Down</SelectItem>
                                        <SelectItem value="animate__slideInLeft">Slide Left</SelectItem>
                                        <SelectItem value="animate__slideInRight">Slide Right</SelectItem>
                                        <SelectItem value="animate__zoomIn">Zoom In</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Setting;
