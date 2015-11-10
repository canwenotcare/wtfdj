var ac = new window.AudioContext();
var oc = new OfflineAudioContext(2,44100,44100);
var ad = ac.createGain(); ad.gain.value = 1; ad.connect(ac.destination);
var list = ["Please select a directory..."];
var listselect = 0;
var listentries = [];
var scroll = 0;
var masterpulse = 0;
var pulseinterval;
var masterbpm = 130;
var masterkey = 65;
var latency = 0.0001;
var loader = new Worker('loader.js');

function tapedeck(){
  this.entry = null;
  this.buffer = null;
  this.name = "Nothing loaded.";
  this.gain = 1;
  this.play = false;
  this.bpm = 130;
  this.key = 65;
  this.seek = 0;
  this.pulse = 0;
  this.duration = 10;
}
var adeck = new tapedeck();
var bdeck = new tapedeck();
var cdeck = new tapedeck();
var ddeck = new tapedeck();

function playstep(deck){
  if(deck.play){
    var step=ac.createBufferSource();step.buffer=deck.buffer;
    step.playbackRate.value=Math.pow(2,(masterkey-deck.key)/12);
    var gain=ac.createGain();step.connect(gain);gain.connect(ad);
    var target=ac.currentTime + latency;
    gain.gain.setValueAtTime(0.00001,target);
    gain.gain.linearRampToValueAtTime(deck.gain,target+(15/masterbpm));
    gain.gain.linearRampToValueAtTime(0.00001,target+(30/masterbpm));
    step.start(target,deck.seek,30/masterbpm);
    if(deck.pulse==masterpulse){
      deck.seek+=15/deck.bpm;
      deck.pulse+=1;}
    if(deck.pulse>3)deck.pulse=0;
    if(deck.seek >= deck.duration) deck.play = false;
  }
}
function pulse(){
    window.clearTimeout(pulseinterval);
    masterpulse+=1;
    if(masterpulse>3)masterpulse=0;
    pulseinterval = window.setTimeout(pulse,15000/masterbpm);
    playstep(adeck);
    playstep(bdeck);
    playstep(cdeck);
    playstep(ddeck);
}


function preload(deck,entry){
  deck.entry = entry;
  deck.name = "loading...";
  deck.play = false;
  deck.bpm = 130;
  deck.key = 65;
  deck.seek = 0;
  deck.pulse = 0;
  entry.file(function(file){
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = function(){
      var audiodata = reader.result;
      oc.decodeAudioData(audiodata,function(buffer){
        deck.buffer = buffer;
        deck.name = entry.name;
        deck.duration = buffer.duration;
      });
    };
  });
}
loader.addEventListener('message',function(e){
  
},false);

function queue(deck,seekratio){
  deck.seek=deck.duration * seekratio;
  deck.seek -= deck.seek % (60/deck.bpm);
  deck.pulse = 0;
}

function playpause(deck){
  if(deck.buffer){
    if(deck.play){
      deck.play=false;
      deck.seek -= deck.seek % (60/deck.bpm);
      deck.pulse = 0;
    }
    else{
      if(deck.seek < deck.duration)
        deck.play=true;
      else{
        deck.seek=0;deck.play=true;
        deck.pulse = 0;
      }
    }
  }
}

var down = false;
var grab = false; var grabx = 0; var graby = 0;

var height=500; var width=500;
var hstep=10;   var wstep=10;

var vc = document.getElementById('canvas').getContext('2d'); vc.lineWidth=1;

function choose(){
  chrome.fileSystem.chooseEntry({type:"openDirectory"},function(entry){
    var reader = entry.createReader();
    var entries = [];
    function readEntries(){
      reader.readEntries(function(results){
        if(results.length){
          entries = entries.concat(Array.prototype.slice.call(results || [], 0));
          readEntries();
        } 
        else {
          entries = entries.sort(function(a,b){
            return (a.name >= b.name);
          });
          list = [];
          listentries = [];
          entries.forEach(function(entry, i){
            if(!(entry.isDirectory)){
              if(entry.name.endsWith('.mp3')){
                list.push(entry.name);
                listentries.push(entry);
              }
            }
          });
        }
      });
    }
    readEntries();
  });
}

function fill(r,g,b){vc.fillStyle='rgb('+r+','+g+','+b+')';}
function stroke(r,g,b){vc.strokeStyle='rgb('+r+','+g+','+b+')';}
function color(r,g,b){fill(r,g,b);stroke(r,g,b);}
function setfont(mult){vc.font=''+Math.floor(hstep*mult)+'px mono bold';}
function resize(){
  width=window.innerWidth; height=window.innerHeight;
  canvas.width=width; canvas.height=height;
  wstep=width/50; hstep=height/50;
}
function triangle(hoffset){
  vc.beginPath();
  vc.moveTo(width/3+wstep*3,hoffset+hstep*2);
  vc.lineTo(width/3+wstep*5,hoffset+hstep*3);
  vc.lineTo(width/3+wstep*3,hoffset+hstep*4);vc.closePath();vc.fill();
}
function mltriangle(hoffset){
  vc.beginPath();
  vc.moveTo(width/6-wstep*4,hoffset+hstep*1);
  vc.lineTo(width/6-wstep*6,hoffset+hstep*3);
  vc.lineTo(width/6-wstep*4,hoffset+hstep*5);vc.closePath();vc.fill();
}
function mrtriangle(hoffset){
  vc.beginPath();
  vc.moveTo(width/6+wstep*4,hoffset+hstep*1);
  vc.lineTo(width/6+wstep*6,hoffset+hstep*3);
  vc.lineTo(width/6+wstep*4,hoffset+hstep*5);vc.closePath();vc.fill();
}
function ltriangle(woffset,hoffset){
  vc.beginPath();
  vc.moveTo(woffset+wstep,hoffset+hstep);
  vc.lineTo(woffset,hoffset+hstep*3/2);
  vc.lineTo(woffset+wstep,hoffset+hstep*2);vc.closePath();vc.fill();
}
function rtriangle(woffset,hoffset){
  vc.beginPath();
  vc.moveTo(woffset,hoffset+hstep);
  vc.lineTo(woffset+wstep,hoffset+hstep*3/2);
  vc.lineTo(woffset,hoffset+hstep*2);vc.closePath();vc.fill();
}
function twobars(hoffset){
  vc.fillRect(width/3+wstep*3,hoffset+hstep*2,wstep,hstep*2);
  vc.fillRect(width/3+wstep*5,hoffset+hstep*2,wstep,hstep*2);
}
function draw(){
  requestAnimationFrame(draw);
  color(0,0,0);vc.fillRect(0,0,width,height);
  for(var listx= scroll;listx< scroll + 32;listx++){
    setfont(0.8);
    if(list[listx]){
      switch(listx % 4){
        case 0:color(128,128,255);break;
        case 1:color(0,255,255);break;
        case 2:color(0,255,0);break;
        case 3:color(255,255,0);break;
      }
      if(listx==listselect)color(255,255,255);
      vc.fillRect(0,listx*hstep,width/3,hstep);
      color(0,0,0);
      vc.fillText(list[listx],wstep*0.8,(listx + 0.8)*hstep);
    }
  }
  setfont(1.6);
  color(128,128,255);
  vc.fillRect(width/3,height*(1/8),width*(2/3),height*(1/8));
  vc.fillRect(width/3,height*(1/16),width*(2/3),height*(1/256));
  color(192,192,255);
  vc.fillRect(width/3,height*(1/8),width*(1/6),height*(1/8));
  vc.fillRect(width*(7/8),height*(1/8),width*(1/8),height*(1/8));
  color(0,255,255);
  vc.fillRect(width/3,height*(3/8),width*(2/3),height*(1/8));
  vc.fillRect(width/3,height*(5/16),width*(2/3),height*(1/256));
  color(192,255,255);
  vc.fillRect(width/3,height*(3/8),width*(1/6),height*(1/8));
  vc.fillRect(width*7/8,height*(3/8),width*(1/8),height*(1/8));
  color(0,255,0);
  vc.fillRect(width/3,height*(5/8),width*(2/3),height*(1/8));
  vc.fillRect(width/3,height*(9/16),width*(2/3),height*(1/256));
  color(128,255,128);
  vc.fillRect(width/3,height*(5/8),width*(1/6),height*(1/8));
  vc.fillRect(width*7/8,height*(5/8),width*(1/8),height*(1/8));
  color(255,255,0);
  vc.fillRect(width/3,height*(7/8),width*(2/3),height*(1/8));
  vc.fillRect(width/3,height*(13/16),width*(2/3),height*(1/256));
  color(255,255,192);
  vc.fillRect(width/3,height*(7/8),width*(1/6),height*(1/8));
  vc.fillRect(width*7/8,height*(7/8),width*(1/8),height*(1/8));
  color(0,0,0);
  if(adeck.play)twobars(height*(1/8));else triangle(height*(1/8));
  if(bdeck.play)twobars(height*(3/8));else triangle(height*(3/8));
  if(cdeck.play)twobars(height*(5/8));else triangle(height*(5/8));
  if(ddeck.play)twobars(height*(7/8));else triangle(height*(7/8));
  vc.fillText(adeck.name,width/2+wstep,height*(1/8)+hstep*2);
  vc.fillText(bdeck.name,width/2+wstep,height*(3/8)+hstep*2);
  vc.fillText(cdeck.name,width/2+wstep,height*(5/8)+hstep*2);
  vc.fillText(ddeck.name,width/2+wstep,height*(7/8)+hstep*2);
  vc.fillText(adeck.bpm,width*7/8+wstep*2,height*(1/8)+hstep*2);
  vc.fillText(bdeck.bpm,width*7/8+wstep*2,height*(3/8)+hstep*2);
  vc.fillText(cdeck.bpm,width*7/8+wstep*2,height*(5/8)+hstep*2);
  vc.fillText(ddeck.bpm,width*7/8+wstep*2,height*(7/8)+hstep*2);
  vc.fillText(adeck.key,width*7/8+wstep*2,height*(1/8)+hstep*5);
  vc.fillText(bdeck.key,width*7/8+wstep*2,height*(3/8)+hstep*5);
  vc.fillText(cdeck.key,width*7/8+wstep*2,height*(5/8)+hstep*5);
  vc.fillText(ddeck.key,width*7/8+wstep*2,height*(7/8)+hstep*5);
  ltriangle(width*(7/8)+wstep/2,height*(1/8));rtriangle(width*(15/16)+wstep,height*(1/8));
  ltriangle(width*(7/8)+wstep/2,height*(3/16));rtriangle(width*(15/16)+wstep,height*(3/16));
  ltriangle(width*(7/8)+wstep/2,height*(3/8));rtriangle(width*(15/16)+wstep,height*(3/8));
  ltriangle(width*(7/8)+wstep/2,height*(7/16));rtriangle(width*(15/16)+wstep,height*(7/16));
  ltriangle(width*(7/8)+wstep/2,height*(5/8));rtriangle(width*(15/16)+wstep,height*(5/8));
  ltriangle(width*(7/8)+wstep/2,height*(11/16));rtriangle(width*(15/16)+wstep,height*(11/16));
  ltriangle(width*(7/8)+wstep/2,height*(7/8));rtriangle(width*(15/16)+wstep,height*(7/8));
  ltriangle(width*(7/8)+wstep/2,height*(15/16));rtriangle(width*(15/16)+wstep,height*(15/16));
  color(255,255,255);
  vc.fillRect(width/3+(adeck.seek/adeck.duration)*(width*(2/3)),0,width/256,height/8);
  vc.fillRect(width/3+(bdeck.seek/bdeck.duration)*(width*(2/3)),height/4,width/256,height/8);
  vc.fillRect(width/3+(cdeck.seek/cdeck.duration)*(width*(2/3)),height/2,width/256,height/8);
  vc.fillRect(width/3+(ddeck.seek/ddeck.duration)*(width*(2/3)),height*(3/4),width/256,height/8);
  color(255,masterpulse*64,masterpulse*64);
  vc.fillRect(0,height*2/3,width/3,height/3);
  color(0,0,0);
  setfont(4);
  mrtriangle(height*2/3+hstep*1);mltriangle(height*2/3+hstep*1);
  mrtriangle(height*2/3+hstep*9);mltriangle(height*2/3+hstep*9);
  vc.fillText(masterbpm,width/6-wstep*2.5,height*2/3+hstep*4.5);
  vc.fillText(masterkey,width/6-wstep*2.5,height*2/3+hstep*12.5);
  vc.fillRect(width/2,height*3/16,adeck.gain*width*3/8,height*1/16);
  vc.fillRect(width/2,height*7/16,bdeck.gain*width*3/8,height*1/16);
  vc.fillRect(width/2,height*11/16,cdeck.gain*width*3/8,height*1/16);
  vc.fillRect(width/2,height*15/16,ddeck.gain*width*3/8,height*1/16);
  if(grab){
    setfont(0.8);
    color(255,255,255);vc.fillRect(grabx,graby,width/3,hstep);
    color(0,0,0);vc.fillText(grab.name,grabx+wstep,graby+hstep*0.8);
  }
}

function mouse(event){
  if(down){
    if(grab){
      grabx=event.clientX; graby=event.clientY;
    }
  }
  else {
    if(event.clientX < width / 3){
      listselect = scroll + Math.floor(event.clientY / hstep);
    }
  }
}
function mousedown(event){
  down=true;
  if(event.clientX < width / 3){
    if(event.clientY < height * 2/3){
      if(list[listselect]){
        grab=listentries[listselect];
      }
    }
    else{
      if(event.clientY < height*5/6){
        if(event.clientX < width*1/6){
          masterbpm--;if(masterbpm<30)masterbpm=30;
        }
        else{
          masterbpm++;if(masterbpm>200)masterbpm=200;
        }
      }
      else{
        if(event.clientX < width*1/6){
          masterkey--;if(masterkey<15)masterkey=15;
        }
        else{
          masterkey++;if(masterkey>100)masterkey=100;
        }
      }
    }
    
  }
  else {
    seekratio = (event.clientX - (width/3)) / (width*(2/3));
    if(seekratio < 1/32)seekratio=0;
    if(event.clientY < height/8){
      queue(adeck,seekratio);
    }
    else if(event.clientY < height/4){
      if(event.clientX<width/2){
        playpause(adeck);
      }
      else if(event.clientX < width*7/8){
        if(event.clientY > height*3/16){
          adeck.gain = (event.clientX - width/2) / (width*3/8);
        }
      }
      else{
        if(event.clientY<height*3/16){
          if(event.clientX>width*15/16){
            adeck.bpm++;
            if(adeck.bpm>200)adeck.bpm=200;
          }
          else{
            adeck.bpm--;
            if(adeck.bpm<30)adeck.bpm=30;
          }
        }
        else{
          if(event.clientX>width*15/16){
            adeck.key++;
            if(adeck.key>100)adeck.key=100;
          }
          else{
            adeck.key--;
            if(adeck.key<15)adeck.key=15;
          }
        }
      }
    }
    else if(event.clientY < height *(3/8)){
      queue(bdeck,seekratio);
    }else if(event.clientY < height / 2){
      if(event.clientX<width/2){
        playpause(bdeck);
      }
      else if(event.clientX < width*7/8){
        if(event.clientY > height*7/16){
          bdeck.gain = (event.clientX - width/2) / (width*3/8);
        }
      }
      else{
        if(event.clientY<height*7/16){
          if(event.clientX>width*15/16){
            bdeck.bpm++;
            if(bdeck.bpm>200)bdeck.bpm=200;
          }
          else{
            bdeck.bpm--;
            if(bdeck.bpm<30)bdeck.bpm=30;
          }
        }
        else{
          if(event.clientX>width*15/16){
            bdeck.key++;
            if(bdeck.key>100)bdeck.key=100;
          }
          else{
            bdeck.key--;
            if(bdeck.key<15)bdeck.key=15;
          }
        }
      }
    }
    else if(event.clientY < height * (5/8)){
      queue(cdeck,seekratio);
    }else if(event.clientY < height * (3/4)){
      if(event.clientX<width/2){
        playpause(cdeck);
      }else if(event.clientX < width*7/8){
        if(event.clientY > height*11/16){
          cdeck.gain = (event.clientX - width/2) / (width*3/8);
        }
      }
      else{
        if(event.clientY<height*11/16){
          if(event.clientX>width*15/16){
            cdeck.bpm++;
            if(cdeck.bpm>200)cdeck.bpm=200;
          }
          else{
            cdeck.bpm--;
            if(cdeck.bpm<30)cdeck.bpm=30;
          }
        }
        else{
          if(event.clientX>width*15/16){
            cdeck.key++;
            if(cdeck.key>100)cdeck.key=100;
          }
          else{
            cdeck.key--;
            if(cdeck.key<15)cdeck.key=15;
          }
        }
      }
    }
    else if(event.clientY < height * (7/8)){
      queue(ddeck,seekratio);
    }
    else {
      if(event.clientX<width/2){
        playpause(ddeck);
      }else if(event.clientX < width*7/8){
        if(event.clientY > height*15/16){
          ddeck.gain = (event.clientX - width/2) / (width*3/8);
        }
      }
      else{
        if(event.clientY<height*15/16){
          if(event.clientX>width*15/16){
            ddeck.bpm++;
            if(ddeck.bpm>200)ddeck.bpm=200;
          }
          else{
            ddeck.bpm--;
            if(ddeck.bpm<30)ddeck.bpm=30;
          }
        }
        else{
          if(event.clientX>width*15/16){
            ddeck.key++;
            if(ddeck.key>100)ddeck.key=100;
          }
          else{
            ddeck.key--;
            if(ddeck.key<15)ddeck.key=15;
          }
        }
      }
    }
  }
}
function mouseup(event){
  down=false;
  if(grab){
    if(event.clientX > width / 3){
      if(event.clientY < height/4){
        preload(adeck,grab);
      }
      else if(event.clientY < height/2){
        preload(bdeck,grab);
      }
      else if(event.clientY < height * 0.75){
        preload(cdeck,grab);
      }
      else {
        preload(ddeck,grab);
      }
    }
    grab=false;
  }
}

window.onload = function() {
  resize();draw();choose();
  window.addEventListener("resize",resize);
  window.addEventListener("mousemove",mouse);
  window.addEventListener("mousedown",mousedown);
  window.addEventListener("mouseup",mouseup);
  pulseinterval = window.setTimeout(pulse,15000/masterbpm);
};
