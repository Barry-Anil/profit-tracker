import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


const formSchema = z.object({
    orderid: z.string(),
    orderNumber: z.string(),
    approvedBy: z.number(),
    currency: z.string(),
    chargeDate: z.string(),
    invoiceAmountInt: z.string(),
    paidAmountInt: z.string(),
    invoiceAmountBaht: z.string(),
    paidAmountBaht: z.string(),
    status:  z.string(),
    approvalDate: z.string(),
    approvalCode: z.string(),
    fabricStatus: z.string().optional(),
    fabricDate: z.string(),
    fabricDescription: z.string().optional(),
    totalStickerPrinted: z.string().optional(),
    lastStickerPrint: z.string().optional(),
});


import { ArrowUpRight, Edit } from 'lucide-react';
import useUpdateOrder from '../_hooks/useUpdateOrder';
import { toast } from 'sonner';

const ApprovalEdit = (row: any, approveButtonColor: any) => {


    function formattedDate(dateString: any) {
        const date = new Date(dateString);

        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getUTCFullYear();

        return `${day}/${month}/${year}`;
    }

    const updateOrder = useUpdateOrder();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            orderid: row?.row.original?.orderid,
            orderNumber: row?.row.original?.ordernumber,
            approvedBy: row?.row.original?.accounts_user,
            currency: row?.row.original?.accounts_currencyint,
            chargeDate: formattedDate(row?.row.original?.accounts_chargedate),
            invoiceAmountInt: row?.row.original?.accounts_invoiceamt_currencyint,
            paidAmountInt: row?.row.original?.accounts_receiptamt_currencyint,
            invoiceAmountBaht: row?.row.original?.accounts_invoiceamt,
            paidAmountBaht: row?.row.original?.accounts_receiptamt,
            status: row?.row.original?.accounts_payment_approval, // This will need to be set based on the selected value
            approvalDate: row?.row.original?.acc_approval_eta == null ? '' : formattedDate(row?.row.original?.acc_approval_eta),
            approvalCode: row?.row.original?.accounts_payment_desc,
            fabricStatus: row?.row.original?.fabric_issue_status,
            fabricDate: formattedDate(row?.row.original?.accounts_payment_approval),
            fabricDescription: row?.row.original?.rofc_notes,
            totalStickerPrinted: row?.row.original?.total_prod_items,
            lastStickerPrint: row?.row.original?.rofc_notes,
        }
    });

    console.log(form, row, "row")


    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Form submitted with values:", values);
        const dataToSend = {
            orderid: values?.orderid,
            ordernumber: values?.orderNumber,
            accounts_payment_approval: values?.status,
            accounts_approval_date: values?.approvalDate,
            accounts_payment_desc: values?.approvalCode,
            accounts_user: values?.approvedBy,
            accounts_invoiceamt: values?.invoiceAmountBaht.toString(),
            accounts_receiptamt: values?.paidAmountBaht.toString(),
            acc_approval_ata: null,
            accounts_currencyint: values?.currency,
            accounts_invoiceamt_currencyint: values?.invoiceAmountInt.toString(),
            accounts_receiptamt_currencyint: values?.paidAmountInt.toString(),
            accounts_chargedate: values?.chargeDate,
        };
        console.log("Form submitted with values:", values);
        // For example:
        updateOrder.mutateAsync(dataToSend, {
            onSuccess: (data) => {
                console.log("Update successful:", data);
                toast.success('Order updated successfully');
            },
            onError: (error) => {
                console.error("Update failed:", error);
                toast.error('Something went wrong! Please try again.');
            },
        });
    };



    return (
        <div>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className={`text-base ${approveButtonColor}`}>
                    Approve & Create <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Update Account Notes</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Validation errors:", errors))} className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="col-span-2">
                                {/* <h3 className="text-lg font-semibold mb-2">Order Information</h3> */}
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="orderNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Order Number</FormLabel>
                                                <FormControl>
                                                    <Input disabled {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="approvedBy"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Approved By </FormLabel>
                                                <FormControl>
                                                    <Input  disabled {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            
                            <div className="col-span-2">
                                {/* <h3 className="text-lg font-semibold mb-2">Financial Details</h3> */}
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="currency"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Currency</FormLabel>
                                                <FormControl>
                                                    <Input disabled {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="chargeDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Charge Date - <span className='text-red-400'>{formattedDate(row?.row.original.accounts_chargedate)}</span></FormLabel>
                                                <FormControl>
                                                    <Input type='date' defaultValue={formattedDate(row?.row.original.accounts_chargedate)} {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="invoiceAmountInt"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Invoice Amount (Int)</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="paidAmountInt"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Paid Amount (Int)</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="invoiceAmountBaht"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Invoice Amount (Baht)</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="paidAmountBaht"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Paid Amount (Baht)</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="col-span-2">
                                {/* <h3 className="text-lg font-semibold mb-2">Approval Details</h3> */}
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={row?.row.original?.accounts_payment_approval}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {row?.category?.map((item: any, index: number) => (
                                                            <SelectItem key={index} value={item.key}>
                                                                {item.value}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="approvalDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Approval Date - <span className='text-red-400'>{formattedDate(row?.row.original?.acc_approval_eta)}</span></FormLabel>
                                                <FormControl>
                                                    <Input type='date' {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="approvalCode"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2">
                                                <FormLabel>Approval Code</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="col-span-2">
                                {/* <h3 className="text-lg font-semibold mb-2">Additional Information</h3> */}
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="fabricStatus"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Fabric Status</FormLabel>
                                                <FormControl>
                                                    <Input disabled {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="fabricDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Fabric Date - <span className='text-red-500'>{formattedDate(row?.row.original?.accounts_payment_approval)}</span> </FormLabel>
                                                <FormControl>
                                                    <Input type='date' {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="fabricDescription"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Fabric Description</FormLabel>
                                                <FormControl>
                                                    <Input disabled {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="totalStickerPrinted"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Total Stickers Printed</FormLabel>
                                                <FormControl>
                                                    <Input disabled {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastStickerPrint"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Sticker Print Date</FormLabel>
                                                <FormControl>
                                                    <Input disabled {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="submit">Update</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    </div>
    );
};

export default ApprovalEdit;