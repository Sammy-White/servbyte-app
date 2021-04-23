export const isAuthenticated = () => {
    const token = localStorage.getItem('uuu')

    try{
        if(token){
            return true
        }else{
            return false
        }
    }catch(e){
        return false
    }   
}