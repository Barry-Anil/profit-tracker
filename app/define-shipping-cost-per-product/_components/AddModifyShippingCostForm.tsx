import { SubHeading } from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

type ShippingCostToolbarProps = {
    productsData: any
    setShowDialog: any
    options: any
    sortorder: number
    handleShippingHeadSubmit: any
    salestripData: any;
}
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
const AddModifyShippingCostForm = ({
    productsData,
    setShowDialog, options, sortorder, handleShippingHeadSubmit, salestripData
}: ShippingCostToolbarProps) => {
    const [form, setForm] = React.useState({
        productname: '',
        productid: 0,
        expense_type: 'SH',
        category_name: '',
        category_type: 'S',
        subcategory_name: '',
        currency: '',
        total_cost: 0.00,
        narration: '',
        sortorder: sortorder,
        total_weight: 0
    })

    const filteredData =
        salestripData &&
        salestripData?.data?.filter((item: any) => {
            const yearFromDate = new Date(item.createdAt).getFullYear();
            return yearFromDate == 2024;
        });
    return (
        <Card className='mt-4'>
            <div className='m-4'>
                <SubHeading text="Add / Modify Shipping Cost" />
                <div className="flex flex-wrap gap-4">
                    <div className="">
                        <p className='font-bold font-sans'>Sr No.</p>
                        <Input className="w-[150px]" value={form?.sortorder} onChange={(e) => {
                            setForm({ ...form, sortorder: Number(e.target.value) })
                        }} placeholder="Sr No" type='number' />
                    </div>
                    <div className="">
                        <p className='font-bold font-sans'>Salestrip</p>
                        <Select
                        >
                            <SelectTrigger className="min-w-[200px] max-w-[280px]">
                                <SelectValue placeholder="Select Salestrip" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {filteredData.map((salestrip: any) => (
                                        <SelectItem value={salestrip.salestrip_name} className="flex gap-2">
                                            {salestrip.salestrip_name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="">
                        <p className='font-bold font-sans'>Product</p>
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
                    <div className="">
                        <p className='font-bold font-sans'>Weight</p>
                        <Input className="w-[150px]" value={form?.total_weight} onChange={(e) => {
                            setForm({ ...form, total_weight: Number(e.target.value) })
                        }} placeholder="Sr No" type='number' />
                    </div>
                    <div className="">
                        <p className='font-bold font-sans'>Currency</p>
                        <Select
                            value={form?.currency}
                            onValueChange={(value) => {
                                setForm({ ...form, currency: value });
                            }}
                        >
                            <SelectTrigger className="min-w-[150px] max-w-[200px]">
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
                        <p className='font-bold font-sans'>Unit Cost</p>
                        <Input className="w-[150px]" value={form?.total_cost} onChange={(e) => {
                            setForm({ ...form, total_cost: Number(e.target.value) })

                        }} placeholder="Unit Cost" type='number' />
                    </div>
                    <div className="">
                        <p className='font-bold font-sans'>Narration</p>
                        <Textarea className="max-w-[200px]" value={form?.narration} onChange={(e) => {
                            setForm({ ...form, narration: e.target.value })

                        }} placeholder="Narration" />
                    </div>

                </div>
                <div className="flex gap-4 justify-end mt-4"><Button className='w-[100px]'
                    onClick={() => {
                        handleShippingHeadSubmit(form)
                        setForm({
                            productname: '',
                            productid: 0,
                            expense_type: 'SH',
                            category_name: '',
                            category_type: 'S',
                            subcategory_name: '',
                            currency: '',
                            total_cost: 0.00,
                            narration: '',
                            sortorder: sortorder,
                            total_weight: 0
                        })
                    }}>Add</Button>
                    <Button className='w-[100px]' variant="destructive" onClick={() => {
                        setShowDialog(false)
                        setForm({
                            productname: '',
                            productid: 0,
                            expense_type: 'SH',
                            category_name: '',
                            category_type: 'S',
                            subcategory_name: '',
                            currency: '',
                            total_cost: 0.00,
                            narration: '',
                            sortorder: sortorder,
                            total_weight: 0
                        })

                    }}>Cancel</Button></div>
            </div>
        </Card>
    )
}

export default AddModifyShippingCostForm