import React, { Component} from 'react';
export const userContext = React.createContext();
export class UserContextProvider extends Component
{
    state={
        user:{Fname:"learning123guest",
         LName:"guestLname",
         Useremail:"guest@gmail.com",
         Userpassword:"guest123",
         UserCourseID:"guestCourse" ,
         UserAdmin:"guest" ,
         Inserted_date :"dd/mm/yyyy"}
    }
      setUser = user => {
        this.setState(prevState => ({ user }))
      }
 render()
{ const { children } = this.props
const { user } = this.state
const { setUser } = this

    return(
        <userContext.Provider 
        value={{
            user,
            setUser,
          }}
        >
          {children}
        </userContext.Provider>
    )
}

}


