
    
   $(document).ready(function(){
        let valid = localStorage.getItem('validuser'),
        i=4;
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
            for(i=0;i<=4;i++){
            $('.match-result-box').append(
                `<div class="match-result-details">
                <span class="match-result-Round">Round: Matchday 1</span>
                <span class="match-result-date">Date: 2019-08-09</span>
                <p class="match-result-teams">
                    <a href="#FIXME" title="Team" target="_blank">Liverpool FC </a>: <a href="#FIXME"
                        title="Team" target="_blank">Aston Villa FC </a></p>
                <spaan class="scores">4:1</spaan>
            </div>`
            )
            }
        })

        $('.load-more').click(function(){
            
            for(i=0;i<=4;i++){
                $('.team-performance-box').append(
                    `
                <div class="team-results-match-info">
                <span class="Round">Round: Matchday 1</span>
                <span class="match-date">Date: 2019-08-09</span>
                <span class="teams-involved">Liverpool FC : Aston Villa FC</span>
                <span class="scores">4:1</spaan>
            </div>`
                )
                 
            }
        })

        $('.clubs-dropper').click(function(){
            $.ajax({
                url:"https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json",
                type:"GET",
                success:function(data){
                        let result = JSON.parse(data);
                        for(key in result.clubs){
                            $('.clublistmenu').append(`
                            <li class='club'>${result.clubs[key].name}</li>
                            `);
                        }                    
                }
            })
        });

        $('.clublistmenu').on('click','li',function(){
            $('.team-info').html("");
            $('.team-performance-box').html("");
            $('.team-info').append(
                `<span class="team-name">Name: Aston Villa FC</span>
                <span class="team-code">Code: AVL</span>
                <span class="country-name">England</span>`  
            );

            $('.team-performance-box').append(
                `<div class="team-results-match-info">
                <span class="Round">Round: Matchday 1</span>
                <span class="match-date">Date: 2019-08-09</span>
                <span class="teams-involved">Liverpool FC : Aston Villa FC</span>
                <span class="scores">4:1</spaan>
            </div>`
            )
        })

        $('.matchdays-dropper').click(function(){
            $.ajax({
                url:"https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json",
                type:"GET",
                success:function(data){
                        let result = JSON.parse(data);
                       
                         for(key in result.matches){

                            $('.matchdays').append(`<li class='match-day'>${result.matches[key].round}</li>`);
                         }


                    }           
            })
        });

        $('.matchdays').on('click','li',function(){
            $('.match-result-box').html("");
            let match = $(this).html();
           
            $.ajax({
                url:"https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json",
                type:"GET",
                success:function(data){
                        let result = JSON.parse(data);                   
                         for(key in result.matches){
                             if(result.matches[key].round === match){
                            $('.match-result-box').append(
                                `<div class="match-result-details">
                                <span class="match-result-Round">Round: ${result.matches[key].round}</span>
                                <span class="match-result-date">Date:  ${result.matches[key].date}</span>
                                <p class="match-result-teams">
                                    <a href="clublis.html" title="Team" target="_blank">${result.matches[key].team1} </a>: <a href="clublist.html"
                                        title="Team" target="_blank">${result.matches[key].team2} </a></p>
                                <spaan class="scores">${result.matches[key].score.ft[0]}:${result.matches[key].score.ft[1]}</spaan>
                            </div>`
                            )
                             }
                          
                         }
                         $('.match-result-box').append(
                             `<button class="match-result-load-more">Show More</button> `
                         )
                    }           
            })
                $('.match-result-box').on('click','button',function(){
                    i+=5;
            let match_result=document.querySelectorAll('.match-result-details'),
              match_result_length = match_result.length;
                
            for(j=0;j<=i;j++){
                match_result[j].style.display = "block";
            }
            if(i === match_result_length-1){
                this.style.display = "none";
            }
                })
          
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



















