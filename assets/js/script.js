
    localStorage.setItem('username1','saurabh96');
    localStorage.setItem('password1','123456');

    let user1 = localStorage.getItem('username1'),
    pass1 = localStorage.getItem('password1','123456');
    function login(event){
        event.preventDefault();
        let username = $('.username').val(),
        password = $('.password').val();
        if(username === user1 && password === pass1){
            window.open('homepage.html');
            localStorage.setItem('validuser',true);
        }else{
            alert('invalid username or password');
            window.open('index.html');
        }
    }
    
    window.onload = function(){
        let valid = localStorage.getItem('valid');
        if(valid !== true){
            window.open('index.html');
        }
    }
        





















