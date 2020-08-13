/*
* Project specific attributes were removed to prevent tampering
*/

var admin = require("firebase-admin");
const { DatabaseBuilder } = require("firebase-functions/lib/providers/firestore");
const functions = require('firebase-functions');

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
    // databaseURL: "http://localhost:9000/?..."
    databaseURL: "https://.../"
});

var eventTime;
//current time + 1 hour
var currentTime = new Date().getTime() + 3600000;
// var c = 0;

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref(""); //database reference to events node

//Event Cleaner function which runs daily at 12AM NY time
exports.eventCleaner = functions.pubsub.schedule('0 0 * * *')
.timeZone('America/New_York')
.onRun((context) => {
    //read the events node once
    ref.once("value", snapshot => {
        //get the unique event key
        snapshot.forEach((stateSnapshot) => {
            //go inside the data node
            stateSnapshot.forEach((jobSnapshot) => {


                eventTime = jobSnapshot.child("").val();

                //delete events 1 hour after their scheduled time
                if (eventTime !== null) {
                    //check if the event time has passed the current time + 1 hour
                    if (BigInt(eventTime) < currentTime) {

                        // console.log(eventTime + " is less than " + currentTime + " " + stateSnapshot.key + " c: " + c)

                        //remove the event node
                        ref.child(stateSnapshot.key).remove()
                            .then(function () {
                                // console.log("Removed")
                                return null;
                            })
                            .catch(function(error) {
                                console.log("Remove failed: " + error.message)
                              });
                    }
                    // c += 1;

                }
            });
        });

    });
    return null;
});
