import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const SalesCommissionExpenseHead = async () => {
    const session = await auth();
    if (!session?.user) {
        redirect('/login');
    }
    const a;
    const b;
    // testing auto deployment
    return (
        <div className="flex flex-col gap-2 container">
            <h1 className="text-3xl font-semibold">Profit Tracker</h1>
            <p className="text-lg"> {session?.user?.name} </p>
            <p className="text-lg"> {session?.user?.email} </p>
        </div>
    );
};

export default SalesCommissionExpenseHead;
