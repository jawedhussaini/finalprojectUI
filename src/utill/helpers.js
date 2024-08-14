

export const getToken = () => localStorage.getItem(process.env.AUTH_TOKEN);
export const getUserData=()=>{
   const positiion= localStorage.getItem("position");
   const email=localStorage.getItem("email")
   const username=localStorage.getItem("username")
   const user={
    positiion:positiion,
    email:email,
    name:username
   }
   return user
}

export const setToken = token => {
    const AUTH_TOKEN=`${process.env.AUTH_TOKEN}`
    if (token) {
        localStorage.setItem(AUTH_TOKEN, token);
    }
};
export const setUserAllData = token => {

    if (token) {
       const Position=token.positiion
       const userEmail=token.email
       const userName=token.username


        localStorage.setItem("position", Position);
        localStorage.setItem("email",userEmail)
        localStorage.setItem("username",userName)
    }
};


export const removeToken = () => {
    localStorage.removeItem(process.env.AUTH_TOKEN);
    localStorage.removeItem("position");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
};