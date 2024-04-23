'use client'
import { Heading } from '@/components/Heading'
import { Button } from '@/components/ui/button'
import React from 'react'
import ExpenseCategoryCard from './_components/ExpenseCategoryCard'
import ExpenseCategoryInfoCard from './_components/ExpenseCategoryInfoCard'

const DefineExpenseCategories = () => {
    const [selectedCategory, setSelectedCategory] = React.useState({
        productId: 12,
        productName: "Jacket/เสื้อสูท",
        productShortName: "J  "
    })
    return (
        <>
            <Heading text="Define Expense Categories" />

            <div className='flex gap-4 w-full'>
                <ExpenseCategoryCard selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categoryData={[]} />
                <ExpenseCategoryInfoCard selectedProduct={selectedCategory} expenseData={[]} />
            </div>
        </>
    )
}

export default DefineExpenseCategories