/* arreglos de transicion y pulidito visual antes de Flowey :3 */
(function(){
  var style=document.createElement('style');
  style.textContent='\
    #app .box{box-shadow:0 6px 0 rgba(0,0,0,.12),0 10px 24px rgba(0,0,0,.08)}\
    #app .btn{box-shadow:0 4px 0 rgba(0,0,0,.16);transition:transform .12s ease,box-shadow .12s ease}\
    #app .btn:hover{transform:translateY(-2px);box-shadow:0 6px 0 rgba(0,0,0,.16)}\
    #app .btn:active{transform:translateY(2px);box-shadow:0 1px 0 rgba(0,0,0,.16)}\
    #app .options .btn{min-height:48px}\
    #app h1,#app h2{text-shadow:2px 2px 0 rgba(0,0,0,.08)}\
    .blk{pointer-events:none;transition:opacity .45s ease}\
    @media(prefers-reduced-motion:reduce){#app .btn,.blk{transition:none!important}}\
  ';
  document.head.appendChild(style);

  function removeBlack(el){
    if(!el||!el.parentNode)return;
    el.style.opacity='0';
    el.style.pointerEvents='none';
    setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el)},550);
  }
  function watchBlack(el){
    if(el.__alePepinoFadeGuard)return;
    el.__alePepinoFadeGuard=true;
    /* catIntro normally fades this layer out after 1.4s; this is a failsafe. */
    setTimeout(function(){
      if(!el.parentNode)return;
      if(getComputedStyle(el).opacity!=='0')removeBlack(el);
      else setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el)},600);
    },2400);
  }
  function watchX(){
    var x=document.querySelector('.wb i:last-child');
    if(!x||!x.classList.contains('redx')||x.__alePepinoXGuard||typeof x.onclick!=='function')return;
    var old=x.onclick;
    x.onclick=function(e){
      var out=old.call(this,e);
      setTimeout(function(){document.querySelectorAll('.blk').forEach(function(layer){
        if(document.querySelector('.mz'))removeBlack(layer);
      })},2300);
      return out;
    };
    x.__alePepinoXGuard=true;
  }
  function scan(){
    document.querySelectorAll('.blk').forEach(watchBlack);
    watchX();
  }
  var obs=new MutationObserver(scan);
  obs.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
  scan();
})();
