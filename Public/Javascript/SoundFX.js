const ctx = new (window.AudioContext || window.webkitAudioContext)();

function createSFX(url) {
  let buffer = null;
  let currentSource = null;

  async function load() {
    const res = await fetch(url);
    const data = await res.arrayBuffer();
    buffer = await ctx.decodeAudioData(data);
  }

  function play({ loop = false } = {}) {
    if (!buffer) return;
    stop();
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = loop;
    src.connect(ctx.destination);
    src.start();
    currentSource = src;
  }

  function stop() {
    if (currentSource) {
      try {
        currentSource.stop();
      } catch (e) {
      }
      currentSource.disconnect();
      currentSource = null;
    }
  }

  return { load, play, stop };
}

const superMarioTheme = createSFX("../Assets/Audio/gameplay.mp3");
const chompSFX = createSFX("../Assets/Audio/chomp.mp3");
const hurtSFX = createSFX("../Assets/Audio/Hurt.mp3");

async function unlockAudio() {
  if (ctx.state === "suspended") await ctx.resume();
  await Promise.all([
    superMarioTheme.load(),
    chompSFX.load(),
    hurtSFX.load()
  ]);
}

function allowAudio() {
  document.addEventListener("keydown", async (e) => {
    if (e.key.toLowerCase() === "a" || e.key.toLowerCase() === "d") {
      await unlockAudio();
      superMarioTheme.play({ loop: true })
    }
  }, { once: true });
}

export default {
  allowAudio,
  superMarioTheme,
  chompSFX,
  hurtSFX
};
