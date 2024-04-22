import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SubHeading } from '@/components/Heading';
import { Textarea } from '@/components/ui/textarea';
const ProductionExpenseToolbar = ({ form, setForm, setShowDialog }: { form: any, setForm: any, setShowDialog: any }) => {

    return (
        <Card>
            <div className='m-4'>
                <SubHeading text="Add New Expense per Unit" />
                <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="">
                        <p className='font-bold font-sans'>Production Category</p>
                        <Select
                            value={form?.category}
                            onValueChange={(value) => {
                                setForm({ ...form, category: value });
                            }}
                        >
                            <SelectTrigger className="max-w-[200px]">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>

                                    <SelectItem value="production_cost_direct" className="flex gap-2">
                                        Production Cost (Direct)
                                    </SelectItem>
                                    <SelectItem value="production_cost_indirect" className="flex gap-2">
                                        Production Cost (Indirect)
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="">
                        <p className='font-bold font-sans'>Production Sub-category</p>
                        <Select
                            value={form?.subcategory}
                            onValueChange={(value) => {
                                setForm({ ...form, subcategory: value });
                            }}
                        >
                            <SelectTrigger className="max-w-[200px]">
                                <SelectValue placeholder="Select Sub-category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Sub Category 1" className="flex gap-2">
                                        Sub Category 1
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                </div>
                <div className="flex flex-wrap gap-4">
                    <div className="">
                        <p className='font-bold font-sans'>Sr No.</p>
                        <Input className="max-w-[200px]" value={form?.srNo} onChange={(e) => {
                            setForm({ ...form, srNo: e.target.value })
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
                            <SelectTrigger className="max-w-[200px]">
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
                        <Input className="w-fit" value={form?.unitCost} onChange={(e) => {
                            setForm({ ...form, unitCost: e.target.value })

                        }} placeholder="Unit Cost" type='number' />
                    </div>
                    <div className="">
                        <p className='font-bold font-sans'>Notes</p>
                        <Textarea className="max-w-[200px]" value={form?.unitCost} onChange={(e) => {
                            setForm({ ...form, unitCost: e.target.value })

                        }} placeholder="Notes" />
                    </div>

                </div>
                <div className="flex gap-4 justify-end mt-4"><Button className='w-[100px]'>Add</Button>
                    <Button className='w-[100px]' variant="destructive" onClick={() => {
                        setShowDialog(false)
                        setForm({
                            category: 'production_cost_direct',
                            subcategory: '',
                            srNo: '',
                            currency: '',
                            unitCost: ''
                        })

                    }}>Cancel</Button></div>
            </div>
        </Card>
    )
}

export default ProductionExpenseToolbar