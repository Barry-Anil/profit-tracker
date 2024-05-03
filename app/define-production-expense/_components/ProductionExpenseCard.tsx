import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader } from 'lucide-react';
import React from 'react';
import CostingTable from './CostingTable';
const ProductionExpenseCard = ({ selectedProduct, expenseData }: {
    selectedProduct: {
        productId: number;
        productName: string;
        productShortName: string;

    },
    expenseData: any
}) => {





    return (
        <Card className="w-full overflow-hidden pt-0 ">
            <CardHeader className="flex flex-row justify-between p-4">
                <div>
                    <CardTitle className='w-fit'>Production Expense for <span className='text-primary'>{selectedProduct?.productName?.split('/')[0]}</span></CardTitle>
                </div>

            </CardHeader>
            <CardContent>
                {expenseData?.isLoading ? <div className="flex gap-2 justify-center items-center my-10 text-xl font-semibold">
                    <Loader className="w-4 h-4 animate-spin" /> Loading...
                </div> : <CostingTable expenseData={expenseData} />}
            </CardContent>
        </Card>
    );
};

export default ProductionExpenseCard;
