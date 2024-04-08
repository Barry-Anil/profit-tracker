'use client';
import { Button } from '@/components/ui/button';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const Login = () => {
    const { status, data } = useSession();
    if (status === 'authenticated' && data?.user) {
        redirect('/');
    }
    return (
        <div className="relative">
            <div className="absolute inset-0">
                <Image priority width={1920} height={1080} src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 dark:bg-[#060818] sm:px-16">
                <Image width={300} height={893} priority src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute w-auto h-auto left-0 top-1/2 -translate-y-1/2" />
                <Image width={300} height={160} priority src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute w-auto h-auto left-24 top-0 md:left-[30%]" />
                <Image width={300} height={300} priority src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute w-auto h-auto right-0 top-0" />
                <Image width={300} height={100} priority src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%] w-auto h-auto" />

                <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[90vh] lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative bg-slate-950 hidden w-full items-center justify-center  p-5 lg:inline-flex xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <Image width={1000} height={1000} priority src="/assets/images/auth/login.png" alt="Cover Image" className="w-full h-full absolute opacity-50 object-contain aspect-[9/16]" />
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                            <Link href="/" className="ms-10 block w-48 lg:w-72">
                                <h1 className="text-3xl font-semibold text-white">VG Industrial</h1>
                                {/* <Image width={300} height={300} priority src="/assets/images/logo.png" alt="Logo" className="w-full" /> */}
                            </Link>
                        </div>
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-start gap-6 px-4 pb-16 pt-6 sm:px-6">
                        <div className="flex  items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                            <Link href="/" className="block w-full h-full lg:hidden">
                                <Image width={40} height={40} priority src="/assets/images/logo.png" alt="Logo" className="mx-auto " />
                            </Link>
                        </div>
                        <div className=" lg:mt-16">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold md:text-4xl text-center">Sign in to ERP Online</h1>
                            </div>
                            <div>
                                <Button disabled={status === 'loading'} onClick={() => signIn('azure-ad')} className="w-full text-lg font-semibold">
                                    {status === 'loading' ? 'Hold on...' : 'Login with Azure AD'}
                                </Button>
                            </div>
                        </div>
                        <p className="absolute bottom-6 w-full text-center dark:text-white">© {new Date().getFullYear()}.VG Industrial All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
