$(document).ready(function () {
//hamburger functionality
        $(".hamburger").click(function () {
            $(".headermenus").slideToggle();
            $(this).toggleClass("cross");
        });
 
    let valid = localStorage.getItem('validuser'),
        url = new URL(window.location.href),
        urlstring = url.search.slice(1),
        searchurlparam = new URLSearchParams(urlstring),
        paramvalue = searchurlparam.get('a'),
        i=4;
        //for checking if page redirected form match details page
    if (paramvalue === null) {
        console.log("null");
    } else {
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json",
            type: "GET",
            success: function (data) {
                let result = JSON.parse(data);
                for (key in result.clubs) {
                    $('.clublistmenu').append(`
                            <li class='club'>${result.clubs[key].name}</li>
                            `);
                }
            }
        })
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json",
            type: "GET",
            success: function (data) {
                let result = JSON.parse(data);
                for (key in result.clubs) {
                    if (result.clubs[key].name === paramvalue) {
                        $('.team-info').append(
                            `<span class="team-name">Name: ${result.clubs[key].name}</span>
                                <span class="team-code">Code: ${result.clubs[key].code}</span>
                                <span class="country-name">${result.clubs[key].country}</span>`
                        );
                    }
                }
            }
        })
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json",
            type: "GET",
            success: function (data) {
                let result = JSON.parse(data);
                for (key in result.matches) {
                    if (result.matches[key].team1 === paramvalue || result.matches[key].team2 === paramvalue) {
                        $('.team-performance-box').append(
                            `<div class="team-results-match-info">
                                <span class="Round">Round: ${result.matches[key].round}</span>
                                <span class="match-date">Date:  ${result.matches[key].date}</span>
                                <a href="clublist.html?a=${result.matches[key].team1}" class="teams-involved">${result.matches[key].team1}</a>:<a href="clublist.html?a=${result.matches[key].team2}" class="teams-involved"> ${result.matches[key].team2}</a>
                                <span class="scores">${result.matches[key].score.ft[0]}:${result.matches[key].score.ft[1]}</spaan>
                            </div>`
                        )
                    }
                }
                changecolor(paramvalue);
            }
        })
    }
    // to check user login
    if (!($(".login-page")[0])) {
        if (!valid) {
            window.location.href = 'index.html';
        } else {}
    }

    //logout
    $('.logout').click(function () {
        localStorage.clear();
        window.open('index.html');
    });

    //clubs dropdown
    $('.clubs-dropper').click(function () {
        $('.clublistmenu').html("");
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json",
            type: "GET",
            success: function (data) {
                let result = JSON.parse(data);
                for (key in result.clubs) {
                    $('.clublistmenu').append(`
                            <li class='club'>${result.clubs[key].name}</li>
                            `);
                }
            }
        })
    });

    //show club details and clubs performances on clicking club name
    $('.clublistmenu').on('click', 'li', function () {
        i = 4;
        $('.load-more').css("display", "block");
        let clubname = $(this).html();
        $('.clublistmenu li').removeClass("yellow");
        $(this).addClass('yellow');
        $('.team-info').html("");
        $('.team-performance-box').html("");
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json",
            type: "GET",
            success: function (data) {
                let result = JSON.parse(data);
                for (key in result.clubs) {
                    if (clubname === result.clubs[key].name) {
                        $('.team-info').append(
                            `<span class="team-name">Name: ${result.clubs[key].name}</span>
                                <span class="team-code">Code: ${result.clubs[key].code}</span>
                                <span class="country-name">${result.clubs[key].country}</span>`
                        );
                    }
                }
            }
        })
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json",
            type: "GET",
            success: function (data) {
                let result = JSON.parse(data);
                for (key in result.matches) {
                    if (result.matches[key].team1 === clubname || result.matches[key].team2 === clubname) {
                        $('.team-performance-box').append(
                            `<div class="team-results-match-info">
                                <span class="Round">Round: ${result.matches[key].round}</span>
                                <span class="match-date">Date:  ${result.matches[key].date}</span>
                                <a href="clublist.html?a=${result.matches[key].team1}" class="teams-involved">${result.matches[key].team1}</a>:<a href="clublist.html?a=${result.matches[key].team2}" class="teams-involved"> ${result.matches[key].team2}</a>
                                <span class="scores">${result.matches[key].score.ft[0]}:${result.matches[key].score.ft[1]}</spaan>
                            </div>`
                        )
                    }
                }
            }
        })
    })

    //load more on club list page
    $('.team-results').on('click', 'button', function () {
        i += 5;

        let team_result = document.querySelectorAll('.team-results-match-info'),
            team_result_length = team_result.length - 1;
        for (j = 0; j <= i; j++) {
            team_result[j].style.display = "flex";
            if (j === team_result_length) {
                document.querySelector('.load-more').style.display = "none";
            }
        }
    })

    // match days dropper
    $('.matchdays-dropper').click(function () {
        $('.matchdays').html("");
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json",
            type: "GET",
            success: function (data) {
                let result = JSON.parse(data),
                    uniqueresult = [];
                console.log(uniqueresult);
                for (key in result.matches) {
                    uniqueresult.push(result.matches[key].round);
                }
                let getuniquevalue = [...new Set(uniqueresult)];
                for (key in getuniquevalue) {
                    $('.matchdays').append(`<li class='match-day'>${getuniquevalue[key]}</li>`);
                }
            }
        })
    });

    //show matches on the day which is clicked
    $('.matchdays').on('click', 'li', function () {
        i = 4;
        $('.match-result-box').html("");
        $('.matchdays li').removeClass("yellow");
        $(this).addClass('yellow');
        let match = $(this).html();
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json",
            type: "GET",
            success: function (data) {
                let result = JSON.parse(data);
                for (key in result.matches) {
                    if (result.matches[key].round === match) {
                        $('.match-result-box').append(
                            `<div class="match-result-details">
                                <span class="match-result-Round">Round: ${result.matches[key].round}</span>
                                <span class="match-result-date">Date: ${result.matches[key].date}</span>
                                <p class="match-result-teams">
                                    <a href="clublist.html?a=${result.matches[key].team1}" title="Team" target="_blank">${result.matches[key].team1} </a>:<a href="clublist.html?a=${result.matches[key].team2}"
                                        title="Team" target="_blank">${result.matches[key].team2} </a></p>
                                <span class="scores">${result.matches[key].score.ft[0]}:${result.matches[key].score.ft[1]}</span>
                            </div>`
                        )
                    }
                }
                $('.match-result-box').append(
                    `<button class="match-result-load-more">Show More</button> `
                )
            }
        })
    })

    //load more on match details
    $('.match-result-box').on('click', 'button', function () {
        i += 5;
        let match_result = document.querySelectorAll('.match-result-details'),
            match_result_length = match_result.length - 1;
        for (j = 0; j <= i; j++) {
            match_result[j].style.display = "flex";
            if (j === match_result_length) {
                $('.match-result-load-more').css("display", "none");
            }
        }
    })

    //redirect on clublist if team name cliked
    $('.match-result-box').on('click', 'a', function () {
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json",
            type: "GET",
            success: function (data) {
                let result = JSON.parse(data);
                for (key in result.clubs) {
                    $('.clublistmenu').append(`
                            <li class='club'>${result.clubs[key].name}</li>
                            `);
                }
            }
        })
    })
});
let loginform = document.querySelector('.loginform');

    //login validation
   loginform.addEventListener('submit',function(event) {
    event.preventDefault();
    let usererror = $('.usernameerror'),
    passerror = $('.passworderror');
       usererror.html("");
       passerror.html("");
    
    localStorage.setItem('username1', 'saurabh96');
    localStorage.setItem('password1', '123456');
    let user1 = localStorage.getItem('username1'),
        pass1 = localStorage.getItem('password1', '123456');
    event.preventDefault();
    let username = $('.username').val(),
        password = $('.password').val();
    

        if(username === ""){
            usererror.html("please enter username");
            $('.username').addClass("errorbox");
        }else if(password === ""){
            passerror.html("please enter password")
            $('.password').addClass("errorbox");
        }else if (username === user1 && password === pass1) {
        localStorage.setItem('validuser', 'true');
        window.open('homepage.html');
    } else {
        passerror.html("invalid username or password");
    }
}) 

// to change color of club name when clicked
function changecolor(paramvalue) {
    let clubnames = document.querySelectorAll('.clublist li');
    clubnames.forEach(i => {
        i.classList.remove("yellow");
        console.log(i);
        if (i.innerHTML === paramvalue) {
            i.classList.add("yellow");
        }
    })
}