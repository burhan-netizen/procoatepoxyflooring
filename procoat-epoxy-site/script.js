(function(){
  "use strict";
  var menuButton=document.querySelector(".menu-toggle"),nav=document.querySelector(".main-nav");
  if(menuButton&&nav){
    menuButton.addEventListener("click",function(){var open=menuButton.getAttribute("aria-expanded")==="true";menuButton.setAttribute("aria-expanded",String(!open));menuButton.setAttribute("aria-label",open?"Open navigation":"Close navigation");nav.classList.toggle("open",!open)});
    nav.querySelectorAll("a").forEach(function(link){link.addEventListener("click",function(){menuButton.setAttribute("aria-expanded","false");menuButton.setAttribute("aria-label","Open navigation");nav.classList.remove("open")})});
  }
  var finishes={
    garage:{image:"assets/garage-concept.jpg",alt:"Illustrative concept of a modern garage with a charcoal flake epoxy floor",name:"The everyday garage",copy:"A clean, hard-wearing look for the space that does it all."},
    patio:{image:"assets/patio-concept.jpg",alt:"Illustrative concept of a covered patio with a charcoal epoxy flake floor",name:"Room to live outside",copy:"A considered floor direction for patios and outdoor areas."},
    industrial:{image:"assets/industrial-concept.jpg",alt:"Illustrative concept of a commercial space with a reflective epoxy floor",name:"Made for the work",copy:"A professional look for commercial and industrial settings."}
  };
  var image=document.getElementById("finish-image"),preview=document.getElementById("finish-preview"),tabs=Array.prototype.slice.call(document.querySelectorAll(".finish-tab"));
  tabs.forEach(function(tab){
    tab.addEventListener("keydown",function(event){if(event.key!=="ArrowLeft"&&event.key!=="ArrowRight")return;event.preventDefault();var next=(tabs.indexOf(tab)+(event.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length;tabs[next].focus();tabs[next].click()});
    tab.addEventListener("click",function(){var item=finishes[tab.getAttribute("data-finish")];if(!item)return;tabs.forEach(function(other){var active=other===tab;other.classList.toggle("active",active);other.setAttribute("aria-selected",String(active));other.tabIndex=active?0:-1});preview.classList.add("changing");window.setTimeout(function(){image.src=item.image;image.alt=item.alt;document.getElementById("preview-name").textContent=item.name;document.getElementById("preview-copy").textContent=item.copy;preview.classList.remove("changing")},140)});
  });
  var form=document.getElementById("quote-form"),status=document.getElementById("form-status");
  if(form)form.addEventListener("submit",function(event){event.preventDefault();if(!form.reportValidity())return;var data=new FormData(form),subject="Epoxy flooring quote request - "+data.get("space"),body=["Name: "+data.get("name"),"Phone: "+data.get("phone"),"Suburb / area: "+data.get("suburb"),"Space: "+data.get("space"),"Floor details: "+(data.get("details")||"Not provided")].join("\n");status.textContent="Opening your email app with the quote details. Please press Send to submit your request.";window.location.href="mailto:admin@procoatepoxyflooring.com?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body)});
  var year=document.getElementById("year");if(year)year.textContent=String(new Date().getFullYear());
  var revealItems=document.querySelectorAll(".title-row,.about-grid,.service-hero,.service-link,.why-copy,.steps article,.faq-list details,.quote-form,.gallery-heading,.gallery-card,.testimonial-heading,.quote-card,.review-link");
  if("IntersectionObserver"in window&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){revealItems.forEach(function(item){item.classList.add("reveal")});var observer=new IntersectionObserver(function(entries,io){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add("visible");io.unobserve(entry.target)}})},{threshold:.12,rootMargin:"0px 0px -32px 0px"});revealItems.forEach(function(item){observer.observe(item)})}
  var progress=document.querySelector(".scroll-progress span"),ticking=false;
  function updateProgress(){var scrollable=document.documentElement.scrollHeight-window.innerHeight,amount=scrollable>0?window.scrollY/scrollable*100:0;if(progress)progress.style.width=Math.min(100,Math.max(0,amount))+"%";ticking=false}
  window.addEventListener("scroll",function(){if(!ticking){window.requestAnimationFrame(updateProgress);ticking=true}},{passive:true});updateProgress();
}());
