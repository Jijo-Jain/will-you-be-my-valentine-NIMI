const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const reveal = document.getElementById("reveal");
const content = document.getElementById("content");
const hint = document.getElementById("hint");
const floatLayer = document.querySelector(".floatLayer");

const music = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");

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

// 🎵 MUSIC
musicBtn.onclick = async () => {
  try{
    if (!musicOn){
      await music.play();
      musicBtn.textContent = "🔊";
      musicOn = true;
    }else{
      music.pause();
      musicBtn.textContent = "🔈";
      musicOn = false;
    }
  }catch(e){}
};

// floating hearts
setInterval(() => {
  const el = document.createElement("span");
  el.innerHTML = Math.random() < 0.7 ? "💜" : "✨";
  el.style.left = Math.random() * 95 + "%";
  el.style.fontSize = (14 + Math.random() * 22) + "px";
  floatLayer.appendChild(el);
  setTimeout(() => el.remove(), 8000);
}, 350);

// SAFARI SAFE MOVE
function moveNoButton() {
  const card = document.getElementById("card");
  const rect = card.getBoundingClientRect();

  const maxX = rect.width - noBtn.offsetWidth - 20;
  const maxY = rect.height - noBtn.offsetHeight - 20;

  const x = Math.max(0, Math.random() * maxX);
  const y = Math.max(180, Math.random() * maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

// hover moves only (Safari safe)
noBtn.addEventListener("mouseenter", () => {
  moveNoButton();
});

// click/tap increments count
function handleNoClick(e){
  e.preventDefault();
  noCount++;

  noBtn.textContent =
    phrases[Math.min(noCount, phrases.length - 1)];

  hint.textContent = "Hehe nope 😏";

  moveNoButton();

  if(noCount >= 5){
    yesBtn.style.transform = "scale(1.3)";
  }

  if(noCount >= 8){
    noBtn.style.display = "none";
    hint.textContent = "Okay okay… press Yes 😳💜";
  }
}

// IMPORTANT: only click/touch changes phrases
noBtn.addEventListener("click", handleNoClick);
noBtn.addEventListener("touchstart", handleNoClick, { passive:false });

// YES reveal
function burst(){
  for(let i=0;i<25;i++){
    setTimeout(()=>{
      const el=document.createElement("span");
      el.innerHTML="💜";
      el.style.left=Math.random()*95+"%";
      el.style.fontSize=(18+Math.random()*24)+"px";
      floatLayer.appendChild(el);
      setTimeout(()=>el.remove(),1500);
    },i*40);
  }
}

yesBtn.onclick=()=>{
  content.style.display="none";
  reveal.classList.remove("hidden");
  burst();
};