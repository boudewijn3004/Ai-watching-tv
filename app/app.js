

let authKey = "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"; 

//get engines 
// $.ajax({
//     type: 'GET', // GET for engines list
//     url: "https://api.openai.com/v1/engines", // /davinci/completions
//     // data:  JSON.stringify(params), // JSON.stringify for POST 
  
//     contentType: 'application/json;charset=UTF-8',
    
//     headers: {
//        'Authorization': 'Bearer ' + authKey,
//        'Access-Control-Allow-Methods':'GET', 
//        'Access-Control-Allow-Methods':'POST', 
//        'Access-Control-Allow-Headers':'application/json',  
//        'Content-Type':'application/json',
//        'Access-Control-Allow-Origin': '*'
//     },
//     // beforeSend: function (xhr) {
//     // },
//     success: function (result) {
//        let token = result;
//        console.log("resultaat: SUCCES");
//        console.log(token);
//     },
//     //complete: function (jqXHR, textStatus) {
//     //},
//     error: function (req, status, error) {
//     console.dir("??: " + error);
//     }
// });


let prompt = `Me: I have question. AI: Sure go ahead.`;

console.log(  "test"); 
let promptDiv = document.querySelector(".prompt");
let resultDiv = document.querySelector(".ai-result");
console.log(promptDiv);
promptDiv.innerHTML = "eg: " + prompt;


document.addEventListener("ready", () => {

}) 


$('.loading').hide();

let generateButton = document.querySelector("#generate-button");
let continueButton = document.querySelector("#continue-button");

let promptText;
let promptTextFormatted;

generateButton.addEventListener("click", () => {
    promptText = document.querySelector('#prompt-text');
    promptTextFormatted = promptText.value.replace(/(?:\r\n|\r|\n)/g, '<br>');
    console.log(promptTextFormatted);
    promptDiv.innerHTML = promptTextFormatted;
    console.log(promptText.value);
    $(".ai-result").html(' ');   
    generateText(promptTextFormatted);

});


continueButton.addEventListener("click", () => {
    let aiResult = $(".ai-result").html();
    // console.log(aiResult)
    // aiResult.replace(/(?:\r\n|\r|\n)/g, '<br>');
    promptDiv.innerHTML = aiResult;
    $(".ai-result").html(' ');   
    generateText(aiResult);
});




function generateText(_prompt) {
    // prompt text pakken uit textarea
    //

    _prompt = _prompt.replace(/(?:\r\n|\r|\n)/g, '');
    console.log(_prompt)
    _prompt = _prompt.replace(/<br>/g, '\n')
    console.log(_prompt)

    _prompt = _prompt.replace(/<\/?[^>]+(>|$)/g, "");
    $('.loading').fadeIn();
    let params = {
        "prompt": _prompt,
        "max_tokens": 300,
        "temperature": 0.2,
        "frequency_penalty": 2.5
      };
    

    
    $.ajax({
        type: 'POST', // GET for engines list
        url: "https://api.openai.com/v1/engines/davinci/completions", // /davinci/completions
        data:  JSON.stringify(params), // JSON.stringify for POST 
       // dataType: "jsonp", // datatype maakt het kapot
        // format: "json", // doet niks
        contentType: 'application/json;charset=UTF-8',
        // xhrFields: {
        //    withCredentials: true
        // },
        // crossDomain: true,
        headers: {
           'Authorization': 'Bearer ' + authKey,
           'Access-Control-Allow-Methods':'GET', 
           'Access-Control-Allow-Methods':'POST', 
           'Access-Control-Allow-Headers':'application/json',  
           'Content-Type':'application/json',
           'Access-Control-Allow-Origin': '*'
        },
        // beforeSend: function (xhr) {
        // },
        success: function (result) {
            $('.loading').fadeOut();
           var token = result;
           console.log("resultaat: SUCCES");
        //    console.log(token);
           let resultText = token.choices[0].text;
           resultText = resultText.replace(/(?:\r\n|\r|\n)/g, '<br>')
           resultDiv.innerHTML = resultText; 
           textToSpeech(resultText);    
        },
        //complete: function (jqXHR, textStatus) {
        //},
        error: function (req, status, error) {
        console.dir("??: " + error);
        }
    });
}

let spreek = new p5.Speech(); // speech synthesis object
spreek.setLang('en-US');
// voice speeech p5
function textToSpeech(text) {
    text = text.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g,' ');
    text = text.replace(/ʼ/g,'');
    text = text.replace(/_/g,'');
    text = text.replace(/ʺ/g,'');
    text = text.replace(/ʺ/g,'');
    text = text.replace(/『/g,'');
    text = text.replace(/Â/g,'');

    
    // text = text.replace(//g,'');

    let waiting = true;
    // spreek.listVoices();
 
    spreek.speak("I think" + text);

}
// runway


    // const path = 'https://im2txt-1048c470.hosted-models.runwayml.cloud/v1';
    // const token = "cgYbzawpk96zdislaYRq2g=="
    const path = 'http://localhost:8000/data';
    let noRunway = false;

    

    function getImageDescription() {
        $.ajax( {
            url: path,
            // method: "POST",
            // token: token,
            // body: JSON.stringify(),
            // headers: {
            //     "Accept": "application/json",
            //     "Authorization": "Bearer " + token,
            //     "Content-Type": "application/json",
            // },
            success: gotResult,
            error: gotError
            // dataType: dataType
        })
    }

    setInterval (function() {
        if (!noRunway) {
            getImageDescription()
        }   
       }, 500)
   
      
      //// You can use the info() method to see what type of input object the model expects
    //   model.info().then(info => console.log(info))
    //   model.query({ prompt }).then(result => console.log(result))

   
   

  function gotResult(result) {
    // console.log(result.caption.length)
    if ( result.caption.length > 1) {
        let strippedResult = result.caption;
        strippedResult = strippedResult.replace('.','');
        $('.image-description-one').html(strippedResult)
    }

    // $('.image-description-one').html(result.classes[0])
    // $('.image-description-two').html(result.classes[1])
    // $('.image-description-three').html(result.classes[2])

  }

  function gotError(error) {
      console.log('geen runway');
    noRunway = true;
  }
let descripties = document.querySelectorAll('.image-description')
// console.log(descripties)
descripties.forEach(descriptie => {
//    console.log(descriptie);
   descriptie.addEventListener("click", () => {
    //    alert(descriptie.innerHTML);
    let trimmedDescription = descriptie.innerHTML;
    trimmedDescription =  trimmedDescription.replace(/\s+$/, '');
    // let inputPrompt = "The AI is looking at the screen. The AI is reflecting very critically of what he sees. The AI sees something that looks like " + trimmedDescription + ". The AI thinks ";
    let inputPrompt = "I am an Artificial Intelligence. I am looking at the screen. I am reflecting very critically of what I see. I see something that looks like " + trimmedDescription + ". I think";
    generateText(inputPrompt);
    promptDiv.innerHTML = inputPrompt;

   })
})


spreek.onEnd = () => {
    setTimeout(descriptionToPrompt, 4000);
};


function descriptionToPrompt() {
    let descriptieOne = document.querySelector('.image-description-one');
    let trimmedDescription = descriptieOne.innerHTML;
    trimmedDescription =  trimmedDescription.replace(/\s+$/, '');
    console.dir(trimmedDescription.length);
    // let inputPrompt = "The AI is looking at the screen. The AI is reflecting very critically of what he sees. The AI sees something that looks like " + trimmedDescription + ". The AI thinks ";
    let inputPrompt = "I am an Artificial Intelligence. I am looking at the screen. I am reflecting very critically of what I see. I see something that looks like " + trimmedDescription + ". I think";

    if (trimmedDescription.length > 1) {
        generateText(inputPrompt);
    }
    
    promptDiv.innerHTML = inputPrompt;

}