if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(function () {
                console.log("Pendaftaran ServiceWorker berhasil");
            })
            .catch(function () {
                console.log("Pendaftaran ServiceWorker gagal");
            });
        requestPermission();
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}

function requestPermission() {
    if ("Notification" in window) {
        Notification.requestPermission().then(function (result) {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan.");
                return;
            } else if (result === "default") {
                console.log("Pengguna menutup kotak dialog permission.");
                return;
            }

            console.log("Fitur notifikasi diijinkan");
            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then(function (registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BI_cptsLFgZNWIhG_038btE7ztXMP3JP7_toUoM-YX4tWaL6XT1fOdrWQMtYY-mmFjBSUs6CcylY_G5tIpac66g")
                    }).then(function (subscribe) {
                        console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('p256dh')))));
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('auth')))));
                    }).catch(function (e) {
                        console.error('Tidak dapat melakukan subscribe ', e.message);
                    });
                });
            }
        });
    } else {
        console.log("Browser tidak mendukung notifikasi.");
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

document.addEventListener("DOMContentLoaded", function () {
    getStandings();

    var urlParams = new URLSearchParams(window.location.search);
    var isFromSaved = urlParams.get("saved");
    var idParam = urlParams.get("id");
    idParam = parseInt(idParam);

    var btnFav = document.getElementById("favorite");

    if (isFromSaved) {
        btnFav.innerHTML = `<i class="large material-icons">delete</i>`;

        getSavedFavoriteById();
    } else {
        var item = getDetailTeam();
    }

    btnFav.onclick = function () {
        if (idParam && isFromSaved) {
            deleteById(idParam);
            console.log("Klub dihapus dari Favorite.");
            M.toast({
                html: 'Klub dihapus dari Favorite!',
                classes: 'rounded'
            });
        } else {
            item.then(function (club) {
                saveFavorite(club);
            });
            console.log("Klub ditambahkan ke Favorite.");
            M.toast({
                html: 'Klub ditambahkan ke Favorite!',
                classes: 'rounded'
            });
        }
    }
});