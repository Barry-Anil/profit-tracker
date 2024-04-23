'use client'
import { Heading } from '@/components/Heading'
import React from 'react'
import ExpenseCategoryCard from './_components/ExpenseCategoryCard'
import ExpenseCategoryInfoCard from './_components/ExpenseCategoryInfoCard'
const categoryData = [
    {
        categoryName: 'Salesperson Travel',
    },
    {
        categoryName: 'Marketing',
    }
]
const DefineExpenseCategories = () => {
    const [selectedCategory, setSelectedCategory] = React.useState({
        categoryName: 'Salesperson Travel',
    })
    return (
        <>
            <Heading text="Define Expense Categories" />

            <div className='flex gap-4 w-full'>
                <ExpenseCategoryCard selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categoryData={categoryData} />
                <ExpenseCategoryInfoCard selectedCategory={selectedCategory} expenseData={[]} />
            </div>
        </>
    )
}

export default DefineExpenseCategories