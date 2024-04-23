import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader } from 'lucide-react';
import React from 'react';
import AddExpCategoryToolbar from './AddExpCategoryToolbar';
import ExpenseCategoryTable from './ExpenseCategoryTable';
const ExpenseCategoryInfoCard = ({ selectedProduct, expenseData }: {
    selectedProduct: {
        productId: number;
        productName: string;
        productShortName: string;

    },
    expenseData: any
}) => {
    const [form, setForm] = React.useState({
        category: 'production_cost_direct',
        subcategory: '',
        srNo: '',
        currency: '',
        unitCost: ''
    })
    const [showDialog, setShowDialog] = React.useState(false)

    // const nextSortOrder = typeData?.data?.success?.[0]?.fabric_type.length > 0 ? Math.max(...typeData?.data?.success?.[0]?.fabric_type?.map((obj: any) => obj.sortorder)) + 10 : null;
    return (
        <Card className="w-full overflow-hidden pt-0 ">
            <CardHeader className="flex flex-row justify-between p-4">
                <div>
                    <CardTitle className='w-fit'>Production Expense for <span className='text-primary'>{selectedProduct?.productName?.split('/')[0]}</span></CardTitle>
                </div>
                <div>
                    {!showDialog && <Button onClick={() => {
                        setShowDialog(true)
                    }}>+Add New Expense
                    </Button>}
                </div>
            </CardHeader>
            <CardContent>
                {showDialog && <AddExpCategoryToolbar form={form} setForm={setForm} setShowDialog={setShowDialog} />}
                {expenseData?.isLoading ? <div className="flex gap-2 justify-center items-center my-10 text-xl font-semibold">
                    <Loader className="w-4 h-4 animate-spin" /> Loading...
                </div> : <ExpenseCategoryTable expenseData={expenseData} />}
            </CardContent>
        </Card>
    );
};

export default ExpenseCategoryInfoCard;
