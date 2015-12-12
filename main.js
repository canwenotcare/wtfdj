var ac = new window.AudioContext();
var cc = document.getElementById('canvas');
var dc = document.createElement('canvas');
var oc = new OfflineAudioContext(2,44100,44100);
var vc = cc.getContext('2d');
var xc = dc.getContext('2d');
                      //[1 1 1 2] [1  2  3  2] [3   4   3   2] [1]
var child = function(){//E A I ST  D NO WXY BC  FGH JKLM PQR UV Z
  this.ask=[];//children
  this.biz='gain';//parameter name
  this.cdj=0;//parameter start time
  this.dev=true;//are children in parallel
  this.eye=0;//child selection index
  this.faq=130;//beats per minute
  this.gap=4;//pulses per beat
  this.her=3;//current pulse value
  this.ifs={};//input status object
  this.joy=64;//parameter duration
  this.kit='jump';//parameter change type
  this.law=0;//parameter slope
  this.max=1;//parameter value
  this.nil=1;//zoom in sibling units
  this.own=0;//offset in sibling units
  this.pad=[0,0,0];//RGB background color
  this.qua=[''];//text to display
  this.rig=[255,255,255];//RGB foreground color
  this.she=0;//child sibling size total
  this.tmi=1;//sibling size
  this.use='event';//audio data type
  this.vox='direct';//outgoing connection type
  this.web=1;//computed child sibling unit size
  this.xtc=[0,1];//computed x and width
  this.yet=[0,1];//computed y and height
  this.zen=false;//are children horizontal
};
child.prototype.rtriangle = function(){
  vc.fillStyle='rgb(0,0,0)';
  vc.beginPath();
  vc.moveTo(this.xtc[0]+this.xtc[1]*1/4,this.yet[0]+this.yet[1]*1/4);
  vc.lineTo(this.xtc[0]+this.xtc[1]*3/4,this.yet[0]+this.yet[1]*1/2);
  vc.lineTo(this.xtc[0]+this.xtc[1]*1/4,this.yet[0]+this.yet[1]*3/4);
  vc.closePath();vc.fill();
};
child.prototype.rseek = function(){
  vc.fillStyle='rgb(0,255,0)';
  vc.beginPath();
  vc.moveTo(this.xtc[0]+this.xtc[1]*1/4,this.yet[0]+this.yet[1]*1/4);
  vc.lineTo(this.xtc[0]+this.xtc[1]*1/2,this.yet[0]+this.yet[1]*1/2);
  vc.lineTo(this.xtc[0]+this.xtc[1]*1/4,this.yet[0]+this.yet[1]*3/4);
  vc.closePath();vc.fill();
  vc.beginPath();
  vc.moveTo(this.xtc[0]+this.xtc[1]*1/2,this.yet[0]+this.yet[1]*1/4);
  vc.lineTo(this.xtc[0]+this.xtc[1]*3/4,this.yet[0]+this.yet[1]*1/2);
  vc.lineTo(this.xtc[0]+this.xtc[1]*1/2,this.yet[0]+this.yet[1]*3/4);
  vc.closePath();vc.fill();
};
child.prototype.ltriangle = function(){
  vc.fillStyle='rgb(0,0,0)';
  vc.beginPath();
  vc.moveTo(this.xtc[0]+this.xtc[1]*3/4,this.yet[0]+this.yet[1]*1/4);
  vc.lineTo(this.xtc[0]+this.xtc[1]*1/4,this.yet[0]+this.yet[1]*1/2);
  vc.lineTo(this.xtc[0]+this.xtc[1]*3/4,this.yet[0]+this.yet[1]*3/4);
  vc.closePath();vc.fill();
};
child.prototype.lseek = function(){
  vc.fillStyle='rgb(0,255,0)';
  vc.beginPath();
  vc.moveTo(this.xtc[0]+this.xtc[1]*3/4,this.yet[0]+this.yet[1]*1/4);
  vc.lineTo(this.xtc[0]+this.xtc[1]*1/2,this.yet[0]+this.yet[1]*1/2);
  vc.lineTo(this.xtc[0]+this.xtc[1]*3/4,this.yet[0]+this.yet[1]*3/4);
  vc.closePath();vc.fill();
  vc.beginPath();
  vc.moveTo(this.xtc[0]+this.xtc[1]*1/2,this.yet[0]+this.yet[1]*1/4);
  vc.lineTo(this.xtc[0]+this.xtc[1]*1/4,this.yet[0]+this.yet[1]*1/2);
  vc.lineTo(this.xtc[0]+this.xtc[1]*1/2,this.yet[0]+this.yet[1]*3/4);
  vc.closePath();vc.fill();
};
child.prototype.utriangle = function(){
  vc.beginPath();
  vc.moveTo(this.xtc[0]+this.xtc[1]*1/4,this.yet[0]+this.yet[1]*3/4);
  vc.lineTo(this.xtc[0]+this.xtc[1]*1/2,this.yet[0]+this.yet[1]*1/4);
  vc.lineTo(this.xtc[0]+this.xtc[1]*3/4,this.yet[0]+this.yet[1]*3/4);
  vc.closePath();vc.fill();
};
child.prototype.dtriangle = function(){
  vc.beginPath();
  vc.moveTo(this.xtc[0]+this.xtc[1]*1/4,this.yet[0]+this.yet[1]*1/4);
  vc.lineTo(this.xtc[0]+this.xtc[1]*1/2,this.yet[0]+this.yet[1]*3/4);
  vc.lineTo(this.xtc[0]+this.xtc[1]*3/4,this.yet[0]+this.yet[1]*1/4);
  vc.closePath();vc.fill();
};
child.prototype.plussign = function(){
  vc.fillRect(this.xtc[0]+this.xtc[1]*5/12,this.yet[0]+this.yet[1]*1/4,this.xtc[1]*1/6,this.yet[1]*1/2);
  vc.fillRect(this.xtc[0]+this.xtc[1]*1/4,this.yet[0]+this.yet[1]*5/12,this.xtc[1]*1/2,this.yet[1]*1/6);
};
child.prototype.minussign = function(){
  vc.fillStyle='rgb(0,0,0)';
  vc.fillRect(this.xtc[0]+this.xtc[1]*1/4,this.yet[0]+this.yet[1]*5/12,this.xtc[1]*1/2,this.yet[1]*1/6);
};
child.prototype.pauselogo = function(){
  vc.fillStyle='rgb(0,0,0)';
vc.fillRect(this.xtc[0]+this.xtc[1]*1/4,this.yet[0]+this.yet[1]*1/4,this.xtc[1]*1/6,this.yet[1]*1/2);
vc.fillRect(this.xtc[0]+this.xtc[1]*7/12,this.yet[0]+this.yet[1]*1/4,this.xtc[1]*1/6,this.yet[1]*1/2);
};
child.prototype.stoplogo = function(){
vc.fillRect(this.xtc[0]+this.xtc[1]*1/4,this.yet[0]+this.yet[1]*1/4,this.xtc[1]*1/2,this.yet[1]*1/2);
};
child.prototype.osclogo = function(){
  vc.beginPath();
  vc.moveTo(this.xtc[0]+this.xtc[1]*1/4,this.yet[0]+this.yet[1]*1/2);
  vc.lineTo(this.xtc[0]+this.xtc[1]*1/2,this.yet[0]+this.yet[1]*1/4);
  vc.lineTo(this.xtc[0]+this.xtc[1]*1/2,this.yet[0]+this.yet[1]*3/8);
  vc.lineTo(this.xtc[0]+this.xtc[1]*3/4,this.yet[0]+this.yet[1]*1/2);
  vc.lineTo(this.xtc[0]+this.xtc[1]*1/2,this.yet[0]+this.yet[1]*3/4);
  vc.lineTo(this.xtc[0]+this.xtc[1]*1/2,this.yet[0]+this.yet[1]*5/8);
  vc.closePath();vc.fill();
};
child.prototype.dirsign = function(){
  vc.fillStyle='rgb(0,255,0)';
  vc.beginPath();
  vc.moveTo(this.xtc[0]+this.xtc[1]*1/4,this.yet[0]+this.yet[1]*3/4);
  vc.lineTo(this.xtc[0]+this.xtc[1]*3/8,this.yet[0]+this.yet[1]*3/4);
  vc.lineTo(this.xtc[0]+this.xtc[1]*3/4,this.yet[0]+this.yet[1]*1/4);
  vc.lineTo(this.xtc[0]+this.xtc[1]*5/8,this.yet[0]+this.yet[1]*1/4);
  vc.closePath();vc.fill();
};
child.prototype.draw = function(){
  vc.lineWidth=1;
  vc.fillStyle='rgb('+Math.floor(this.pad[0]*((this.her*0.5/this.gap)+0.5))
                  +','+Math.floor(this.pad[1]*((this.her*0.5/this.gap)+0.5))
                  +','+Math.floor(this.pad[2]*((this.her*0.5/this.gap)+0.5))+')';
  vc.fillRect(this.xtc[0],this.yet[0],this.xtc[1],this.yet[1]);
  if(this.ask)
  if(this.ask.length){
    this.she=0;
    for(var eye in this.ask)this.she+=this.ask[eye].tmi;
    if(this.zen)this.web=this.xtc[1]/(this.she*this.nil);
    else this.web=this.yet[1]/(this.she*this.nil);
    this.she=this.own;
    for(eye in this.ask){
      if(this.zen){//horizontal
        this.ask[eye].xtc[0]=this.xtc[0] + this.she*this.web;
        this.ask[eye].xtc[1]=this.ask[eye].tmi*this.web;
        this.ask[eye].yet[0]=this.yet[0];
        this.ask[eye].yet[1]=this.yet[1];
      }
      else{
        this.ask[eye].xtc[0]=this.xtc[0];
        this.ask[eye].xtc[1]=this.xtc[1];
        this.ask[eye].yet[0]=this.yet[0] + this.she*this.web;
        this.ask[eye].yet[1]=this.ask[eye].tmi*this.web;
      }
      this.she += this.ask[eye].tmi;
      if(this.ask[eye].tmi)this.ask[eye].draw();
    }
  }
  else {
    vc.fillStyle='rgb('+this.rig[0]
                  +','+this.rig[1]
                  +','+this.rig[2]+')';
    switch(this.qua[0]){
      case '>':this.rtriangle();break;
      case '<':this.ltriangle();break;
      case '>>':this.rseek();break;
      case '<<':this.lseek();break;
      case '||':this.pauselogo();break;
      case '=':this.stoplogo();break;
      case '+':this.plussign();break;
      case '-':this.minussign();break;
      case '~':this.osclogo();break;
      case '/':this.dirsign();break;
      case '':break;
      default:{
        var faq = Math.floor(this.yet[1]*0.7/this.qua.length);
        vc.font=''+faq+'px mono';
        for(var qua in this.qua){
          vc.fillText(this.qua[qua],this.xtc[0]+this.xtc[1]*0.05,
                                    this.yet[0]+faq*qua + faq*2);
        }
      } break;
    }
  }
};
child.prototype.drag=function(event){
};
child.prototype.mousemove=function(event){
  if(this.ifs.help)infosection.qua = this.ifs.help;
  else infosection.qua = ["Useful notes will","appear here when","hovering over user","interface elements.","","","",""];
  if(c.ifs.mouse)c.ifs.grab.drag(event);
  else
  if(this.ask)
  if(this.ask.length){
    for(var eye in this.ask){
      if((event.clientX >= this.ask[eye].xtc[0])
      && (event.clientY >= this.ask[eye].yet[0])
      && (event.clientX <= this.ask[eye].xtc[0]+this.ask[eye].xtc[1])
      && (event.clientY <= this.ask[eye].yet[0]+this.ask[eye].yet[1]))
      {
        this.ask[eye].mousemove(event);
        this.eye = eye;
        return;
      }
    }
  }
};
child.prototype.mousedown=function(event){
  cc.requestPointerLock();
  c.ifs.mouse = true;
  c.ifs.grab = this;
  if(this.ask)
  if(this.ask.length){
    for(var eye in this.ask){
      if((event.clientX >= this.ask[eye].xtc[0])
      && (event.clientY >= this.ask[eye].yet[0])
      && (event.clientX <= this.ask[eye].xtc[0]+this.ask[eye].xtc[1])
      && (event.clientY <= this.ask[eye].yet[0]+this.ask[eye].yet[1]))
      {
        this.ask[eye].mousedown(event);
        this.eye = eye;
        return;
      }
    }
  }
};
child.prototype.mouseup=function(event){
  document.exitPointerLock();
  c.ifs.mouse = false;
  if(this.ask)
  if(this.ask.length){
    for(var eye in this.ask){
      if(event.clientX >= this.ask[eye].xtc[0])
      if(event.clientY >= this.ask[eye].yet[0])
      if(event.clientX <= this.ask[eye].xtc[0]+this.ask[eye].xtc[1])
      if(event.clientY <= this.ask[eye].yet[0]+this.ask[eye].yet[1])
      {
        this.ask[eye].mouseup(event);
        this.eye = eye;
        return;
      }
    }
  }
};
child.prototype.pulse=function(){
  for(var eye in this.ask){
    if(this.her===this.ask[eye].her)
    if(this.gap===this.ask[eye].gap)
      this.ask[eye].pulse();
  }
  this.her--;
  if(this.her===0)this.her=this.gap-1;
};


var c = new child();
c.xtc[1]=window.innerWidth;
c.yet[1]=window.innerHeight;
cc.width=window.innerWidth;
cc.height=window.innerHeight;
dc.width=window.innerWidth;
dc.height=window.innerHeight;
c.zen = false;//vertical
c.pad = [255,255,255];
c.max = 65;
c.gap = 4;
c.her = 4;
c.rig = [0,0,0];

var tracksection = new child();
c.ask.push(tracksection);
tracksection.tmi = 5;
tracksection.zen = true;//horizontal

var tracks = new child();
tracksection.ask.push(tracks);
tracks.tmi = 49;
tracks.zen = false;//vertical

var newtrack = new child();
tracks.ask.push(newtrack);
newtrack.zen = true;//horizontal
newtrack.pad = [64,64,64];
newtrack.gap = 1;
newtrack.her = 1;
newtrack.nil = 8;
newtrack.own = 0;

var addtrack = new child();
newtrack.ask.push(addtrack);
addtrack.ifs.help = ['Click here to','add a new','arrangement','track.','','','',''];
addtrack.qua = "+";
addtrack.rig = [0,255,255];
addtrack.mousedown = function(){
  var track = new child(); var yet = tracks.ask.pop();
  tracks.ask.push(track); tracks.ask.push(yet);
  track.zen = true;//horizontal
  track.pad = [64,64,64];
  track.max = 65;
  track.gap = 4;
  track.her = 4;
  track.use = "arrangement";
  var header = new child();
  track.ask.push(header);
  header.tmi = 1;
  header.pad = [0,128,128];
  header.zen = false;//vertical
  var titlebar = new child();
  header.ask.push(titlebar);
  titlebar.tmi = 1;
  titlebar.gap = 1;
  titlebar.her = 1;
  titlebar.pad = [0,255,255];
  titlebar.zen = true;//horizontal;
  var deletebutton = new child();
  titlebar.ask.push(deletebutton);
  deletebutton.qua='-';
  deletebutton.pad=[255,0,0];
  deletebutton.rgb=[0,0,0];
  deletebutton.gap=1;
  deletebutton.her=1;
  deletebutton.tmi=1;
  deletebutton.mousedown = function(){
    tracks.ask.splice(tracks.ask.indexOf(track),1);
  };
  var title = new child();
  titlebar.ask.push(title);
  title.qua=['Arrangement' + (tracks.ask.length - 1),''];
  title.tmi=8;
  var transport = new child();
  header.ask.push(transport);
  transport.tmi=8;
  transport.zen = false;
  var buttons = new child();
  buttons.zen = true;//horizontal
  transport.ask.push(buttons);
  var playbutton = new child();
  playbutton.qua = ['>'];
  playbutton.rgb = [0,0,0];
  playbutton.pad = [0,192,192];
  buttons.ask.push(playbutton);
  playbutton.mousedown = function(){
    if(track.her===track.gap){
      track.her=track.gap-1;
      playbutton.qua[0]="||";
    }
    else{
      track.her=track.gap;
      playbutton.qua[0]=">";
    }
  };
  var seekleft = new child();
  seekleft.qua = ['<<'];
  seekleft.rgb = [0,255,0];
  seekleft.pad = [0,0,0];
  buttons.ask.push(seekleft);
  var stopbutton = new child();
  stopbutton.qua = ['='];
  stopbutton.rgb = [0,255,0];
  stopbutton.pad = [0,0,0];
  buttons.ask.push(stopbutton);
  var seekright = new child();
  seekright.qua = ['>>'];
  seekright.rgb = [0,255,0];
  seekright.pad = [0,0,0];
  buttons.ask.push(seekright);
  
  var contents = new child();
  track.ask.push(contents);
  contents.tmi = 9;
  contents.pad = [0,64,64];
  contents.zen = false;//vertical
  var editor = new child();
  contents.ask.push(editor);
  editor.tmi = 9;
  editor.pad = [0,32,32];
  editor.zen = true;//horizontal
  var score = new child();
  editor.ask.push(score);
  score.pad = [0,32,32];
  score.zen = false;//vertical when holding notes
  var seekscroll = new child();
  contents.ask.push(seekscroll);
  seekscroll.tmi = 1;
  seekscroll.gap = 1;
  seekscroll.her = 1;
  seekscroll.zen = true;//horizontal
  seekscroll.pad = [64,64,64];
  seekscroll.nil = 1;
  seekscroll.own = 0;
  var seekbar = new child();
  seekscroll.ask.push(seekbar);
  seekbar.gap = 1;
  seekbar.her = 1;
  seekbar.pad = [192,192,192];
  seekbar.drag = function(event){
    if(!event.ctrlKey)seekscroll.own += seekscroll.nil * event.movementX/(seekscroll.xtc[1]/**seekscroll.nil*/);
    if(!event.altKey){seekscroll.nil -= event.movementY/(seekscroll.yet[1]/**seekscroll.nil*/);
          seekscroll.own -= 0.5*event.movementY/(seekscroll.yet[1]/**seekscroll.nil*/);}
    if(seekscroll.nil < 1)seekscroll.nil=1;
    if(seekscroll.nil > 30)seekscroll.nil=30;
    if(seekscroll.own < 0)seekscroll.own=0;
    if(seekscroll.own > seekscroll.nil - 1)
      seekscroll.own = seekscroll.nil - 1;
    editor.nil = 1/seekscroll.nil;
    editor.own = 0 - (seekscroll.own/seekscroll.nil);
  };
  return track;
};

var addsynth = new child();
newtrack.ask.push(addsynth);
addsynth.ifs.help = ['Click here to','add a new','synth track.','','','','',''];
addsynth.qua = "~";
addsynth.rig = [255,255,0];
addsynth.mousedown = function(){
  var eye = addtrack.mousedown();
  eye.use = "synth";
  eye.ask[0].ask[0].ask[1].qua=['Synth ' + (tracks.ask.length - 1),''];
  eye.pulse = function(){
    eye.her--;
    if(eye.her===0)eye.her=eye.gap-1;
  };
};
var addfile = new child();
newtrack.ask.push(addfile);
addfile.ifs.help = ['Click here to','open a file','as a new track.','','','','',''];
addfile.qua = "/";
addfile.rig = [0,255,0];
addfile.mousedown = function(){
  var eye = addtrack.mousedown();
  eye.use = "file";
  eye.max = "65";
  eye.pulse = function(){
    if(eye.ifs.buffer){
      var vox = ac.createBufferSource();
      var gap = ac.createGain();
      gap.gain.setValueAtTime(1,ac.currentTime);
      gap.gain.linearRampToValueAtTime(1.0,ac.currentTime+(15/eye.faq));
      gap.gain.linearRampToValueAtTime(0.0001,ac.currentTime+(30/eye.faq));
      vox.buffer=eye.ifs.buffer;vox.connect(gap);gap.connect(ac.destination);
      vox.playbackRate.value=Math.pow(2,(c.max-eye.max)/12);
      vox.start(ac.currentTime,eye.cdj,30/eye.faq);
      eye.cdj+=15/eye.faq;
    }
    eye.her--;
    if(eye.her===0)eye.her=eye.gap-1;
  };
  eye.ask[0].ask[0].ask[1].qua=['Loading...',''];
  chrome.fileSystem.chooseEntry(
    {type: 'openFile',accepts:[{mimeTypes:['audio/*']}],acceptsAllTypes:false},
    function(entry){
      entry.file(function(file){
        var reader = new FileReader();reader.readAsArrayBuffer(file);
        reader.onloadend=function(){
        var audiodata=reader.result;
        oc.decodeAudioData(audiodata,
          function(buffer){
            eye.ifs.buffer=buffer;
            eye.ifs.data=[buffer.getChannelData(0),buffer.getChannelData(1)];
            eye.cdj=0;eye.joy=buffer.duration;
            eye.ask[0].ask[0].ask[1].qua=[entry.name,''];
            eye.ask[1].ask[0].ask[0].draw = function(){
              var rig = eye.ask[1].ask[0];var xtc = rig.ask[0];
              vc.fillStyle="rgb(0,192,192)";
              vc.fillRect(rig.xtc[0],rig.yet[0]+1+rig.yet[1]/2,rig.xtc[1],2);
              var tmi = 5;
              for(var vox=rig.xtc[0]-xtc.xtc[0];vox<rig.xtc[1]+(rig.xtc[0]-xtc.xtc[0]);vox+=tmi){
                var pad = Math.abs(eye.ifs.data[0][Math.floor(vox*eye.ifs.buffer.length/xtc.xtc[1])]);
                vc.fillRect(xtc.xtc[0]+vox,xtc.yet[0]+xtc.yet[1]*((1-pad)/2),tmi,xtc.yet[1]*pad);
                
              }
            };
            },function(e){console.log(e);});};});});
};

var trackscroll = new child();
tracksection.ask.push(trackscroll);
trackscroll.tmi = 1;
trackscroll.gap = 1;
trackscroll.her = 1;
trackscroll.zen = false;//vertical
trackscroll.pad = [64,64,64];
trackscroll.nil = 1;//zoom
trackscroll.own = 0;//offset

var trackscrollbar = new child();
trackscroll.ask.push(trackscrollbar);
trackscrollbar.tmi = 1;
trackscrollbar.gap = 1;
trackscrollbar.her = 1;
trackscrollbar.pad = [192,192,192];
trackscrollbar.drag = function(event){
  trackscroll.own += trackscroll.nil*event.movementY/trackscroll.yet[1];
  trackscroll.nil -= event.movementX/trackscroll.xtc[1];
  if(trackscroll.nil < 1)trackscroll.nil=1;
  if(trackscroll.nil > 20)trackscroll.nil=20;
  if(trackscroll.own < 0)trackscroll.own=0;
  if(trackscroll.own > trackscroll.she - trackscroll.she/trackscroll.nil)
    trackscroll.own = trackscroll.she - trackscroll.she/trackscroll.nil;
  tracks.nil = 1 / trackscroll.nil;
  tracks.own = 0 - trackscroll.own;
};

var master = new child();
c.ask.push(master);
master.zen = true;//horizontal
var playpause = new child();
master.ask.push(playpause);
playpause.tmi = 1;
playpause.pad = [255,255,255];
playpause.qua[0] = ">";
playpause.rig = [0,0,0];
playpause.mousedown = function(){
  if(c.her===c.gap){
    c.her=c.gap-1;
    playpause.qua[0]="||";
    pulse();
  }
  else{
    c.her=c.gap;
    playpause.qua[0]=">";
  }
};
var fxsection = new child();
master.ask.push(fxsection);
fxsection.tmi = 4;
fxsection.zen = false;//vertical

var fxs = new child();
fxsection.ask.push(fxs);
fxs.tmi = 4;
fxs.zen = true;//horizontal

var fxscroll = new child();
fxsection.ask.push(fxscroll);
fxscroll.gap = 1;
fxscroll.her = 1;
fxscroll.pad = [64,64,64];
fxscroll.nil = 1;
fxscroll.own = 0;
fxscroll.zen = true;//horizontal

var fxscrollbar = new child();
fxscroll.ask.push(fxscrollbar);
fxscrollbar.gap = 1;
fxscrollbar.her = 1;
fxscrollbar.pad = [192,192,192];
fxscrollbar.drag = function(event){
  fxscroll.own += fxscroll.nil*event.movementX/fxscroll.xtc[1];
  fxscroll.own -= 0.25*event.movementY/fxscroll.yet[1];
  fxscroll.nil -= 0.25*event.movementY/fxscroll.yet[1];
  if(fxscroll.nil < 1)fxscroll.nil=1;
  if(fxscroll.nil > 20)fxscroll.nil=20;
  if(fxscroll.own < 0)fxscroll.own=0;
  if(fxscroll.own > fxscroll.she - fxscroll.she/fxscroll.nil)
    fxscroll.own = fxscroll.she - fxscroll.she/fxscroll.nil;
};



var infosection = new child();
master.ask.push(infosection);
infosection.tmi = 1;
infosection.gap = 1;
infosection.qua = ["Useful notes will","appear here when","hovering over user","interface elements.","","","",""];


var pulse=function(){
    if(c.her<c.gap){
      window.setTimeout(pulse,c.ifs.time);
      c.ifs.time=60000/(c.faq*c.gap);
      c.pulse();
    }
};

window.addEventListener("resize",function(){
  c.xtc[1]=window.innerWidth;
  c.yet[1]=window.innerHeight;
  cc.width=window.innerWidth;
  cc.height=window.innerHeight;
  dc.width=window.innerWidth;
  dc.height=window.innerHeight;
});
window.addEventListener("mousemove",function(event){c.mousemove(event);});
window.addEventListener("mousedown",function(event){c.mousedown(event);});
window.addEventListener("mouseup",function(event){c.mouseup(event);});


var globaldraw = function(){
  requestAnimationFrame(globaldraw);
  c.draw();
};
globaldraw();
