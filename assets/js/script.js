$(document).ready(function () {
    //hamburger functionality
    $(".hamburger").click(function () {
        $(".menus").toggleClass("headermenus-show");
        $(".menus").toggleClass("headermenus");
        $(this).toggleClass("cross");
    });

    let valid = localStorage.getItem('validuser'),
        url = new URL(window.location.href),
        urlstring = url.search.slice(1),
        searchurlparam = new URLSearchParams(urlstring),
        paramvalue = searchurlparam.get('a'),
        i = 4;
    //for checking if page redirected from match details page
    if (paramvalue === null) {
        console.log("null");
    } else {
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json",
            type: "GET",
            success: (data) => {
                let result = JSON.parse(data);
                for (key in result.clubs) {
                    $('.clublistmenu').append(`
                            <li class='club'>${result.clubs[key].name}</li>
                            `);
                }
            },
            error: (error) => {
                alert("something went wrong");
                console.log(error);
            }
        })
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json",
            type: "GET",
            success: (data) => {
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
            },
            error: (error) => {
                alert("something went wrong");
                console.log(error);
            }
        })
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json",
            type: "GET",
            success: (data) => {
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
            },
            error: (error) => {
                alert("something went wrong");
                console.log(error)
            }
        })
    }
    // to check user login
    if (!($(".login-page").length > 0)) {
        if (!valid) {
            window.location.href = 'index.html';
        }
    } else {
        if (valid) {
            window.history.back();
        }
    }


    //logout
    $('.logout').click(() => {
        localStorage.clear();
        window.open('index.html');
    });

    //clubs dropdown
    $('.clubs-dropper').click(() => {
        $('.clublistmenu').html("");
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json",
            type: "GET",
            success: (data) => {
                let result = JSON.parse(data);
                for (key in result.clubs) {
                    $('.clublistmenu').append(`
                            <li class='club'>${result.clubs[key].name}</li>
                            `);
                }
            },
            error: (error) => {
                alert("something went wrong");
                console.log(error);
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
            success: (data) => {
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
            },
            error: (error) => {
                alert("something went wrong");
                console.log(error);
            }
        })
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json",
            type: "GET",
            success: (data) => {
                let result = JSON.parse(data);
                for (key in result.matches) {
                    if (result.matches[key].team1 === clubname || result.matches[key].team2 === clubname) {
                        $('.team-performance-box').append(
                            `<div class="team-results-match-info">
                                <span class="Round">Round: ${result.matches[key].round}</span>
                                <span class="match-date">Date:  ${result.matches[key].date}</span>
                                <p>
                                <a href="clublist.html?a=${result.matches[key].team1}" class="teams-involved">${result.matches[key].team1}</a>:<a href="clublist.html?a=${result.matches[key].team2}" class="teams-involved"> ${result.matches[key].team2}</a></p>
                                <span class="scores">${result.matches[key].score.ft[0]}:${result.matches[key].score.ft[1]}</spaan>
                            </div>`
                        )
                    }
                }
            },
            error: (error) => {
                alert("something went wrong");
                console.log(error);
            }
        })
    })

    //load more on club list page
    $('.team-results').on('click', 'button', () => {
        i += 5;

        let team_result = $('.team-results-match-info'),
            team_result_length = team_result.length - 1;
        for (j = 0; j <= i; j++) {
            team_result[j].style.display = "flex";
            if (j === team_result_length) {
                $('.load-more').style.display = "none";
            }
        }
    })

    // match days dropper
    $('.matchdays-dropper').click(() => {
        $('.matchdays').html("");
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json",
            type: "GET",
            success: (data) => {
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
            },
            error: (error) => {
                alert("something went wrong");
                console.log(error);
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
            success: (data) => {
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
            },
            error: (error) => {
                alert("something went wrong");
                console.log(error);
            }
        })
    })

    //load more on match details
    $('.match-result-box').on('click', 'button', () => {
        i += 5;
        let match_result = $('.match-result-details'),
            match_result_length = match_result.length - 1;
        for (j = 0; j <= i; j++) {
            console.log(j);
            match_result[j].style.display = "flex";
            if (j === match_result_length) {
                $('.match-result-load-more').css("display", "none");
            }
        }
    })

    //redirect on clublist if team name cliked
    $('.match-result-box').on('click', 'a', () => {
        $.ajax({
            url: "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json",
            type: "GET",
            success: (data) => {
                let result = JSON.parse(data);
                for (key in result.clubs) {
                    $('.clublistmenu').append(`
                            <li class='club'>${result.clubs[key].name}</li>
                            `);
                }
            },
            error: (error) => {
                alert("something went wrong");
                console.log(error);
            }
        })
    })
});

// const allInputs = $('form input');

// const validateInputField = (input, errorField) => {
//     console.log('input', input.attr('class'), errorField);
//     if (input.attr('class') === 'username' && input.val() === '') {
//         errorField.html('please enter firstname');
//     } else if (input.attr('class') === 'password' && input.val() === '') {
//         errorField.href('please enter lastname');
//     } 

// }

// $.each(allInputs,(i)=>{
//     i.blur(() => {
//         if (input.type !== 'checkbox' && input.type !== 'submit') {
//             validateInputField(input, input.nextSibling.nextSibling);
//         }
//     })
// })
    


let loginform = $('.loginform'),
    username = $('.username'),
    password = $('.password'),
    usererror = $('.usernameerror'),
    passerror = $('.passworderror');
localStorage.setItem('username1', 'saurabh96');
localStorage.setItem('password1', '123456');
console.log(username);

//blur validation
username.focusout(() => {
    usererror.html("");
    passerror.html("");
    $('.username').removeClass('errorbox');
    $('.password').removeClass('errorbox');
    if (username.val().length === 0) {
        usererror.html("please enter username");
        $('.username').addClass("errorbox");
    }
});

password.focusout(() => {
    usererror.html("");
    passerror.html("");
    $('.username').removeClass('errorbox');
    $('.password').removeClass('errorbox');
    if (password.val().length === 0) {
        passerror.html("please enter password");
        $('.password').addClass("errorbox");
    }
})
//login validation
loginform.submit((event) => {
    $('.username').removeClass('errorbox');
    $('.password').removeClass('errorbox');
    event.preventDefault();

    usererror.html("");
    passerror.html("");
    let user1 = localStorage.getItem('username1'),
        pass1 = localStorage.getItem('password1');
    event.preventDefault();

    if (username.val().length === 0) {
        usererror.html("please enter username");
        $('.username').addClass("errorbox");
    } else if (password.val().length === 0) {
        passerror.html("please enter password")
        $('.password').addClass("errorbox");
    } else if (username.val() === user1 && password.val() === pass1) {
        localStorage.setItem('validuser', 'true');
        window.open('homepage.html');
    } else {
        passerror.html("invalid username or password");
    }
})

// to change color of club name when clicked
const changecolor = (paramvalue) => {
    let clubnames = $('.clublist li');
    clubnames.forEach(i => {
        i.classList.remove("yellow");
        console.log(i);
        if (i.innerHTML === paramvalue) {
            i.classList.add("yellow");
        }
    })
}