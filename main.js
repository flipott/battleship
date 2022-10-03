(()=>{"use strict";const e=(e,t,s)=>{const n=s,r=[];return{name:e,coords:t,length:n,hitArray:r,sunk:!1,hit:e=>{for(let t=0;t<r.length;t+=1)if(r[t][0]===e[0]&&r[t][1]===e[1])return!1;return r.push(e)},isSunk:()=>r.length===n}},t=(t,s)=>{const n=t,r=s,i=(t=>{const s=t,n=[],r=[],i=[];function l(){for(let e=9;e>=0;e-=1)for(let t=0;t<10;t+=1)n.push({x:t,y:e,empty:!0,occupiedBy:null,hitStatus:null})}l();const a=(e,t)=>{for(let s=0;s<n.length;s+=1)if(n[s].x===e&&n[s].y===t)return n[s];return!1},o=e=>{for(let t=0;t<r.length;t+=1)if(r[t].name===e)return r[t];return!1},c=e=>{for(let t=0;t<e.coords.length;t+=1){const s=e.coords[t][0],n=e.coords[t][1];a(s,n).empty=!1,a(s,n).occupiedBy=e.name}r.push(e)};function u(){let e=null;for(let t=0;t<n.length;t+=1){let t=Math.floor(10*Math.random()),s=Math.floor(10*Math.random());if(a(t,s).empty){e=[t,s];break}t=Math.floor(10*Math.random()),s=Math.floor(10*Math.random())}return e}function d(e,t){const s=[],n=e[0],r=e[1];if(a(n,r).empty&&a(n+1,r).empty&&a(n+2,r).empty&&a(n+3,r).empty&&a(n+4,r).empty){const e=[];e.push([n,r]),e.push([n+1,r]),e.push([n+2,r]),e.push([n+3,r]),e.push([n+4,r]),s.push(e)}if(a(n,r).empty&&a(n-1,r).empty&&a(n-2,r).empty&&a(n-3,r).empty&&a(n-4,r).empty){const e=[];e.push([n,r]),e.push([n-1,r]),e.push([n-2,r]),e.push([n-3,r]),e.push([n-4,r]),s.push(e)}if(a(n,r).empty&&a(n,r+1).empty&&a(n,r+2).empty&&a(n,r+3).empty&&a(n,r+4).empty){const e=[];e.push([n,r]),e.push([n,r+1]),e.push([n,r+2]),e.push([n,r+3]),e.push([n,r+4]),s.push(e)}if(a(n,r).empty&&a(n,r-1).empty&&a(n,r-2).empty&&a(n,r-3).empty&&a(n,r-4).empty){const e=[];e.push([n,r]),e.push([n,r-1]),e.push([n,r-2]),e.push([n,r-3]),e.push([n,r-4]),s.push(e)}let i=s[Math.floor(Math.random()*s.length)];return i?(i=i.slice(0,t),i):d(u(),t)}const h=e=>{const t=[];for(let s=0;s<e.length;s+=1)e[s][0]>=0&&e[s][0]<=9&&e[s][1]>=0&&e[s][1]<=9&&t.push([e[s][0],e[s][1]]);return t};return{owner:s,board:n,getSpace:a,generateFleet:()=>{for(;n.length;)n.pop();for(;r.length;)r.pop();l();const t=d(u(),5),s=e("carrier",t,5);c(s);const i=d(u(),4),a=e("battleship",i,4);c(a);const o=d(u(),3),h=e("destroyer",o,3);c(h);const p=d(u(),3),m=e("submarine",p,3);c(m);const y=d(u(),2),f=e("patrol",y,2);c(f)},receiveAttack:(e,t)=>{if(a(e,t).empty)return a(e,t).occupiedBy="missed",a(e,t).empty=!1,i.push([e,t]),["missed"];if(!a(e,t).empty&&"missed"!==a(e,t).occupiedBy){const s=a(e,t).occupiedBy;o(s).hit([e,t]),a(e,t).hitStatus="hit";const n=["hit",s];return o(s).isSunk()&&(o(s).sunk=!0,n[0]="sunk"),n}},manuallyPlaceShip:(t,s,n,i=!1)=>{let l=null;const o=[s],u=t.charAt(0).toLowerCase()+t.slice(1);switch(u){case"carrier":l=5;break;case"battleship":l=4;break;case"destroyer":case"submarine":l=3;break;case"patrol":l=2}if("vertical"===n){let e=s[1];for(let t=1;t<l;t+=1)o.push([s[0],e-1]),e-=1}else{let e=s[0];for(let t=1;t<l;t+=1)o.push([e+1,s[1]]),e+=1}for(let e=0;e<o.length;e+=1){const t=o[e][0],s=o[e][1];if(!a(t,s).empty)return[!1,h(o)]}for(let e=0;e<r.length;e+=1)if(r[e].name===u)return!1;if(!i){const t=e(u,o,l);return c(t),!0}return[!0,o]},ships:r,allSunk:()=>!!(r[0].sunk&&r[1].sunk&&r[2].sunk&&r[3].sunk&&r[4].sunk)}})(n),l=[];return{name:n,type:r,board:i,receiveAttack:function(e,t){return i.receiveAttack(e,t)},getRandomCoords:function(){let e=null;function t(e,t){let s=!0;for(let n=0;n<l.length;n+=1)l[n][0]===e&&l[n][1]===t&&(s=!1);return s}for(let s=0;s<100;s+=1){let s=Math.floor(10*Math.random()),n=Math.floor(10*Math.random());if(t(s,n)){e=[s,n],l.push(e);break}s=Math.floor(10*Math.random()),n=Math.floor(10*Math.random())}return e},sentAttacks:l,sendAttack:function(e,t){for(let s=0;s<l.length;s+=1)if(l[s][0]===e&&l[s][1]===t)return!1;return l.push([e,t]),!0}}},s=document.querySelector(".player-board"),n=document.querySelector(".cpu-board"),r=document.querySelector(".results"),i=document.querySelector(".player .ships"),l=document.querySelectorAll(".ships"),a=document.querySelector(".player-instruction"),o=document.getElementById("random-board"),c={displayBoard(e,t){if("human"===t){s.innerHTML="";for(let t=0;t<e.length;t+=1){const n=document.createElement("div");n.className="space",n.setAttribute("x",e[t].x),n.setAttribute("y",e[t].y),n.setAttribute("occupiedBy",e[t].occupiedBy),n.setAttribute("empty",e[t].empty),"hit"===e[t].hitStatus&&n.setAttribute("hitstatus","hit"),s.appendChild(n)}}else if("cpu"===t){n.innerHTML="";for(let t=0;t<e.length;t+=1){const s=document.createElement("div");s.className="space",s.setAttribute("x",e[t].x),s.setAttribute("y",e[t].y),"missed"===e[t].occupiedBy&&s.setAttribute("occupiedBy","missed"),"hit"===e[t].hitStatus&&s.setAttribute("hitStatus","hit"),s.setAttribute("empty",null),n.appendChild(s)}}},displayResult(e,t,s){switch(s[0]){case"missed":r.innerHTML+=`${e} attacks ${t} and misses.<br>`;break;case"hit":r.innerHTML+=`${e} attacks and hits ${t}'s ${s[1]}.<br>`;break;case"sunk":r.innerHTML+=`${e} attacks and sinks ${t}'s ${s[1]}!<br>`;break;case"winner":r.innerHTML+=`${e} sinks ${t}'s fleet and wins!`,document.querySelector(".player-instruction").innerText="Player"===e?"You win!":"You lose!"}},clearResults(){r.innerHTML="";for(let e=0;e<l.length;e+=1)for(let t=0;t<l[e].children.length;t+=1)l[e].children[t].classList.contains("select")&&l[e].children[t].classList.remove("select"),l[e].children[t].classList.contains("placed")&&l[e].children[t].classList.remove("placed"),l[e].children[t].classList.contains("sunk")&&l[e].children[t].classList.remove("sunk");const e=document.styleSheets[0];for(let t=0;t<e.cssRules.length;t+=1)".cpu .space"===e.cssRules[t].selectorText&&e.deleteRule(t--)},shipHighlight(e,t){if("all"===e){for(let e=0;e<i.children.length;e+=1)i.children[e].classList.add("placed");return}const s=document.querySelector(".player ."+e);if("select"===t){for(let e=0;e<i.children.length;e+=1)i.children[e].classList.contains("select")&&i.children[e].classList.remove("select");s.classList.contains("placed")||"all"===e||s.classList.add("select")}else"placed"===t&&(s.classList.contains("select")&&s.classList.remove("select"),s.classList.add("placed"))},newGameMessage(){a.innerText="Please position your fleet on your board.",document.querySelector(".message").style.visibility="visible",o.style.visibility="visible"},showHover(e,t){for(let n=0;n<t.length;n+=1)for(let r=0;r<s.children.length;r+=1){const i=parseInt(s.children[r].getAttribute("x"),10),l=parseInt(s.children[r].getAttribute("y"),10);t[n][0]===i&&t[n][1]===l&&(e?s.children[r].classList.add("hoverValid"):s.children[r].classList.add("hoverInvalid"))}},hideHover(){for(let e=0;e<s.children.length;e+=1)s.children[e].classList.contains("hoverValid")&&s.children[e].classList.remove("hoverValid"),s.children[e].classList.contains("hoverInvalid")&&s.children[e].classList.remove("hoverInvalid")}},u=c,d=document.getElementById("new-game"),h=document.querySelector(".player .ships").children,p=document.getElementById("direction-btn"),m=document.getElementById("direction"),y=document.querySelector(".direction-change"),f=document.getElementById("random-board");let b=null,g=t("CPU","cpu"),v=t("Player","human");g.board.generateFleet(),u.displayBoard(v.board.board,v.type),u.displayBoard(g.board.board,g.type);let k=document.getElementsByClassName("space"),L=null,M="vertical";function S(e=!1){if(5===v.board.ships.length)return d.disabled=!1,y.style.visibility="hidden",void(L=null);let t=!1;function s(e){if(!1===t){const t=[parseInt(e.getAttribute("x"),10),parseInt(e.getAttribute("y"),10)];L&&!0===v.board.manuallyPlaceShip(L,t,M)&&(u.shipHighlight(L,"placed"),u.displayBoard(v.board.board,v.type),k=document.getElementsByClassName("space"),L=null,S())}}function n(e){if(L){const t=[parseInt(e.getAttribute("x"),10),parseInt(e.getAttribute("y"),10)],s=v.board.manuallyPlaceShip(L,t,M,!0);s[0],u.showHover(s[0],s[1])}}if(t||f.addEventListener("click",(()=>{t=!0,y.style.visibility="hidden",v.board.generateFleet(),u.displayBoard(v.board.board,v.type),u.shipHighlight("all","select"),S()})),!1===e){for(let e=0;e<h.length;e+=1)h[e].addEventListener("click",(e=>{return s=e.target,void(!1!==t||s.classList.contains("placed")||(L=s.innerText,L=L.charAt(0).toLowerCase()+L.slice(1),u.shipHighlight(L,"select"),S(!0)));var s}));for(let e=0;e<100;e+=1)k[e].addEventListener("click",(e=>{s(e.target)})),k[e].addEventListener("mouseover",(e=>{n(e.target)})),k[e].addEventListener("mouseout",u.hideHover)}}function A(){g=t("CPU","cpu"),g.board.generateFleet(),v=t("Player","human"),u.newGameMessage(),u.clearResults(),u.displayBoard(v.board.board,v.type),u.displayBoard(g.board.board,g.type),y.style.visibility="visible",k=document.getElementsByClassName("space"),S(),d.innerText="Begin!",d.disabled=!0,b=null}function B(){for(let e=100;e<200;e+=1)k[e].addEventListener("click",(e=>{T(parseInt(e.target.getAttribute("x"),10),parseInt(e.target.getAttribute("y"),10))}))}function x(e,t){return!!t.board.allSunk()&&(b=e,u.displayResult(e.name,t.name,["winner"]),!0)}function T(e,t){if(!b&&v.sendAttack(e,t)){const s=g.receiveAttack(e,t);if("sunk"===s[0]){const e=document.querySelector(`.cpu .${s[1]}`);e.classList.remove("placed"),e.classList.add("sunk")}u.displayResult(v.name,g.name,s),u.displayBoard(g.board.board,g.type),x(v,g)||(k=document.getElementsByClassName("space"),document.querySelector(".player-instruction").innerText="CPU is making move...",setTimeout((function(){!function(){const e=g.getRandomCoords(),t=v.receiveAttack(e[0],e[1]);"sunk"===t[0]&&document.querySelector(`.player .${t[1]}`).classList.add("sunk"),u.displayResult(g.name,v.name,t),u.displayBoard(v.board.board,v.type),x(g,v),document.querySelector(".player-instruction").innerText="Make your move!"}()}),350),B())}}p.addEventListener("click",(()=>{"vertical"===M?(M="horizontal",m.innerHTML="Horizontal"):(M="vertical",m.innerHTML="Vertical")})),d.addEventListener("click",(()=>{"New Game"===d.innerText&&A(),"Begin!"===d.innerText&&5===v.board.ships.length&&(y.style.visibility="hidden",B(),d.innerText="New Game",d.disabled=!1,f.style.visibility="hidden",document.styleSheets[0].insertRule(".cpu .space { cursor: pointer;}"),document.querySelector(".player-instruction").innerText="Make your move!")}))})();