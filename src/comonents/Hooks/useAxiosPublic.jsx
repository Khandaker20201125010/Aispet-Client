import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://aispet-server-mysql.onrender.com'
})
const useAxiosPublic = () => {

   return axiosPublic ;
};

export default useAxiosPublic;