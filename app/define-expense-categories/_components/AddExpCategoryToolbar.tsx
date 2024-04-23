import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';
const AddExpCategoryToolbar = ({ setShowDialog, selectedCategory }: {
    setShowDialog: any, selectedCategory: {
        categoryName: string;
    }
}) => {
    const [form, setForm] = React.useState({
        categoryName: '',
        subCategoryName: '',
        expenseType: '',
    })
    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Sub-category</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-4">
                    <div className="">
                        <p className='font-medium'>Category Name</p>
                        <Input className="min-w-[200px] max-w-[280px]" value={selectedCategory?.categoryName}
                        />
                    </div>
                    <div className="">
                        <p className='font-medium'>Sub-category Name</p>
                        <Input placeholder='Sub-category Name' className="min-w-[200px] max-w-[280px]" value={form?.subCategoryName}
                            onChange={
                                (e) => setForm({ ...form, subCategoryName: e.target.value })
                            }
                        />
                    </div>
                    <div className="">
                        <p className='font-medium'>Expense Type</p>
                        <Select
                            value={form?.expenseType}
                            onValueChange={(value) => {
                                setForm({ ...form, expenseType: value });
                            }}
                        >
                            <SelectTrigger className="min-w-[200px] max-w-[280px]">
                                <SelectValue placeholder="Select Expense Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Salestrip Expenses" className="flex gap-2">
                                        Salestrip Expenses
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                </div>
                <div className="flex gap-4 justify-end mt-4">
                    <Button className='w-[100px]' variant="destructive" onClick={() => {
                        setShowDialog(false)
                        setForm({
                            categoryName: '',
                            subCategoryName: '',
                            expenseType: '',
                        })

                    }}>Cancel</Button>
                    <Button className='w-[100px]' onClick={() => {
                        setShowDialog(false)
                        setForm({
                            ...form,
                            categoryName: selectedCategory?.categoryName
                        })

                    }}>Add</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default AddExpCategoryToolbar