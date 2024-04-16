/*VARIABLES*/

    let dices = [];
    let numberOfDuos = 0;
    let objDuoCounter = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    };

    //BUTTON
    let button = document.querySelector("button");
    button.addEventListener('click', event => {
        event.preventDefault();
        resetDices();
    });

/*########### END OF VARIABLES ###########*/



/*FUNCTIONS*/

    //FUNCTION GET RANDOM DICES NUMBERS
    function getRandomDice() {
        let randomValue = Math.floor(Math.random() * 5) + 1;
        switch(randomValue){
            case 1: ++objDuoCounter[1];  break;
            case 2: ++objDuoCounter[2];  break;
            case 3: ++objDuoCounter[3];  break;
            case 4: ++objDuoCounter[4];  break;
            case 5: ++objDuoCounter[5];  break;
            case 6: ++objDuoCounter[6];  break;
        }
        return randomValue;
    }

    //FUNCTION NUMBER OF DUOS COUNTER
    function countDuos() {
        numberOfDuos=0;
        let resultaat = "Je hebt ";
        let typeOfWins ={ 
                dubbel: 0,
                driedubbel: 0,
                viervoudig: 0,
                vijfvoudig: 0,
                perfect: 0
        }
        
        for(nbr in objDuoCounter){
            switch(objDuoCounter[nbr]){
                case 2: ++typeOfWins.dubbel; break;
                case 3: ++typeOfWins.driedubbel; break;
                case 4: ++typeOfWins.viervoudig; break;
                case 5: ++typeOfWins.vijfvoudig; break;
                case 6: ++typeOfWins.perfect; break;
            }
        }
        let currentWins = typeOfWins.filter(
            function(value) { 
                return value>0; 
            }
        );
        for(k in currentWins){
            resultaat+="<span>"+currentWins[k]+"</span> "+k;
        }            

        let numberOfDuosDom = document.querySelector("#number_of_duos");
        numberOfDuosDom.innerHTML = resultaat;
    }

    //FUNCTION GET INFOS
    function getInfos() {
        console.log(dices);
        console.log(objDuoCounter);
    }

    //FUNCTION RESET DICES ARRAY AND DOM
    function resetDices() {

        //CLEAN DATAS FOR NEW GAME
        dices = [];
        for (key in objDuoCounter) {
            objDuoCounter[key] = 0;
        }

        //ADD RANDOM NBRS TO ARRAY
        for (let i = 0; i < 5; ++i) {
            dices.push(getRandomDice());
        }

        //REMOVE CURRENT DICES FROM DOM
        let dicesDom = document.querySelector("#stenen");
        dicesDom.innerHTML = "";

        //ADD NEW DICES IN DOM
        for (let dice of dices) {
            dicesDom.innerHTML += `
                <img src="src/img/dobbel`+ dice + `.gif" width="50px"> 
            `;
        }

        //SHOW NUMBER OF DUOS IN DOM
        countDuos();
        getInfos();    
    }

/*########### END OF FUNCTIONS ###########*/