import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */let e=null;const t={body:document.querySelector("body"),startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};function r(){return`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,0)}`}t.startBtn.addEventListener("click",function(){this.setAttribute("disabled",!0),e=setInterval(()=>{t.body.style.backgroundColor=r()},1e3)});t.stopBtn.addEventListener("click",()=>{clearInterval(e),t.startBtn.removeAttribute("disabled")});
//# sourceMappingURL=commonHelpers.js.map