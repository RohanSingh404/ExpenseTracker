import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
export const useUserAuth = () => {
    const{user , clearUser  , updateUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(user){
            return;
        }

        let isMounted = true; //to prevent memory leaks if the component unmounts before the async operation completes

        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GETUSERINFO);
                if(isMounted && response.data){
                    updateUser(response.data);
                }
            } catch (error) {
                console.log("Error fetching user info:", error);
                if(isMounted){
                    clearUser();
                    navigate("/login");
                }
            }
        };
        fetchUserInfo(); //fetch user info when the component mounts

        return () => { //when leaving the page or component unmounting
            isMounted = false;
        };
    }, [user , clearUser , navigate , updateUser]);
}