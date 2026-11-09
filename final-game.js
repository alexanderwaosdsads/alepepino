/* puntuacion y reacciones del mini juego final; deja al juego original manejar niveles/vidas :3 */
(function(){
  var puntos=0,activo=false,frases={
    peter:['Auchh q t pasa!!','Ayyyy q me pegas enferma','alesikopata respeta'],
    flowey:['oye q me pegas sikopata','ayduda hay una pepinense aki','aaaaaa me duele','tienes q darle a los pepinos x cierto ehhh']
  },turnos={peter:0,flowey:0};

  function frase(tipo){var a=frases[tipo],t=a[turnos[tipo]%a.length];turnos[tipo]++;return t}
  function score(){
    var s=document.querySelector('.mz-score');if(!s)return;
    var v=s.querySelector('span');if(v)v.textContent=String(puntos);
  }
  function reaction(cell,text,kind){
    var b=document.createElement('div');b.className='mz-reaction '+kind;b.textContent=text;cell.appendChild(b);
    setTimeout(function(){if(b.parentNode)b.parentNode.removeChild(b)},1350);
  }
  function startRound(root){
    var cat=root.querySelector('.mz-cat.big');
    if(cat&&!cat.getAttribute('data-score-reset')){
      puntos=0;turnos.peter=turnos.flowey=0;activo=true;cat.setAttribute('data-score-reset','si');
    }
    var top=root.querySelector('.mz-top');if(!top)return;
    if(!top.querySelector('.mz-score')){
      var box=document.createElement('div');box.className='mz-score';
      box.innerHTML='<small>pepinos</small><span>'+puntos+'</span>';
      top.appendChild(box);
    }
    root.querySelectorAll('.mz-i.gold').forEach(function(im){
      im.classList.remove('gold');im.classList.add('pk');im.src='assets/image16.webp';im.alt='pepino';
    });
    score();
  }
  function handleTap(e){
    var field=e.target&&e.target.closest?e.target.closest('.mz-field'):null;
    var cell=e.target&&e.target.closest?e.target.closest('.mz-cell'):null;
    if(!field||!cell||!activo)return;
    var item=cell.querySelector('.mz-i');if(!item)return;
    var type=item.classList.contains('flowey')?'flowey':item.classList.contains('peter')?'peter':'pepino';
    if(type==='pepino'){
      if(item.dataset.scoreHit)return;
      item.dataset.scoreHit='si';puntos++;score();reaction(cell,'+1','good');
      return; /* deja pasar el toque para q el minijuego cuente el pepino y cambie de nivel */
    }
    if(item.dataset.scoreHit)return;
    item.dataset.scoreHit='si';puntos=Math.max(0,puntos-1);score();reaction(cell,frase(type),'danger');
    /* el juego original aplica su penalidad de vida; parar esta propagacion evita doble golpe */
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    var lives=document.querySelectorAll('.mz-lives img'),liveCount=0;
    lives.forEach(function(h){if(h.style.opacity!=='0.2')liveCount++});
    if(liveCount<=1){var retry=document.querySelector('.mz .btn.big');if(retry)setTimeout(function(){retry.click()},700)}
    else{var m=document.querySelector('.mz-info');if(m)m.textContent='−1 punto! evita a '+(type==='peter'?'Peter':'Flowey')}
  }
  function observe(){
    var root=document.querySelector('.mz');
    if(root)startRound(root);
    if(document.body&&!document.body.dataset.finalMinigameListener){
      document.body.dataset.finalMinigameListener='si';document.addEventListener('pointerdown',handleTap,true);
    }
  }
  var mo=new MutationObserver(observe);
  mo.observe(document.documentElement,{childList:true,subtree:true});
  observe();
})();
