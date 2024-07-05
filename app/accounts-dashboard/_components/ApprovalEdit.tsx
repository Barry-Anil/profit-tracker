import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpRight, Edit } from 'lucide-react';

const ApprovalEdit = (row: any, approveButtonColor: any) => {

    function formattedDate(dateString: any) {
        const date = new Date(dateString);
    
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getUTCFullYear();
        
        return `${day}/${month}/${year}`;
    }

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
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4 flex flex-row items-center gap-2">
                        <Label htmlFor="orderNumber" className="mb-1 text-left font-semibold text-gray-700">
                            Order Number
                        </Label>
                        <Input
                            disabled
                            id="orderNumber"
                            defaultValue={row?.row.original?.ordernumber}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 flex flex-row items-center gap-2">
                        <Label htmlFor="orderdate" className="mb-1 text-left font-semibold text-gray-700">
                            Approved By
                        </Label>
                        <Input
                            disabled
                            id="orderdate"
                            defaultValue={row?.row.original?.accounts_user}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 flex flex-row items-center gap-2">
                        <Label htmlFor="salestrip_name" className="mb-1 text-left font-semibold text-gray-700">
                            Currency
                        </Label>
                        <Input
                            disabled
                            id="salestrip_name"
                            defaultValue={row?.row.original?.accounts_currencyint}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 flex flex-row items-center gap-2">
                        <Label htmlFor="ordergroup" className="mb-1 text-left font-semibold text-gray-700">
                           Charge Date
                        </Label>
                        <Input
                            id="ordergroup"
                            defaultValue={formattedDate(row?.row.original?.accounts_chargedate)}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 flex flex-row items-center gap-2">
                        <Label htmlFor="accounts_payment_approval" className="mb-1 text-left font-semibold text-gray-700">
                            Invoice Amount(Int)
                        </Label>
                        <Input
                            id="accounts_payment_approval"
                            defaultValue={row?.row.original?.accounts_invoiceamt_currencyint}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 flex flex-row items-center gap-2">
                        <Label htmlFor="rofc_notes" className="mb-1 text-left font-semibold text-gray-700">
                            Paid Amount(Int)
                        </Label>
                        <Input
                            id="rofc_notes"
                            defaultValue={row?.row.original?.accounts_receiptamt_currencyint}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 flex flex-row items-center gap-2">
                        <Label htmlFor="accounts_payment_approval" className="mb-1 text-left font-semibold text-gray-700">
                            Invoice Amount(Baht)
                        </Label>
                        <Input
                            id="accounts_payment_approval"
                            defaultValue={row?.row.original?.accounts_invoiceamt}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 flex flex-row items-center gap-2">
                        <Label htmlFor="rofc_notes" className="mb-1 text-left font-semibold text-gray-700">
                            Paid Amount(Baht)
                        </Label>
                        <Input
                            id="rofc_notes"
                            defaultValue={row?.row.original?.accounts_receiptamt}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 flex flex-row items-center gap-2">
                        <Label htmlFor="accounts_payment_approval" className="mb-1 text-left font-semibold text-gray-700">
                            Status
                        </Label>
                        <Input
                            id="accounts_payment_approval"
                            defaultValue={row?.row.original?.accounts_payment_approval}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 flex flex-row items-center gap-2">
                        <Label htmlFor="rofc_notes" className="mb-1 text-left font-semibold text-gray-700">
                           Approval Date
                        </Label>
                        <Input
                            type='date'
                            id="rofc_notes"
                            defaultValue={formattedDate(row?.row.original?.acc_approval_eta)}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 flex flex-col items-start gap-2 col-span-2">
                        <Label htmlFor="accounts_payment_approval" className="mb-1 text-left font-semibold text-gray-700">
                            Approval code
                        </Label>
                        <Input
                            id="accounts_payment_approval"
                            defaultValue={row?.row.original?.accounts_payment_desc}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 flex flex-col items-start gap-2 col-span-2">
                        <Label htmlFor="accounts_payment_approval" className="mb-1 text-left font-semibold text-gray-700">
                            Fabric Status
                        </Label>
                        <Input
                            disabled
                            id="accounts_payment_approval"
                            defaultValue={row?.row.original?.accounts_payment_approval}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 flex flex-row items-center gap-2">
                        <Label htmlFor="accounts_payment_approval" className="mb-1 text-left font-semibold text-gray-700">
                            Fabric Date
                        </Label>
                        <Input
                            id="accounts_payment_approval"
                            defaultValue={formattedDate(row?.row.original?.accounts_payment_approval)}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 flex flex-row items-center gap-2">
                        <Label htmlFor="rofc_notes" className="mb-1 text-left font-semibold text-gray-700">
                            Fabric Description
                        </Label>
                        <Input
                            disabled
                            id="rofc_notes"
                            defaultValue={row?.row.original?.rofc_notes}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 flex flex-row items-center gap-2">
                        <Label htmlFor="accounts_payment_approval" className="mb-1 text-left font-semibold text-gray-700">
                            Total Sticker Printed
                        </Label>
                        <Input
                            disabled
                            id="accounts_payment_approval"
                            defaultValue={row?.row.original?.total_prod_items}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 flex flex-row items-center gap-2">
                        <Label htmlFor="rofc_notes" className="mb-1 text-left font-semibold text-gray-700">
                            Last Sticker Print
                        </Label>
                        <Input
                            disabled
                            id="rofc_notes"
                            defaultValue={row?.row.original?.rofc_notes}
                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                </div>

                <DialogFooter>
                    <Button variant="secondary">Cancel </Button>
                    <Button type="submit">Update </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
    );
};

export default ApprovalEdit;
