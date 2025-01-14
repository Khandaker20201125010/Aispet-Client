import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";



const useBookingServices = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
  
    const { data: bookingServices = [], refetch } = useQuery({
      queryKey: ["bookservices", user?.email], // Include email in the query key
      queryFn: async () => {
        if (!user?.email) {
          return []; // Return an empty array if the email is not available
        }
        const res = await axiosPublic.get(`/bookServices?email=${user.email}`);
        return res.data.bookservices;
      },
    });
  
    return [bookingServices, refetch];
  };

export default useBookingServices;
