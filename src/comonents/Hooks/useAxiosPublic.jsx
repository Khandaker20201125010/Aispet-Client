import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://aispet-server-mysql-1.onrender.com'
})
const useAxiosPublic = () => {

   return axiosPublic ;
};

export default useAxiosPublic;