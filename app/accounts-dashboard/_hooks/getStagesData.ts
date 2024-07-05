import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

const useStagesData = (year: any, salestrip: any) => {
    const stagesData = async () => {
        const baseURL = `https://apivgerprust09.officevg.com/api/reports/accounts/orders/year?salestripyear=${year}&salestripname=${salestrip}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer abc123xyz456`
        };
        return await axios.get(baseURL,{headers});
    };

    return useQuery({
        queryFn: stagesData,
        queryKey: ['stagesData', year, salestrip],

    });
}
export default useStagesData;

