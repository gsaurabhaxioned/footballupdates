
$(document).ready(function(){

    let user1 = localStorage.setItem('username1','saurabh96');
    let pass1 = localStorage.setItem('password1','123456');

    function login(event){
        event.preventDefault();
        let username = $('.username').val(),
        password = $('.password').val();
        if(username === user1 && password === pass1){
            window.open('homepage.html');
        }else{
            window.open('index.html');
            alert('invalid username or password');
        }
    }
    
        

});





















