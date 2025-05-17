import gsap from "gsap";
import { random } from "../../helpers/random";

export function animateEmojies(source) {
  const element = document.createElement("div");
  element.classList.add("emojies-container");

  Array(40)
    .fill(0)
    .map((_) => {
      const left = random(0, 10000) / 100;

      const image = document.createElement("img");
      image.src = source;

      image.className =
        "emoji-animate fixed z-100 top-0 left-0 w-72 object-cover translate-y-[100vh]";
      image.style.transform = `translateX(${left}vw)`;

      element.appendChild(image);
    });
  document.body.appendChild(element);

  gsap.to(".emoji-animate", {
    duration: () => random(100, 200) / 100,
    delay: () => random(0, 150) / 100,
    y: "-100%",
    x: () => `+=${random(-25, 25)}vw`,
    ease: "power3.out",
  });

  setTimeout(() => {
    document.body.removeChild(element);
  }, 3500);
}
