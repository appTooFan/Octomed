
  let styleProgressLevel = document.createElement('style');
//start animation progress 
let levelValue= 20;
let widthLevel=0;
let level = document.querySelector('.container .proFile .rate_Data h3');
let counter = 0; //counter++ time 50m second 

const intervalID = setInterval(() => {
  counter++;
  widthLevel++
  level.textContent = counter + '%';
  styleProgressLevel.innerHTML = `
  @keyframes wave {
    0% {
     width: ${widthLevel}%;
     border-end-end-radius: 50px;
     border-top-left-radius: 3px;
    background-position: -100px 0; 
        }
        10% {
          width: ${widthLevel-1}%;
          border-end-end-radius: 4px;
          border-top-left-radius: 50px;
          background-position: 100px 0; 
        }
        20% {
          width: ${widthLevel+1}%;
          border-end-end-radius: 40px;
          border-top-left-radius: 10px;
          background-position: -100px 0;
        }
    30% {
     width: ${widthLevel-2}%;
     border-end-end-radius: 1px;
     border-top-left-radius: 40px;
     background-position: 100px 0; 
       }
       40% {
         width: ${widthLevel+3}%;
         border-end-end-radius: 60px;
         border-top-left-radius: 5px;
         background-position: -100px 0; 
       }
       50% {
         width: ${widthLevel}%;
         border-end-end-radius: 6px;
         border-top-left-radius: 60px;
         background-position: 100px 0; 
       }
       60% {
         width: ${widthLevel-2}%;
         border-end-end-radius: 0px;
         border-top-left-radius: 70px;
         background-position: -100px 0; 
       }
       70% {
         width: ${widthLevel+3}%;
         border-end-end-radius: 70px;
         border-top-left-radius: 5px;
         background-position: 100px 0; 
       }
       80% {
         width: ${widthLevel-5}%;
         border-end-end-radius: 80px;
         border-top-left-radius: 2px;
         background-position: -100px 0; 
       }
    100% {
     width: ${widthLevel}%;
     border-end-end-radius: 50px;
     border-top-left-radius: 1px;
     background-position: 100px 0; 
        }}
  `;
  
  if (counter >= levelValue) {
  clearInterval(intervalID);
  
}
}, 50);


document.body.appendChild(styleProgressLevel);


//start animation progress 


//start text rate
let rate = document.querySelector('.container .proFile .rate h1');
let txtRate = document.querySelector('.container .proFile .rate_Data h1');
if (levelValue <= 25) {
  rate.textContent='جيد';
  rate.style.color='#E74856';
  txtRate.textContent='اجتهد اكثر'
} else if (levelValue>25 && levelValue<50) {
  rate.textContent='جيد';
  rate.style.color='#DA552F';
  txtRate.textContent='لاباس تحسنت';
} else if (levelValue==50) {
  rate.textContent='احسنت';
  rate.style.color='#FF0084';
  txtRate.textContent='انت في نصف طريقك'
} else if (levelValue>50 && levelValue<75) {
 rate.textContent='جميل';
 rate.style.color='#6860F8';
 txtRate.textContent= 'ماشاء الله قربت';
} else if (levelValue==75) {
 rate.textContent='رائع';
 rate.style.color='#3498DB'
} else if (levelValue>75 && levelValue<100) {
  rate.textContent='ممتاز'; 
  rate.style.color='#0078D7';
  txtRate.textContent='قوي عزيمتك'
} else if (levelValue == 100) {
   rate.textContent='ممتاز';
   rate.style.color='#16A085';
   txtRate.textContent= 'مبروك عليك انتهيت'
}
// end text rating



