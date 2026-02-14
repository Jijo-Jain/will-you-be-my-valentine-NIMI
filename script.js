const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const reveal = document.getElementById("reveal");
const content = document.getElementById("content");
const hint = document.getElementById("hint");
const floatLayer = document.querySelector(".floatLayer");

const music = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");

const copyBtn = document.getElementById("copyBtn");
const copied = document.getElementById("copied");

let musicOn = false;
let noCount = 0;

// phrases
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

// MUSIC: plays ONLY on button press
musicBtn.addEventListener("click", async () => {
  try{
    if (!musicOn){
      music.muted = false;
      await music.play();
      musicBtn.textContent = "🔊";
      musicOn = true;
    }else{
      music.pause();
      musicBtn.textContent = "🔈";
      musicOn = false;
    }
  }catch(e){
    hint.textContent = "Tap again (browser blocked audio) 🙃";
  }
});

// float hearts & sparkles
function spawnFloat(){
  const el = document.createElement("span");
  el.innerHTML = Math.random() < 0.7 ? "💜" : "✨";
  el.style.left = Math.random() * 95 + "%";
  el.style.fontSize = (14 + Math.random() * 22) + "px";
  floatLayer.appendChild(el);
  setTimeout(()=>el.remove(), 8000);
}
setInterval(spawnFloat, 330);

// burst
function burst(){
  for (let i=0;i<24;i++){
    setTimeout(spawnFloat, i*35);
  }
}

// move NO button inside card so it never “vanishes”
function moveNoButton(){
  const card = document.getElementById("card");
  const rect = card.getBoundingClientRect();

  const pad = 14;
  const maxX = Math.max(pad, rect.width - noBtn.offsetWidth - pad);
  const maxY = Math.max(pad, rect.height - noBtn.offsetHeight - pad);

  const minY = 240; // keep it below title area
  const x = pad + Math.random() * (maxX - pad);
  const y = Math.min(minY + Math.random() * (maxY - minY), maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

// after 5 tries -> YES grows
function growYes(){
  const scale = Math.min(1.45, 1 + (noCount - 4) * 0.08);
  yesBtn.style.transform = `scale(${scale})`;
}

// after 8 tries -> NO disappears
function maybeHideNo(){
  if (noCount >= 8){
    noBtn.style.display = "none";
    hint.textContent = "Okay okay… only Yes left 😳💜";
  }
}

// hover moves only (desktop)
noBtn.addEventListener("mouseenter", () => moveNoButton());

// click/tap increments + phrase change
function handleNo(e){
  e.preventDefault();
  noCount++;

  noBtn.textContent = phrases[Math.min(noCount, phrases.length - 1)];
  hint.textContent = "Hehe nope 😏";

  moveNoButton();

  if (noCount >= 5) growYes();
  maybeHideNo();
}

noBtn.addEventListener("click", handleNo);
noBtn.addEventListener("touchstart", handleNo, { passive:false });

// typing message
function typeText(text){
  const el = document.getElementById("typeMsg");
  el.textContent = "";
  let i = 0;
  const t = setInterval(()=>{
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(t);
  }, 28);
}

// YES
yesBtn.addEventListener("click", () => {
  content.style.display = "none";
  reveal.classList.remove("hidden");
  burst();
  typeText("Nimi… I’m really happy we found each other 💜");
});

// Copy reply
copyBtn?.addEventListener("click", async ()=>{
  try{
    await navigator.clipboard.writeText("Yes 😳💜 Borahae 💜");
    copied.textContent = "Copied ✅";
    setTimeout(()=>copied.textContent="", 1500);
  }catch(e){
    copied.textContent = "Copy not supported 😅";
    setTimeout(()=>copied.textContent="", 2000);
  }
});