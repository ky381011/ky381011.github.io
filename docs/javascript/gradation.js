let hue = 0;
let lastTime = performance.now()

const degreePerSecond = 30;

function updateGradient(currentTime){
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    hue = (hue + degreePerSecond * deltaTime) % 360;

    const color1 = `hsl(${hue}, 100%, 50%)`;
    const color2 = `hsl(${(hue + 60) % 360}, 100%, 50%`;

    document.body.style.background = `linear-gradient(180deg, ${color1}, ${color2})`

    requestAnimationFrame(updateGradient);
}

requestAnimationFrame(updateGradient);