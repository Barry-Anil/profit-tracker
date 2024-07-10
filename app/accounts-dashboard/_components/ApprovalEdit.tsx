import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller } from 'react-hook-form';

const formSchema = z.object({
    orderid: z.string(),
    orderNumber: z.string(),
    approvedBy: z.string(),
    currency: z.string(),
    chargeDate: z.string(),
    invoiceAmountInt: z.number(),
    paidAmountInt: z.number(),
    invoiceAmountBaht: z.number(),
    paidAmountBaht: z.number(),
    status: z.string(),
    approvalDate: z.string(),
    approvalCode: z.string(),
    fabricStatus: z.string(),
    fabricDate: z.string(),
    fabricDescription: z.string(),
    totalStickerPrinted: z.string(),
    lastStickerPrint: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

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

    const { register, handleSubmit, formState: {errors} } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            orderid: row?.row.original?.orderid,
            orderNumber: row?.row.original?.ordernumber,
            approvedBy: row?.row.original?.accounts_user?.toString(),
            currency: row?.row.original?.accounts_currencyint,
            chargeDate: formattedDate(row?.row.original?.accounts_chargedate),
            invoiceAmountInt: (row?.row.original?.accounts_invoiceamt_currencyint),
            paidAmountInt: (row?.row.original?.accounts_receiptamt_currencyint),
            invoiceAmountBaht: (row?.row.original?.accounts_invoiceamt),
            paidAmountBaht: (row?.row.original?.accounts_receiptamt),
            status: row?.row.orginal?.accounts_payment_approval?.trim(), // This will need to be set based on the selected value
            approvalDate: formattedDate(row?.row.original?.acc_approval_eta),
            approvalCode: row?.row.original?.accounts_payment_desc,
            fabricStatus: row?.row.original?.fabric_issue_status_desc,
            fabricDate: formattedDate(row?.row.original?.fabric_date),
            fabricDescription: row?.row.original?.rofc_notes,
            totalStickerPrinted: row?.row.original?.total_prod_items,
            lastStickerPrint: row?.row.original?.rofc_notes,
        },
    });

    // console.log(row, "register")



    const onSubmit = handleSubmit((data: FormValues) => {
        console.log(data, 'data');

        const dataToSend = {
            orderid: data?.orderid,
            ordernumber: data?.orderNumber,
            accounts_payment_approval: data?.status,
            accounts_approval_date: data?.approvalDate,
            accounts_payment_desc: data?.approvalCode,
            accounts_user: data?.approvedBy,
            accounts_invoiceamt: data?.invoiceAmountBaht.toString(),
            accounts_receiptamt: data?.paidAmountBaht.toString(),
            acc_approval_ata: null,
            accounts_currencyint: data?.currency,
            accounts_invoiceamt_currencyint: data?.invoiceAmountInt.toString(),
            accounts_receiptamt_currencyint: data?.paidAmountInt.toString(),
            accounts_chargedate: data?.chargeDate,
        };
        updateOrder.mutateAsync(dataToSend, {
            onSuccess: (response: any) => {
                toast.success('Order updated successfully');
                // You might want to close the dialog here
            },
            onError: () => {
                toast.error('Something went wrong! Please Try Again.');
            },
        });
    });


    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="link" className={`text-base ${approveButtonColor}`}>
                        Approve & Create <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[725px]">
                    <DialogHeader>
                        <DialogTitle>Update Account Notes</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4 flex flex-row items-center gap-2">
                                <Label htmlFor="orderNumber" className="mb-1 text-left font-semibold text-gray-700">
                                    Order Number
                                </Label>
                                <Input
                                    disabled
                                    id="orderNumber"
                                    {...register('orderNumber')}
                                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4 flex flex-row items-center gap-2">
                                <Label htmlFor="approved_by" className="mb-1 text-left font-semibold text-gray-700">
                                    Approved By
                                </Label>
                                <Input
                                    disabled
                                    id="approved_by"
                                    {...register('approvedBy')}
                                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4 flex flex-row items-center gap-2">
                                <Label htmlFor="currency" className="mb-1 text-left font-semibold text-gray-700">
                                    Currency
                                </Label>
                                <Input
                                    disabled
                                    id="currency"
                                    {...register('currency')}
                                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4 flex flex-row items-center gap-2">
                                <Label htmlFor="charge_date" className="mb-1 text-left font-semibold text-gray-700">
                                    Charge Date
                                </Label>
                                <Input
                                    type="date"
                                    id="charge_date"
                                    {...register('chargeDate')}
                                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4 flex flex-row items-center gap-2">
                                <Label htmlFor="invoice_amount_int" className="mb-1 text-left font-semibold text-gray-700">
                                    Invoice Amount(Int)
                                </Label>
                                <Input
                                    id="invoice_amount_int"
                                    {...register('invoiceAmountInt')}
                                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4 flex flex-row items-center gap-2">
                                <Label htmlFor="paid_amount_int" className="mb-1 text-left font-semibold text-gray-700">
                                    Paid Amount(Int)
                                </Label>
                                <Input
                                    id="paid_amount_int"
                                    {...register('paidAmountInt')}
                                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4 flex flex-row items-center gap-2">
                                <Label htmlFor="invoice_amount_baht" className="mb-1 text-left font-semibold text-gray-700">
                                    Invoice Amount(Baht)
                                </Label>
                                <Input
                                    id="invoice_amount_baht"
                                    {...register('invoiceAmountBaht')}
                                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4 flex flex-row items-center gap-2">
                                <Label htmlFor="paid_invoice_baht" className="mb-1 text-left font-semibold text-gray-700">
                                    Paid Amount(Baht)
                                </Label>
                                <Input
                                    id="paid_invoice_baht"
                                    {...register('paidAmountBaht')}
                                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4 flex flex-row items-center gap-2">
                                <Label htmlFor="status" className="mb-1 text-left font-semibold text-gray-700">
                                    Status
                                </Label>
                                <Select
                                    onValueChange={(e) => {
                                        const searchParams = new URLSearchParams(window.location.search);
                                        searchParams.set("status", e);
                                        window.history.replaceState(
                                            {},
                                            document.title,
                                            `?${searchParams.toString()}`,
                                        );
                                    }}
                                    // value={{...register('status')}}
                                >
                                    <SelectTrigger className="w-[240px]">
                                        <SelectValue placeholder={row?.row?.original?.accounts_payment_approval} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {row?.category?.map((item: any, index: number) => (
                                            <SelectItem key={index} value={item.key}>
                                                {item.value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                            </div>
                            <div className="mb-4 flex flex-row items-center gap-2">
                                <Label htmlFor="approval_date" className="mb-1 text-left font-semibold text-gray-700">
                                    Approval Date
                                </Label>
                                <Input
                                    type="date"
                                    id="approval_date"
                                    {...register('approvalDate')}
                                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4 flex flex-col items-start gap-2 col-span-2">
                                <Label htmlFor="approval_code" className="mb-1 text-left font-semibold text-gray-700">
                                    Approval code
                                </Label>
                                <Input
                                    id="approval_code"
                                    {...register('approvalCode')}
                                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4 flex flex-col items-start gap-2 col-span-2">
                                <Label htmlFor="fabric_status" className="mb-1 text-left font-semibold text-gray-700">
                                    Fabric Status
                                </Label>
                                <Input
                                    disabled
                                    id="fabric_status"
                                    {...register('fabricStatus')}
                                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4 flex flex-row items-center gap-2">
                                <Label htmlFor="fabric_date" className="mb-1 text-left font-semibold text-gray-700">
                                    Fabric Date
                                </Label>
                                <Input
                                    id="fabric_date"
                                    {...register('fabricDate')}
                                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4 flex flex-row items-center gap-2">
                                <Label htmlFor="fabric_desc" className="mb-1 text-left font-semibold text-gray-700">
                                    Fabric Description
                                </Label>
                                <Input
                                    disabled
                                    id="fabric_desc"
                                    {...register('fabricDescription')}
                                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4 flex flex-row items-center gap-2">
                                <Label htmlFor="total_sticker" className="mb-1 text-left font-semibold text-gray-700">
                                    Total Sticker Printed
                                </Label>
                                <Input
                                    disabled
                                    id="total_sticker"
                                    {...register('totalStickerPrinted')}
                                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4 flex flex-row items-center gap-2">
                                <Label htmlFor="last_sticker" className="mb-1 text-left font-semibold text-gray-700">
                                    Last Sticker Print
                                </Label>
                                <Input
                                    disabled
                                    id="last_sticker"
                                    {...register('lastStickerPrint')}
                                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="secondary">Cancel </Button>
                            <Button type="submit">Update </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ApprovalEdit;