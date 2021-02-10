import authConstants from '../../constants/authConstants'
import api from '../../api/index'
import history from '../../history'
 
 
export const setPassword=(data,email,setpasswordtoken)=> async (dispatch,geState) =>{

     return await api.post('/auth/set-password',{
        params: {
            email: email,
            setpasswordtoken:setpasswordtoken
          },
        data
       }).then((res)=>{

       if(res.data.status){
         history.push('/login')
       }

       }).catch((err)=>{
        
         console.log(err)
       })
}

export const login =(data)=>async (dispatch) =>{
    return await api.post('/auth/login',{   
        email:data.email,
        password:data.password
       }).then((res)=>{

      
       const result = res.data.result;
       dispatch({
        type:authConstants.LOGIN_SUCCESS,
        result
        })

       }).catch((err)=>{
        
         console.log(err)
       })
}