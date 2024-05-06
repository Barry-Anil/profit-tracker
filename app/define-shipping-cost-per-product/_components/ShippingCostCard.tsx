import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader } from 'lucide-react';
import React from 'react';
import AddModifyShippingCostForm from './AddModifyShippingCostForm';
import ShippingCostTable from './ShippingCostTable';
const ShippingCostCard = ({ selectedSalesTrip, shippingCostData }: {
    selectedSalesTrip: {
        salestrip_name: string;

    },
    shippingCostData: any
}) => {

    console.log(shippingCostData?.data?.data, 'shippingCostData');

    // const nextSortOrder = typeData?.data?.success?.[0]?.fabric_type.length > 0 ? Math.max(...typeData?.data?.success?.[0]?.fabric_type?.map((obj: any) => obj.sortorder)) + 10 : null;
    return (
        <Card className="w-full overflow-hidden pt-0 ">
            <CardHeader className="flex flex-row justify-between p-4">
                <div>
                    <CardTitle className='w-fit'>Shipping Cost for <span className='text-primary'>{selectedSalesTrip?.salestrip_name}</span> </CardTitle>
                </div>

            </CardHeader>
            <CardContent>

                {shippingCostData?.isLoading ? <div className="flex gap-2 justify-center items-center my-10 text-xl font-semibold">
                    <Loader className="w-4 h-4 animate-spin" /> Loading...
                </div> :
                    < ShippingCostTable shippingCostData={shippingCostData?.data?.data} />
                }
            </CardContent>
        </Card>
    );
};

export default ShippingCostCard;
