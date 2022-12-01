import * as type from "./actionType";
import axios from "axios";
import { getUserApi } from "../config";

 const getUser =(user)=> ({
    type: type.GET_USERS,
    payload: user
})

 const deleteUser =(id)=> ({
    type: type.DELETE_USERS,
    payload : id
})

const editUser = (obj)=> ({
    type: type.EDIT_USERS,
    payload: obj
})

export const loadUser = () => {
    return function (dispatch) {
        axios.get(getUserApi)
        .then((res)=>{
            console.log("res", res)
            dispatch(getUser(res.data))
        }).catch((error)=> console.log(error))
    }
}

export const deluser = (id) => {
    return function (dispatch) {
       dispatch(deleteUser(id))
    }
}

export const edtUser =(obj)=> {
    return function(dispatch) {
        dispatch(editUser((obj)))
    }
}