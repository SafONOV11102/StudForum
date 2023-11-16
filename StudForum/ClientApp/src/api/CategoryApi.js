import axios from "axios";
import { API_BASE } from "../consts";

class CategoryApi
{
    getBearer()
    {
        return `Bearer ${localStorage.getItem('token')}`
    }

    async getList() {
        
        let result = {
           
        };

        try {
           
            await axios.get(`${API_BASE}/api/category/getlist`, {
                headers: {
                    Authorization: this.getBearer()
                }
            })
                .then(res => {
                   if(res.data != null)
                    result = res.data
                })
                .catch(res => {})
        }
        catch (err) {
            console.log(err)
        }


        return result;
    }

    
}

export default new CategoryApi()