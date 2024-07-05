import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

const useStagesTableData = (year: any) => {
    const stagesTableData = async () => {
        const baseURL = 'https://apierppy10.officevg.com/accounts/orders/year';
        return await axios.post(baseURL,{year: year});
    };

    return useQuery({
        queryFn: stagesTableData,
        queryKey: ['stagesTableData', year],

    });
}
export default useStagesTableData;

