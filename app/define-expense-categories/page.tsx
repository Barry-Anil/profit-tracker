'use client'
import { Heading } from '@/components/Heading'
import React, { useEffect } from 'react'
import ExpenseCategoryCard from './_components/ExpenseCategoryCard'
import ExpenseCategoryInfoCard from './_components/ExpenseCategoryInfoCard'
import useDataProvider from '@/hooks/useDataProvider'

const DefineExpenseCategories = () => {
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
            <Heading text="Define Expense Categories" />

            <div className='flex gap-4 w-full'>
                <ExpenseCategoryCard selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categoryData={getCategories} />
                <ExpenseCategoryInfoCard selectedCategory={selectedCategory} categoryData={getCategories} />
            </div>
        </>
    )
}

export default DefineExpenseCategories