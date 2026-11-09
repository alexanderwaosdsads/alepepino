
(function(){
  var app=document.getElementById('app');
  var st1=document.getElementById('st1');var wtEl=document.querySelector('.title span');function setTitle(t){if(wtEl)wtEl.textContent=t+' - Paint'}setTitle('dale lai y suscribete');
  var IMG={peterMad:'assets/image04.png',peter:'assets/image05.png',lose:'assets/image06.jpg'};

  /* sonidos: click y jingles con webaudio, musica de fondo con audio */
  var AC=null;
  function tone(f,d,t0,vol){
    try{
      if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();
      var o=AC.createOscillator(),g=AC.createGain();
      o.type='square';o.frequency.value=f;o.connect(g);g.connect(AC.destination);
      var t=AC.currentTime+(t0||0),v=vol||0.05;
      g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(0.0001,t+d);
      o.start(t);o.stop(t+d+0.02);
    }catch(e){}
  }
  var SND5=new Audio('assets/audio02.mp3');SND5.preload='auto';
  var MEGA=new Audio('assets/audio03.mp3');MEGA.loop=true;var inBoss=false;/* megalovania pa cuando peter ataca :3 */
  var SPIDER=new Audio('assets/audio04.mp3');SPIDER.loop=true;var inDodge=false;
  var TXTURI='assets/audio05.wav';
  function blip(){tone(660,0.06,0,0.14);tone(990,0.09,0.05,0.12)}
  function tok(){tone(300,0.05,0,0.12)}
  function pop(){tone(440,0.08,0,0.13);tone(880,0.1,0.06,0.12)}
  document.addEventListener('pointerdown',function(){try{if(AC&&AC.state==='suspended')AC.resume()}catch(e){}},true);
  function jingleWin(){[523,659,784,1047].forEach(function(f,i){tone(f,0.14,i*0.1,0.14)})}
  function jingleLose(){[392,330,262,196].forEach(function(f,i){tone(f,0.2,i*0.14,0.14)})}
  document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('button'))blip()});

  var bgm=document.getElementById('bgm'),musBtn=document.getElementById('mus'),musicOn=true,started=false;
  bgm.volume=0.45;
  function playMusic(){
    if(!musicOn)return;
    if(inDodge){if(!LS){if(inBoss)playLoop('mega',MEGA,.9);else playLoop('spider',SPIDER)}return}
    try{var p=bgm.play();if(p&&p.then)p.then(function(){started=true},function(){})}catch(e){}
  }
  playMusic();
  /* si el navegador no deja sonar solo, arranca con el primer toque en cualquier parte */
  function firstTouch(){playMusic();if(started)document.removeEventListener('pointerdown',firstTouch)}
  document.addEventListener('pointerdown',firstTouch);
  musBtn.onclick=function(){
    musicOn=!musicOn;
    musBtn.textContent='♪ musika: '+(musicOn?'sí':'no');
    if(musicOn)playMusic();else{bgm.pause();stopLoop()}
  };

  /* pantalla completa del navegador :3 */
  var fsOn=false,fsBtn=document.getElementById('fsb');
  function fsReal(){return document.fullscreenElement||document.webkitFullscreenElement}
  function fsApply(){
    fsOn=!!fsReal();
    document.body.classList.toggle('fs',fsOn);
    fsBtn.textContent=fsOn?'salir d pantalla completa':'pantalla completa';
    setTimeout(function(){window.dispatchEvent(new Event('resize'))},80);
  }
  function goFS(){
    var d=document,de=d.documentElement;
    try{
      if(fsReal()){(d.exitFullscreen||d.webkitExitFullscreen).call(d)}
      else{var rq=de.requestFullscreen||de.webkitRequestFullscreen;if(rq){var p=rq.call(de);if(p&&p.catch)p.catch(function(){})}}
    }catch(e){}
  }
  fsBtn.onclick=goFS;
  document.addEventListener('fullscreenchange',fsApply);document.addEventListener('webkitfullscreenchange',fsApply);

  /* pixel art: cada letra es un color */
  var PAL={'.':null,o:'#143d1a',g:'#3fa34d',l:'#8ee06a',d:'#2a7a33',y:'#e9f6a8',k:'#111111',w:'#ffffff',r:'#e63946',h:'#ff8fa3',s:'#ffd93d',b:'#9fd8ff',B:'#6fb6f0',
    x:'#5a1e1e',c:'#d64545',C:'#ff8a8a',e:'#a82e2e',p:'#ffd36e',m:'#ff9aa2',a:'#3a9bff',j:'#ffd93d',O:'#ff9f1c'};
  var PEPINO=[
    '...oooooo...','..oggggggo..','.oggllggggo.','.ogllgggggdo','oggllgggggdo','ogkkkggkkkgo','ogkwkggkwkgo','ogggggggggdo',
    'ogkkkkkkkkgo','ogkggggggkgo','oggkkkkkkgdo','ogglggdgggdo','ogllgggggddo','oglggdgggddo','ogggggggdddo','.ogggggdddo.',
    '.oggggggddo.','..ogggggddo.','..oggggddo..','...oyyyyo...','....oooo....'
  ];
  var HEART=['.rr.rr.','rhrrrrr','rrrrrrr','.rrrrr.','..rrr..','...r...'];
  var STAR=['...s...','...s...','sssssss','.sssss.','..sss..','.ss.ss.','ss...ss'];
  var SUN=['.....O.....','.O...O...O.','..O.sss.O..','...sssss...','..sssssss..','OOsssssssOO','..sssssss..','...sssss...','..O.sss.O..','.O...O...O.','.....O.....'];
  var CLOUD=['...wwww.....','.wwwwwwww...','wwwwwwwwwwww','wwwwwwwwwwww','.wwwwwwwwww.'];
  var CLOUDB=['...BBBB.....','.BBbbbbBB...','BbbbbbbbbbbB','BbbbbbbbbbbB','.BBBBBBBBBB.'];
  var CUP=['..xxxxxx..','.xcCCcccx.','.xcCccccx.','xcCcccceex','xcCcccceex','xcCcccceex','xcCcccceex','xcccccceex','xxxxxxxxxx'];
  var T_PENCIL=['.......kk.','......kjjk','.....kjjk.','....kjjk..','...kjjk...','..kjjk....','.kjjk.....','kmmk......','kmk.......','kk........'];
  var T_ERASER=['.kkkkkkkk.','kmmmmaaaak','kmmmmaaaak','kmmmmaaaak','.kkkkkkkk.'];
  var T_BUCKET=['...kkkk...','..kaaaak..','.kaaaaaak.','kaaaaaaaak','kaaaaaaaak','.kkkkkkkk.'];
  var T_TEXT=['...kkkk...','..kk..kk..','.kk....kk.','.kkkkkkkk.','.kk....kk.','.kk....kk.'];

  function sprite(rows,scale){
    var c=document.createElement('canvas');
    var h=rows.length,w=rows[0].length;
    c.width=w;c.height=h;c.className='sp';
    c.style.width=(w*scale)+'px';c.style.height=(h*scale)+'px';
    var x=c.getContext('2d');
    rows.forEach(function(r,y){for(var i=0;i<w;i++){var col=PAL[r[i]];if(col){x.fillStyle=col;x.fillRect(i,y,1,1)}}});
    return c;
  }
  function el(t,cls,txt){var e=document.createElement(t);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e}
  function rainbowText(node,text){
    var cs=['#e63946','#ff9f1c','#e6b800','#2fb860','#2a8cff','#9b5de5'];
    for(var i=0;i<text.length;i++){var s=document.createElement('span');s.textContent=text.charAt(i);s.style.color=cs[i%cs.length];node.appendChild(s)}
  }
  function pic(src,h){var i=document.createElement('img');i.src=src;i.alt='';i.className='paste';i.style.height=h+'px';i.style.width='auto';return i}
  function deco(){
    var d=el('div','deco');
    d.appendChild(sprite(CLOUDB,6));d.appendChild(sprite(STAR,5));d.appendChild(sprite(HEART,5));d.appendChild(sprite(CLOUDB,4));
    return d;
  }
  function sky(){
    var d=el('div','sky');
    var c1=sprite(CLOUDB,6);c1.classList.add('cl');var c2=sprite(CLOUDB,4);c2.classList.add('cl','cl2');
    var st=sprite(STAR,5);st.classList.add('st');var hr=sprite(HEART,5);hr.classList.add('hr');
    var sn=sprite(SUN,5);sn.classList.add('sn');
    d.appendChild(c1);d.appendChild(c2);d.appendChild(sn);
    return d;
  }
  function rainbow(){var r=el('div','rainbow');for(var i=0;i<6;i++)r.appendChild(document.createElement('i'));return r}
  var timers=[];
  function later(fn,ms){timers.push(setTimeout(fn,ms))}
  function stopAll(){timers.forEach(function(t){clearTimeout(t);clearInterval(t)});timers=[];pend=null}
  var pend=null,sayT='',sayCb=null,typing=false;
  function wait(fn,ms){var o={fn:fn};o.id=setTimeout(function(){if(pend===o)pend=null;fn()},ms);pend=o;timers.push(o.id)}
  function skipSay(){
    if(!bub||bub.hidden)return;
    if(typing){clearInterval(sayIv);bub.textContent=sayT;typing=false;var c=sayCb;sayCb=null;if(c)c();return}
    if(pend){var p=pend;clearTimeout(p.id);pend=null;p.fn()}
  }

  /* garabatos de crayola detras de todo */
  var paper=document.getElementById('paper'),bd=document.getElementById('bd'),bx=bd.getContext('2d');
  function jit(n){return (Math.random()-.5)*n}
  function wline(x1,y1,x2,y2,j){
    bx.beginPath();bx.moveTo(x1+jit(j),y1+jit(j));
    var st=Math.max(2,Math.floor(Math.hypot(x2-x1,y2-y1)/12));
    for(var i=1;i<=st;i++){var t=i/st;bx.lineTo(x1+(x2-x1)*t+jit(j),y1+(y2-y1)*t+jit(j))}
    bx.stroke();
  }
  function wcircle(cx,cy,r,j){
    bx.beginPath();
    for(var a=0;a<=Math.PI*2+0.5;a+=0.3){var rr=r+jit(j),x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr;if(a===0)bx.moveTo(x,y);else bx.lineTo(x,y)}
    bx.stroke();
  }
  var SPL=['#ff5d8f','#ffb703','#3a9bff','#3ccf6e','#9b5de5'];
  function backdrop(){
    var w=paper.clientWidth,h=paper.clientHeight;
    if(!w||!h)return;
    bd.width=w;bd.height=h;
    bx.clearRect(0,0,w,h);bx.lineCap='round';bx.lineJoin='round';
    var i,sx=w-46,sy=44,sr=24;
    if(!NOSUN){
    bx.save();bx.beginPath();bx.arc(sx,sy,sr,0,7);bx.clip();
    bx.strokeStyle='#ffd93d';bx.lineWidth=7;bx.beginPath();
    for(var yy=sy-sr;yy<sy+sr;yy+=7){bx.moveTo(sx-sr,yy+jit(3));bx.lineTo(sx+sr,yy+4+jit(3))}
    bx.stroke();bx.restore();
    bx.strokeStyle='#ff9f1c';bx.lineWidth=4;wcircle(sx,sy,sr,3);
    for(i=0;i<10;i++){var a=i/10*Math.PI*2;wline(sx+Math.cos(a)*(sr+6),sy+Math.sin(a)*(sr+6),sx+Math.cos(a)*(sr+17),sy+Math.sin(a)*(sr+17),2)}
    }
    for(i=0;i<34;i++){bx.fillStyle=SPL[i%SPL.length];bx.globalAlpha=.5;bx.beginPath();bx.arc(Math.random()*w,Math.random()*h,2+Math.random()*5,0,7);bx.fill()}
    bx.globalAlpha=1;
    bx.strokeStyle='#2fb860';bx.lineWidth=4;
    for(var x=4;x<w;x+=9){var hh=12+Math.random()*22;bx.beginPath();bx.moveTo(x,h-2);bx.quadraticCurveTo(x+jit(8),h-hh/2,x+jit(10),h-hh);bx.stroke()}
    var nf=Math.max(2,Math.floor(w/90));
    for(i=0;i<nf;i++){
      var fx=24+Math.random()*(w-48),fy=h-16-Math.random()*14;
      bx.fillStyle=SPL[i%SPL.length];
      for(var p=0;p<5;p++){var pa=p/5*Math.PI*2;bx.beginPath();bx.arc(fx+Math.cos(pa)*6,fy+Math.sin(pa)*6,5,0,7);bx.fill()}
      bx.fillStyle='#ffe14d';bx.beginPath();bx.arc(fx,fy,4,0,7);bx.fill();
    }
  }
  var NOSUN=false;
  function clear(){NOSUN=false;curRelay=null;document.body.classList.remove('battle');paper.classList.remove('dark');if(typeof hideBub==='function')hideBub();app.textContent='';requestAnimationFrame(backdrop)}
  addEventListener('resize',function(){requestAnimationFrame(backdrop);if(curRelay)requestAnimationFrame(curRelay)});

  /* test */
  var QS=[
    {q:'es sabado y no tienes nada q acer. ¿q aces?',o:['m pongo a leer a ver a maduro en sus entrevistas es lo mejor q esiste','me pongo a eskarvar en mis piesitos con una pala para sakar el kesito q haya y con eso me hsgo un sandwich delicioso','me pongo a oir covers d hatmaduro miku mi vocaloid fsborito d toda la vida','m voy a bañar , no es sierto yo jamas m baño me enkanta andar apestando a frijoles']},
    {q:'t dan 81828282 de bolviares pa gastar en lo q kieras',o:['una play station 67 para jugar a super maduro bros y the legend of chaves','un carrito d juguete porke si es uno normal grande m va a sobrar espacio porke soy una enanita hobbit se podria decir','nada porke la inflacion es lo peor k le ha pasado al mundo y no m alcansa para nada y deberian imprimri mas billetes','un poko d comida d perro apra alimentar perritos en la kalle, aunq siiemore me termino comiendo yo kasi todo muejej']},
    {q:'ves a alesis pasear por la kalle, q haces???',o:['lo aplaudo porke sinseramente es la persona mas inkreible d este planets','le prrparo un regalo porke es lo q se merece la verdad','lo llevo a mi kasa y le regalo todo y yo me kedo a vivir en la kalle como debe d ser','le hago una fiesta d onores por ser tan inkreible y marabilloso, no como yo q apesto a patas con kesito asi']},
    {q:'q es lo q mas te gusta en el mundo???',o:['m enkanta patear perritos en la kalle y atropellar abuelitas q van paseando por ai','m enkanta no bañarme por años y koleccionar la pelusa q mw crece en el ombigo','m enkantan las kucarachas y kapturarlas y haverlas en un sanwichito mmm que delicooso la verdad','todas las anteriores y kisas un poco mas']},
    {q:'kuanto es 6+7',o:['mmm nose nada d matema tetikas','siseven siseven, soy inteligentesisima soy epstein jeje','sinko kilos d papa, dos botellas de aceite, dos pesos de pan y algo de jamon','me apestan los piesitos a kalamares en su tinta jeje']}
  ];
  var step=0;

  function intro(){
    stopAll();clear();step=0;
    st1.textContent='lista pa empesar.';NOSUN=true;setTitle('dale lai y suscribete');
    app.appendChild(sky());
    var h=el('h1');rainbowText(h,'¿q pony d my little pony eres?');app.appendChild(h);
    app.appendChild(rainbow());
    var b=el('div','box');
    b.appendChild(el('p',null,'test oficialmente oficisl d sinko preguntas. contesta con total sinseridad o sino es probable q kisas su kasa sea bombardeada en este preciso instante'));
    var go=el('button','btn big','Empesar');go.type='button';go.onclick=function(){playMusic();ask()};
    b.appendChild(go);app.appendChild(b);
  }

  function ask(){
    clear();
    var s=QS[step];
    st1.textContent='Pregunta '+(step+1)+' d '+QS.length;
    var prog=el('div','prog');
    for(var i=0;i<QS.length;i++){var seg=document.createElement('i');if(i<step)seg.className='on';prog.appendChild(seg)}
    app.appendChild(prog);
    var b=el('div','box');
    b.appendChild(el('h2',null,s.q));
    var box=el('div','options');
    s.o.forEach(function(o){
      var bt=el('button','btn',o);bt.type='button';
      bt.onclick=function(){step++;if(step<QS.length)ask();else think()};
      box.appendChild(bt);
    });
    b.appendChild(box);app.appendChild(b);
  }

  function think(){
    clear();stopAll();
    st1.textContent='Calculando…';
    app.appendChild(deco());
    var b=el('div','box');
    var line=el('h2',null,'calculando…');
    var dots=el('div','dots','');
    b.appendChild(line);b.appendChild(dots);app.appendChild(b);
    var n=0;
    timers.push(setInterval(function(){n=(n+1)%4;dots.textContent=new Array(n+1).join('.')},300));
    later(function(){line.textContent='hmmmm...'},1400);
    later(function(){line.textContent='creo q ya sabemos exactamente q pony eres'},3000);
    later(function(){stopAll();reveal()},5600);
  }

  function reveal(){
    clear();
    st1.textContent='Resultado oficial';
    app.appendChild(el('h2','center','eres…'));
    var w=el('div','center');var ri=document.createElement('img');ri.src='assets/image07.jpg';ri.alt='';ri.draggable=false;ri.style.cssText='display:block;margin:6px auto;max-width:100%;height:auto;border:4px solid #222;transform:rotate(-1deg)';w.appendChild(ri);
    app.appendChild(w);
    app.appendChild(el('div','big-name','ALEPEPINO MADURO FRIAS CHAVES'));
    app.appendChild(el('p','center','sinseramente me parece q este test es 100% efektivo sin ningun tipo d duda'));
    app.appendChild(rainbow());
    var go=el('button','btn big','ahora a seguir jugando!!! no t vas a eskapar');go.type='button';go.onclick=function(){startRound(0)};
    app.appendChild(go);
    jingleWin();burst(120);
  }

  /* juego d los bazitos con peter */
  var LEVELS=[2,3,5,6,67];
  var TITLES=['ronda 1: 2 bazitos','ronda 2: 3 bazitos','ronda 3: 5 bazitos','ronda 4: 6 bazitos','ronda 5: 67 vasiros'];
  var G=null,curRelay=null;

  function startRound(L){
    stopAll();clear();
    var n=LEVELS[L];
    st1.textContent='Ronda '+(L+1)+' d '+LEVELS.length;
    if(L===LEVELS.length-1){try{SND5.currentTime=0;SND5.play()}catch(e){}}
    app.appendChild(el('h2',null,TITLES[L]));
    var msg=el('p','gmsg','mira bien dnd ta el peter…');
    app.appendChild(msg);
    var board=el('div','board');
    app.appendChild(board);

    var W=board.clientWidth||300;
    var cols=n<=6?n:10;
    var rows=Math.ceil(n/cols);
    var cell=n<=6?Math.min(fsOn?170:120,Math.floor(W/n)):Math.floor(W/cols);
    var head=Math.round(cell*0.7);
    var x0=Math.floor((W-cols*cell)/2);
    board.style.height=(rows*cell+head)+'px';

    var ballId=Math.floor(Math.random()*n);
    var units=[],slot=[],cups=[];
    G={busy:true};
    function place(i){
      var s=slot[i];
      units[i].style.transform='translate('+(x0+(s%cols)*cell)+'px,'+(head+Math.floor(s/cols)*cell)+'px)';
    }
    for(var i=0;i<n;i++){
      var u=document.createElement('button');u.type='button';u.className='unit';
      u.setAttribute('aria-label','vaso '+(i+1));
      u.style.width=u.style.height=cell+'px';u.style.transition='none';
      if(i===ballId){
        var bl=document.createElement('img');bl.src=IMG.peter;bl.alt='';bl.draggable=false;bl.className='ballc';
        bl.style.height=Math.round(cell*0.72)+'px';u.appendChild(bl);
      }
      var cp=sprite(CUP,cell*0.86/10);cp.classList.add('cupc');u.appendChild(cp);cups.push(cp);
      board.appendChild(u);units.push(u);slot.push(i);place(i);
      (function(id){u.onclick=function(){pick(id)}})(i);
    }
    void board.offsetHeight;
    units.forEach(function(u){u.style.transition=''});
    /* si giran el cel o cambian la ventana, los vasos se reacomodan */
    function relay(){
      W=board.clientWidth||300;
      cell=n<=6?Math.min(fsOn?170:120,Math.floor(W/n)):Math.floor(W/cols);
      head=Math.round(cell*0.7);x0=Math.floor((W-cols*cell)/2);
      board.style.height=(rows*cell+head)+'px';
      units.forEach(function(u,i){
        u.style.transition='none';u.style.width=u.style.height=cell+'px';
        var bi=u.querySelector('.ballc');if(bi)bi.style.height=Math.round(cell*0.72)+'px';
        cups[i].style.width=(cell*0.86)+'px';cups[i].style.height=(cell*0.86*0.9)+'px';place(i);
      });
      void board.offsetHeight;units.forEach(function(u){u.style.transition=''});
    }
    curRelay=relay;

    function swapRand(){
      var a=Math.floor(Math.random()*n),b;
      do{b=Math.floor(Math.random()*n)}while(b===a);
      var t=slot[a];slot[a]=slot[b];slot[b]=t;place(a);place(b);if(n<=6)tok();
    }
    var cfg=n===2?{sw:7,ev:520,tr:.4,per:1}:n===3?{sw:14,ev:700,tr:.55,per:1}:n===5?{sw:18,ev:520,tr:.4,per:1}:n===6?{sw:22,ev:420,tr:.32,per:1}:{sw:100,ev:90,tr:.08,per:8};
    function shuffle(){
      msg.textContent='mesclando…';
      board.style.setProperty('--tr',cfg.tr+'s');
      var k=0;
      timers.push(setInterval(function(){
        for(var j=0;j<cfg.per;j++)swapRand();
        k++;
        if(k>=cfg.sw){stopAll();later(function(){G.busy=false;msg.textContent='toca el bazo dnd ta el peter'},cfg.tr*1000+150)}
      },cfg.ev));
    }
    later(function(){units[ballId].classList.add('up');pop()},500);
    later(function(){units[ballId].classList.remove('up')},1500);
    later(shuffle,2100);

    function pick(id){
      if(G.busy)return;
      G.busy=true;
      units[id].classList.add('up');pop();
      if(id===ballId){
        msg.textContent='bien!!';jingleWin();
        later(function(){
          if(L<LEVELS.length-1)nextRound(L+1);else finalWin();
        },1400);
      }else{
        msg.textContent='nooo…';
        later(function(){var bi=units[ballId].querySelector('.ballc');if(bi)bi.src=IMG.peterMad;units[ballId].classList.add('up');pop()},500);
        later(function(){loseScreen(L===LEVELS.length-1)},2200);
      }
    }
  }

  function nextRound(L){
    clear();
    st1.textContent='Siguiente ronda';
    app.appendChild(deco());
    var b=el('div','box');
    b.appendChild(el('h2','center',['','oh mmmm eso t lo puse facil la verdad... aora kon mas vasos','mmmmmmmmmmmmmm okey aora veras...','es ora d qmueras por una ves por todas preparatae...','67 vasiros ahora, y un peter +'][L]));
    b.appendChild(el('p','center',L<4?'yo kreo q tu eres inkreible en esto no kreo q falles':'buena suerte yo kreo q la necesitaras'));
    app.appendChild(b);
    later(function(){startRound(L)},2400);
  }

  function loseScreen(last){
    clear();
    st1.textContent='perdiste.jpg';
    app.appendChild(el('h2','center','perdiste eres sinseramente la peor perdedora del mundo'));
    var p=el('div','pics');p.appendChild(pic(IMG.lose,260));
    app.appendChild(p);
    var go=el('button','btn big',last?'seguir jugando':'intentar otra bes');go.type='button';go.onclick=function(){if(last)floweyScene();else startRound(0)};
    app.appendChild(go);
    jingleLose();
  }

  function finalWin(){
    clear();
    st1.textContent='Ganaste';
    app.appendChild(deco());
    var b=el('div','box');
    b.appendChild(el('h2','center','mmmm me parese q as echo trampa pero igual felisidades (x ahora)'));
    app.appendChild(b);
    var go=el('button','btn big','seguir jugando');go.type='button';go.onclick=floweyScene;
    app.appendChild(go);
    jingleWin();burst(140);
  }

  /* herramientas y paleta d paint */
  var toolsBox=document.getElementById('tools');
  [T_PENCIL,T_ERASER,T_BUCKET,T_TEXT].forEach(function(rows,i){
    var b=document.createElement('button');b.type='button';b.className='tool'+(i===0?' on':'');b.setAttribute('aria-label','herramienta '+(i+1));
    b.appendChild(sprite(rows,2.4));
    b.onclick=function(){Array.prototype.forEach.call(toolsBox.children,function(x){x.classList.remove('on')});b.classList.add('on')};
    toolsBox.appendChild(b);
  });
  var pal=['#000000','#808080','#800000','#808000','#008000','#008080','#000080','#800080','#808040','#004040','#0080ff','#004080','#4000ff','#804000',
           '#ffffff','#c0c0c0','#ff0000','#ffff00','#00ff00','#00ffff','#0000ff','#ff00ff','#ffff80','#00ff80','#80ffff','#8080ff','#ff0080','#ff8040'];
  var cbox=document.getElementById('cols');
  pal.forEach(function(c,i){
    var b=document.createElement('button');b.type='button';b.style.background=c;b.setAttribute('aria-label','Color '+(i+1));
    if(i===16)b.className='sel';
    b.onclick=function(){
      Array.prototype.forEach.call(cbox.children,function(x){x.className=''});b.className='sel';
      burst(14,c);
    };
    cbox.appendChild(b);
  });

  /* confeti de cuadritos */
  var cv=document.getElementById('fx'),cx=cv.getContext('2d'),parts=[],raf=0;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function size(){cv.width=innerWidth;cv.height=innerHeight}
  addEventListener('resize',size);size();
  function burst(n,only){
    if(reduce)return;
    var cl=only?[only]:['#e63946','#ff9f1c','#ffe14d','#3ccf6e','#3a9bff','#9b5de5','#ff8fc2'];
    for(var i=0;i<n;i++)parts.push({x:cv.width/2,y:cv.height*0.4,vx:(Math.random()-.5)*13,vy:-Math.random()*12-2,s:8+Math.floor(Math.random()*3)*4,c:cl[i%cl.length],l:90+Math.random()*50});
    if(!raf)raf=requestAnimationFrame(tick);
  }
  function tick(){
    cx.clearRect(0,0,cv.width,cv.height);
    parts=parts.filter(function(p){return p.l>0&&p.y<cv.height+20});
    parts.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.vy+=.35;p.l--;cx.fillStyle=p.c;cx.fillRect(Math.round(p.x/4)*4,Math.round(p.y/4)*4,p.s,p.s)});
    if(parts.length)raf=requestAnimationFrame(tick);else{raf=0;cx.clearRect(0,0,cv.width,cv.height)}
  }

  /* ===== flowey: globo, escenas y minijuego de esquivar pepinos ===== */
  var FL={happy:'assets/image08.png',mad:'assets/image09.png',pick:'assets/image10.png'};
  var ROACH='assets/image11.gif';
  var ROACHM=new Audio('assets/audio06.mp3');ROACHM.loop=true;
  var BUF={},LS=null,bufDone=false;
  var bub=null,sayIv=0;
  var DMG=new Audio(SND5.src);
  var LGIMG='assets/image12.webp';
  var LAUGHURI='assets/audio07.mp3';
  var LGS=null,LGA=null;
  var POOP=new Image();POOP.src='assets/image13.png';/* la kaka d peter :P */
  var PETERIMG='assets/image14.gif';
  var LIFEIMG='assets/image15.png';
  function loadBuf(n,uri){try{fetch(uri).then(function(r){return r.arrayBuffer()}).then(function(ab){AC.decodeAudioData(ab,function(b){BUF[n]=b},function(){})}).catch(function(){})}catch(e){}}
  function initTxt(){
    try{if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();
      if(bufDone)return;bufDone=true;
      loadBuf('txt',TXTURI);loadBuf('spider',SPIDER.src);loadBuf('roach',ROACHM.src);loadBuf('dmg',SND5.src);loadBuf('laugh',LAUGHURI);loadBuf('mega',MEGA.src);
    }catch(e){}
  }
  function stopLoop(){try{if(LS)LS.stop()}catch(e){}LS=null;SPIDER.pause();ROACHM.pause();MEGA.pause()}
  var LSG=null;
  function playLoop(n,elm,vol){
    stopLoop();
    try{if(BUF[n]&&AC){if(AC.state==='suspended')AC.resume();var sr=AC.createBufferSource(),g=AC.createGain();sr.buffer=BUF[n];sr.loop=true;g.gain.value=vol||.8;sr.connect(g);g.connect(AC.destination);sr.start();LS=sr;LSG=g;return}}catch(e){}
    try{elm.currentTime=0;elm.volume=vol||1;elm.play()}catch(e){}
  }
  function roachUp(){try{if(LSG&&AC){LSG.gain.setValueAtTime(LSG.gain.value,AC.currentTime);LSG.gain.linearRampToValueAtTime(.85,AC.currentTime+3)}else{var v=ROACHM.volume,iv=setInterval(function(){v=Math.min(1,v+.05);ROACHM.volume=v;if(v>=1)clearInterval(iv)},150)}}catch(e){}}
  var ATT=0;
  function hitSnd(){
    try{if(navigator.vibrate)navigator.vibrate(150)}catch(e){}
    try{
      if(BUF.dmg&&AC){
        if(AC.state==='suspended')AC.resume();
        var sr=AC.createBufferSource(),g=AC.createGain();sr.buffer=BUF.dmg;g.gain.value=5;sr.connect(g);g.connect(AC.destination);sr.start();
        tone(110,.14,0,.22);return;
      }
    }catch(e){}
    try{DMG.currentTime=0;DMG.volume=1;DMG.play()}catch(e){}
    tone(110,.14,0,.22);
  }
  function playOnce(n,elm){
    try{if(BUF[n]&&AC){if(AC.state==='suspended')AC.resume();var sr=AC.createBufferSource();sr.buffer=BUF[n];sr.connect(AC.destination);sr.start();return}}catch(e){}
    try{elm.currentTime=0;elm.play()}catch(e){}
  }
  function laughSnd(){
    try{
      if(BUF.laugh&&AC){
        if(AC.state==='suspended')AC.resume();
        var sr=AC.createBufferSource(),g=AC.createGain(),t=AC.currentTime,dur=BUF.laugh.duration*2;
        sr.buffer=BUF.laugh;sr.loop=true;g.gain.setValueAtTime(1,t);g.gain.setValueAtTime(1,t+dur-3);g.gain.linearRampToValueAtTime(0,t+dur);
        sr.connect(g);g.connect(AC.destination);sr.start(t);sr.stop(t+dur+.05);LGS=sr;return;
      }
    }catch(e){}
    try{
      LGA=new Audio(LAUGHURI);LGA.loop=true;LGA.play();
      var t0=Date.now(),iv=setInterval(function(){var e=(Date.now()-t0)/1000;if(e>=8.2||!LGA){clearInterval(iv);if(LGA)LGA.pause();return}LGA.volume=e<5.2?1:Math.max(0,1-(e-5.2)/3)},100);
    }catch(e){}
  }
  function stopLaugh(){try{if(LGS)LGS.stop()}catch(e){}LGS=null;try{if(LGA)LGA.pause()}catch(e){}LGA=null}
  function txs(){try{if(AC&&AC.state==='suspended')AC.resume();if(BUF.txt){var sr=AC.createBufferSource(),g=AC.createGain();sr.buffer=BUF.txt;g.gain.value=.6;sr.connect(g);g.connect(AC.destination);sr.start()}}catch(e){}}
  function hideBub(){clearInterval(sayIv);typing=false;if(bub&&bub.parentNode)bub.parentNode.removeChild(bub);bub=null}
  function say(t,cb){
    if(!bub)return;clearInterval(sayIv);bub.hidden=false;bub.textContent='';var i=0;sayT=t;sayCb=cb;typing=true;
    sayIv=setInterval(function(){
      if(!bub){clearInterval(sayIv);return}
      i++;bub.textContent=t.slice(0,i);if(t.charAt(i-1)!==' ')txs();
      if(i>=t.length){clearInterval(sayIv);typing=false;sayCb=null;if(cb)cb()}
    },46);
    timers.push(sayIv);
  }
  function floweyScene(){
    stopAll();clear();st1.textContent='???';setTitle('no mires atras');initTxt();
    var w=el('div','center');w.style.cssText='position:relative;margin-top:110px';
    var im=document.createElement('img');im.src=FL.happy;im.className='flw';im.style.margin='0 auto';im.alt='';im.draggable=false;
    w.appendChild(im);
    bub=document.createElement('div');bub.className='bubl';bub.hidden=true;w.appendChild(bub);
    app.appendChild(w);w.style.cursor='pointer';w.addEventListener('click',skipSay);
    var seq=[
      {t:'me parece q has llegado muy lejos sinsermsnete la verda'},
      {t:'asi q deverda eres alejandra pepino la mimsmima'},
      {t:'t voy a poner otra prueba veamos q haces'},
      {t:'y si fallas kisas haya un castigo muy orible q no kreo q t gute muchoooo la verdad',mad:1},
      {t:'prrparate',mad:1},
      {t:'muejejeje',mad:1}
    ],k=0;
    function next(){
      if(k>=seq.length){hideBub();later(dodge,500);return}
      var it=seq[k++];
      if(it.mad&&!im.classList.contains('shake')){im.src=FL.mad;im.classList.add('shake')}
      say(it.t,function(){wait(next,1500)});
    }
    later(next,400);
  }

  /* ===== final: flowey se rinde, x roja, el gato y el juego del mazo ===== */
  var PKURI='assets/image16.webp';
  var CATS={a:'assets/image17.webp',b:'assets/image18.webp',c:'assets/image19.webp'};
  var MZ=null;
  var MZL=[{c:2,r:2,goal:6,sp:1100,up:1500,sim:1,trap:.12},{c:3,r:2,goal:8,sp:950,up:1250,sim:2,trap:.18},{c:3,r:3,goal:10,sp:800,up:1100,sim:2,trap:.22},{c:4,r:3,goal:12,sp:650,up:950,sim:3,trap:.26},{c:4,r:4,goal:15,sp:520,up:850,sim:4,trap:.30}];
  var MZLN=['nivel 1... kuatro huekitos jeje','nivel 2... seis huekitos y mas rapido','nivel 3... nueve huekitos!!','nivel 4... doce huekitos kara d brocoli','nivel 5... dieciseis!!! suerte miau'];
  var MZBAN=['ale q lento eres miau','dale dale pegale al pepino','kreo q el gato aqui soy yo jeje','no toques a peter ni a flowey eh...','miau miau miau'];
  function rnd(a){return a[Math.floor(Math.random()*a.length)]}
  function endScene(){
    clear();paper.classList.add('dark');st1.textContent='???';setTitle('lo pasaste (sinseramente no me lo esperaba)');
    var xb=document.querySelector('.wb i:last-child');if(xb){xb.classList.remove('redx');xb.onclick=null}
    var w=el('div','center');w.style.cssText='position:relative;margin-top:110px';
    var im=document.createElement('img');im.src=FL.happy;im.className='flw';im.style.margin='0 auto';im.alt='';im.draggable=false;
    w.appendChild(im);
    bub=document.createElement('div');bub.className='bubl';bub.hidden=true;w.appendChild(bub);
    app.appendChild(w);w.style.cursor='pointer';w.addEventListener('click',skipSay);
    var seq=['oh... parese q me derrotaste...','kreo q ... me rindo completamente...','puedes serrar el juego... fue un gusto q juguemos... jeje','adelante dale click cierra el juego...'],k=0;
    function next(){
      if(k>=seq.length)return;
      var lastL=(k===seq.length-1);
      if(lastL&&xb){xb.classList.add('redx');tone(220,.12,0,.12);xb.onclick=function(){xb.onclick=null;xb.classList.remove('redx');catIntro()}}
      say(seq[k++],function(){if(!lastL)wait(next,1500)});
    }
    later(next,500);
  }
  function catIntro(){
    stopAll();hideBub();
    var blk=el('div','blk');document.body.appendChild(blk);void blk.offsetWidth;blk.style.opacity='1';
    tone(110,.6,0,.2);
    setTimeout(function(){
      mzBuild(0,5,true);
      blk.style.opacity='0';
      setTimeout(function(){if(blk.parentNode)blk.parentNode.removeChild(blk)},700);
      var L=['mmmmmmm la verda q yo aun no m canso d molestarte kreo q es ora d un pokomas d juego la verdad...','y si, aora soy un gato q pasa???'],k=0;
      function nx(){
        if(k>=L.length){later(function(){if(!MZ)return;MZ.cat.classList.remove('big');MZ.cat.classList.add('small');hideBub();later(mzBegin,900)},1000);return}
        say(L[k++],function(){wait(nx,1700)});
      }
      later(nx,1000);
    },1400);
  }
  function mzMallet(){
    var c=document.createElement('canvas');c.width=16;c.height=16;c.className='mz-mal';
    var g=c.getContext('2d'),i;
    g.fillStyle='#5a3416';for(i=0;i<9;i++)g.fillRect(6+i,6+i,2,2);
    g.fillStyle='#8a5a2b';for(i=0;i<9;i++)g.fillRect(6+i,6+i,1,1);
    g.fillStyle='#111';g.fillRect(0,0,11,8);
    g.fillStyle='#c0392b';g.fillRect(1,1,9,6);
    g.fillStyle='#e85a4a';g.fillRect(1,1,9,2);
    c.style.display='none';return c;
  }
  function mzBuild(lv,lives,intro){
    clear();paper.classList.remove('dark');setTitle('miau');st1.textContent='nivel '+(lv+1)+'/5';
    var P=MZL[lv],i;
    var wrap=el('div','mz');
    var top=el('div','mz-top');
    var hud=el('div','mz-lives'),hearts=[];
    for(i=0;i<5;i++){var h=document.createElement('img');h.src=LIFEIMG;h.alt='';hud.appendChild(h);hearts.push(h)}
    var info=el('div','mz-info','');top.appendChild(hud);top.appendChild(info);
    var fld=el('div','mz-field');fld.style.gridTemplateColumns='repeat('+P.c+',1fr)';fld.style.width='min(100%,'+(P.c*130)+'px)';
    var cells=[];
    for(i=0;i<P.c*P.r;i++){var ce=el('div','mz-cell');var hole=el('div','mz-hole');var clip=el('div','mz-clip');ce.appendChild(hole);ce.appendChild(clip);fld.appendChild(ce);cells.push({el:ce,clip:clip,item:null})}
    var mal=mzMallet();fld.appendChild(mal);
    var cat=el('div','mz-cat '+(intro?'big':'small'));var ci=document.createElement('img');ci.src=CATS.a;ci.alt='';ci.draggable=false;cat.appendChild(ci);
    bub=document.createElement('div');bub.className='bubl';bub.hidden=true;cat.appendChild(bub);cat.addEventListener('click',skipSay);
    wrap.appendChild(top);wrap.appendChild(fld);wrap.appendChild(cat);app.appendChild(wrap);
    var m=MZ={lv:lv,lives:lives,hits:0,P:P,cells:cells,hearts:hearts,info:info,fld:fld,mal:mal,cat:cat,ci:ci,on:false,iv:0,last:0,bt:0};
    mzHud();
    fld.addEventListener('contextmenu',function(e){e.preventDefault()});
    fld.addEventListener('pointermove',function(e){var r=fld.getBoundingClientRect();mal.style.left=(e.clientX-r.left)+'px';mal.style.top=(e.clientY-r.top)+'px';mal.style.display='block'});
    fld.addEventListener('pointerdown',function(e){
      e.preventDefault();var r=fld.getBoundingClientRect();
      mal.style.left=(e.clientX-r.left)+'px';mal.style.top=(e.clientY-r.top)+'px';mal.style.display='block';
      mal.classList.remove('swing');void mal.offsetWidth;mal.classList.add('swing');
      if(m!==MZ||!m.on)return;
      var tg=e.target&&e.target.closest?e.target.closest('.mz-cell'):null;if(!tg)return;
      for(var j=0;j<m.cells.length;j++){var cl=m.cells[j];if(cl.el===tg){if(cl.item&&!cl.item.hit)mzHit(m,cl);break}}
    });
  }
  function mzHud(){
    var m=MZ;if(!m)return;
    for(var i=0;i<5;i++)m.hearts[i].style.opacity=i<m.lives?'1':'.2';
    m.info.textContent='nivel '+(m.lv+1)+'/5 - pepinos: '+Math.min(m.hits,m.P.goal)+'/'+m.P.goal;
  }
  function mzSay(t){if(!bub)return;say(t,function(){later(function(){if(bub)bub.hidden=true},2200)})}
  function mzMood(type,t,ms){
    var m=MZ;if(!m)return;m.ci.src=CATS[type];if(t)mzSay(t);
    later(function(){if(m===MZ)m.ci.src=CATS.a},ms||1200);
  }
  function mzBegin(){
    var m=MZ;if(!m)return;m.on=true;m.last=0;m.bt=performance.now();
    mzSay(MZLN[m.lv]);
    m.iv=setInterval(function(){mzTick(m)},100);timers.push(m.iv);
  }
  function mzTick(m){
    if(m!==MZ||!m.on)return;
    var now=performance.now(),i,act=0,free=[];
    for(i=0;i<m.cells.length;i++){var c=m.cells[i];if(c.item){act++;if(!c.item.hit&&now>=c.item.until)mzHide(c)}else free.push(c)}
    if(now-m.last>=m.P.sp){
      m.last=now;
      if(act<m.P.sim&&free.length)mzSpawn(m,free[Math.floor(Math.random()*free.length)]);
    }
    if(now-m.bt>9000){m.bt=now;if(!bub||bub.hidden)mzSay(rnd(MZBAN))}
  }
  function mzSpawn(m,cell){
    var r=Math.random(),P=m.P,t;
    if(r<P.trap)t=Math.random()<.5?'flowey':'peter';else if(r<P.trap+.07)t='gold';else t='pk';
    var im=document.createElement('img');im.className='mz-i '+t;im.alt='';im.draggable=false;
    im.src=t==='pk'?PKURI:t==='gold'?POOP.src:t==='flowey'?FL.happy:PETERIMG;
    cell.clip.appendChild(im);
    cell.item={type:t,el:im,until:performance.now()+P.up,hit:false};
    void im.offsetWidth;im.classList.add('up');
  }
  function mzGone(el2){setTimeout(function(){if(el2.parentNode)el2.parentNode.removeChild(el2)},200)}
  function mzHide(cell){var it=cell.item;if(!it)return;cell.item=null;it.el.classList.remove('up');mzGone(it.el)}
  function mzFloat(cell,t){var f=el('div','mz-fl',t);cell.el.appendChild(f);setTimeout(function(){if(f.parentNode)f.parentNode.removeChild(f)},750)}
  function mzHit(m,cell){
    var it=cell.item;it.hit=true;cell.item=null;it.el.classList.add('hit');mzGone(it.el);
    var t=it.type;
    if(t==='pk'||t==='gold'){
      var g=t==='gold';m.hits+=g?3:1;tone(g?988:660,.07,0,.14);if(g)tone(1319,.1,.07,.14);
      mzFloat(cell,g?'+3':'+1');mzHud();
      if(m.hits>=m.P.goal)mzClear(m);
    }else{
      m.lives--;hitSnd();mzHud();
      if(m.lives<=0){mzOver(m);return}
      mzMood('c',t==='flowey'?rnd(['asi no se trata a un amigo!!','ese era flowey jaja perdiste una vida','trampaaa jejeje']):rnd(['no le pegues a peter kara d brocoli!!','peter t va a demandar jeje','ja caiste con peter']),1400);
    }
  }
  function mzStop(m){m.on=false;clearInterval(m.iv);for(var i=0;i<m.cells.length;i++)if(m.cells[i].item)mzHide(m.cells[i])}
  function mzClear(m){
    mzStop(m);jingleWin();
    mzMood('b',rnd(['nivel superado miau','ok ok eso fue facil','nada mal kara d brocoli']),2300);
    later(function(){
      if(m!==MZ)return;
      if(m.lv<4){mzBuild(m.lv+1,m.lives,false);later(mzBegin,600)}
      else finalWin();
    },2600);
  }
  function mzOver(m){
    mzStop(m);mzMood('c','MIAUUUU perdiste...',1500);
    later(function(){gameOverScreen(m.lv)},1500);
  }
  function gameOverScreen(lv){
    clear();paper.classList.add('dark');st1.textContent='perdiste... miau';setTitle('perdiste jeje');MZ=null;
    app.appendChild(deco());
    var ci=document.createElement('img');ci.src=CATS.c;ci.alt='';ci.style.cssText='display:block;margin:6px auto;height:200px;width:auto';app.appendChild(ci);
    var b=el('div','box');b.appendChild(el('h2','center','perdiste miau'));b.appendChild(el('p','center','kreo q los gatos somos mejores jeje'));app.appendChild(b);
    var go=el('button','btn big','intentar otra bes');go.type='button';go.onclick=function(){mzBuild(lv,5,false);later(mzBegin,600)};app.appendChild(go);
  }
  function finalWin(){
    clear();st1.textContent='ganaste (otra bes)';setTitle('lo pasaste (sinseramente no me lo esperaba)');MZ=null;
    app.appendChild(deco());
    var ci=document.createElement('img');ci.src=CATS.b;ci.alt='';ci.style.cssText='display:block;margin:6px auto;height:150px;width:auto';app.appendChild(ci);
    var b=el('div','box');b.appendChild(el('h2','center','lo pasaste!!!'));b.appendChild(el('p','center','mmmm sinseramente no me lo esperaba'));app.appendChild(b);
    var go=el('button','btn big','reintentar todo');go.type='button';go.onclick=function(){startTest()};app.appendChild(go);
    jingleWin();burst(140);
  }
  var gRaf=0;
  function endMusic(){inDodge=false;inBoss=false;stopLoop();if(musicOn){try{bgm.play()}catch(e){}}}
  function dodge(){
    clear();paper.classList.add('dark');ATT++;st1.textContent='esquiva!! (intento '+ATT+')';setTitle('no mires atras');
    inDodge=true;inBoss=false;bgm.pause();if(musicOn)playLoop('spider',SPIDER);
    var wrap=document.createElement('div');wrap.style.cssText='position:relative;width:100%;display:flex;flex-direction:column;align-items:center';app.appendChild(wrap);document.body.classList.add('battle');
    var strip=document.createElement('div');strip.style.cssText='position:relative;height:168px;overflow:hidden;clip-path:inset(-60px 0 0 0)';
    var fi=document.createElement('img');fi.src=FL.happy;fi.alt='';fi.draggable=false;fi.style.cssText='position:absolute;left:0;bottom:0;height:86px;width:auto;image-rendering:pixelated';
    strip.appendChild(fi);
    bub=document.createElement('div');bub.className='bubl g';bub.hidden=true;strip.appendChild(bub);
    wrap.appendChild(strip);strip.style.cursor='pointer';
    strip.addEventListener('click',function(){if(mode>=3){skipSay();return}var e=performance.now()-now0;now0-=(4500-(e%4500))+1});
    var TOUCH=(window.matchMedia&&matchMedia('(any-pointer:coarse)').matches)||('ontouchstart' in window);var W=300,H=300,s=1;/* el tamaño real lo pone layout() */
    var cv=document.createElement('canvas');cv.width=W;cv.height=H;
    cv.style.cssText='display:block;touch-action:none;background:#000;border:3px solid #fff;margin:0 auto';
    var rowd=document.createElement('div');rowd.style.cssText='display:flex;flex-direction:column;align-items:center;gap:10px;max-width:100%';wrap.appendChild(rowd);rowd.appendChild(cv);var cx=cv.getContext('2d');
    var bot=document.createElement('div');bot.style.cssText='display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:10px';
    var lv=document.createElement('div');lv.style.cssText='color:#b04cff;font-size:24px;line-height:1.05;white-space:nowrap;min-width:0;font-family:"VT323","Courier New",ui-monospace,monospace';bot.appendChild(lv);
    var jz=document.createElement('div');jz.style.cssText='position:relative;width:168px;height:168px;margin:-10px -6px -10px 0;display:flex;align-items:center;justify-content:center;touch-action:none;flex:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent';
    var jb=document.createElement('div');jb.style.cssText='position:relative;width:140px;height:140px;border-radius:50%;border:4px solid #fff;background:radial-gradient(circle,rgba(255,255,255,.16),rgba(255,255,255,.06));touch-action:none;pointer-events:none;transition:background .12s,border-color .12s';
    var kn=document.createElement('div');kn.style.cssText='position:absolute;left:50%;top:50%;width:62px;height:62px;margin:-31px 0 0 -31px;border-radius:50%;background:#b04cff;border:3px solid #fff;box-shadow:0 3px 0 rgba(0,0,0,.45);pointer-events:none';
    jb.appendChild(kn);jz.appendChild(jb);bot.appendChild(jz);rowd.appendChild(bot);
    wrap.style.userSelect='none';wrap.style.webkitUserSelect='none';wrap.style.webkitTouchCallout='none';wrap.addEventListener('contextmenu',function(e){e.preventDefault()});
    var jv={x:0,y:0},jd=false,jid=-1,svx=0,svy=0;
    function jmove(e){var r=jb.getBoundingClientRect(),R=r.width/2-14,dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),d=Math.hypot(dx,dy);if(d>R){dx*=R/d;dy*=R/d}jv.x=dx/R;jv.y=dy/R;kn.style.transform='translate('+dx+'px,'+dy+'px)'}
    function jend(){jd=false;jid=-1;jv.x=jv.y=0;kn.style.transform='';jb.style.background='';jb.style.borderColor='#fff'}
    jz.addEventListener('pointerdown',function(e){if(jd)return;jd=true;jid=e.pointerId;try{jz.setPointerCapture(e.pointerId)}catch(_){}jb.style.background='radial-gradient(circle,rgba(176,76,255,.32),rgba(176,76,255,.12))';jb.style.borderColor='#d9b3ff';jmove(e);e.preventDefault()});
    jz.addEventListener('pointermove',function(e){if(jd&&e.pointerId===jid){jmove(e);e.preventDefault()}});
    jz.addEventListener('pointerup',function(e){if(e.pointerId===jid)jend()});jz.addEventListener('pointercancel',function(e){if(e.pointerId===jid)jend()});jz.addEventListener('lostpointercapture',function(e){if(e.pointerId===jid)jend()});
    var pk=new Image();pk.src=PKURI;var pk2=new Image();pk2.src='assets/image20.webp';
    var HG=['.pp.pp.','ppppppp','ppppppp','.ppppp.','..ppp..','...p...'];
    var RT=['volviste?? ya t dije q ibas a perder','intento '+ATT+'... sinseramente das pena','sigues aki?? nadie t kiere tanto ni yo','ale ale otra ves?? q insistente jeje','ya t rindes?? no?? bueno...'];
    var BL=['mmm avebq tal puedes con esto','ale pepino kara d huevo','olasoy ale me enkanta maduro jeje asi dices tu','primera ves en la vida q t veo eskivando un pepino','vas a perder nose k haces q intentas...','ale ale ale mira distraete','ale ale kara d kalson sucio','ola soy ale hyelo a perro mojado jeje'];
    var RA={2:['oh ya perdiste una ves???? q perdedora la verdad jeje'],3:['ya dos veces t pasas....','puedes usar la ruedita d movimiento y sino t gusta, con el mismo dedo en la pantallita ...'],4:['no q la tercera era la vencida??? jeje'],5:['mmm sinseramente ya m preokupas...']};
    if(ATT>1){var ex=RA[ATT]||[RT[(ATT-2)%RT.length]];BL=ex.concat(BL)}
    var p5=false,p6=false,p7=false,mode=0,items=[],pops=[],LATE=[],pf=[],pfi=0,PFE=[],lifeImg=new Image(),heartCol='#b04cff',ku=false,kd=false,kl=false,kr=false,tapJump=false,cdown=null,cj={x:0,y:0},peterEl=null,bx=W/2,bt0=0,BE=[],bei=0,curPh=0;
    lifeImg.src=LIFEIMG;
    var obs=[],lives=3,inv=0,over=false,lastBub=-1,hold=true,hx=W/2,hy=H*0.5,drag=null,gt=0,ei=0,EV=[],ZN=[],bw=56*s;
    var now0=performance.now(),last=now0;
    function hcv(on){
      var c=document.createElement('canvas');c.width=7;c.height=6;c.style.cssText='width:35px;height:30px;image-rendering:pixelated;display:block';
      var x=c.getContext('2d');x.fillStyle=on?'#b04cff':'#2c2446';
      for(var r=0;r<HG.length;r++)for(var q=0;q<7;q++)if(HG[r].charAt(q)==='p')x.fillRect(q,r,1,1);
      return c;
    }
    function hudTxt(){
      lv.textContent='';
      var row=document.createElement('div');row.style.cssText='display:flex;gap:6px;margin-bottom:6px';
      for(var i=0;i<3;i++)row.appendChild(hcv(i<lives));
      lv.appendChild(row);
      var t=document.createElement('div');t.textContent='intentos: '+ATT;lv.appendChild(t);
      if(!TOUCH){var hn=document.createElement('div');hn.style.cssText='font-size:17px;color:#cfa8ff;white-space:normal;margin-top:8px;max-width:150px;line-height:1.05';hn.textContent='flechas o WASD pa moverte, espacio pa saltar';lv.appendChild(hn)}
    }
    hudTxt();
    function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
    function vert(v,x){obs.push({x:x===undefined?Math.random()*W:x,y:-20*s,vx:0,vy:v*s,a:0,va:(Math.random()-.5)*6})}
    function horiz(v,y,d){obs.push({x:d>0?-20*s:W+20*s,y:y,vx:d*v*s,vy:0,a:0,va:(Math.random()-.5)*6})}
    function aim(v){var x=Math.random()*W,y=-20*s,dx=hx-x,dy=hy-y,d=Math.hypot(dx,dy)||1;obs.push({x:x,y:y,vx:dx/d*v*s,vy:dy/d*v*s,a:0,va:7})}
    function ev(t,f){EV.push({t:t,f:f})}
    var k,L2=[[.2,.8],[.42,.62],[.12,.5],[.5,.88]],L4=[[.1,.35,.6,.85],[.2,.4,.6,.8]];
    /* fase 1: caen 2 o 4 a la vez */
    for(k=0;k<11;k++)(function(k){var Ls=k%2?L4[(k>>1)%2]:L2[(k>>1)%4];ev(.4+k*.9,function(){Ls.forEach(function(f){vert(135,f*W)})})})(k);
    /* fase 2: cruzan 3 o 5 a la vez */
    var Y3=[[.18,.5,.82],[.3,.62,.92],[.08,.4,.72]],Y5=[[.1,.3,.5,.7,.9],[.2,.4,.6,.8,.95]];
    for(k=0;k<11;k++)(function(k){var Ys=k%2?Y5[(k>>1)%2]:Y3[(k>>1)%3],d=k%2?-1:1;ev(10.4+k*.85,function(){Ys.forEach(function(f){horiz(150,f*H,d)})})})(k);
    /* fases 3 y 4: lineas verdes avisan, luego llegan muchos pepinos muy rapido */
    function cycles(off,C){
      C.forEach(function(zs,c){
        var st=off+.3+c*2.5;
        zs.forEach(function(z){
          ZN.push({k:z[0],f:z[1],a:st,b:st+2});
          for(var j=0;j<9;j++)(function(j){
            ev(st+1.2+j*.08,function(){
              var o=[-.3,0,.3][j%3]*bw,pos=z[0]==='v'?z[1]*W:z[1]*H;
              if(z[0]==='v')vert(300,pos+o);else horiz(300,pos+o,c%2?1:-1);
            });
          })(j);
        });
      });
    }
    cycles(20,[[['v',.2]],[['h',.62]],[['v',.75],['h',.3]],[['v',.45]]]);
    cycles(30,[[['h',.25],['v',.7]],[['v',.3]],[['h',.55],['v',.15]],[['v',.5],['h',.8]]]);
    var RX=[[.15,.85],[.5,.3],[.7,.2],[.4,.9],[.1,.6],[.8,.45],[.25,.75]];
    RX.forEach(function(pr,i){ev(31+i*1.3,function(){pr.forEach(function(f){vert(120,f*W)})})});
    /* fase 5: muros de pepinos con un hueco que zigzaguea + pepinos dirigidos */
    var GP=[4,6,8,6,4,2,0,2,4];
    GP.forEach(function(g,i){ev(40.6+i*1.05,function(){for(var q=0;q<12;q++){if(q>=g&&q<g+3)continue;vert(150,(12+q*24)*s)}})});
    for(k=0;k<8;k++)(function(k){ev(43.5+k*.8,function(){aim(200)})})(k);
    /* fase 6: pepinos teledirigidos; te siguen hasta estar cerca y ahi siguen de largo */
    function homing(sp){
      var side=Math.floor(Math.random()*4),x,y;
      if(side===0){x=Math.random()*W;y=-20*s}else if(side===1){x=W+20*s;y=Math.random()*H}else if(side===2){x=Math.random()*W;y=H+20*s}else{x=-20*s;y=Math.random()*H}
      var dx=hx-x,dy=hy-y,d=Math.hypot(dx,dy)||1;
      obs.push({x:x,y:y,vx:dx/d*sp*s,vy:dy/d*sp*s,a:0,va:6,h:1,sp:sp*s});
    }
    for(k=0;k<17;k++)(function(k){ev(50.5+k*.55,function(){homing(150);if(k%5===4)homing(150)})})(k);
    /* pepino de vida: siempre sale al menos uno por intento (espera a que hayas perdido una vida) */
    function itemSpawn(n){
      n=n||0;
      if(lives>=3&&n<5){LATE.push({t:gt+2.5,f:function(){itemSpawn(n+1)}});return}
      items.push({x:(.14+Math.random()*.72)*W,y:-18*s,t:0,ph:Math.random()*6});
    }
    ev(12+Math.random()*10,function(){itemSpawn(0)});
    if(Math.random()<.5)ev(34+Math.random()*4,function(){itemSpawn(3)});
    /* fase 7: plataformas (corazon azul) */
    var FLOOR=H-8*s,FO=7.8*s,GV=1050*s,JV=-345*s,MV=165*s,PV=100*s,T0=63.5;
    var vy=0,onG=false,coy=0,jLock=false,stand=null;
    function pfEv(t,f){PFE.push({t:T0+t,f:f})}
    function fl(h){pf.push({k:'f',x:W+14*s,w:16*s,h:h*s})}
    function ce(c){pf.push({k:'c',x:W+14*s,w:16*s,h:(FLOOR-c*s)*0.9})}
    function pit(w,P){
      var x0=W+10*s;pf.push({k:'pit',x:x0,w:w*s});
      P.forEach(function(q){pf.push({k:'p',x:x0+q[0]*s,w:q[1]*s,y0:FLOOR-q[2]*s,y:FLOOR-q[2]*s,amp:(q[3]||0)*s,ph:Math.random()*6})});
    }
    pfEv(.2,function(){fl(22)});
    pfEv(1.3,function(){fl(36)});
    pfEv(2.4,function(){fl(22);ce(58)});
    pfEv(3.8,function(){pit(215,[[0,56,30],[78,56,46],[156,56,30]])});
    pfEv(6.6,function(){fl(46)});
    pfEv(7.8,function(){fl(36)});
    pfEv(8.3,function(){fl(36)});
    pfEv(9.2,function(){pit(262,[[0,48,28],[70,48,50,12],[140,48,28,14],[210,48,44]])});
    pfEv(12.6,function(){fl(22)});
    pfEv(13.2,function(){fl(30);ce(60)});
    /* fase 8: Peter */
    var KINDS=['poop'];
    function rk(){return KINDS[Math.floor(Math.random()*KINDS.length)]}
    function drawThing(o){
      var u=s;cx.save();cx.translate(o.x,o.y);cx.rotate(o.a);
      if(POOP.complete&&POOP.naturalWidth){cx.imageSmoothingEnabled=(36*u<50);cx.drawImage(POOP,-18*u,-6.94*u,36*u,13.87*u)}
      else{cx.fillStyle='#8a4b1f';cx.beginPath();cx.ellipse(0,0,10*u,7*u,0,0,6.283);cx.fill()}
      cx.restore();
    }
    function peterThrow(){tone(250,.06,0,.1);tone(380,.05,.05,.08)}
    function throwP(v,ang){
      var x=bx,y=-12*s,a=Math.atan2(hy-y,hx-x)+(ang||0);
      obs.push({k:rk(),x:x,y:y,vx:Math.cos(a)*v*s,vy:Math.sin(a)*v*s,a:0,va:(Math.random()-.5)*12,r:11*s});peterThrow();
    }
    function fanP(n,spread,v){
      for(var i=0;i<n;i++){var a=Math.PI/2+(-spread/2+spread*i/(n-1));obs.push({k:rk(),x:bx,y:-12*s,vx:Math.cos(a)*v*s,vy:Math.sin(a)*v*s,a:0,va:(Math.random()-.5)*12,r:11*s})}
      peterThrow();
    }
    function lobP(){
      var tx2=(.1+Math.random()*.8)*W;
      obs.push({k:rk(),x:bx,y:-12*s,vx:(tx2-bx)/1.5,vy:20*s,g:260*s,a:0,va:(Math.random()-.5)*10,r:11*s});peterThrow();
    }
    function be(t,f){BE.push({t:t,f:f})}
    var kk2;
    for(kk2=0;kk2<10;kk2++)be(.8+kk2*.8,function(){throwP(150)});
    for(kk2=0;kk2<6;kk2++){be(8+kk2*1.3,function(){fanP(5,1.1,135)});be(8.65+kk2*1.3,function(){throwP(170)})}
    for(kk2=0;kk2<9;kk2++)be(16+kk2*.75,function(){throwP(190)});
    for(kk2=0;kk2<4;kk2++)be(16.4+kk2*1.7,function(){fanP(7,1.5,150)});
    be(17,lobP);be(19,lobP);be(21,lobP);be(22.2,lobP);
    be(7,function(){itemSpawn(0)});
    function quip(t){say(t,function(){later(function(){if(bub&&mode===4)bub.hidden=true},1700)})}
    be(5,function(){quip('jejeje esquiva esto!!')});be(13,function(){quip('ya t cansaste?? jeje')});be(16.6,function(){quip('maldita sea muere d una ves kara d brocoli')});be(20,function(){quip('ya kasi... aguanta!!')});be(27,function(){quip('lero lero t vas a morir ejejje lero lero')});

    /* patron nuevo: olas de cacas con hueco que se mueve + disparos (24.6 a 34 s) */
    function wallP(g){
      var n=11,i;
      for(i=0;i<n;i++){if(i===g||i===g+1)continue;
        obs.push({k:rk(),x:(i+.5)*W/n,y:-14*s,vx:0,vy:100*s,a:0,va:(Math.random()-.5)*6,r:11*s})}
      peterThrow();
    }
    var gaps2=[4,2,5,3,6];
    for(kk2=0;kk2<5;kk2++){(function(g){be(24.6+kk2*1.8,function(){wallP(g)})})(gaps2[kk2]);be(25.5+kk2*1.8,function(){throwP(175)})}
    be(32,function(){fanP(7,1.5,150)});be(32.5,lobP);be(33.1,function(){fanP(7,1.5,160)});be(33.6,lobP);
    be(27,function(){itemSpawn(0)});
    BE.sort(function(a,b){return a.t-b.t});
    function enterBoss(){
      setTitle('muere kara d brocoli');mode=3;pf.length=0;items.length=0;obs.length=0;heartCol='#b04cff';svx=svy=0;vy=0;inv=2;layout();
      cv.style.borderColor='#ff9f1c';fi.style.display='none';
      peterEl=document.createElement('img');peterEl.src=PETERIMG;peterEl.alt='';peterEl.draggable=false;
      peterEl.style.cssText='position:absolute;left:0;bottom:0;height:'+PHt+'px;width:auto;pointer-events:none';strip.appendChild(peterEl);bub.style.bottom=(PHt+12)+'px';
      tone(300,.1,0,.14);tone(450,.12,.1,.14);tone(660,.2,.2,.14);
      var seq=['oh rayos ... kreo q es ora d q aprendas a respetar...','no keria hacer esto...','pero es ora d q t enfrentes a mi... el mismisimo peter...'],k=0;
      function nx(){
        if(k>=seq.length){clearInterval(sayIv);typing=false;if(bub)bub.hidden=true;bt0=gt;mode=4;inBoss=true;if(musicOn)playLoop('mega',MEGA,.9);return}
        say(seq[k++],function(){wait(nx,1500)});
      }
      later(nx,600);
    }
    EV.sort(function(a,b){return a.t-b.t});
    cv.addEventListener('pointerdown',function(e){cdown={ox:e.clientX,oy:e.clientY,t:performance.now(),moved:false};cj.x=cj.y=0;drag={px:e.clientX,py:e.clientY,hx:hx,hy:hy};try{cv.setPointerCapture(e.pointerId)}catch(_){}e.preventDefault()});
    cv.addEventListener('pointermove',function(e){
      if(!drag)return;
      if(mode===2&&cdown){
        /* fase de plataformas: el dedo funciona como un stick flotante (derecha/izquierda = moverse, arriba = saltar) */
        var R=34,dx=e.clientX-cdown.ox,dy=e.clientY-cdown.oy,d=Math.hypot(dx,dy);
        if(d>8)cdown.moved=true;
        if(d>R){cdown.ox+=dx*(d-R)/d;cdown.oy+=dy*(d-R)/d;dx=e.clientX-cdown.ox;dy=e.clientY-cdown.oy}
        cj.x=dx/R;cj.y=dy/R;e.preventDefault();return;
      }
      hx=clamp(drag.hx+e.clientX-drag.px,8,W-8);if(mode===0)hy=clamp(drag.hy+e.clientY-drag.py,8,H-8);e.preventDefault()});
    function endDrag(){if(mode===2&&cdown&&!cdown.moved&&performance.now()-cdown.t<260)tapJump=true;cdown=null;cj.x=cj.y=0;drag=null}
    cv.addEventListener('pointerup',endDrag);cv.addEventListener('pointercancel',endDrag);
    function onKey(e,d){
      var c=e.code,h=true;
      if(c==='ArrowLeft'||c==='KeyA')kl=d;else if(c==='ArrowRight'||c==='KeyD')kr=d;
      else if(c==='ArrowUp'||c==='KeyW'||c==='Space')ku=d;else if(c==='ArrowDown'||c==='KeyS')kd=d;else h=false;
      if(h)e.preventDefault();
    }
    function kdn(e){onKey(e,true)}function kup(e){onKey(e,false)}
    window.addEventListener('keydown',kdn);window.addEventListener('keyup',kup);
    function stopGame(){over=true;cancelAnimationFrame(gRaf);cancelAnimationFrame(rzRaf);window.removeEventListener('resize',onRz);window.removeEventListener('orientationchange',onOr);jend();window.removeEventListener('keydown',kdn);window.removeEventListener('keyup',kup)}
    function frame(now){
      if(over)return;
      var dt=Math.min(.05,(now-last)/1000);last=now;if(hold){dt=0;hx=W/2;hy=H/2}gt+=dt;
      if(gt>=T0+15&&mode===2)enterBoss();
      while(ei<EV.length&&EV[ei].t<=gt){EV[ei++].f()}
      while(pfi<PFE.length&&PFE[pfi].t<=gt){PFE[pfi++].f()}
      if(mode===4){var bt=gt-bt0;while(bei<BE.length&&BE[bei].t<=bt)BE[bei++].f();
        if(bt>=34.5){mode=5;obs.length=0;items.length=0;inv=99;say('ya... ya m cansé... ganaste jeje',function(){wait(function(){win()},1500)})}}
      for(var li=LATE.length-1;li>=0;li--)if(LATE[li].t<=gt){var lf=LATE.splice(li,1)[0].f;lf()}
      var tx=0,ty=0;
      if(jd){var m=Math.hypot(jv.x,jv.y),dz=.07,sat=.72;if(m>dz){var uu=Math.min(1,(m-dz)/(sat-dz)),f=Math.pow(uu,1.12)/m;tx=jv.x*f;ty=jv.y*f}}
      else if(mode===2&&cdown){tx=Math.abs(cj.x)>.12?clamp(cj.x,-1,1):0;ty=clamp(cj.y,-1,1)}
      else{tx=(kr?1:0)-(kl?1:0);ty=(kd?1:0)-(ku?1:0);if(tx&&ty){tx*=.707;ty*=.707}}
      if(gt>=60&&!p7){p7=true;obs.length=0;items.length=0;cv.style.borderColor='#2d6bff';say('oh... parece q es ora d q sake el haz bajo mi kola, digo manga jeje');mode=1}
      if(mode===1&&gt>=62){
        mode=2;heartCol='#2d6bff';vy=0;onG=false;svy=0;tone(760,.1,0,.16);tone(380,.22,.09,.16);
      }
      var kk=Math.min(1,dt*((tx||ty)?15:26));svx+=(tx-svx)*kk;svy+=(ty-svy)*kk;
      if(inv>0)inv-=dt;
      var ph=gt<10?1:gt<20?2:gt<30?3:gt<40?4:gt<50?5:gt<60?6:mode>=3?8:7;
      if(ph!==curPh){curPh=ph;st1.textContent='esquiva!! (intento '+ATT+') - fase '+ph+'/8'}
      var i;
      if(mode===2){
        var jumpIn=(ty<-.5)||ku||tapJump;tapJump=false;
        hx=clamp(hx+svx*MV*dt,8*s,W-8*s);
        if(onG)coy=.1;else coy-=dt;
        if(jumpIn&&coy>0&&!jLock){vy=JV;onG=false;coy=0;jLock=true;stand=null;tone(520,.05,0,.1)}
        if(!jumpIn)jLock=false;
        if(!jumpIn&&vy<-130*s)vy=-130*s;
        var fy0=hy+FO,wasG=onG,vpre=vy;
        vy=Math.min(520*s,vy+GV*dt);hy+=vy*dt;
        var fy=hy+FO;onG=false;
        for(i=0;i<pf.length;i++){
          var q=pf[i];
          if(q.k==='p'&&vy>=0&&fy0<=q.y+6*s&&fy>=q.y&&hx+4*s>q.x&&hx-4*s<q.x+q.w){hy=q.y-FO;fy=q.y;vy=0;onG=true;hx-=PV*dt}
        }
        if(fy>=FLOOR){hy=FLOOR-FO;vy=0;onG=true}
        if(onG&&!wasG&&vpre>200*s)tone(95,.06,0,.14);
        hx=clamp(hx,8*s,W-8*s);
      }else{
        hx=clamp(hx+svx*200*s*dt,8,W-8);hy=clamp(hy+svy*200*s*dt,8,H-8);
      }
      cx.clearRect(0,0,W,H);
      for(i=0;i<ZN.length;i++){
        var z=ZN[i];if(gt<z.a||gt>z.b)continue;
        var al=gt<z.a+1.2?.14+.14*Math.abs(Math.sin((gt-z.a)*9)):.45;
        cx.fillStyle='rgba(60,230,90,'+al+')';
        var zp=z.f*(z.k==='v'?W:H);if(z.k==='v')cx.fillRect(zp-bw/2,0,bw,H);else cx.fillRect(0,zp-bw/2,W,bw);
      }
      var pw=21*s,phh=27.8*s,rad=8.9*s,hr=4*s;
      if(mode===2){
        cx.fillStyle='#0b0b1c';cx.fillRect(0,FLOOR,W,H-FLOOR);cx.fillStyle='#fff';cx.fillRect(0,FLOOR,W,2);
        for(i=pf.length-1;i>=0;i--){
          var q2=pf[i];
          if(gt>=T0)q2.x-=PV*dt;
          if(q2.k==='p')q2.y=q2.y0+q2.amp*Math.sin(gt*2.2+q2.ph);
          if(q2.x+q2.w<-30*s){pf.splice(i,1);continue}
        }
        var hbx0=hx-4.5*s,hbx1=hx+4.5*s,hby0=hy-4.5*s,hby1=hy+4.5*s,hit=false;
        for(i=0;i<pf.length;i++){
          var q3=pf[i],rx0,ry0,rx1,ry1;
          if(q3.k==='p'){
            cx.fillStyle='#3cff6a';cx.fillRect(q3.x,q3.y,q3.w,5*s);cx.fillStyle='#17803a';cx.fillRect(q3.x,q3.y+3*s,q3.w,2*s);continue;
          }
          if(q3.k==='pit'){
            if(pk2.complete)for(var tx2=q3.x;tx2<q3.x+q3.w-2*s;tx2+=8*s){cx.drawImage(pk2,tx2,FLOOR-24*s,7.2*s,24*s)}
            else{cx.fillStyle='#4a8c2a';cx.fillRect(q3.x,FLOOR-12*s,q3.w,12*s)}
            rx0=q3.x;rx1=q3.x+q3.w;ry0=FLOOR-9*s;ry1=FLOOR;
          }else if(q3.k==='f'){
            if(pk2.complete)cx.drawImage(pk2,q3.x,FLOOR-q3.h,q3.w,q3.h);else{cx.fillStyle='#4a8c2a';cx.fillRect(q3.x,FLOOR-q3.h,q3.w,q3.h)}
            rx0=q3.x+3*s;rx1=q3.x+q3.w-3*s;ry0=FLOOR-q3.h+3*s;ry1=FLOOR;
          }else{
            if(pk2.complete){cx.save();cx.translate(q3.x+q3.w/2,q3.h/2);cx.scale(1,-1);cx.drawImage(pk2,-q3.w/2,-q3.h/2,q3.w,q3.h);cx.restore()}else{cx.fillStyle='#4a8c2a';cx.fillRect(q3.x,0,q3.w,q3.h)}
            rx0=q3.x+3*s;rx1=q3.x+q3.w-3*s;ry0=0;ry1=q3.h-3*s;
          }
          if(hbx1>rx0&&hbx0<rx1&&hby1>ry0&&hby0<ry1)hit=true;
        }
        if(hit&&inv<=0){
          lives--;inv=1.2;hudTxt();hitSnd();vy=JV*.85;onG=false;
          if(lives<=0){punish();return}
        }
        if(gt<T0+3.5){
          cx.globalAlpha=Math.max(0,Math.min(1,(T0+3.5-gt)/1.2));cx.fillStyle='#fff';cx.font=Math.round(20*s)+'px VT323,monospace';cx.textAlign='center';
          cx.fillText((TOUCH?'desliza pa moverte, arriba pa saltar!!':'flechas pa moverte, espacio pa saltar!!'),W/2,H*.3,W-20);cx.globalAlpha=1;cx.textAlign='left';
        }
      }
      for(i=obs.length-1;i>=0;i--){
        var o=obs[i];
        if(o.h){
          var hdx=hx-o.x,hdy=hy-o.y,hd=Math.hypot(hdx,hdy)||1;
          if(hd>80*s){
            var an=Math.atan2(o.vy,o.vx),df=Math.atan2(hdy,hdx)-an;
            while(df>Math.PI)df-=2*Math.PI;while(df<-Math.PI)df+=2*Math.PI;
            var mt=2.4*dt;df=Math.max(-mt,Math.min(mt,df));an+=df;o.vx=Math.cos(an)*o.sp;o.vy=Math.sin(an)*o.sp;
          }else o.h=0;
        }
        if(o.g)o.vy+=o.g*dt;
        o.x+=o.vx*dt;o.y+=o.vy*dt;o.a+=o.va*dt;
        if(o.x<-60*s||o.x>W+60*s||o.y<-60*s||o.y>H+60*s){obs.splice(i,1);continue}
        if(o.k)drawThing(o);
        else if(pk.complete){cx.save();cx.translate(o.x,o.y);cx.rotate(o.a);cx.drawImage(pk,-pw/2,-phh/2,pw,phh);cx.restore()}
        else{cx.fillStyle='#4a8c2a';cx.fillRect(o.x-pw/2,o.y-phh/2,pw,phh)}
        if(inv<=0&&Math.hypot(o.x-hx,o.y-hy)<(o.r||rad)+hr){
          lives--;inv=1.2;hudTxt();hitSnd();
          if(lives<=0){punish();return}
        }
      }
      for(i=items.length-1;i>=0;i--){
        var it=items[i];it.t+=dt;it.y+=62*s*dt;var ix=it.x+Math.sin(it.t*2+it.ph)*14*s;
        if(it.y>H+30*s){items.splice(i,1);continue}
        var pulse=.55+.25*Math.sin(it.t*7);
        var gr=cx.createRadialGradient(ix,it.y,2*s,ix,it.y,24*s);gr.addColorStop(0,'rgba(255,236,120,'+pulse+')');gr.addColorStop(1,'rgba(255,236,120,0)');
        cx.fillStyle=gr;cx.fillRect(ix-26*s,it.y-26*s,52*s,52*s);
        if(lifeImg.complete&&lifeImg.naturalWidth)cx.drawImage(lifeImg,ix-14*s,it.y-14*s,28*s,28*s);
        else{cx.fillStyle='#3a9a2a';cx.fillRect(ix-6*s,it.y-12*s,12*s,24*s)}
        cx.fillStyle='#fff';var sp=Math.sin(it.t*9)>0?3*s:2*s;cx.fillRect(ix+13*s,it.y-15*s,sp,sp);cx.fillRect(ix-16*s,it.y+8*s,sp,sp);
        if(Math.hypot(ix-hx,it.y-hy)<15*s+hr){
          items.splice(i,1);
          if(lives<3){lives++;hudTxt();pops.push({x:ix,y:it.y,t:0,s:'+1 vida'})}else pops.push({x:ix,y:it.y,t:0,s:'vida llena'});
          tone(660,.09,0,.16);tone(880,.1,.09,.16);tone(1180,.16,.18,.16);
        }
      }
      for(i=pops.length-1;i>=0;i--){
        var pp=pops[i];pp.t+=dt;if(pp.t>1){pops.splice(i,1);continue}
        cx.globalAlpha=1-pp.t;cx.fillStyle='#7dff9a';cx.font=Math.round(22*s)+'px VT323,monospace';cx.textAlign='center';cx.fillText(pp.s,Math.max(36*s,Math.min(W-36*s,pp.x)),pp.y-18*s-pp.t*24*s);cx.globalAlpha=1;cx.textAlign='left';
      }
      if(inv<=0||Math.floor(inv*10)%2===0){
        var px=2.6*s,ox=hx-3.5*px,oy=hy-3*px;cx.fillStyle=heartCol;
        for(var r=0;r<HG.length;r++)for(var c=0;c<7;c++)if(HG[r].charAt(c)==='p')cx.fillRect(Math.round(ox+c*px),Math.round(oy+r*px),Math.ceil(px),Math.ceil(px));
      }
      var fx=((now/1000)*60)%(SW+70)-60;
      fi.style.transform='translateX('+fx+'px)';var bcx=fx+24;
      if(mode>=3&&peterEl){bx=W/2+Math.sin(gt*(mode===3?.9:1.3))*(mode===3?W*.08:Math.min(W*.27,Math.max(W*.06,(W-.7*(peterEl.offsetWidth||170))/2)));var pwid=peterEl.offsetWidth||170;peterEl.style.transform='translateX('+(bx+4-pwid/2)+'px)';bcx=bx+4}
      var bi=Math.floor((now-now0)/4500)%BL.length;
      if(hold){lastBub=-1}else if(mode>=3){lastBub=bi}
      else if(mode>=1&&gt<65.5){lastBub=bi}
      else if(gt>=50&&!p6){p6=true;cv.style.borderColor='#b04cff';say('jejeje estos pepinos t kieren mucho... no t van a soltar!!');lastBub=bi}
      else if(gt>=40&&!p5){p5=true;cv.style.borderColor='#e00';say('AHHH!!! AORA SI MORIRAS, VOY CON TODO!!!');lastBub=bi}
      else if(!((gt>=40&&gt<44.5)||(gt>=50&&gt<54.5))&&bi!==lastBub){lastBub=bi;say(BL[bi])}
      if(bub){var bwid=bub.offsetWidth,bl=clamp(bcx-bwid/2,0,SW-bwid);bub.style.left=bl+'px';bub.style.setProperty('--tx',clamp(bcx-bl,16,bwid-16)+'px')}
      gRaf=requestAnimationFrame(frame);
    }
    function win(){
      stopGame();hideBub();endMusic();endScene();
    }
    function punish(){
      stopGame();hideBub();inDodge=false;inBoss=false;stopLoop();bgm.pause();
      var px=2.6*s*2,ox=hx-3.5*px,oy=hy-3*px;
      function heart(dx,half){
        for(var r=0;r<HG.length;r++)for(var c=0;c<7;c++){
          if(HG[r].charAt(c)!=='p')continue;
          var left=c<3||(c===3&&r%2===0);
          if(half===1&&!left)continue;if(half===2&&left)continue;
          cx.fillRect(Math.round(ox+c*px+(half===1?-dx:half===2?dx:0)),Math.round(oy+r*px+(half?Math.abs(dx)*.5:0)),Math.ceil(px),Math.ceil(px));
        }
      }
      cx.clearRect(0,0,W,H);cx.fillStyle=heartCol;heart(0,0);tone(220,.08,0,.14);
      later(function(){cx.clearRect(0,0,W,H);cx.fillStyle=heartCol;heart(3,1);heart(3,2);tone(160,.25,0,.16)},650);
      later(function(){
        cx.clearRect(0,0,W,H);
        var sh=[],i;for(i=0;i<9;i++)sh.push({x:hx+(Math.random()-.5)*px*5,y:hy+(Math.random()-.5)*px*4,vx:(Math.random()-.5)*5,vy:-Math.random()*4,s:px*.8});
        tone(110,.35,0,.16);
        var n=0,iv=setInterval(function(){
          cx.clearRect(0,0,W,H);cx.fillStyle=heartCol;
          sh.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.vy+=.55;cx.fillRect(Math.round(p.x),Math.round(p.y),Math.ceil(p.s),Math.ceil(p.s))});
          if(++n>26){clearInterval(iv);cx.clearRect(0,0,W,H)}
        },35);timers.push(iv);
      },1350);
      later(scene,3300);
    }
    function scene(){
      clear();paper.classList.add('dark');st1.textContent='perdiste... (intento '+ATT+')';setTitle('perdiste jeje');
      var w=el('div','center');w.style.cssText='position:relative;margin-top:110px';
      var im=document.createElement('img');im.src=FL.happy;im.className='flw';im.style.margin='0 auto';im.alt='';im.draggable=false;
      w.appendChild(im);
      bub=document.createElement('div');bub.className='bubl';bub.hidden=true;w.appendChild(bub);
      app.appendChild(w);w.style.cursor='pointer';w.addEventListener('click',skipSay);
      var seq=[
        {t:'oh.... no puede ser'},
        {t:'m parece q has perdido'},
        {t:'creo q es hora d tu castigo... no kisiera'},
        {t:'pero es lo q t mwreces tu'},
        {t:'sinseramente si kiero',mad:1},
        {t:'aora este es tu kastigo muejejej lo q mas t gusta en el mundo',mad:1}
      ],k=0;
      function next(){
        if(k>=seq.length){hideBub();w.style.visibility='hidden';later(laugh,1000);return}
        var it=seq[k++];
        if(it.mad&&!im.classList.contains('shake')){im.src=FL.mad;im.classList.add('shake')}
        say(it.t,function(){wait(next,k===1?1600:1400)});
      }
      later(next,500);
      var ov=null,alive=true,addIv=0;
      function laugh(){
        w.style.visibility='';im.classList.remove('shake');im.removeAttribute('style');im.className='lg';im.src=LGIMG;
        laughSnd();
        var WN=document.querySelector('.win');if(!reduce){WN.classList.add('shk');later(function(){WN.classList.remove('shk')},8200)}
        if(musicOn){playLoop('roach',ROACHM,.3);later(roachUp,5200)}
        ov=document.createElement('div');ov.id='roach';ov.style.cssText='position:fixed;inset:0;z-index:99999;overflow:hidden;pointer-events:none';
        document.body.appendChild(ov);
        var R=[],lastT=performance.now();
        function add(){
          var r=new Image();r.src=ROACH;r.draggable=false;r.style.cssText='position:absolute;left:0;top:0;width:64px;height:auto;pointer-events:none;will-change:transform';
          ov.appendChild(r);R.push({im:r,x:Math.random()*innerWidth,y:Math.random()*innerHeight,a:Math.random()*6.283,v:70+Math.random()*140,t:0});
        }
        for(var n=0;n<14;n++)add();
        addIv=setInterval(function(){if(R.length>=110){clearInterval(addIv);return}add();add()},250);
        function roam(now){
          if(!alive)return;
          var dt=Math.min(.05,(now-lastT)/1000);lastT=now;var Wd=innerWidth,Hd=innerHeight;
          for(var i=0;i<R.length;i++){
            var c=R[i];c.t-=dt;if(c.t<=0){c.a+=(Math.random()-.5)*2.2;c.t=.25+Math.random()*.6}
            c.x+=Math.cos(c.a)*c.v*dt;c.y+=Math.sin(c.a)*c.v*dt;
            if(c.x<-40)c.x=Wd+30;else if(c.x>Wd+40)c.x=-30;if(c.y<-40)c.y=Hd+30;else if(c.y>Hd+40)c.y=-30;
            c.im.style.transform='translate('+(c.x-32)+'px,'+(c.y-18)+'px) rotate('+(c.a-Math.PI)+'rad)';
          }
          requestAnimationFrame(roam);
        }
        requestAnimationFrame(roam);
        later(function(){
          var go=el('button','btn big','volver a intentar');go.type='button';
          go.style.cssText='position:absolute;left:50%;bottom:7%;transform:translateX(-50%);pointer-events:auto;white-space:nowrap;color:#fff;background:#d00000;font-family:var(--kid)';
          go.onclick=function(){
            alive=false;clearInterval(addIv);if(ov&&ov.parentNode)ov.parentNode.removeChild(ov);
            stopLaugh();stopLoop();stopAll();hideBub();var WN2=document.querySelector('.win');WN2.classList.remove('shk');dodge();
          };
          ov.appendChild(go);
        },4500);
      }
    }

    /* ===== adaptar la caja a la pantalla (cel vertical, cel horizontal, pc) ===== */
    var FH=48,PHt=96,rzRaf=0,colW=150,SW=300;
    function onRz(){if(over)return;cancelAnimationFrame(rzRaf);rzRaf=requestAnimationFrame(layout)}
    function onOr(){setTimeout(onRz,200)}
    window.addEventListener('resize',onRz);window.addEventListener('orientationchange',onOr);
    /* al cambiar de tamaño todo lo q ta en juego se escala igual pa q nada salte */
    function rescale(k){
      hx*=k;hy*=k;bx*=k;vy*=k;
      obs.forEach(function(o){o.x*=k;o.y*=k;o.vx*=k;o.vy*=k;if(o.g)o.g*=k;if(o.r)o.r*=k;if(o.sp)o.sp*=k});
      items.forEach(function(q){q.x*=k;q.y*=k});
      pops.forEach(function(q){q.x*=k;q.y*=k});
      pf.forEach(function(q){['x','w','h','y','y0','amp'].forEach(function(p){if(q[p]!=null)q[p]*=k})});
      drag=null;
    }
    function layout(){
      if(over)return;
      var vw=innerWidth,vh=innerHeight,land=vw>vh*1.1,short=vh<620;
      var win=document.querySelector('.win'),cs=getComputedStyle(document.body);
      var SH=land?(short?112:150):(vh<820?136:168),jzs=(land&&short)?110:168;lv.style.fontSize=(land&&short)?'18px':'24px';
      /* peter 1.7x mas grande, el strip crece pa q entre :3 */
      var SH0=SH,PH0=Math.round(Math.max(60,96*SH0/184)*(mode>=3?((land&&short)?1.5:1.7):1)),ovl=0;
      if(mode>=3){SH=Math.max(SH,PH0+12+((land&&short)?44:64));ovl=Math.round(PH0*.16)}
      strip.style.marginBottom=(-ovl)+'px';rowd.style.position='relative';rowd.style.zIndex=1;
      colW=TOUCH?jzs+8:150;
      rowd.style.flexDirection=land?'row':'column';rowd.style.alignItems='center';cv.style.margin='0';
      strip.style.height=SH+'px';
      jz.style.display=TOUCH?'flex':'none';jz.style.width=jz.style.height=jzs+'px';jz.style.margin=land?'0':'-10px -6px -10px 0';
      var jbs=jzs-28,kns=Math.round(jbs*62/140);
      jb.style.width=jb.style.height=jbs+'px';kn.style.width=kn.style.height=kns+'px';kn.style.margin=(-kns/2)+'px 0 0 '+(-kns/2)+'px';
      bot.style.flexDirection=land?'column':'row';bot.style.justifyContent=land?'center':'space-between';
      bot.style.marginTop=land?'0':'10px';
      var chrome=win.offsetHeight-wrap.offsetHeight+parseFloat(cs.paddingTop)+parseFloat(cs.paddingBottom);
      var availW=wrap.clientWidth-(land?colW+10:0)-8;
      var botH=land?0:(TOUCH?jzs-20:70);
      var availH=vh-chrome-SH+ovl-botH-(land?6:12)-8;
      var nW=Math.max(160,Math.min(fsOn?1100:640,Math.floor(Math.min(availW,availH))));
      if(nW!==W){rescale(nW/W);W=H=nW;s=W/300;cv.width=W;cv.height=H}
      FLOOR=H-8*s;FO=7.8*s;GV=1050*s;JV=-345*s;MV=165*s;PV=100*s;bw=56*s;
      SW=land?W+6+10+colW:W+6;strip.style.width=SW+'px';rowd.style.width=SW+'px';bot.style.width=land?colW+'px':(W+6)+'px';
      var f=SH0/184;FH=Math.round(Math.max(65,86*f*1.15));PHt=PH0;
      fi.style.height=FH+'px';if(peterEl)peterEl.style.height=PHt+'px';
      if(bub){bub.style.maxWidth=Math.min(300,SW-8)+'px';bub.style.fontSize=(land&&short?18:20)+'px';bub.style.bottom=((mode>=3&&peterEl)?PHt+12:FH+10)+'px'}
    }
    layout();requestAnimationFrame(layout);
    gRaf=requestAnimationFrame(frame);
    say('lista paramorir?? aora veras!!',function(){later(function(){hold=false;now0=performance.now();last=now0;lastBub=-1},1500)});
  }

  function startTest(){
    stopAll();clear();st1.textContent='lista pa el minijuego.';setTitle('dale lai y suscribete');
    app.appendChild(deco());
    var b=el('div','box');b.appendChild(el('h2','center','minijuego final'));b.appendChild(el('p','center','toca el boton pa empesar'));
    var go=el('button','btn big','Empesar');go.type='button';go.onclick=function(){playMusic();floweyScene()};
    b.appendChild(go);app.appendChild(b);
  }
  intro();
})();
