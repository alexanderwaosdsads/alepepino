/* puntuacion y personajes del minijuego final; niveles y vidas originales se conservan :3 */
(function(){
  var puntos=0,frases={
    peter:['Auchh q t pasa!!','Ayyyy q me pegas enferma','alesikopata respeta'],
    flowey:['oye q me pegas sikopata','ayduda hay una pepinense aki','aaaaaa me duele','tienes q darle a los pepinos x cierto ehhh']
  },turnos={peter:0,flowey:0},ultimoJuego=null;
  function score(){var s=document.querySelector('.mz-score span');if(s)s.textContent=String(puntos)}
  function reaction(cell,text,kind){var b=document.createElement('div');b.className='mz-reaction '+kind;b.textContent=text;cell.appendChild(b);setTimeout(function(){if(b.parentNode)b.parentNode.removeChild(b)},1350)}
  function refresh(){
    var root=document.querySelector('.mz');if(!root)return;
    if(root!==ultimoJuego){
      ultimoJuego=root;
      if(root.querySelector('.mz-cat.big')){puntos=0;turnos.peter=turnos.flowey=0}
      var top=root.querySelector('.mz-top');
      if(top&&!top.querySelector('.mz-score')){var s=document.createElement('div');s.className='mz-score';s.innerHTML='<small>pepinos</small><span>'+puntos+'</span>';top.appendChild(s)}
    }
    root.querySelectorAll('.mz-i.gold').forEach(function(img){
      img.classList.remove('gold');img.classList.add('pk');img.src='assets/image16.webp';img.alt='pepino';
      var cell=img.closest('.mz-cell');if(cell&&cell.item)cell.item.type='pk';
    });
    root.querySelectorAll('.mz-i.peter').forEach(function(img){img.src='assets/image05.png';img.alt='Peter';});
    score();
  }
  document.addEventListener('pointerdown',function(e){
    var field=e.target&&e.target.closest?e.target.closest('.mz-field'):null;
    var cell=e.target&&e.target.closest?e.target.closest('.mz-cell'):null;
    if(!field||!cell||cell.__mazoHit)return;
    var img=cell.querySelector('.mz-i');if(!img)return;
    var type=img.classList.contains('flowey')?'flowey':img.classList.contains('peter')?'peter':'pepino';
    if(type==='pepino'){
      cell.__mazoHit=true;puntos++;score();reaction(cell,'+1','good');
      setTimeout(function(){cell.__mazoHit=false},300);
      return; /* deja que el minijuego original procese el golpe al pepino */
    }
    cell.__mazoHit=true;puntos=Math.max(0,puntos-1);score();
    var list=frases[type],text=list[turnos[type]++%list.length];reaction(cell,text,'danger');
    img.classList.add('hit');
    var hitSound=function(){try{var C=window.AudioContext||window.webkitAudioContext;if(!C)return;var a=new C(),o=a.createOscillator(),g=a.createGain();o.type='square';o.frequency.value=type==='peter'?220:520;g.gain.value=.035;o.connect(g);g.connect(a.destination);o.start();g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.12);o.stop(a.currentTime+.13);o.onended=function(){a.close()}}catch(_){}};hitSound();
    /* evita q el golpe erroneo llegue al listener del mazo; vida no se pierde, baja el puntaje */
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    setTimeout(function(){cell.__mazoHit=false},350);
  },true);
  var mo=new MutationObserver(refresh);mo.observe(document.documentElement,{childList:true,subtree:true});refresh();
})();
