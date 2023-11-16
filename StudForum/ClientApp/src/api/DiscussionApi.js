import axios from "axios";
import { API_BASE } from "../consts";

class DiscussionApi
{
    getBearer()
    {
        return `Bearer ${localStorage.getItem('token')}`
    }

    async getPage(count, page, categoryId, filter)
    {
        let result = null;

        try {
           
            await axios.get(`${API_BASE}/api/discussion/getpage?count=${count}&page=${page}&categoryId=${categoryId}&filter=${filter}`, {
                headers: {
                    Authorization: this.getBearer()
                }
            })
                .then(res => {
                    if (res.data)
                    {
                        console.log(res.data)
                        if (res.data.length == 0)
                            result = null;
                        else
                            result = res.data
                    }
                })
                .catch(res => {})
        }
        catch (err) {
            console.log(err)
        }


        return result;
    }

    async getCount()
    {
        let result = 0;

        try {
           
            await axios.get(`${API_BASE}/api/discussion/getcount`, {
                headers: {
                    Authorization: this.getBearer()
                }
            })
                .then(res => {
                    if (res.data.count)
                    {
                        result = res.data.count
                    }
                })
                .catch(res => {})
        }
        catch (err) {
            console.log(err)
        }


        return result;
    }

    async getlatests() {
        
        let result = null;

        try {
           
            await axios.get(`${API_BASE}/api/discussion/getlatests`, {
                headers: {
                    Authorization: this.getBearer()
                }
            })
                .then(res => {
                    if (res.data)
                    {
                        result = res.data
                    }
                })
                .catch(res => {})
        }
        catch (err) {
            console.log(err)
        }


        return result;
    }

    async getPopular() {
        
        let result = null;

        try {
           
            await axios.get(`${API_BASE}/api/discussion/getpopular`, {
                headers: {
                    Authorization: this.getBearer()
                }
            })
                .then(res => {
                    if (res.data)
                    {
                        result = res.data
                    }
                })
                .catch(res => {})
        }
        catch (err) {
            console.log(err)
        }


        return result;
    }

    async create(title, text, subcategoryId, hashtags, userId, poster)
    {
        let result = "";
        try {

            let formData = new FormData();
            formData.append("poster", poster.files[0])
            formData.append("title", title)
            formData.append("text", text)
            formData.append("subcategoryId", subcategoryId)
            formData.append("userId", userId)

            await axios.post(`${API_BASE}/api/discussion/create`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: this.getBearer()
                }
            })
                .then(res => {
                    if (res.data.discussionId) {
                        window.location.href = `/discussion?id=${res.data.discussionId}`
                    }
                    if (res.data.error)
                    {
                        result = res.data.error;
                    }
                })
                .catch(err =>
                    {
                        if (err.response.data)
                        {
                            result = err.response.data.error
                        }
                    });

        }
        catch (err) {
            console.log(err);   
            return err.response?.data?.error ?? 'Ошибка сервера';
        }
        return result
    }

    async getById(id)
    {
        let result = null;

        try {
           
            await axios.get(`${API_BASE}/api/discussion/getbyid?id=${id}`, {
                headers: {
                    Authorization: this.getBearer()
                }
            })
                .then(res => {
                    if (res.data)
                    {
                        result = res.data
                    }
                })
                .catch(res => {})
        }
        catch (err) {
            console.log(err)
        }


        return result;
    }

    async addAnswer(discussionId, userId, content)
    {
        let result = "";
        try {
            await axios.post(`${API_BASE}/api/discussion/addanswer`, {
                userId, discussionId, content
            },
            {
                headers: {
                    Authorization: this.getBearer()
                }
            })
                .then(res => {
                    window.location.href = `/discussion?id=${discussionId}`
                })
                .catch(err => {});

        }
        catch (err) {
            return err.response?.data?.error ?? 'Ошибка сервера';
        }
        return result
    }

    async getAnswers(discussionId)
    {
        let result = null;

        try {
           
            await axios.get(`${API_BASE}/api/discussion/getanswers?discussionId=${discussionId}`, {
                headers: {
                    Authorization: this.getBearer()
                }
            })
                .then(res => {
                    if (res.data)
                    {
                        result = res.data
                    }
                })
                .catch(res => {})
        }
        catch (err) {
            console.log(err)
        }


        return result;
    }

    async getUserDiscussions(userId) {
        
        let result = null;

        try {
           
            await axios.get(`${API_BASE}/api/discussion/getuserdiscussions?userId=${userId}`, {
                headers: {
                    Authorization: this.getBearer()
                }
            })
                .then(res => {
                    if (res.data)
                    {
                        result = res.data
                    }
                })
                .catch(res => {})
        }
        catch (err) {
            console.log(err)
        }


        return result;
    }

    async search(text)
    {
        let result = null

        try
        {
            await axios.get(`${API_BASE}/api/discussion/search?text=${text}`, {
                headers: {
                    Authorization: this.getBearer()
                }
            })
                .then(res => result = res.data)
                .catch(err => {});
        }
        catch(ex)
        {
            console.log(ex);
        }

        return result;
    }
}

export default new DiscussionApi()