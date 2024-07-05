import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import usePostProvider from '@/hooks/usePostProvider';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';
const AddExpCategoryToolbar = ({
    setShowDialog,
    selectedCategory,
    categoryData
}: {
    setShowDialog: any;
    selectedCategory: {
        categoryName: string;
    };
    categoryData: any;
}) => {
    const queryClient = useQueryClient();
    const [newCategory, setNewCategory] = React.useState(false);
    const [form, setForm] = React.useState({
        category_name: selectedCategory?.categoryName,
        subcategory_name: '',
        expense_type: '',
        sortorder: 0,
    });

    const postCategoryData = usePostProvider();
    const data = categoryData?.data?.data?.all_expense_types ?? []
    return (
        <Card className='mb-4'>
            <CardHeader>
                <div>
                    <RadioGroup defaultValue="newsubcategory" className="flex gap-8 items-center">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="newCategory"
                                id="r1"
                                onClick={() => {
                                    setNewCategory(true);
                                }}
                            />
                            <Label htmlFor="r1" className="text-lg mb-0">
                                New Category
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="newsubcategory"
                                id="r2"
                                onClick={() => {
                                    setNewCategory(false);
                                }}
                            />
                            <Label htmlFor="r2" className="text-lg mb-0">
                                New Sub-category
                            </Label>
                        </div>
                    </RadioGroup>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-4">
                    <div className="">
                        <p className="font-medium">Category Name</p>
                        <Input className="min-w-[200px] max-w-[280px]" disabled={!newCategory} value={newCategory ? form?.category_name : selectedCategory?.categoryName} placeholder="Category Name" onChange={(e) => setForm({ ...form, category_name: e.target.value })} />
                    </div>
                    <div className="">
                        <p className="font-medium">Sub-category Name</p>
                        <Input
                            placeholder="Sub-category Name"
                            className="min-w-[200px] max-w-[280px]"
                            value={form?.subcategory_name}
                            onChange={(e) => setForm({ ...form, subcategory_name: e.target.value })}
                        />
                    </div>
                    <div className="">
                        <p className="font-medium">Expense Type</p>
                        <Select
                            value={form?.expense_type}
                            onValueChange={(value) => {
                                setForm({ ...form, expense_type: value });
                            }}
                        >
                            <SelectTrigger className="min-w-[200px] max-w-[280px]">
                                <SelectValue placeholder="Select Expense Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {expenseTypes.map((type: { name: string; id: string }) => (
                                        <SelectItem key={type?.id} value={type?.id} className="flex gap-2">
                                            {type?.name}
                                        </SelectItem>
                                    ))}
                                    {/* {data.map((type: { expense_type_name: string; expense_type: string }) => (
                                        <SelectItem key={type?.expense_type} value={type?.expense_type} className="flex gap-2">
                                            {type?.expense_type_name}
                                        </SelectItem>
                                    ))} */}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex gap-4 justify-end mt-4">
                    <Button
                        className="w-[100px]"
                        variant="destructive"
                        onClick={() => {
                            setShowDialog(false);
                            setForm({
                                category_name: '',
                                subcategory_name: '',
                                expense_type: '',
                                sortorder: 0,
                            });
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="w-[100px]"
                        onClick={() => {
                            const data = {
                                category_name: newCategory ? form?.category_name : selectedCategory?.categoryName,
                                subcategory_name: form?.subcategory_name,
                                expense_type: form?.expense_type,
                                sortorder: form?.sortorder,
                            };
                            postCategoryData.mutateAsync(
                                {
                                    method: 'POST',
                                    endpoint: 'api/expense/category',
                                    payload: data,
                                },
                                {
                                    onSuccess: () => {
                                        console.log('success');
                                        toast.success('Category Added Successfully');
                                        // queryClient.invalidateQueries({ queryKey: ["expenseCategoryData"] });
                                        setForm({
                                            category_name: '',
                                            subcategory_name: '',
                                            expense_type: '',
                                            sortorder: 0,
                                        });
                                        // setShowDialog(false);
                                        categoryData.refetch();
                                    },
                                    onError: (error) => {
                                        toast.error('Error Adding Category');
                                        console.log(error, 'error');
                                    },
                                }
                            );
                        }}
                    >
                        {postCategoryData?.isPending ? "Adding..." : "Add"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default AddExpCategoryToolbar;

const expenseTypes = [
    { name: 'Production', id: 'PR' },
    { name: 'Factory', id: 'F' },
    { name: 'Office Staff', id: 'OS' },
    { name: 'Shipping', id: 'SH' },
];
