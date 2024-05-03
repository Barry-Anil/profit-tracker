import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader } from 'lucide-react';
import React from 'react';
import AddExpCategoryToolbar from './AddExpCategoryToolbar';
import ExpenseCategoryTable from './ExpenseCategoryTable';
const ExpenseCategoryInfoCard = ({ selectedCategory, categoryData }: {
    selectedCategory: {
        categoryName: string;
        categoryType: string;
    },
    categoryData: any
}) => {


    // const nextSortOrder = typeData?.data?.success?.[0]?.fabric_type.length > 0 ? Math.max(...typeData?.data?.success?.[0]?.fabric_type?.map((obj: any) => obj.sortorder)) + 10 : null;

    const filteredCategoryData = categoryData?.data?.data?.expense_category_heads?.filter((category: any) => category.category_name === selectedCategory?.categoryName)

    function refetchCategoryData() {
        categoryData.refetch()
    }
    return (
        <Card className="w-full overflow-hidden pt-0 ">
            <CardHeader className="flex flex-row justify-between p-4">
                <div>
                    <CardTitle className='w-fit'>Sub Categories For  <span className='text-primary'>{selectedCategory?.categoryName}</span> </CardTitle>
                </div>

            </CardHeader>
            <CardContent>
                {categoryData?.isLoading ? <div className="flex gap-2 justify-center items-center my-10 text-xl font-semibold">
                    <Loader className="w-4 h-4 animate-spin" /> Loading...
                </div> : <ExpenseCategoryTable categoryData={filteredCategoryData} refetchCategoryData={refetchCategoryData} />}
            </CardContent>
        </Card>
    );
};

export default ExpenseCategoryInfoCard;
