/* ajustes localizados del minijuego final; la logica principal sigue en game.js :3 */
(function(){
  var puntos=0,activo=false,frases={
    peter:['Auchh q t pasa!!','Ayyyy q me pegas enferma','alesikopata respeta'],
    flowey:['oye q me pegas sikopata','ayduda hay una pepinense aki','aaaaaa me duele','tienes q darle a los pepinos x cierto ehhh']
  };
  var turnos={peter:0,flowey:0};
  function textoAleatorio(tipo){var lista=frases[tipo],t=lista[turnos[tipo]%lista.length];turnos[tipo]++;return t}
  function score(){var nodo=document.querySelector('.mz-score');if(nodo)nodo.firstChild.textContent='puntos: '+puntos}
  function adornar(){
    var juego=document.querySelector('.mz');if(!juego)return;
    var top=juego.querySelector('.mz-top');if(!top)return;
    if(!top.querySelector('.mz-score')){
      if(!activo){puntos=0;turnos.peter=turnos.flowey=0;activo=true}
      var s=document.createElement('div');s.className='mz-score';s.appendChild(document.createTextNode('puntos: '+puntos));
      var tip=document.createElement('small');tip.textContent='pepino +1 · Peter/Flowey −1';s.appendChild(tip);top.appendChild(s);
    }
    juego.querySelectorAll('.mz-i.gold').forEach(function(im){
      if(im.getAttribute('data-pepino-listo'))return;
      im.setAttribute('data-pepino-listo','si');im.src='assets/image16.webp';im.alt='pepino dorado: +3 puntos';
    });
    score();
  }
  document.addEventListener('pointerdown',function(e){
    var campo=e.target&&e.target.closest?e.target.closest('.mz-field'):null;
    var celda=e.target&&e.target.closest?e.target.closest('.mz-cell'):null;
    if(!campo||!celda)return;
    var im=celda.querySelector('.mz-i');if(!im)return;
    var tipo=im.classList.contains('peter')?'peter':im.classList.contains('flowey')?'flowey':null;
    if(!tipo)return;
    /* evita perder una vida por error: el personaje te quita un punto y suelta una frase */
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    puntos--;score();im.classList.add('hit');
    var frase=document.createElement('div');frase.className='mz-reaction';frase.textContent=textoAleatorio(tipo);celda.appendChild(frase);
    setTimeout(function(){if(frase.parentNode)frase.parentNode.removeChild(frase)},1700);
    var f=tipo==='peter'?220:520;try{var a=new(window.AudioContext||window.webkitAudioContext)(),o=a.createOscillator(),g=a.createGain();o.type='square';o.frequency.value=f;g.gain.value=.045;o.connect(g);g.connect(a.destination);o.start();g.gain.exponentialRampToValueAtTime(.001,a.currentTime+.12);o.stop(a.currentTime+.13);o.onended=function(){a.close()}}catch(_e){}
  },true);
  document.addEventListener('pointerdown',function(e){
    var celda=e.target&&e.target.closest?e.target.closest('.mz-cell'):null;
    if(!celda||!document.querySelector('.mz'))return;
    var im=celda.querySelector('.mz-i');if(!im||im.classList.contains('peter')||im.classList.contains('flowey'))return;
    var bonus=im.classList.contains('gold')?3:1;
    /* el click normal del juego conserva el avance de nivel; el puntaje de pepinos va aparte */
    puntos+=bonus;score();
  },true);
  var obs=new MutationObserver(function(){
    adornar();
    if(activo&&!document.querySelector('.mz'))activo=false;
  });
  obs.observe(document.body,{childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded',adornar);
  adornar();
})();
