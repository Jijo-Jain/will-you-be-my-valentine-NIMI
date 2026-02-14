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

// KEY FIX: Move No using transform (relative), so it never “disappears”
function moveNo(){
  // Move within a reasonable range around its original position
  const x = (Math.random() * 320) - 160;   // -160..160
  const y = (Math.random() * 180) - 40;    // -40..140
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

// hover: only move (desktop)
noBtn.addEventListener("mouseenter", () => moveNo());

// click/tap: increment + phrases + logic
function handleNo(e){
  e.preventDefault();
  noCount++;

  noBtn.textContent = phrases[Math.min(noCount, phrases.length - 1)];
  hint.textContent = "Hehe nope 😏";

  moveNo();

  // after 5 tries: yes grows
  if (noCount >= 5){
    const scale = Math.min(1.6, 1 + (noCount - 4) * 0.10);
    yesBtn.style.transform = `scale(${scale})`;
  }

  // after 8 tries: no disappears
  if (noCount >= 8){
    noBtn.style.display = "none";
    hint.textContent = "Okay okay… only Yes left 😳💜";
  }
}

noBtn.addEventListener("click", handleNo);
noBtn.addEventListener("touchstart", handleNo, { passive:false });

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