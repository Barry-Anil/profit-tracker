'use client'
import { Heading } from '@/components/Heading'
import React, { useEffect } from 'react'
import ExpenseCategoryCard from './_components/ExpenseCategoryCard'
import ExpenseCategoryInfoCard from './_components/ExpenseCategoryInfoCard'
import useDataProvider from '@/hooks/useDataProvider'
import { Button } from '@/components/ui/button'
import AddExpCategoryToolbar from './_components/AddExpCategoryToolbar'

const DefineExpenseCategories = () => {
    const [showDialog, setShowDialog] = React.useState(false)
    const [selectedCategory, setSelectedCategory] = React.useState({
        categoryName: '',
        categoryType: '',
    })

    const getCategories = useDataProvider({
        querykey: ['expenseCategoryData'],
        endpoint: 'api/expense/category/all',
        utilityFunction: (res: any) => {
            console.log(res)
        }
    })

    useEffect(() => {
        if (getCategories?.data?.data?.category_names?.length > 0) {
            setSelectedCategory({
                categoryName: getCategories?.data?.data?.category_names?.[0]?.category_name,
                categoryType: getCategories?.data?.data?.category_names?.[0]?.category_type
            })
        }
    }, [getCategories?.data?.data?.category_names])

    return (
        <>
            <div className="flex justify-between mb-4 items-center">
                <Heading text="Define Expense Categories" />
                <div>
                    {!showDialog && <Button onClick={() => {
                        setShowDialog(true)
                    }}>+Add New
                    </Button>}
                </div>
            </div>
            {showDialog && <AddExpCategoryToolbar selectedCategory={selectedCategory} setShowDialog={setShowDialog} categoryData={getCategories} />}

            <div className='flex gap-4 w-full'>
                <ExpenseCategoryCard selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categoryData={getCategories} />
                <ExpenseCategoryInfoCard selectedCategory={selectedCategory} categoryData={getCategories} />
            </div>
        </>
    )
}

export default DefineExpenseCategories