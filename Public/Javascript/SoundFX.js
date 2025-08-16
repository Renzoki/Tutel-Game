const ctx = new (window.AudioContext || window.webkitAudioContext)();

function createSFX(url) {
  let buffer = null;

  async function load() {
    const res = await fetch(url);
    const data = await res.arrayBuffer();
    buffer = await ctx.decodeAudioData(data);
  }

  function play() {
    if (!buffer) return;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(ctx.destination);
    src.start();
  }

  return { load, play };
}

const chompSFX = createSFX("../Assets/Audio/chomp.mp3");
const hurtSFX = createSFX("../Assets/Audio/Hurt.mp3");

async function unlockAudio() {
  if (ctx.state === "suspended") await ctx.resume();
  await Promise.all([
    chompSFX.load(),
    hurtSFX.load()
  ]);
}

function allowAudio() {
  document.addEventListener("keydown", async (e) => {
    if (e.key.toLowerCase() === "a" || e.key.toLowerCase() === "d") {
      await unlockAudio();
    }
  }, { once: true });
}

export default {
  allowAudio,
  chompSFX,
  hurtSFX
}

