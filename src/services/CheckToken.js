export function CheckToken(url=null) {
    var token = JSON.parse(localStorage.getItem("user"));
    if(token){
        if (token.exp < Date.now() / 1000) {
            localStorage.clear();
            window.location.assign('/');
        }else{
            if(url){
                window.location.assign(url);
            }
        }
    }else{
        if(window.location.pathname==="/registro"){
            
        }else{
            if(window.location.pathname!=="/"){
                window.location.assign('/');
            }
        }
    }
}