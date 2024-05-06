import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SubHeading } from '@/components/Heading';
import { Textarea } from '@/components/ui/textarea';
interface ProductData {
    description: string;
    id: number;
    productname: string;
    productname_th: string;
    qtys_unit: string;
    shortname: string;
    sortorder: number;
    ssonline_sortorder: number;
}
const ProductionExpenseToolbar = ({ options, setShowDialog, productsData, sortorder, handleExpenseHeadSubmit }: { options: any; setShowDialog: any; productsData: any; sortorder: number; handleExpenseHeadSubmit: any }) => {
    const [form, setForm] = React.useState({
        productname: '',
        productid: 0,
        expense_type: 'PR',
        category_name: '',
        category_type: 'P',
        subcategory_name: '',
        currency: '',
        total_cost: 0.00,
        narration: '',
        sortorder: sortorder,
    });

    return (
        <Card className="mb-4">
            <div className="m-4">
                <SubHeading text="Add New Expense per Unit" />
                <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="">
                        <p className="font-bold font-sans">Select Product</p>
                        <Select
                            defaultValue={form?.productname}
                            onValueChange={(value) => {
                                const productid = productsData?.data?.data?.success?.[0]?.products?.find((product: ProductData) => product.productname === value)?.id;
                                setForm({ ...form, productname: value, productid: productid });
                            }}
                        >
                            <SelectTrigger className="min-w-[200px] max-w-[280px]">
                                <SelectValue placeholder="Select Product" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {productsData?.data?.data?.success?.[0]?.products?.map((product: ProductData) => (
                                        <SelectItem value={product.productname} className="flex gap-2">
                                            {product.productname}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="">
                        <p className="font-bold font-sans">Production Category</p>
                        <Select
                            defaultValue={form?.category_name}
                            onValueChange={(value) => {
                                setForm({ ...form, category_name: value });
                            }}
                        >
                            <SelectTrigger className="min-w-[200px] max-w-[280px]">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {options?.category_names?.map((option: any) => (
                                        <SelectItem value={option?.category_name} className="flex gap-2">
                                            {option?.category_name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="">
                        <p className="font-bold font-sans">Production Sub-category</p>
                        <Select
                            value={form?.subcategory_name}
                            onValueChange={(value) => {
                                setForm({ ...form, subcategory_name: value });
                            }}
                        >
                            <SelectTrigger className="min-w-[200px] max-w-[280px]">
                                <SelectValue placeholder="Select Sub-category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {options?.expense_category_heads?.map((option: any) => (
                                        <SelectItem value={option?.subcategory_name} className="flex gap-2">
                                            {option?.subcategory_name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4">
                    <div className="">
                        <p className="font-bold font-sans">Sr No.</p>
                        <Input
                            className="max-w-[200px]"
                            value={form?.sortorder}
                            onChange={(e) => {
                                const sortorder = parseFloat(e.target.value).toFixed(2);
                                setForm({ ...form, sortorder: Number(sortorder) });
                            }}
                            placeholder="Sr No"
                            type="number"
                        />
                    </div>
                    <div className="">
                        <p className="font-bold font-sans">Currency</p>
                        <Select
                            value={form?.currency}
                            onValueChange={(value) => {
                                setForm({ ...form, currency: value });
                            }}
                        >
                            <SelectTrigger className="min-w-[200px] max-w-[280px]">
                                <SelectValue placeholder="Select Currency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="THB" className="flex gap-2">
                                        THB
                                    </SelectItem>
                                    <SelectItem value="USD" className="flex gap-2">
                                        USD
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="">
                        <p className="font-bold font-sans">Unit Cost</p>
                        <Input
                            className="max-w-[200px]"
                            value={form?.total_cost}
                            onChange={(e) => {
                                const total_cost = parseFloat(e.target.value).toFixed(2);
                                setForm({ ...form, total_cost: Number(total_cost) });
                            }}
                            placeholder="Unit Cost"
                            type="number"
                        />
                    </div>
                    <div className="">
                        <p className="font-bold font-sans">Narration</p>
                        <Textarea
                            className="min-w-[200px] max-w-[280px]"
                            value={form?.narration}
                            onChange={(e) => {
                                setForm({ ...form, narration: e.target.value });
                            }}
                            placeholder="Narration"
                        />
                    </div>
                </div>
                <div className="flex gap-4 justify-end mt-4">
                    <Button
                        className="w-[100px]"
                        onClick={() => {
                            handleExpenseHeadSubmit(form)
                            setForm({
                                productname: '',
                                productid: 0,
                                expense_type: 'PR',
                                category_name: '',
                                category_type: 'P',
                                subcategory_name: '',
                                currency: '',
                                total_cost: 0,
                                narration: '',
                                sortorder: sortorder,
                            });
                        }}
                    >
                        Add
                    </Button>
                    <Button
                        className="w-[100px]"
                        variant="destructive"
                        onClick={() => {
                            setShowDialog(false);
                            setForm({
                                productname: '',
                                productid: 0,
                                expense_type: 'PR',
                                category_name: '',
                                category_type: 'P',
                                subcategory_name: '',
                                currency: '',
                                total_cost: 0,
                                narration: '',
                                sortorder: sortorder,
                            });
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ProductionExpenseToolbar;
