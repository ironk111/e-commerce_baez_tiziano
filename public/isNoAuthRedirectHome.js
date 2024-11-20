function auth(){
    if (localStorage.getItem("email") == null){
        location.href = "/public/index.html" 
    } 
} auth();