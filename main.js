var ac = new window.AudioContext();
var oc = new OfflineAudioContext(2, 44100, 44100);
var ad = ac.createGain();
ad.gain.value = 1;
ad.connect(ac.destination);
var down = false;
var height = 500;
var width = 500;
var vc = document.getElementById('canvas').getContext('2d');
vc.lineWidth = 1;
function fill(rgb) {vc.fillStyle = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';}
function stroke(rgb) {vc.strokeStyle = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';}
var purple=[128,128,255];
var lightpurple=[192,192,255];
var cyan = [0,255,255];
var lightcyan = [192,255,255];
var green = [0,255,0];
var lightgreen = [128,255,128];
var yellow = [255,255,0];
var lightyellow = [255,255,192];
var black = [0,0,0];
var gray = [128,128,128];
var white = [255,255,255];
var red = [255,0,0];
var lightred = [255,64,64];
var pink = [255,128,128];
var lightpink = [255,192,192];
function container(x,y,w,h,children){
  this.x = x;this.y = y;this.w = w;this.h = h;
  this.drawx = 0;
  this.drawy = 0;
  this.draww = 0;
  this.drawh = 0;
  this.hoffset = 0;
  this.voffset = 0;
  this.children = children;
}
container.prototype.draw = function(){
  for(var index in this.children){
    var child = this.children[index];
    child.drawx = this.drawx + (child.x-this.hoffset) * this.draww;
    child.drawy = this.drawy + (child.y-this.voffset) * this.drawh;
    child.draww = child.w * this.draww;
    child.drawh = child.h * this.drawh;
    if(child.drawx >= this.drawx-1)
    if(child.drawy >= this.drawy-1)
    if(child.drawx+child.draww <= this.drawx+this.draww+1)
    if(child.drawy+child.drawh <= this.drawy+this.drawh+1)
    if(child.draw)child.draw();
  }
};
container.prototype.mousedown = function(event){
  for(var index in this.children){
    var child = this.children[index];
    if(event.clientX > child.drawx)
    if(event.clientY > child.drawy)
    if(event.clientX < child.drawx+child.draww)
    if(event.clientY < child.drawy+child.drawh)
    if(child.mousedown)child.mousedown(event);
  }
};
container.prototype.mouseup = function(event){
  for(var index in this.children){
    var child = this.children[index];
    if(event.clientX > child.drawx)
    if(event.clientY > child.drawy)
    if(event.clientX < child.drawx+child.draww)
    if(event.clientY < child.drawy+child.drawh)
    if(child.mouseup)child.mouseup(event);
  }
};
var hover = null;
container.prototype.mousemove = function(event){
  for(var index in this.children){
    var child = this.children[index];
    if(event.clientX > child.drawx)
    if(event.clientY > child.drawy)
    if(event.clientX < child.drawx+child.draww)
    if(event.clientY < child.drawy+child.drawh){
      hover = child;
      if(child.mousemove)child.mousemove(event);
    }
  }
};
container.prototype.wheel = function(event){
  for(var index in this.children){
    var child = this.children[index];
    if(event.clientX > child.drawx)
    if(event.clientY > child.drawy)
    if(event.clientX < child.drawx+child.draww)
    if(event.clientY < child.drawy+child.drawh)
    if(child.wheel)child.wheel(event);
  }
};
function vscroll(x,y,w,h,bgcolor,fgcolor,target){
  container.call(this,x,y,w,h,[]);
  this.bgcolor = bgcolor;
  this.fgcolor = fgcolor;
  this.target = target;
}
vscroll.prototype.draw = function(){
  fill(this.bgcolor);vc.fillRect(this.drawx,this.drawy,this.draww,this.drawh);
  fill(this.fgcolor);
  var maxy = 1;
  for(var index in this.target.children){
    var child = this.target.children[index];
    childy = child.y+child.h;
    if(childy>maxy)maxy=childy;
  }
  vc.fillRect(this.drawx,this.drawy+(this.target.voffset*this.drawh/maxy),
              this.draww,this.drawh/maxy);
};
function ltriangle(x,y,w,h,bgcolor,fgcolor) {
    container.call(this,x,y,w,h,[]);
    this.bgcolor = bgcolor;
    this.fgcolor = fgcolor;
}
ltriangle.prototype.draw = function(){
  if(hover===this)fill(white);
  else fill(this.bgcolor);vc.fillRect(this.drawx,this.drawy,this.draww,this.drawh);
  if(hover===this)fill(black);
  else fill(this.fgcolor);vc.beginPath();
  var wmargin = this.draww/4;
  var hmargin = this.drawh/4;
  vc.moveTo(this.drawx+this.draww-wmargin,this.drawy+hmargin);
  vc.lineTo(this.drawx+wmargin, this.drawy + this.drawh/2);
  vc.lineTo(this.drawx+this.draww-wmargin, this.drawy+this.drawh-hmargin);
  vc.closePath();
  vc.fill();
};
function rtriangle(x,y,w,h,bgcolor,fgcolor){
  ltriangle.call(this,x,y,w,h,bgcolor,fgcolor);
}
rtriangle.prototype.draw = function(){
  if(hover===this)fill(white);
  else fill(this.bgcolor);vc.fillRect(this.drawx,this.drawy,this.draww,this.drawh);
  if(hover===this)fill(black);
  else fill(this.fgcolor);vc.beginPath();
  var wmargin = this.draww/4;
  var hmargin = this.drawh/4;
  vc.moveTo(this.drawx+wmargin,this.drawy+hmargin);
  vc.lineTo(this.drawx+this.draww-wmargin, this.drawy + this.drawh/2);
  vc.lineTo(this.drawx+wmargin, this.drawy+this.drawh-hmargin);
  vc.closePath();
  vc.fill();
};
function twobars(x,y,w,h,bgcolor,fgcolor){
  ltriangle.call(this,x,y,w,h,bgcolor,fgcolor);
}
twobars.prototype.draw = function() {
  if(hover===this)fill(white);
  else fill(this.bgcolor);vc.fillRect(this.drawx,this.drawy,this.draww,this.drawh);
  if(hover===this)fill(black);
  else fill(this.fgcolor);
  var wmargin = this.draww/4;
  var hmargin = this.drawh/4;
  var barw = (this.draww - (wmargin * 2)) / 3;
  vc.fillRect(this.drawx+wmargin, this.drawy+hmargin, barw, this.drawh - hmargin*2);
  vc.fillRect(this.drawx+wmargin+barw+barw, this.drawy+hmargin, barw, this.drawh - hmargin*2);
};
function seek(x,y,w,h,color){
  container.call(this,x,y,w,h,[]);
  this.color = color;
  this.value = 0;
  this.duration = 10;
}
seek.prototype.draw = function(){
  fill(black);vc.fillRect(this.drawx,this.drawy,this.draww,this.drawh);
  fill(this.color);vc.fillRect(this.drawx,this.drawy+this.drawh/2,this.draww,2);
  fill(white);
  vc.fillRect(this.drawx+(this.draww*(this.value/this.duration)),this.drawy,2,this.drawh);
};
function gain(x,y,w,h,color){
  container.call(this,x,y,w,h,[]);
  this.color = color;
  this.value = 2/3;
}
gain.prototype.draw = function(){
  fill(this.color);vc.fillRect(this.drawx,this.drawy,this.draww,this.drawh);
  fill(black);vc.fillRect(this.drawx,this.drawy,this.draww*this.value,this.drawh);
};
gain.prototype.mousedown = function(event){
  this.value = (event.clientX - this.drawx)/this.draww;
};
function number(x,y,w,h,bgcolor,fgcolor,value,min,max){
  container.call(this,x,y,w,h,[]);
  this.bgcolor=bgcolor;this.fgcolor=fgcolor;
  this.value=value;this.min=min;this.max=max;
}
number.prototype.draw = function(){
  if(hover===this)fill(white);
  else fill(this.bgcolor);
  vc.fillRect(this.drawx,this.drawy,this.draww,this.drawh);
  if(hover===this)fill(black);
  else fill(this.fgcolor);
  vc.textAlign="middle";
  vc.font = '' + Math.floor(this.drawh*1/3) + 'px mono';
  vc.fillText(this.value,this.drawx+this.draww/4,this.drawy+this.drawh*2/4,this.draww-6);
};
number.prototype.wheel = function(event){
  if(event.deltaY < 0)this.value++;
  if(event.deltaY > 0)this.value--;
  if(this.value>this.max)this.value=this.max;
  if(this.value<this.min)this.value=this.min;
};
function text(x,y,w,h,bgcolor,fgcolor,value){
  container.call(this,x,y,w,h,[]);
  this.bgcolor=bgcolor;this.fgcolor=fgcolor;
  this.value=value;
}
text.prototype.draw = function(){
  if(hover===this) fill(white);
  else fill(this.bgcolor);
  vc.fillRect(this.drawx,this.drawy,this.draww,this.drawh);
  if(hover===this) fill(black);
  else fill(this.fgcolor);
  vc.textAlign="left";
  vc.font = '' + Math.floor(this.drawh*1/2) + 'px mono';
  vc.fillText(this.value,this.drawx+3,this.drawy+this.drawh*3/4);
};
var grab = null;
var grabx = 0;
var graby = 0;
function track(x,y,w,h,color,value,entry){
  this.bgcolor=color;
  this.fgcolor=black;
  this.value=value;
  this.entry=entry;
  container.call(this,x,y,w,h,[]);
}
track.prototype.draw = text.prototype.draw;
track.prototype.mousedown = function(event){
  grab = this;
};
function deck(x,y,w,h,dark,light){
  var idk = this;
  this.seek = new seek(0,0,1,1/2,dark);
  this.seek.mousedown = function(event){
    this.value = this.duration * (event.clientX-this.drawx)/this.draww;
    this.value -= this.value % (60 / idk.bpm.value);
    this.value += idk.pulse * (15 / idk.bpm.value);
  };
  this.play = new rtriangle(0,1/2,1/4,1/2,light,black);
  this.play.mousedown = function(){
    if(this.draw===rtriangle.prototype.draw)this.draw=twobars.prototype.draw;
    else this.draw=rtriangle.prototype.draw;
  };
  this.name = new text(1/4,1/2,1/2,1/4,dark,black,"Drag a track here...");
  this.gain = new gain(1/4,3/4,1/2,1/4,dark);
  this.bpmleft = new ltriangle(3/4,1/2,1/16,1/4,light,black);
  this.bpmleft.mousedown = function(){
    idk.bpm.value--;
    if(idk.bpm.value<idk.bpm.min)idk.bpm.value=idk.bpm.min;
  };
  this.bpm = new number(13/16,1/2,1/8,1/4,black,light,130,30,300);
  this.bpmright = new rtriangle(15/16,1/2,1/16,1/4,light,black);
  this.bpmright.mousedown = function(){
    idk.bpm.value++;
    if(idk.bpm.value>idk.bpm.max)idk.bpm.value=idk.bpm.max;
  };
  this.keyleft = new ltriangle(3/4,3/4,1/16,1/4,light,black);
  this.keyleft.mousedown = function(){
    idk.key.value--;
    if(idk.key.value<idk.key.min)idk.key.value=idk.key.min;
  };
  this.key = new number(13/16,3/4,1/8,1/4,black,light,65,0,127);
  this.keyright = new rtriangle(15/16,3/4,1/16,1/4,light,black);
  this.keyright.mousedown = function(){
    idk.key.value++;
    if(idk.key.value>idk.key.max)idk.key.value=idk.key.max;
  };
  this.pulse = 0;
  this.buffer = null;
  this.entry = null;
  container.call(this,x,y,w,h,
    [this.seek,
    this.play,this.name,this.gain,
    this.bpmleft,this.bpm,this.bpmright,
    this.keyleft,this.key,this.keyright]);
}
deck.prototype.draw = container.prototype.draw;
deck.prototype.mousedown = container.prototype.mousedown;
deck.prototype.mouseup = function(event){
  if(grab){
    this.preload(grab);
  }
  container.prototype.mouseup.call(this,event);
};
deck.prototype.mousemove = container.prototype.mousemove;
deck.prototype.wheel = container.prototype.wheel;
deck.prototype.preload = function(track) {
    var idk = this;
    this.entry = track.entry;
    this.name.value = "loading...";
    this.play.draw = rtriangle.prototype.draw;
    this.bpm.value = 130;
    this.key.value = 65;
    this.seek.value = 0;
    this.pulse = 0;
    track.entry.file(function(file) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = function() {
            var audiodata = reader.result;
            oc.decodeAudioData(audiodata, function(buffer) {
                idk.buffer = buffer;
                idk.name.value = track.entry.name;
                idk.seek.duration = buffer.duration;
            });
        };
    });
};
deck.prototype.playstep = function(){
    if (this.play.draw === twobars.prototype.draw) {
        var step = ac.createBufferSource();
        step.buffer = this.buffer;
        step.playbackRate.value = Math.pow(2, (master.key.value - this.key.value) / 12);
        var gain = ac.createGain();
        step.connect(gain);
        gain.connect(ad);
        var target = ac.currentTime + master.latency;
        gain.gain.setValueAtTime(0.00001, target);
        gain.gain.linearRampToValueAtTime(this.gain.value, target + (15 / master.bpm.value));
        gain.gain.linearRampToValueAtTime(0.00001, target + (30 / master.bpm.value));
        step.start(target, this.seek.value, 30 / master.bpm.value);
        if (this.pulse == master.pulse) {
            this.seek.value += 15 / this.bpm.value;
            this.pulse += 1;
        }
        if (this.pulse > 3) this.pulse = 0;
        if (this.seek.value >= this.seek.duration) this.play.draw = rtriangle.prototype.draw;
    }
};
function masterchannel(x,y,w,h){
  var idk = this;
  this.pulse = 0;
  this.latency = 0.01;
  this.bpmleft = new ltriangle(0,0,1/3,1/2,red,black);
  this.bpmleft.mousedown = function(){
    idk.bpm.value--;
    if(idk.bpm.value<idk.bpm.min)idk.bpm.value=idk.bpm.min;
  };
  this.bpm = new number(1/3,0,1/3,1/2,red,black,130,30,300);
  this.bpmright = new rtriangle(2/3,0,1/3,1/2,red,black);
  this.bpmright.mousedown = function(){
    idk.bpm.value++;
    if(idk.bpm.value>idk.bpm.max)idk.bpm.value=idk.bpm.max;
  };
  this.keyleft = new ltriangle(0,1/2,1/3,1/2,red,black);
  this.keyleft.mousedown = function(){
    idk.key.value--;
    if(idk.key.value<idk.key.min)idk.key.value=idk.key.min;
  };
  this.key = new number(1/3,1/2,1/3,1/2,red,black,65,0,127);
  this.keyright = new rtriangle(2/3,1/2,1/3,1/2,red,black);
  this.keyright.mousedown = function(){
    idk.key.value++;
    if(idk.key.value>idk.key.max)idk.key.value=idk.key.max;
  };
  container.call(this,x,y,w,h,[this.bpmleft,this.bpm,this.bpmright,this.keyleft,this.key,this.keyright]);
}
masterchannel.prototype.draw = container.prototype.draw;
masterchannel.prototype.mousedown = container.prototype.mousedown;
masterchannel.prototype.mouseup = container.prototype.mouseup;
masterchannel.prototype.mousemove = container.prototype.mousemove;
masterchannel.prototype.wheel = container.prototype.wheel;
var openbutton = new text(0,0,1,1/20,black,white,"Click here to add a directory...");
openbutton.mousedown = function(event){
  browser.choose();
};
var tracks = new container(0,1/20,15/16,19/20,[]);
var trackscroll = new vscroll(15/16,0,1/16,1,gray,white,tracks);
var browser = new container(0,0,1/3,2/3,[openbutton,tracks,trackscroll]);
browser.wheel = function(event){
  var trackheight = 1/20;
  var maxy = -1*trackheight;
  for(var index in tracks.children)
    if(tracks.children[index].y > maxy)
    maxy=tracks.children[index].y;
  if(event.deltaY > 0)tracks.voffset+=trackheight;
  if(event.deltaY < 0)tracks.voffset-=trackheight;
  if(tracks.voffset>maxy+trackheight-1)tracks.voffset=maxy+trackheight-1;
  if(tracks.voffset<0)tracks.voffset=0;
};
browser.choose = function() {
    chrome.fileSystem.chooseEntry({
        type: "openDirectory"
    }, function(entry) {
        var reader = entry.createReader();
        var entries = [];
        function readEntries() {
          reader.readEntries(function(results) {
            if (results.length) {
                    entries = entries.concat(Array.prototype.slice.call(results || [], 0));
                    readEntries();
                } else {
                    entries = entries.sort(function(a, b) {
                        return (a.name >= b.name);
                    });
                    list = [];
                    listentries = [];
                    entries.forEach(function(entry, i) {
                        if (!(entry.isDirectory)) {
                            if (entry.name.endsWith('.mp3')) {
                                var trackheight = 1/20;
                                var maxy = -1*trackheight;
                                for(var index in tracks.children)
                                  if(tracks.children[index].y > maxy)
                                  maxy=tracks.children[index].y;
                                var color=purple;
                                switch(tracks.children.length % 4){
                                  case 0:color=purple;break;
                                  case 1:color=cyan;break;
                                  case 2:color=green;break;
                                  case 3:color=yellow;break;
                                }
                                tracks.children.push(new track(0,maxy+trackheight,1,trackheight,color,entry.name,entry));
                            }
                        }
                    });
                }
            });
        }
        readEntries();
        console.log(tracks.children);
    });
};
var master = new masterchannel(0,2/3,1/3,1/3);
var adeck = new deck(0,0,1,1/4,purple,lightpurple);
var bdeck = new deck(0,1/4,1,1/4,cyan,lightcyan);
var cdeck = new deck(0,1/2,1,1/4,green,lightgreen);
var ddeck = new deck(0,3/4,1,1/4,yellow,lightyellow);
var decks = new container(1/3,0,2/3,1,[adeck,bdeck,cdeck,ddeck]);
var root = new container(0,0,1,1,[browser,master,decks]);
root.mouseup = function(event){
  container.prototype.mouseup.call(this,event);
  grab = null;
};
var pulseinterval = null;
function pulse() {
    window.clearTimeout(pulseinterval);
    master.pulse++;
    if (master.pulse > 3) master.pulse = 0;
    pulseinterval = window.setTimeout(pulse, 15000 / master.bpm.value);
    if(adeck.buffer)adeck.playstep();
    if(bdeck.buffer)bdeck.playstep();
    if(cdeck.buffer)cdeck.playstep();
    if(ddeck.buffer)ddeck.playstep();
    var color = white;
    switch(master.pulse){
      case 0:color=white;break;
      case 1:color=lightpink;break;
      case 2:color=pink;break;
      case 3:color=red;break;
    }
      master.bpmleft.bgcolor = color;
      master.bpm.bgcolor = color;
      master.bpmright.bgcolor = color;
      master.keyleft.bgcolor = color;
      master.key.bgcolor = color;
      master.keyright.bgcolor = color;
}
function resize() {
    width = window.innerWidth;height = window.innerHeight;
    canvas.width = width;canvas.height = height;
}
function draw() {
    requestAnimationFrame(draw);
    fill(black);vc.fillRect(0,0,width,height);
    root.drawx=0;root.drawy=0;
    root.draww=width;root.drawh=height;
    root.draw();
    if (grab) {
        fill(white);
        vc.fillRect(grabx, graby, width / 3, width/50);
        fill(black);
        vc.fillText(grab.value, grabx + width/50, graby + height/50 * 0.8, width/3);
    }
}
function mousemove(event) {
    if (down) if (grab) {grabx = event.clientX; graby = event.clientY;}
    root.mousemove(event);
}
function mousedown(event) {down=true;root.mousedown(event);}
function mouseup(event) {down=false;if(grab){root.mouseup(event);grab=false;}}
var allowwheel = true;
function wheel(event) {
  if(allowwheel){
    allowwheel = false;
    window.setTimeout(function(){allowwheel=true;},20);
    root.wheel(event);
  }
}
window.onload = function() {
    resize();
    draw();
    browser.choose();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mousedown", mousedown);
    window.addEventListener("mouseup", mouseup);
    window.addEventListener("wheel", wheel);
    pulseinterval = window.setTimeout(pulse, 15000 / master.bpm.value);
};