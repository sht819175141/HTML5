//rem计算方案、
/*html{font-size:100px;} 必写，此时，1rem=10px,宽55px,高37px的元素样式 width:0.55rem(clientwidth/750) 大小随页面宽度改变*/
(function(doc,win){
  var docEl=doc.documentElement,
  //此设置考虑到了手机横屏的问题
  resizeEvt='orientationchange' in window?'orientationchange':'resize',
  recalc=function(){
    var clientWidth=docEl.clientWidth;
    if(!clientWidth)return;
    //此设置是根据psd为640宽度下设置1rem=10px来设置的
    if(clientWidth>=640){
        docEl.style.fontSize = '100px';
    }else{
        docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
    }
  };
  if(!doc.addEventListener) return;
  win.addEventListener(resizeEvt,recalc,false);
  doc.addEventListener('DOMContentLoaded',recalc,false);
})(document,window)
