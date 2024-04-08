import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

type FabricDataType = {
    fabricid: number;
    gender: string;
    fabriccategory: string;
    fabricno: string;
    fabricno_alternate: string;
    fabricname: string;
    description: string;
    fabricwidth: string;
    fabrictype: string;
    design: string;
    color: string;
    resellertype: string;
    fabricsupers: string;
    brandname: string;
    salesdescription: string;
    stockqty: string;
    stockqty_threshold: string;
    stockunit: string;
    stockqty_notes: string;
    stockqty_orderbooked: string;
    stockrate: string;
    supplierid: string;
    suppliershortname: string;
    fabriccode_supplier: string;
    fabriccountry_supplier: string;
    racknumber: string;
    storenumber: string;
    totalstock: string;
    isactivesearch: boolean;
    isactive: boolean;
    createdby: number;
    display: string;
    fabricmaterialtype: string;
    fabriccomposition: string;
    fabricrange: string;
    fabricweave: string;
    fabricseason: string;
    pricepermeter: string;
    fabricweight: string;
    fabricweightby: string;
    fabric3dimageurl: string;
    fabricsubcategory: string;
    fabrichandle: string;
    fabricproperties: string;
    fabricwear: string;
    resellerarr: string[];
    fabric_availability_date: string;
    fabric_availability_notes: string;
    pricepermeter_currency: string;
    supplier_fabric_series: string;
};
const useAddNewFabric = () => {
    const { data: session } = useSession();
    const addFabric = async (data: FabricDataType) => {
        const modifiedData = {
            ...data,
            stockqty: parseInt(data.stockqty),
            stockqty_threshold: parseInt(data.stockqty_threshold),
            stockqty_orderbooked: parseInt(data.stockqty_orderbooked),
            stockrate: parseInt(data.stockrate),
            totalstock: parseInt(data.totalstock),
            createdby: 1,
        };
        // console.log(modifiedData);
        const baseURL = `${process.env.NEXT_PUBLIC_API_URL}api/fabric/erp/add-fabric`;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.sessionToken}`,
        };

        return await axios.post(baseURL, modifiedData, { headers });
    };

    return useMutation({
        mutationFn: addFabric,
    });
};

export default useAddNewFabric;
