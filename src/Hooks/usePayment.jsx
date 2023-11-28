import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePayment = () => {
    const axiosPublic= useAxiosPublic()
    const {data: payments = [], isPending: loading, refetch} = useQuery({
        queryKey: ['payments'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/payments');
            return res.data;
        }
    })


    return [payments, loading, refetch]
};

export default usePayment;