const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const reveal = document.getElementById("reveal");
const content = document.getElementById("content");
const hint = document.getElementById("hint");
const floatLayer = document.querySelector(".floatLayer");

const copyBtn = document.getElementById("copyBtn");
const copied = document.getElementById("copied");
const typeMsg = document.getElementById("typeMsg");

let noCount = 0;
let hoverCount = 0; // count hovers separately so “No” doesn’t disappear just from hover

const phrases = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You might regret this!",
  "Give it another thought!",
  "Are you absolutely certain?",
  "This could be a mistake!",
  "Have a heart!",
  "Don't be so cold!",
  "Change of heart?",
  "Wouldn't you reconsider?",
  "Is that your final answer?",
  "You're breaking my heart ;("
];

// floating 💜 + ✨
function spawnFloat(){
  const el = document.createElement("span");
  el.innerHTML = Math.random() < 0.7 ? "💜" : "✨";
  el.style.left = Math.random() * 98 + "%";
  el.style.fontSize = (14 + Math.random() * 26) + "px";
  floatLayer.appendChild(el);
  setTimeout(()=>el.remove(), 8200);
}
setInterval(spawnFloat, 320);

function burst(){
  for (let i=0;i<30;i++){
    setTimeout(spawnFloat, i*28);
  }
}

/**
 * ✅ Safari-proof movement:
 * Put the NO button at a random position INSIDE the viewport.
 * Using position:fixed avoids weird offset-parent issues in flex layouts.
 */
function moveNoToSafeSpot(){
  const pad = 16;

  // measure button size
  const btnRect = noBtn.getBoundingClientRect();

  const maxLeft = Math.max(pad, window.innerWidth - btnRect.width - pad);
  const maxTop  = Math.max(pad, window.innerHeight - btnRect.height - pad);

  // keep it below the top area so it doesn't cover the title/gif
  const minTop = Math.min(Math.max(240, pad), maxTop);

  const left = pad + Math.random() * (maxLeft - pad);
  const top  = minTop + Math.random() * (maxTop - minTop);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${left}px`;
  noBtn.style.top = `${top}px`;
  noBtn.style.transform = "none"; // clear old translate
  noBtn.style.zIndex = "10";
}

/** keep YES growing after 5 tries */
function growYes(){
  const scale = Math.min(1.6, 1 + (noCount - 4) * 0.10);
  yesBtn.style.transform = `scale(${scale})`;
}

/** hide NO after 8 actual tries (click/touch), not from hover */
function maybeHideNo(){
  if (noCount >= 8){
    noBtn.style.display = "none";
    hint.textContent = "Okay okay… only Yes left 😳💜";
  }
}

/**
 * Update phrase text.
 * We show phrases based on noCount primarily, but if user can’t click,
 * we’ll also advance on hover/touch-move using hoverCount.
 */
function setNoText(index){
  noBtn.textContent = phrases[Math.min(index, phrases.length - 1)];
}

/**
 * Desktop hover:
 * - Move away
 * - ALSO show a new phrase (so user sees phrases even if they never click)
 * We do NOT increment noCount here (so it won’t disappear from hover).
 */
function onNoHover(){
  if (noBtn.style.display === "none") return;

  hoverCount++;
  setNoText(Math.max(noCount, hoverCount)); // show progress via hover
  hint.textContent = "Hehe nope 😏";
  moveNoToSafeSpot();
}

noBtn.addEventListener("mouseenter", onNoHover);

/**
 * Click/tap:
 * - This is the “real” noCount for yes-grow and hide-after-8.
 */
function handleNo(e){
  e.preventDefault();
  if (noBtn.style.display === "none") return;

  noCount++;
  setNoText(noCount);
  hint.textContent = "Hehe nope 😏";
  moveNoToSafeSpot();

  if (noCount >= 5) growYes();
  maybeHideNo();
}

noBtn.addEventListener("click", handleNo);
noBtn.addEventListener("touchstart", handleNo, { passive:false });

// On mobile, some users try to “grab” or slide — this helps show phrases too.
noBtn.addEventListener("touchmove", (e) => {
  e.preventDefault();
  onNoHover();
}, { passive:false });

function typeText(text){
  typeMsg.textContent = "";
  let i = 0;
  const t = setInterval(()=>{
    typeMsg.textContent += text[i++];
    if (i >= text.length) clearInterval(t);
  }, 28);
}

yesBtn.addEventListener("click", ()=>{
  content.classList.add("hidden");
  reveal.classList.remove("hidden");
  burst();
  typeText("Nimi… I’m really happy we found each other 💜");
});

copyBtn?.addEventListener("click", async ()=>{
  try{
    await navigator.clipboard.writeText("Yes 😳💜 Borahae 💜");
    copied.textContent = "Copied ✅";
    setTimeout(()=>copied.textContent="", 1400);
  }catch{
    copied.textContent = "Copy not supported 😅";
    setTimeout(()=>copied.textContent="", 2000);
  }
});
