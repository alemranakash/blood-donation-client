import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useBloodRequest = () => {
    const axiosPublic= useAxiosPublic()
    const {data: bloodRequest = [], isPending: loading, refetch} = useQuery({
        queryKey: ['bloodRequest'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/bloodRequest');
            return res.data;
        }
    })


    return [bloodRequest, loading, refetch]
};

export default useBloodRequest;