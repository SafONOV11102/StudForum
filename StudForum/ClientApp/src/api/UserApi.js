import axios from "axios";
import { API_BASE } from "../consts";

class UserApi 
{
    getBearer()
    {
        return `Bearer ${localStorage.getItem('token')}`
    }

    async reg(login, password, name, surname, placeOfStudy, dateOfBirth)
    {
        let result = "";
        try
        {
            await axios.post(`${API_BASE}/api/user/reg`,
            {
                login, password, name, surname, placeOfStudy, dateOfBirth
            })
            .then(
                res => {
                    if (res.data.token)
                    {
                        localStorage.setItem('token', res.data.token);
                        window.location.href = "/"
                    }
                    if (res.data.error)
                    {
                        result = res.data.error
                    }
                }
            ).catch(err => 
                {
                    if (err.response.data)
                    {
                        result = err.response.data.error
                    }
                });

        }
        catch(err)
        {
        }
        return result;

    }

    async login(login, password) {
        let result = "";
        try {
            await axios.post(`${API_BASE}/api/user/login`, {
                login, password
            })
                .then(res => {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token)
                        window.location.href = '/'
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
            return err.response?.data?.error ?? 'Ошибка сервера';
        }
        return result
    }

    async authentication() {
        
        let result = {
            id: 0,
            login: '',
            isAuth: false,
            name: '',
            surname: ''
        };

        try {
           
            await axios.get(`${API_BASE}/api/user/authentication`, {
                headers: {
                    Authorization: this.getBearer()
                }
            })
                .then(res => {
                    result = {
                        id: res.data.userId,
                        login: res.data.login,
                        isAuth: true,
                        name: res.data.name,
                        surname: res.data.surname,
                        avatar: res.data.avatar
                    }
                })
                .catch(res => {})
        }
        catch (err) {
            console.log(err)
            localStorage.removeItem('token');
        }

        if (result.id == 0)
            localStorage.removeItem('token')

        return result;
    }

    async logout()
    {
        localStorage.removeItem('token');
        window.location.href = "/"
    }

    async getProfile(id) {
        
        let result = {};

        try {
           
            await axios.get(`${API_BASE}/api/user/getprofile?userId=${id}`, {
                headers: {
                    Authorization: this.getBearer()
                }
            })
                .then(res => {
                    result = {
                        date: res.data.date,
                        city: res.data.city,
                        email: res.data.email,
                        createdDis: res.data.createdDis,
                        answers: res.data.answers
                    }
                })
                .catch(res => {})
        }
        catch (err) {
            console.log(err)
        }

        return result;
    }

    async updateProfile(value, userId, type)
    {
        let result = "";
        try
        {
            await axios.put(`${API_BASE}/api/user/updateprofile`, {
                value,
                userId,
                type
            }, {
                headers: 
                {
                    Authorization: this.getBearer()
                }
            })
            .then(res => 
                {
                    if (type == "login" || type == "password")
                        this.logout();

                    window.location.reload()
                })
            .catch(res => {
                if (res.response.data.error)
                    alert(res.response.data.error)
            })
        }
        catch(err)
        {
            console.log(err)
        }
        return result;
    }
}

export default new UserApi()