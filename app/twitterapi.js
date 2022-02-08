
// TWITTER POST API -- werkt (nog) niet
const twitterKey = "H2htzCK39pAUJyBXPWzAgjtiV";
const twitterSecretKey = "un2BoLYu1NuV4umj8kduOlGNiMdJ1vmNPCigQGFLdIBLshJmqM";
const twitterAuthKey = "un2BoLYu1NuV4umj8kduOlGNiMdJ1vmNPCigQGFLdIBLshJmqM"; 
let tweetData = {
   "text": "hallllo"
  };

$.ajax({
    type: 'POST', // GET for engines list
    url: "https://api.twitter.com/2/tweets", // /davinci/completions
    data:  JSON.stringify(tweetData), // JSON.stringify for POST 
//    dataType: "jsonp", // datatype maakt het kapot
    // format: "json", // doet niks
    contentType: 'application/json',
    // xhrFields: {
    //    withCredentials: true
    // },
    crossDomain: true,
    headers: {
       'Authorization': 'Bearer ' + twitterAuthKey,
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Methods':'GET', 
       'Access-Control-Allow-Methods':'POST', 
       'Access-Control-Allow-Headers':'application/json',  
       'Content-Type':'application/json'
    },
    // beforeSend: function (xhr) {
    // },
    success: function (result) {
       var token = result;
       console.log("Twitter post succes");
        
    },
    //complete: function (jqXHR, textStatus) {
    //},
    error: function (req, status, error) {
        console.log("twitter error " + error);
    }
});

