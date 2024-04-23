import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader } from 'lucide-react';
import React from 'react';
import AddExpCategoryToolbar from './AddExpCategoryToolbar';
import ExpenseCategoryTable from './ExpenseCategoryTable';
const ExpenseCategoryInfoCard = ({ selectedCategory, expenseData }: {
    selectedCategory: {
        categoryName: string;
    },
    expenseData: any
}) => {

    const [showDialog, setShowDialog] = React.useState(false)

    // const nextSortOrder = typeData?.data?.success?.[0]?.fabric_type.length > 0 ? Math.max(...typeData?.data?.success?.[0]?.fabric_type?.map((obj: any) => obj.sortorder)) + 10 : null;
    return (
        <Card className="w-full overflow-hidden pt-0 ">
            <CardHeader className="flex flex-row justify-between p-4">
                <div>
                    <CardTitle className='w-fit'>Sub Categories For  <span className='text-primary'>{selectedCategory?.categoryName}</span> </CardTitle>
                </div>
                <div>
                    {!showDialog && <Button onClick={() => {
                        setShowDialog(true)
                    }}>+Add New Sub-category
                    </Button>}
                </div>
            </CardHeader>
            <CardContent>
                {showDialog && <AddExpCategoryToolbar selectedCategory={selectedCategory} setShowDialog={setShowDialog} />}
                {expenseData?.isLoading ? <div className="flex gap-2 justify-center items-center my-10 text-xl font-semibold">
                    <Loader className="w-4 h-4 animate-spin" /> Loading...
                </div> : <ExpenseCategoryTable expenseData={expenseData} />}
            </CardContent>
        </Card>
    );
};

export default ExpenseCategoryInfoCard;
