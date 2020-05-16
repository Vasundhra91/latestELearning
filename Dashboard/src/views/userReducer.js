

export const userReducer=(state, action)=>{
    console.log(action.type)
    switch(action.type)
    {
        case 'login':
            return[...state,action.user]
        case 'logout':
             return[]
    }
}