import axios from "axios";

//the point of creating this component is to be DRY and be able to just call this function for anything that needs authenticating

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token'); // gets the token that has been set to localStorage

    return axios.create({
        baseURL: 'http://localhost:5000/api',
        headers:{
            authorization: token // sets the token in the "headers" part of the browser to be sent to the server for verification
        }
    })
}