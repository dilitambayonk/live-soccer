var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BI_cptsLFgZNWIhG_038btE7ztXMP3JP7_toUoM-YX4tWaL6XT1fOdrWQMtYY-mmFjBSUs6CcylY_G5tIpac66g",
    "privateKey": "IxBJHFPj2i7CO09qxKlMVOfk4WhyqbWOsjXy8aNuy2s"
};

webPush.setVapidDetails(
    'mailto:dilitambayonk@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/caiST-A8bl8:APA91bHKm8ISmjOQagmt0TscekbOkhZfZULmqLFMtQ1KDVZKicJwVAQIglrc14tW6nTMgmkYs1z3jIQsmAvVAMdQDdkI6miVUSyiuZJd_UpiIRZxMBYPdgIWD59d8FkrZGg-psGHwvAa",
    "keys": {
        "p256dh": "BMzstaMM8IBgYa+AQNwLfWdbC6mBUWsTjaZAx9j6EyeGyi1hiRg2bknujQPhBcfWJZ+DIOo2EzM6a5NkEf5dZzU=",
        "auth": "vaUMbWJ0N3/ocOPLB82anQ=="
    }
};

var payload = 'Assalamualaikum, Yeayy! push notifikasi sudah berhasil!';

var options = {
    gcmAPIKey: '221303095740',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);