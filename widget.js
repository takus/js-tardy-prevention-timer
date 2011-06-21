
var time = getNode('time');
var timer = getNode('timer');
var timerHour = getNode('timerHour');
var timerMinute = getNode('timerMinute');
var under1 = getNode('under1');
var under2 = getNode('under2');
var enterFunc1 = getNode('enterFunc1');
var enterFunc2 = getNode('enterFunc2');
var enter = getNode('enter');
var editbg = getNode('editbg');
var back = getNode('back');
var Apart = getNode('Apart');
var until = getNode('until');
var blinktext = getNode('blinktext');

cash = new Date();
cursolmode = 1;
editmode = 0;
blinkflag = 0;

function Reset(){
    changeMode();
    setVisible(timerHour, 1);
    setVisible(timerMinute, 1);
    setVisible(time, 1);
    setVisible(Apart, 1);
    setVisible(until, 1);
    setVisible(timer, 0);
    setVisible(enterFunc2, 0);
    setVisible(enterFunc1, 1);
    setVisible(under1, 0);
    setVisible(under2, 0);
    setVisible(enter, 0);
    setVisible(enterFunc1, 0);
    destroyImage(editbg);
    loadImage(back, 'back.png');
}

function onLoad() {
    cash.setHours(8);
    cash.setMinutes(0);
    cash.setSeconds(0);
    chh = cash.getHours();
    cmm = cash.getMinutes();
    css = cash.getSeconds();
    if(getRegistry("Item1") != ""){
        chh = parseInt(getRegistry("Item1"));
        cmm = parseInt(getRegistry("Item2"));
        cash.setHours(chh);
        cash.setMinutes(cmm);
        cash.setSeconds(0);
        css = 0;
    }
    setVisible(enterFunc1, 0);
    setVisible(enterFunc2, 0);
    setVisible(timer, 0);
    setVisible(under1, 0);
    setVisible(under2, 0);
    setVisible(blinktext, 0);
    setInterval(printTime, 1000);
    setInterval(checkTime, 1000);
}

function checkTime(){
    date = new Date();
    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();
    if(h==chh && m==cmm && s==css){
          destroyImage(back)
          var end = getNode('end');
          loadImage(end, 'end.png');
          clearInterval(printTime);
          clearInterval(checkTime);
          setInterval(blink, 1000);
    }
}

function blink(){
   if(blinkflag==0){
       blinkflag=1;
       setVisible(blinktext, 1);
   }
   else{
       blinkflag=0;
       setVisible(blinktext, 0);
   }
}

function printTime() {
    now = new Date();

    time3 = cash.getSeconds() - now.getSeconds();
    time2 = cash.getMinutes() - now.getMinutes();
    time1 = cash.getHours() - now.getHours();
    if(time3<0){
	time3 = 60+time3;
        time2--;
    }
    if(time2<0){
	time2 = 60+time2;
        time1--;
    }
    if(time1<0)
	time1 = 24+time1;

    hh = addZero(time1);
    mm = addZero(time2);
    ss = addZero(time3);
    thour = addZero(chh);
    tmin = addZero(cmm);
    tsec = addZero(css);

    setStr(time, hh + ":" + mm + ":" + ss);
    setStr(timerHour, thour);
    setStr(timerMinute, tmin);
    setStr(timer, thour + ":" + tmin);
}

function addZero(val){
	if (val < 10) { val = "0" + val; }
	return val;
}

function timePlus(){
    if(cursolmode==1){
    	cmm++;
    	if(cmm == 60){ cmm = 0; }
    }
    else if(cursolmode==2){
    	chh++;
    	if(chh == 24){ chh = 0; }
    }
    printTime();
}

function timeMinus(){
    if(cursolmode==1){
    	cmm--;
    	if(cmm == -1){ cmm = 59; }
    }
    if(cursolmode==2){
    	chh--;
    	if(chh == -1){ chh = 23; }
    }
    printTime();
}

function changeDigit(){
    if(cursolmode==1){
        cursolmode = 2;
        setVisible(under2, 0);
        setVisible(under1, 1);
    }
    else{
        cursolmode = 1;
        setVisible(under1, 0);
        setVisible(under2, 1);
    }
}

function changeMode() {
    if(editmode==0){
	editmode = 1;
    }
    else{
	editmode = 0;
    }
}

function goEdit(){
   changeMode();
   setVisible(timerHour, 0);
   setVisible(timerMinute, 0);
   setVisible(time, 0);
   setVisible(Apart, 0);
   setVisible(until, 0);
   setVisible(timer, 1);
   setVisible(enterFunc1, 0);
   setVisible(enterFunc2, 1);
   setVisible(under2, 1);
   loadImage(editbg, 'editbg.png');
}

function onFocus() {
   loadImage(enter, 'ok.png');
   setVisible(enterFunc1, 1);
}

function onUnfocus() {
   destroyImage(enter);
   setVisible(enterFunc1, 0);
}

function onActivate(){
    goEdit();
}

function onConfirmKey(){
    if(editmode==1){
        setRegistry("Item1", String(chh));
        cash.setHours(chh);
        setRegistry("Item2", String(cmm));
        cash.setMinutes(cmm);
        Reset();
        printTime();
    }
}

function onUpKey() {
    if(editmode==1)
        timePlus();
}

function onDownKey() {
    if(editmode==1)
        timeMinus();
}

function onRightKey() {
    if(editmode==1)
        changeDigit();
}

function onLeftKey() {
    if(editmode==1)
        changeDigit();
}
