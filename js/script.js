// ======================================================
// TEXTO DA TELA INICIAL - OTIMIZADO PARA CELULAR
// ======================================================

const titleText = "Hoje é o seu aniversário.";

const titleElement = document.getElementById("typing-title");
const description = document.getElementById("hero-description");
const startButton = document.getElementById("start-button");

let titleIndex = 0;
let lastTypeTime = 0;

function typeTitle(timestamp) {

  if (!lastTypeTime) {
    lastTypeTime = timestamp;
  }

  // Velocidade da digitação
  if (timestamp - lastTypeTime >= 65) {

    titleElement.textContent += titleText.charAt(titleIndex);

    titleIndex++;
    lastTypeTime = timestamp;

  }

  if (titleIndex < titleText.length) {

    requestAnimationFrame(typeTitle);

  } else {

    setTimeout(() => {
      description.classList.add("visible");
    }, 400);

    setTimeout(() => {
      startButton.classList.add("visible");
    }, 900);

    // Só cria as partículas DEPOIS que o título terminar
    setTimeout(() => {
      startParticles();
    }, 1000);

  }
}

window.addEventListener("DOMContentLoaded", () => {

  setTimeout(() => {
    requestAnimationFrame(typeTitle);
  }, 300);

});


// ======================================================
// BOTÃO INICIAL
// ======================================================

startButton.addEventListener("click", () => {

  document
    .getElementById("story")
    .scrollIntoView({
      behavior: "smooth"
    });

});


// ======================================================
// PARTÍCULAS
// ======================================================

const particlesContainer = document.getElementById("particles");

function createParticle() {

  const particle = document.createElement("div");

  particle.classList.add("particle");

  const size = Math.random() * 3 + 1;

  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  particle.style.left = `${Math.random() * 100}%`;

  particle.style.animationDuration =
    `${Math.random() * 15 + 10}s`;

  particle.style.animationDelay =
    `${Math.random() * 10}s`;

  const colors = [
    "#ffffff",
    "#f2a7c5",
    "#c8b4ff"
  ];

  particle.style.background =
    colors[Math.floor(Math.random() * colors.length)];

  particlesContainer.appendChild(particle);
}

function startParticles() {

  const isMobile = window.innerWidth <= 768;

  // Menos partículas no celular para não travar
  const particleAmount = isMobile ? 35 : 80;

  for (let i = 0; i < particleAmount; i++) {
    createParticle();
  }

}


// ======================================================
// ANIMAÇÕES QUANDO ENTRA NA TELA
// ======================================================

const reveals =
  document.querySelectorAll(".reveal");

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("active");

          revealObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.15
    }
  );

reveals.forEach(reveal => {
  revealObserver.observe(reveal);
});


// ======================================================
// BARRA 0,1%
// ======================================================

const progressFill =
  document.querySelector(".progress-fill");

const progressObserver =
  new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        setTimeout(() => {

          // Visualmente deixei maior que 0,1%
          // senão praticamente não apareceria
          progressFill.style.width = "90%";

        }, 500);

        progressObserver.disconnect();
      }

    });

  });

progressObserver.observe(
  document.querySelector(".progress-box")
);


// ======================================================
// GERADOR DE MOTIVOS
// ======================================================

const reasons = [

  "Porque você já era minha melhor amiga, e em algum momento meu coração resolveu querer você ainda mais perto.",

  "Porque falar com você sempre foi uma das melhores partes do meu dia, só que agora eu percebo o quanto isso significa pra mim.",

  "Porque eu amo a sensação de estar perto de você, mesmo quando a gente não está fazendo absolutamente nada.",

  "Porque eu conheço o seu jeito, as suas manias e até algumas das suas chatices... e, de algum jeito, gosto de tudo isso.",

  "Porque meu cérebro aparentemente decidiu que pensar em você como melhor amiga já não era suficiente.",

  "Porque mesmo depois de tanto tempo te conhecendo, você ainda consegue aparecer nos meus pensamentos mais vezes do que deveria.",

  "Porque eu já sabia que você era incrível antes mesmo de começar a te olhar desse jeito.",

  "Porque eu não precisei conhecer alguém novo para me apaixonar. Eu só precisei enxergar de um jeito diferente alguém que já era muito importante pra mim.",

  "Porque eu conheço o seu jeito o suficiente para saber quando alguma coisa está errada, mesmo quando você diz que está tudo bem.",

  "Porque conversar com você sempre foi fácil, mas agora até os momentos em silêncio ao seu lado parecem especiais.",

  "Porque eu conheço muitas versões suas e, ainda assim, continuo querendo estar ao seu lado em todas elas.",

  "Porque você não ficou especial de repente. Você sempre foi. Eu só demorei um pouco para perceber que o que eu sentia tinha mudado.",

  "Porque eu já conheço suas manias, seus gostos, suas implicâncias e várias coisas que te irritam... e isso só faz eu gostar ainda mais de você.",

  "Porque eu te amo pelo que está acontecendo agora, mas também por tudo que você já significava pra mim antes disso."

];

const reasonText =
  document.getElementById("reason-text");

const reasonButton =
  document.getElementById("reason-button");

let lastReason = -1;

reasonButton.addEventListener("click", () => {

  let randomIndex;

  do {

    randomIndex =
      Math.floor(Math.random() * reasons.length);

  } while (randomIndex === lastReason);

  lastReason = randomIndex;

  reasonText.style.opacity = "0";
  reasonText.style.transform = "translateY(10px)";

  setTimeout(() => {

    reasonText.textContent =
      reasons[randomIndex];

    reasonText.style.opacity = "1";
    reasonText.style.transform = "translateY(0)";

  }, 300);

});

reasonText.style.transition =
  "opacity .3s ease, transform .3s ease";


// ======================================================
// CONTRATO
// ======================================================

const acceptButton =
  document.getElementById("accept-button");

const signedMessage =
  document.getElementById("signed-message");

acceptButton.addEventListener("click", () => {

  acceptButton.innerHTML =
    "TERMOS ACEITOS ✓";

  acceptButton.disabled = true;

  acceptButton.style.background = "#191715";
  acceptButton.style.color = "#e9e2d6";

  signedMessage.classList.add("show");

  createHearts();

});


// ======================================================
// MINI CORAÇÕES QUANDO ASSINAR
// ======================================================

function createHearts() {

  for (let i = 0; i < 20; i++) {

    const heart =
      document.createElement("div");

    heart.innerHTML = "♡";

    heart.style.position = "fixed";

    heart.style.left =
      `${Math.random() * 100}%`;

    heart.style.bottom = "-30px";

    heart.style.fontSize =
      `${Math.random() * 20 + 15}px`;

    heart.style.color = "#f2a7c5";

    heart.style.zIndex = "999";

    heart.style.pointerEvents = "none";

    heart.style.transition =
      `all ${Math.random() * 2 + 2}s ease-out`;

    document.body.appendChild(heart);

    setTimeout(() => {

      heart.style.bottom =
        `${Math.random() * 90 + 20}%`;

      heart.style.opacity = "0";

      heart.style.transform =
        `translateX(${Math.random() * 100 - 50}px)
         rotate(${Math.random() * 360}deg)`;

    }, 50);

    setTimeout(() => {

      heart.remove();

    }, 4500);

  }

}


// ======================================================
// SURPRESA FINAL
// ======================================================

const finalButton =
  document.getElementById("final-button");

const finalSurprise =
  document.getElementById("final-surprise");

const closeSurprise =
  document.getElementById("close-surprise");

finalButton.addEventListener("click", () => {

  finalSurprise.classList.add("show");

  document.body.style.overflow = "hidden";

});

closeSurprise.addEventListener("click", () => {

  finalSurprise.classList.remove("show");

  document.body.style.overflow = "auto";

});


// ======================================================
// EASTER EGG
// ======================================================

// Se ela clicar 7 vezes no coração final,
// aparece uma mensagem escondida.

const tinyHeart =
  document.querySelector(".tiny-heart");

let heartClicks = 0;

tinyHeart.addEventListener("click", () => {

  heartClicks++;

  if (heartClicks === 7) {

    alert(
      "Você realmente clicou 7 vezes nisso? 😂\n\n" +
      "Tá bom, mensagem secreta desbloqueada:\n\n" +
      "eu gosto de você mais do que provavelmente deveria admitir."
    );

    heartClicks = 0;

  }

});