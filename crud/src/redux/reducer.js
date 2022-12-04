import * as type from "./actionType";
const initialState = {
    user: {},
    users: {},
    loading: true
}

const setDelete = delt => window.localStorage.setItem("Delete-Item", JSON.stringify(delt));
const setEdit = edt => window.localStorage.setItem("Edit-Item", JSON.stringify(edt));
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.GET_USERS:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
            break;
        case type.DELETE_USERS:
            console.log("reducer-delete", state.user.data)
            console.log("action-payload-delet", action.payload)
            const stateData = state && state.user && state.user.data;
            const contactFilter = stateData.filter(item => item.id !== action.payload);
            console.log("contactFilter", contactFilter, {
                ...state,
                user: {data: [...contactFilter]}
            })
            const getDeletItem = JSON.parse(localStorage.getItem("Delete-Item")) || []
            // setDelete({...getDeletItem, data: [...getDeletItem?.data, ...stateData.filter(item => item.id === action.payload)]});
            setDelete([...getDeletItem, ...stateData.filter(item => item.id === action.payload)]);
console.log([...getDeletItem, ...stateData.filter(item => item.id === action.payload)])
            return {
                ...state,
                user: {data: [...contactFilter]}
            };
            break;
        case type.EDIT_USERS:
            const editData = state && state.user && state.user.data;
            const todo4 = editData.map((todo, i) =>
                i !== action.payload.selected ? todo : action.payload.value
            );
            setEdit(todo4)
            return {
                ...state,
                user: todo4,
                users: state.todos[action.payload],
            }
            break;
            case type.UPDATE_EDIT:
                const editsData = state && state.user && state.user.data;
                const updateEdit = editsData.map((todo) =>{
                   if(action.payload.id === todo.id){
                    return action.payload
                   }else{return todo}
                }
                 
            );
            console.log("upEDit", {
                ...state,
                user:{
                    data: updateEdit
                }
            })
            window.localStorage.setItem("UpdateEdit", JSON.stringify({...state,user:{
                data: updateEdit
            }}))
                return{
                    ...state,
                    user:{
                        data: updateEdit
                    }
                }

        default:
            return state;
            break;
    }
}

export default userReducer;