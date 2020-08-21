export function PostData(type, json=null, method=null, getToken=true) {
    let BaseURL = 'http://127.0.0.1/subastas/api-symfony-subastas/public/'; 
    var token = JSON.parse(localStorage.getItem("token"));
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    if(getToken && token!=null){
        myHeaders.append('Authorization', token);
    }      

    return fetch(BaseURL+type, {
        method: method, 
        body: 'json='+JSON.stringify(json), 
        headers: myHeaders
      }).then(res => res.json())
      .catch(error => error)
      .then(response => response);

}

export function GetData(type, json=null, method=null, getToken=true) {
  let BaseURL = 'http://127.0.0.1/subastas/api-symfony-subastas/public/'; 
  var token = JSON.parse(localStorage.getItem("token"));
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  
  if(getToken && token!=null){
      myHeaders.append('Authorization', token);
  }
  return fetch(BaseURL+type, {
      method: method, 
      headers: myHeaders
    }).then(res => res.json())
    .catch(error => error)
    .then(response => response);
}