
    
   $(document).ready(function(){
        let valid = localStorage.getItem('validuser');
        console.log(window.location.href);
        if(!(window.location.href === "file:///C:/Users/soura/OneDrive/Desktop/ajaxtask/football%20updates/index.html")){
        if(!valid){
            window.location.href='index.html';
        }else{

        }
    }

        $('.logout').click(function(){
            localStorage.clear();
            window.open('index.html');
        });

        $('.match-result-load-more').click(function(){
            $('.match-result-box').append(
                "<div>load more</div>"
            )
          
        })

   });

   function login(event){
       event.preventDefault();
    localStorage.setItem('username1','saurabh96');
    localStorage.setItem('password1','123456');

    let user1 = localStorage.getItem('username1'),
    pass1 = localStorage.getItem('password1','123456');
    event.preventDefault();
    let username = $('.username').val(),
    password = $('.password').val();
    if(username === user1 && password === pass1){
        localStorage.setItem('validuser','true');
        window.open('homepage.html');
    }else{
        alert('invalid username or password');
        window.open('index.html');
    }
}



















