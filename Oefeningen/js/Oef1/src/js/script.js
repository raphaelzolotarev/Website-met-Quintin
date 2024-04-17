/*########### VARIABLES INIT ###########*/

let dices = [];
let numberOfDices = 5;
let highestDiceNumber = 6;
let worpen = 0;
let objDiceOccurenceCounter;
let  objStats = {
        dubbel:0,
        drievoudig:0,
        viervoudig:0,
        vijfvoudig:0
    }; 
let lastLaunch; 
let objStatsKeys = Object.keys(objStats); 

let audio = new Audio('src/media/dices.mp3');

/*########### END OF VARIABLES INIT ###########*/





/*########### DOM CONTENT ###########*/

    //DIV WITH DICES IMAGES
    let dicesDom = document.querySelector("#stenen"); 
    initializeDicesDom(false);

    //STATS
    let statsDom = document.querySelector("table"); 
    initializeStatsDom(false);

    //BUTTON
    let buttonDom = document.querySelector("button");
    buttonDom.addEventListener('click', event => {
        audio.play();
        launchDices();
        countMatch();        
        initializeDicesDom(true);
        initializeStatsDom(true);
        initializeWorpenDom(++worpen);
        initializeLastLaunchDom();
        getInfo();
    });

    //WORPEN
    let worpenDom = document.querySelector("#worpen");
    initializeWorpenDom();

    //LAST LAUNCH
    let lastLaunchDom = document.querySelector("#last-launch");

/*########### END OF DOM CONTENT ###########*/





/*########### FUNCTIONS ###########*/

    //LAUNCH DICES
    function launchDices(){

        //1. Clear first
        dices = [];

        //2. Add 6 random values
        for(let i = 0; i<numberOfDices; ++i){
            dices.push(Math.floor(Math.random() * highestDiceNumber) + 1);
        }

    }



    //INITIALIZE DICES IMAGES IN DOM
    function initializeDicesDom(dicesLaunched){
        if(!dicesLaunched){  
            //CLEAR
            dicesDom.innerHTML = "";  
            //ADD           
            for(let i = 0; i<numberOfDices; ++i){
                dicesDom.innerHTML += "<img src='src/img/dobbel"+ highestDiceNumber + ".gif'>"; 
            }
        } else{
            //CLEAR
            dicesDom.innerHTML = "";  
            //ADD        
            for(let i = 0; i<numberOfDices; ++i){
                dicesDom.innerHTML += "<img src='src/img/dobbel"+ dices[i] + ".gif'>"; 
            }
        }
    }



    //INITIALIZE STATS IN DOM
    function initializeStatsDom(dicesLaunched){
        if(!dicesLaunched){  
            //CLEAR
            statsDom.innerHTML = "";  
            //ADD           
            for(let i = 1; i<numberOfDices; ++i){
                statsDom.innerHTML += '<tr><td>Max ' + (i + 1) + ' gelijke: </td><td>0</td></tr>';
            }
        } else{
            //CLEAR
            statsDom.innerHTML = "";  
            //ADD  
            for(k in objStats){ 
                statsDom.innerHTML += '<tr><td>Max ' + (objStatsKeys.indexOf(k)+2) + ' gelijke: </td><td>'+objStats[k]+'</td></tr>';
            }
        }
    }



    //INITIALIZE STATS IN DOM
    function initializeWorpenDom(){
        worpenDom.innerHTML = worpen+" worpen";
    }



    //INITIALIZE LAST LAUNCH IN DOM
    function initializeLastLaunchDom(){
        let resultaat = "Je hebt ";
        for(k in lastLaunch){
            if(lastLaunch[k]!=0){
                resultaat += "<b style='color:red;'>"+lastLaunch[k]+"</b> <b>"+k+"</b>, ";
            }
        }
        lastLaunchDom.innerHTML = resultaat == "Je hebt " ? "Je hebt niks" : resultaat.slice(0, -2)+" gegooid";
    }



    //INITIALIZE DICES IMAGES IN DOM
    function countMatch(){
        lastLaunch = [];
        objDiceOccurenceCounter = {
            1:0,
            2:0,
            3:0,
            4:0,
            5:0,
            6:0
        };    
        lastLaunch = {
            dubbel:0,
            drievoudig:0,
            viervoudig:0,
            vijfvoudig:0
        };     
        for(let i = 0; i<dices.length; ++i){
            switch(dices[i]){
                case 1: ++objDiceOccurenceCounter[1]; break;
                case 2: ++objDiceOccurenceCounter[2]; break;
                case 3: ++objDiceOccurenceCounter[3]; break;
                case 4: ++objDiceOccurenceCounter[4]; break;
                case 5: ++objDiceOccurenceCounter[5]; break;
                case 6: ++objDiceOccurenceCounter[6]; break;
            } 
        }
        for(k in objDiceOccurenceCounter){
            switch(objDiceOccurenceCounter[k]){
                case 2: ++objStats.dubbel;         ++lastLaunch.dubbel;          break;
                case 3: ++objStats.drievoudig;     ++lastLaunch.drievoudig;      break;
                case 4: ++objStats.viervoudig;     ++lastLaunch.viervoudig;      break;
                case 5: ++objStats.vijfvoudig;     ++lastLaunch.vijfvoudig;      break;
            } 
        }

    } 



    //INFO
    function getInfo(){
        console.log(dices);
        console.log(objDiceOccurenceCounter);
        console.log(objStats);
        console.log(lastLaunch);
    }

/*########### END OF FUNCTIONS ###########*/