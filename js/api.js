var endpoint = "https://api.football-data.org/v2/competitions/2021/standings";
var team_info = "https://api.football-data.org/v2/teams/";
const API_TOKEN = {
    headers: {
        'X-Auth-Token': '89f785f1077449db938b1e00abb91e71'
    }
};

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);

        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

// Parsing JSON
function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

var preloader = document.getElementById("preloader").style.display;

function getStandings() {
    if ('caches' in window) {
        caches.match(endpoint, API_TOKEN).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    var klasemenHTML = "";
                    data.standings[0].table.forEach(function (totalteam) {
                        klasemenHTML += `
                            <div class="col s12" style="height: 40px; margin-bottom: 5px;">
                                <a href="./detail.html?id=${totalteam.team.id}">
                                    <div class="row card" style="line-height: 40px; color: dimgrey; font-weight: 600; text-align: center; border-radius: 10px;">
                                        <div class="col s1" style="padding-right: 0; max-width: 40px;">${totalteam.position}</div>
                                        <div class="col s5 truncate left-align">
                                            <img src=${totalteam.team.crestUrl} style="float: left; height: 26px; margin: 7px 5px 0 0;" alt="club_logo">
                                            ${totalteam.team.name}
                                        </div>
                                        <div class="col s1">${totalteam.playedGames}</div>
                                        <div class="col s1">${totalteam.won}</div>
                                        <div class="col s1">${totalteam.draw}</div>
                                        <div class="col s1">${totalteam.lost}</div>
                                        <div class="col s2">${totalteam.points}</div>
                                    </div>
                                </a>
                            </div>
                        `;
                    });
                    document.getElementById("klasemen").innerHTML = klasemenHTML;
                    preloader = 'none';
                })
            }
        })
    }

    fetch(endpoint, API_TOKEN)
        .then(status)
        .then(json)
        .then(function (data) {
            var klasemenHTML = "";
            data.standings[0].table.forEach(function (totalteam) {
                klasemenHTML += `
                    <div class="col s12" style="height: 40px; margin-bottom: 5px;">
                        <a href="./detail.html?id=${totalteam.team.id}">
                            <div class="row card" style="line-height: 40px; color: dimgrey; font-weight: 600; text-align: center; border-radius: 10px;">
                                <div class="col s1" style="padding-right: 0; max-width: 40px;">${totalteam.position}</div>
                                <div class="col s5 truncate left-align">
                                    <img src=${totalteam.team.crestUrl} style="float: left; height: 26px; margin: 7px 5px 0 0;">
                                    ${totalteam.team.name}
                                </div>
                                <div class="col s1">${totalteam.playedGames}</div>
                                <div class="col s1">${totalteam.won}</div>
                                <div class="col s1">${totalteam.draw}</div>
                                <div class="col s1">${totalteam.lost}</div>
                                <div class="col s2">${totalteam.points}</div>
                            </div>
                        </a>
                    </div>
                `;
            });
            document.getElementById("klasemen").innerHTML = klasemenHTML;
            preloader = 'none';
        })
        .catch(error);
}

function getDetailTeam() {
    return new Promise(function (resolve, reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(team_info + idParam, API_TOKEN).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        console.log(data);
                        const website = data.website.slice(7);
                        var allsquad = "";
                        data.squad.forEach(function (squads) {
                            allsquad += `
                                <div class="collection-item">
                                    <div class="row" style="height: 0;">
                                        <div class="col s6 truncate">${squads.name}</div>
                                        <div class="col s6 truncate">${squads.position}</div>
                                    </div>
                                </div>
                            `;
                        });

                        var detailTeamHTML = `
                            <div class="row card" style="margin-top: 30px; border-radius: 20px;">
                                <div class="col s12 m3">
                                    <img src="${data.crestUrl}" style="height: 200px; display: block; margin: 10px auto;">
                                </div>
                                <div class="col s12 m9 purple darken-3" style="border-radius: 20px; color: white; background-image: url(image/premier-league-icon.png); background-repeat: no-repeat; background-size: contain; background-position: right;">
                                    <h2 style="font-weight: 600;">${data.name}</h2>
                                    <div class="waves-effect waves-light indigo lighten-3 btn" style="font-weight: 600;">${data.area.name}</div>
                                    <div style="margin-top: 10px;">
                                        <i class="material-icons">place</i>
                                        <span style="position: relative; bottom: 6px;">${data.venue}</span>
                                    </div>
                                    <div style="margin-bottom: 10px;">
                                        <i class="material-icons">language</i>
                                        <span style="position: relative; bottom: 6px;"><a href="${data.website}" style="color: white;">${website}</a></span>
                                    </div>
                                </div>
                            </div>

                            <div class="collection" style="border-radius: 10px;">
                                <div class="collection-item active purple darken-3">
                                    <div class="row" style="height: 0;">
                                        <div class="col s6">Pemain</div>
                                        <div class="col s6">Posisi</div>
                                    </div>
                                </div>
                                ${allsquad}
                            </div>
                        `;
                        document.getElementById("body-content").innerHTML = detailTeamHTML;
                        resolve(data);
                        preloader = 'none';
                    });
                }
            });
        }

        fetch(team_info + idParam, API_TOKEN)
            .then(status)
            .then(json)
            .then(function (data) {
                console.log(data);
                var website = data.website.slice(7);
                var allsquad = "";
                data.squad.forEach(function (squads) {
                    allsquad += `
                        <div class="collection-item">
                            <div class="row" style="height: 0;">
                                <div class="col s6 truncate">${squads.name}</div>
                                <div class="col s6 truncate">${squads.position}</div>
                            </div>
                        </div>
                    `;
                });

                var detailTeamHTML = `
                    <div class="row card" style="margin-top: 30px; border-radius: 20px;">
                        <div class="col s12 m3">
                            <img src="${data.crestUrl}" style="height: 200px; display: block; margin: 10px auto;">
                        </div>
                        <div class="col s12 m9 purple darken-3" style="border-radius: 20px; color: white; background-image: url(image/premier-league-icon.png); background-repeat: no-repeat; background-size: contain; background-position: right;">
                            <h2 style="font-weight: 600;">${data.name}</h2>
                            <div class="waves-effect waves-light indigo lighten-3 btn" style="font-weight: 600;">${data.area.name}</div>
                            <div style="margin-top: 10px;">
                                <i class="material-icons">place</i>
                                <span style="position: relative; bottom: 6px;">${data.venue}</span>
                            </div>
                            <div style="margin-bottom: 10px;">
                                <i class="material-icons">language</i>
                                <span style="position: relative; bottom: 6px;"><a href="${data.website}" style="color: white;">${website}</a></span>
                            </div>
                        </div>
                    </div>

                    <div class="collection" style="border-radius: 10px;">
                        <div class="collection-item active purple darken-3">
                            <div class="row" style="height: 0;">
                                <div class="col s6">Pemain</div>
                                <div class="col s6">Posisi</div>
                            </div>
                        </div>
                        ${allsquad}
                    </div>
                `;
                document.getElementById("body-content").innerHTML = detailTeamHTML;
                resolve(data);
                preloader = 'none';
            });
    });
}

function getSavedFavorites() {
    getAll().then(function (favorites) {
        console.log(favorites);

        var clubHTML = "";
        favorites.forEach(function (favorite) {
            clubHTML += `
                <div class="col s12 m4">
                    <div class="card" style="border-radius: 10px;">
                        <div class="card-image" style="padding-top: 8px;">
                            <a href="./detail.html?id=${favorite.id}&saved=true">
                                <img src="${favorite.crestUrl}" style="margin: 10px auto; display: block; height: 200px; width: 200px;"/>
                            </a>
                            <a class="btn-floating halfway-fab waves-effect waves-light red deleteButton" id="${favorite.id}"><i class="material-icons">delete</i></a>
                        </div>
                        <div class="card-content purple darken-3" style="color: white; border-radius: 0 0 10px 10px;">
                            <span class="card-title truncate">${favorite.name}</span> 
                        </div>
                    </div>
                </div>
            `;
        });
        document.getElementById("favorites").innerHTML = clubHTML;

        var deleteButtons = document.querySelectorAll(".deleteButton");
        for (let button of deleteButtons) {
            button.addEventListener("click", function (event) {
                var teamId = this.id;
                teamId = parseInt(teamId);
                deleteById(teamId).then(function () {
                    console.log(teamId);
                    getSavedFavorites();
                });
                console.log("Klub dihapus dari Favorite.");
                M.toast({
                    html: 'Klub dihapus dari Favorite!',
                    classes: 'rounded'
                });
            });
        }
    });
}

function getSavedFavoriteById() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    idParam = parseInt(idParam);

    getById(idParam).then(function (data) {
        console.log(data);
        var website = data.website.slice(7);
        var allsquad = "";
        data.squad.forEach(function (squads) {
            allsquad += `
                <div class="collection-item">
                    <div class="row" style="height: 0;">
                        <div class="col s6 truncate">${squads.name}</div>
                        <div class="col s6 truncate">${squads.position}</div>
                    </div>
                </div>
            `;
        });

        var detailTeamHTML = `
            <div class="row card" style="margin-top: 30px; border-radius: 20px;">
                <div class="col s12 m3">
                    <img src="${data.crestUrl}" style="height: 200px; display: block; margin: 10px auto;">
                </div>
                <div class="col s12 m9 purple darken-3" style="border-radius: 20px; color: white; background-image: url(image/premier-league-icon.png); background-repeat: no-repeat; background-size: contain; background-position: right;">
                    <h2 style="font-weight: 600;">${data.name}</h2>
                    <div class="waves-effect waves-light indigo lighten-3 btn" style="font-weight: 600;">${data.area.name}</div>
                    <div style="margin-top: 10px;">
                        <i class="material-icons">place</i>
                        <span style="position: relative; bottom: 6px;">${data.venue}</span>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <i class="material-icons">language</i>
                        <span style="position: relative; bottom: 6px;"><a href="${data.website}" style="color: white;">${website}</a></span>
                    </div>
                </div>
            </div>

            <div class="collection" style="border-radius: 10px;">
                <div class="collection-item active purple darken-3">
                    <div class="row" style="height: 0;">
                        <div class="col s6">Pemain</div>
                        <div class="col s6">Posisi</div>
                    </div>
                </div>
                ${allsquad}
            </div>
        `;
        document.getElementById("body-content").innerHTML = detailTeamHTML;
    });
}