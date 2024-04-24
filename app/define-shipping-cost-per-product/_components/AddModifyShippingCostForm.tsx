import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SubHeading } from '@/components/Heading';
import { Textarea } from '@/components/ui/textarea';

type ShippingCostToolbarProps = {
    form: any,
    setForm: any,
    setShowDialog: any

}
const AddModifyShippingCostForm = ({
    form,
    setForm,
    setShowDialog
}: ShippingCostToolbarProps) => {
    return (
        <Card>
            <div className='m-4'>
                <SubHeading text="Add / Modify Shipping Cost" />
                <div className="flex flex-wrap gap-4">
                    <div className="">
                        <p className='font-bold font-sans'>Sr No.</p>
                        <Input className="w-[150px]" value={form?.sortorder} onChange={(e) => {
                            setForm({ ...form, sortorder: e.target.value })
                        }} placeholder="Sr No" type='number' />
                    </div>
                    <div className="">
                        <p className='font-bold font-sans'>Product</p>
                        <Select
                            value={form?.productname}
                            onValueChange={(value) => {
                                setForm({ ...form, productname: value });
                            }}
                        >
                            <SelectTrigger className="min-w-[150px] max-w-[200px]">
                                <SelectValue placeholder="Select Product" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Jacket" className="flex gap-2">
                                        Jacket
                                    </SelectItem>
                                    <SelectItem value="Pant" className="flex gap-2">
                                        Pant
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="">
                        <p className='font-bold font-sans'>Weight</p>
                        <Input className="w-[150px]" value={form?.product_weight} onChange={(e) => {
                            setForm({ ...form, product_weight: e.target.value })
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
                        <Input className="w-[150px]" value={form?.unitCost} onChange={(e) => {
                            setForm({ ...form, unitCost: e.target.value })

                        }} placeholder="Unit Cost" type='number' />
                    </div>
                    <div className="">
                        <p className='font-bold font-sans'>Narration</p>
                        <Textarea className="max-w-[200px]" value={form?.narration} onChange={(e) => {
                            setForm({ ...form, narration: e.target.value })

                        }} placeholder="Narration" />
                    </div>

                </div>
                <div className="flex gap-4 justify-end mt-4"><Button className='w-[100px]'>Add</Button>
                    <Button className='w-[100px]' variant="destructive" onClick={() => {
                        setShowDialog(false)
                        setForm({
                            sortorder: 0,
                            productname: '',
                            productshortname: '',
                            product_weight: 0,
                            currency: 'THB',
                            unitCost: 0,
                            narration: '',
                        })

                    }}>Cancel</Button></div>
            </div>
        </Card>
    )
}

export default AddModifyShippingCostForm