import { makeAutoObservable } from "mobx";



export default class UserStore
{
    user = {};

    constructor(props)
    {
        makeAutoObservable(this);
    }

    setUser(user)
    {
        this.user = user;
    }

}