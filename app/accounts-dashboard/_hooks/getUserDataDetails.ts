import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

const userDetailData = (ordernumber: any) => {
    const userData = async () => {
        const baseURL = `https://apierp02.officevg.com/sales/orders`;
        const headers = {
			"x-access-token":
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVDMDA1Iiwic2hvcnRuYW1lIjoiRUMwMDUgICAgICAgICAgIiwiZW1wY29kZSI6IkVDMDA1IiwidXNlcmlkIjoiMTE5NSIsImlhdCI6MTcwOTYzMzM0MywiZXhwIjoxNzA5NjY5MzQzfQ.CIhEYAtW2ey0ylvsdZ0_TMsWbNTDA1zD_9kT25FGXLE",
			"Content-Type": "application/json",
			Filtercriteria: `{"searchcriteria":"ordernumber","q":{"ordernumber":"${ordernumber}"}}`,
		};
        return await axios.get(baseURL,{headers});
    };

    return useQuery({
        queryFn: userData,
        queryKey: ['userData' ],

    });
}
export default userDetailData;

