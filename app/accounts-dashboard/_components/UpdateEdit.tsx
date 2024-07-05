import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import useUpdateOrder from '../_hooks/useUpdateOrder';
import { toast } from 'sonner';import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    orderid: z.string().optional(),
    ordernumber: z.string().optional(),
    orderdate: z.string().optional(),
    salestrip_name: z.string().optional(),
    ordergroup: z.string().optional(),
    accounts_payment_approval: z.string().optional(),
    rofc_notes: z.string().max(100, "Notes must be 100 characters or less")
  });
  
  type FormValues = z.infer<typeof formSchema>;
const UpdateEdit = (row: any) => {
    const updateOrder = useUpdateOrder();
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            orderid: row?.row.original?.orderid,
            ordernumber: row?.row.original?.ordernumber,
            orderdate: row?.row.original?.orderdate,
            salestrip_name: row?.row.original?.salestrip_name,
            ordergroup: row?.row.original?.ordergroup,
            accounts_payment_approval: row?.row.original?.accounts_payment_approval,
            rofc_notes: row?.row.original?.rofc_notes
        }
    });

    const onSubmit = handleSubmit((values: FormValues) => {
        const modifiedData = {
            orderid : values.orderid,
            orderinfo: {
                orderid: values.orderid,
                ordernumber: values.ordernumber,
                accounts_payment_desc: values.rofc_notes
            }  
        };
        updateOrder.mutateAsync(modifiedData, {
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
                    <Button variant="outline" size="sm">
                        <Edit className="m-0 h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>Update Account Notes</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit}>
                    <div className="grid grid-cols-1 gap-4">
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
                                Order Date
                            </Label>
                            <Input
                                disabled
                                id="orderdate"
                                defaultValue={row?.row.original?.orderdate}
                                className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4 flex flex-row items-center gap-2">
                            <Label htmlFor="salestrip_name" className="mb-1 text-left font-semibold text-gray-700">
                                Sales Trip
                            </Label>
                            <Input
                                disabled
                                id="salestrip_name"
                                defaultValue={row?.row.original?.salestrip_name}
                                className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4 flex flex-row items-center gap-2">
                            <Label htmlFor="ordergroup" className="mb-1 text-left font-semibold text-gray-700">
                                Grouping
                            </Label>
                            <Input
                                disabled
                                id="ordergroup"
                                defaultValue={row?.row.original?.ordergroup}
                                className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4 flex flex-row items-center gap-2">
                            <Label htmlFor="accounts_payment_approval" className="mb-1 text-left font-semibold text-gray-700">
                                Account Status
                            </Label>
                            <Input
                                disabled
                                id="accounts_payment_approval"
                                defaultValue={row?.row.original?.accounts_payment_approval}
                                className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4 flex flex-row items-center gap-2">
                                <Label htmlFor="rofc_notes" className="mb-1 text-left font-semibold text-gray-700">
                                    Notes
                                </Label>
                                <Textarea
                                    id="rofc_notes"
                                    maxLength={100}
                                    {...register("rofc_notes")}
                                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.rofc_notes && <p>{errors.rofc_notes.message}</p>}
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

export default UpdateEdit;
