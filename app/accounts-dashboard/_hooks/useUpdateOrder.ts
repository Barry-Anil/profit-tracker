import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';


const useUpdateOrder = () => {
    const { data: session } = useSession();
    const updateOrder = async (data: any) => {
        // console.log(modifiedData);
        const baseURL = `https://apierp02.officevg.com/sales/orders/updateorder`;
        const headers = {
            'Content-Type': 'application/json',
           
        };

        return await axios.post(baseURL, data, { headers });
    };

    return useMutation({
        mutationFn: updateOrder,
    });
};

export default useUpdateOrder;
