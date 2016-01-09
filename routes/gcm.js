/**
 * Created by Moosa on 1/1/2016.
 */
var gcm = require("node-gcm");
var Firebase = require("firebase");
var express = require('express');
var router = express.Router();
var myFirebaseRef = new Firebase("https://pcchatapp.firebaseio.com/");
/*SEND MESSAGE*/
router.post('/sendmessage', function (req, res, next) {
    console.log(req.body.toUser);
    console.log(req.body.fromUserName);
    console.log(req.body.fromUserPic);
    console.log(req.body.msg);
    var userIdToNotify = req.body.toUser;
    var userWhoSend = req.body.fromUserName;
    var userSenderPic = req.body.fromUserPic;
    var messageBody = req.body.msg;
    var gcmKeyToSendNotificationToUser;

    var message = new gcm.Message();
    message.addData('message', messageBody);
    message.addData('title', userWhoSend);
    message.addData('pic', userSenderPic);

    var sender = new gcm.Sender('AIzaSyBtPwemSZxg9qIJeN85LHZisVxJpozX1Hg');
    //Get GCM Key to send notification
    myFirebaseRef.child("users/" + userIdToNotify + "/gcm").on("value", function (snapshot) {
        console.log(snapshot.val());
        gcmKeyToSendNotificationToUser = snapshot.val();
        //After receiving key Now Send Message
        sender.send(message, gcmKeyToSendNotificationToUser, function (err, response) {
            if (err) console.error(err);
            else    console.log(response);
        });
    });


    res.send("done");

});


router.post('/register', function (req, res, next) {
    console.log(req.body.registrationId);
    res.send("done");


});


module.exports = router;
