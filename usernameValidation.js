//check if the username passed from client is contained within the usernames/ node

exports.checkUsername = functions.runWith(runtimeOpts).https.onCall((req, res) => {
    var haveUsername;
    return usernameRef.once("value").then(snapshot => {
      //iterate over N usernames
     snapshot.forEach((stateSnapshot) => {
            //the request is the object passed to this method when called
            if(String(req) === String(stateSnapshot.val())){
                haveUsername = true;
                //return a json object and parse the bool client side
                return {
                    usernameExists: haveUsername
                }
            }
            else{
                haveUsername = false
            }
        });
        //return a json object and parse the bool client side
        return {
            usernameExists: haveUsername
        }
    });
});
