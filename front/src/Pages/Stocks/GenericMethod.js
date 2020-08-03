

export function handleResponse(response,props) {


     // If invalid jwt token the page will get redirect to login.
     if (response.status === 200 && response.data.code === '99' && response.data.message  === 'jwt expired') {
        sessionStorage.setItem('expired',true);
        //sessionStorage.clear();
        //alert('Session expired!');
        //props.history.push('/login')
     }else if(response.status === 200 && response.data.code === '99' && response.data.status === 404){
        alert('Request API not FOUND!');
     }else if(response.status === 200 && response.data.code === '99' && response.data.status === 500){
        alert('Something went wrong!');
     }
  }