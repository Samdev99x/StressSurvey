
'use strict';

function changeHeading() {
    console.log("click");

    //Alle Variablen
    let surveyContainer = document.querySelector(".survey_container");
    let dividerFlex = document.querySelector('.divider_flex');
    let h1 = document.querySelector(".survey_header");
    let dauer = document.querySelector(".dauer");
    let actionCall = document.querySelector(".action_call");
    let frage = document.querySelector(".frage");
    let btn = document.querySelector(".main");
    let form = document.createElement("form");
    let progressContainer = document.querySelector('.progressContainer');
    let questionProgress = document.querySelector('.questionProgress');

    form.className = "radio_form";

    let gesamtpunkte = 0;
    let curRadioOption = [];
    let frage_nr = 0;

    const fragen = [
      "Fühlst du dich oft gestresst?",
      "Hast Du Schwierigkeiten, Dich zu entspannen?",
      "Wie oft fühlst Du Dich überfordert?",
      "Wie oft fühlst Du Dich ruhelos oder nervös?",
      "Wie oft fühlst Du Dich reizbar oder gereizt?",
      "Wie oft hast Du das Gefühl, dass Du zu viel zu tun hast?",
      "Wie oft fühlst Du Dich müde oder ausgelaugt?",
      "Wie oft hast Du Schwierigkeiten, gut zu schlafen?",
      "Wie oft hast Du körperliche Symptome aufgrund von Stress, wie z.B. Kopfschmerzen oder Bauchschmerzen?",
      "Wie oft fühlst Du Dich glücklich und zufrieden?",
    ];
    const resultat_low = ['Du bist ein entspannter Mensch mit einem geringen Stressniveau. Es scheint, dass Du Deine Verantwortlichkeiten gut bewältigen kannst, ohne Dich dabei zu überfordern.', 'Deine Punktzahl weist darauf hin, dass Du selten unter Stress leidest und gute Bewältigungsstrategien hast, um mit Herausforderungen umzugehen.', 'Deine Punktzahl zeigt, dass Du ein entspannter Mensch bist, der sich in der Regel nicht von Stress überwältigen lässt.'];
    const resultat_medium = ['Deine Punktzahl weist darauf hin, dass Du manchmal unter Stress leidest und möglicherweise Schwierigkeiten hast, mit bestimmten Herausforderungen umzugehen.', 'Du hast ein mittleres Stressniveau, was darauf hindeutet, dass Du einige Bereiche in Deinem Leben identifizieren kannst, die Du verbessern könntest, um Deinen Stress zu reduzieren.', 'Deine Punktzahl zeigt, dass Du manchmal gestresst bist, aber auch in der Lage bist, Dich zu entspannen und Strategien anzuwenden, um mit stressigen Situationen umzugehen.'];
    const resultat_high = ['Deine Punktzahl weist darauf hin, dass Du oft unter Stress leidest und dass Dein Stressniveau möglicherweise Dein Wohlbefinden beeinträchtigt.', 'Du hast ein hohes Stressniveau, was darauf hindeutet, dass Du möglicherweise Schwierigkeiten hast, Dich zu entspannen und Deinen Stress zu bewältigen.', 'Du bist oft gestresst und es ist möglicherweise notwendig , deine Lebensumstände und deine Einstellung zu ändern, um deinen Stress zu reduzieren.'];
    const resultat_really_high = ['Deine Punktzahl weist darauf hin, dass Du oft unter Stress leidest und dass Dein Stressniveau möglicherweise Dein Wohlbefinden beeinträchtigt.', 'Du hast ein hohes Stressniveau, was darauf hindeutet, dass Du möglicherweise Schwierigkeiten hast, Dich zu entspannen und Deinen Stress zu bewältigen.', 'Deine Punktzahl zeigt, dass Du oft gestresst bist und dass es möglicherweise notwendig ist, Deine Lebensumstände und Deine Einstellung zu ändern, um Deinen Stress zu reduzieren.'];

    //Klassen hinzufügen
    frage.className = "frage";

    //Ausführung
    clearCard(dauer, dividerFlex, actionCall, btn);
    frage_nr = frageEinfuegen(frage_nr, fragen, surveyContainer, h1, frage);
    form = form_generieren(form);
    surveyContainer.appendChild(form);
    console.log(frage_nr);

    //Funktionen-Zoo
    function clearCard(dauer, dividerFlex, actionCall, btn) {
      if (dauer && dauer.parentNode) {
        dauer.parentNode.removeChild(dauer);
      }

      if (dividerFlex && dividerFlex.parentNode) {
        dividerFlex.style.display = "none";
      }

      if (actionCall && actionCall.parentNode) {
        actionCall.parentNode.removeChild(actionCall);
      }

      if (btn && btn.parentNode) {
        btn.parentNode.removeChild(btn);
      }
    }

    function frageEinfuegen(frage_nr, fragen, surveyContainer, h1, frage) {
      console.log(frage_nr);

      if (frage_nr === 10) {
        showResults();
      } else {
        frage.innerText = fragen[frage_nr];
        frage_nr += 1;

        h1.innerText = `Frage ${frage_nr}`;
        h1.style.fontSize = "0px";
        return frage_nr;
      }
    }

    function letzteFrageEinfuegen(
      frage_nr,
      fragen,
      surveyContainer,
      h1,
      frage
    ) {
      if (frage_nr === 10) {
        clearQuestions(h1, frage);
      } else {
        frage_nr -= 1;

        frage_nr -= 1;
        frage.innerText = fragen[frage_nr];

        return (frage_nr += 1);
      }
    }

    function form_generieren(form) {
      const options = ["oft", "manchmal", "selten"];

      for (let i = 0; i < options.length; i++) {
        // Container für Radio-Button und Label erstellen
        let container = document.createElement("div");
        container.className = "radioContainer";
        container.style.display = "flex";
        container.style.marginLeft = "45px";
        container.style.alignItems = "center";

        //Radio-Button erstellen
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "option";
        radio.value = options[i];
        radio.id = "radio" + (i + 1);
        console.log(radio.id);

        // Label für den Radio-Button erstellen
        let label = document.createElement("label");
        label.htmlFor = "radio" + (i + 1);
        label.textContent = options[i];
        label.className = "optionLabel";

        // Radio-Button und Label zum Container hinzufügen
        container.appendChild(radio);
        container.appendChild(label);

        form.appendChild(container);
      }

      //Progress
      let progressBarContainer = document.createElement('div');
      progressBarContainer.className = 'pbContainer';

      let progressBar = document.createElement('div');
      progressBar.className = 'pb';
      progressBarContainer.appendChild(progressBar);

      progressContainer.appendChild(progressBarContainer);
      

      //Error_Message erstellen
      let errMessage = document.createElement('p');
      errMessage.className = 'errMessage';
      errMessage.textContent = "Wähle zuerst eine Antwort aus!";
      form.appendChild(errMessage);
      

      //Button & Container erstellen
      questionProgress.innerText = 'Frage 1/10';

      let nextButton = document.createElement("button");
      nextButton.classList.add('nextButton', 'btn');
      nextButton.innerHTML = "Nächste Frage";
      nextButton.type = "submit";
      nextButton.addEventListener("click", handleNextButttonClick);

      let previousButton = document.createElement("button");
      previousButton.classList.add('previousButton', 'btn');
      previousButton.innerHTML = "&#x2190;";
      previousButton.type = "submit";
      previousButton.addEventListener("click", handlePreviousButtonClick);

      form.appendChild(nextButton);
      form.appendChild(previousButton);

      return form;
    }

    

    function aktualisierePunkte9(option) {
      switch (option) {
        case "oft":
          gesamtpunkte += 0;
          curRadioOption.push(2);
        break;

        case "manchmal":
          gesamtpunkte += 1;
          curRadioOption.push(1);
        break;

        case "selten":
          gesamtpunkte += 2;
          curRadioOption.push(0);
        break;

        default:
          console.log(gesamtpunkte);
        break;
      }
    }

    function aktualisierePunkte(option) {
      switch (option) {
        case "oft":
          gesamtpunkte += 2;
          curRadioOption.push(2);
        break;

        case "manchmal":
          gesamtpunkte += 1;
          curRadioOption.push(1);
        break;

        case "selten":
          gesamtpunkte += 0;
          curRadioOption.push(0);
        break;

        default:
          console.log(gesamtpunkte);
        break;
      }
    }



    function handleNextButttonClick(event) {
      event.preventDefault();

      const radioButtons = document.querySelectorAll('input[name="option"]');
      let checkCounter = 0;
      for (const radioButton of radioButtons) {
        
        if (!radioButton.checked){
          checkCounter += 1;
          console.log(checkCounter);

          if (checkCounter > 2){
            errorMessage();
          }
        }
        if (radioButton.checked) {
          let progressBar = document.querySelector('.pb');
          questionProgress.innerText=`Frage ${frage_nr + 1}/10`;
          let progress = (frage_nr * 10) + 10;
          progressBar.style.width = `${progress}%`;  

          let ausgewaehlteOption;
          let errMessage = document.querySelector('.errMessage');

          errMessage.style.display = 'none';
          ausgewaehlteOption = radioButton.value;
          radioButton.checked = false;

          if(frage_nr == 9){
            aktualisierePunkte9(ausgewaehlteOption);
          }
          else{
            aktualisierePunkte(ausgewaehlteOption);
          }

          frage_nr = frageEinfuegen(frage_nr, fragen, surveyContainer, h1, frage);
          break;
        }
      }
      
      
    }

    function handlePreviousButtonClick(event) {
      event.preventDefault();
      console.log(frage_nr);

      console.log(`${gesamtpunkte} Array: ${curRadioOption}`);
      gesamtpunkte -= curRadioOption[curRadioOption.length - 1];
      curRadioOption.pop();
      console.log(`${gesamtpunkte} Array: ${curRadioOption}`);

      let progressBar = document.querySelector('.pb');
      questionProgress.innerText=`Frage ${frage_nr - 1}/10`;
      let progress = (frage_nr * 10) - 10;
      progressBar.style.width = `${progress}%`; 

      if (frage_nr >= 2) {
        frage_nr = letzteFrageEinfuegen(
          frage_nr,
          fragen,
          surveyContainer,
          h1,
          frage
        );
        console.log(`Nächste Fragen`);
      } else {
        location.reload();
        /*clearQuestions(h1, frage);
        loadStartScreen(h1);
        console.log("Du bist bei der ersten Frage!"); */
      }
    }

    function clearQuestions() {
      if (frage && frage.parentNode) {
        frage.parentNode.removeChild(frage);
      }

      let radio_form = document.querySelector(".radio_form");

      if (radio_form && radio_form.parentNode) {
        radio_form.parentNode.removeChild(radio_form);
      }

      if (progressContainer && progressContainer.parentNode) {
        progressContainer.parentNode.removeChild(progressContainer);
      }


    }

    function showResults() {
      h1.innerText = "Dein Resultat";
      h1.style.fontSize = "30px";
      //dividerFlex.style.display = "flex";
      //dividerFlex.style.marginBottom = "45px";
      clearQuestions();

      let resultat = document.createElement('p');
      resultat.innerHTML= `Du hast <b>${gesamtpunkte} von 20 Punkten</b> erzielt`;
      surveyContainer.appendChild(resultat);
      stressKategorieDefinieren();
      erfahreMehrEinfügen();
      
    }

    function errorMessage(){
        let errMessage = document.querySelector('.errMessage');
        let btnContainer = document.querySelector('.btnContainer');
      
        errMessage.style.display = 'block';
        btnContainer.style.marginTop  = '0';
    }

    function stressKategorieDefinieren(){
        let stressNiveau = document.createElement('p');
        stressNiveau.classList = 'stress_niveau';

        surveyContainer.appendChild(stressNiveau);
        
        let points = gesamtpunkte;
        console.log(`Points: ${points}`);
       if (points >= 0  && points <= 5){
        stressNiveau.innerText = 'geringes Stressniveau';
        resultatEinfuegen(resultat_low);
       }
       else if (points >= 6 && points <= 10){
        stressNiveau.innerText ='Mittleres Stressniveau';
        resultatEinfuegen(resultat_medium);
       }
       else if (points >= 11  && points <= 15){
        stressNiveau.innerText ='Hohes Stressniveau';
        resultatEinfuegen(resultat_high);
       }
       else if (points >= 16 && points <= 20){
        stressNiveau.innerText = 'Sehr Hohes Stressniveau';
        resultatEinfuegen(resultat_really_high);
       }

       
    }

    function resultatEinfuegen(resultat){
        let ul = document.createElement('ul');
        for (let i = 0; i < resultat.length; i++){
            let li = document.createElement('li');
            li.className = "re"
            li.innerText = `${resultat[i]}`;
            ul.appendChild(li);
        }
        surveyContainer.appendChild(ul);
    }

    function erfahreMehrEinfügen(){
      let em_container = document.createElement('div');
      em_container.className = 'em_container';

      let em_header = document.createElement('h2');
      em_header.textContent = 'Erhalte einen detailierten Bericht über deinen Stresstypen';
      em_container.appendChild(em_header);

      let em_paragraph = document.createElement('p');
      em_paragraph.textContent = 'Damit gewinnst du mehr Klarheit über deinen Stresstypen. Ausserdem schicken wir dir wöchentlich hilfreiche Tipps & Tricks über deinem Stresstypen zu.';
      em_container.appendChild(em_paragraph);

      formEinfuegen(em_paragraph);

      surveyContainer.insertAdjacentElement('beforeend', em_container);

      let meineForm = document.getElementById('meine-form');

      meineForm.addEventListener('submit', function(e){

        e.preventDefault();
        insertStop(meineForm);
      });
    }

    function formEinfuegen(em_paragraph){
      let pseudoFormContainer = document.createElement('div');
      let pseudoFormHtml = '<form id="meine-form">' +
      '<label for="name" class="smallAbstand">Name:</label>' +
      '<input type="text" id="name" name="name">' +
      '<label for="email" class="formAbstand smallAbstand">Email:</label>' +
      '<input type="email" id="email" name="email">' +
      '<input type="submit" class="nextButton formButton" value="Bericht Erhalten">' +
      '</form>';
      pseudoFormContainer.innerHTML = pseudoFormHtml;

      em_paragraph.appendChild(pseudoFormContainer);

    }

    function insertStop(f){

      if (!document.querySelector('.formstop')) {

        let formstop = document.createElement('p');
        formstop.className = 'formstop';
        formstop.textContent = 'Dies ist nur ein Testquiz. Wir nehmen deine Daten nicht entgegen!';
        f.insertAdjacentElement('beforeEnd', formstop);

      }
    };

    
  }

    
