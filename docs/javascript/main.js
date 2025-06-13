import { applyEllipseLinearGradient } from './ellipse.js';

const ellipseParams = {
  hueCenter: 250,
  hueRadius: 10,
  lightnessCenter: 50,
  lightnessRadius: 5,
  saturation: 60
};

const deltaTheta = Math.PI / 180 * 30;
const count = 12;
const gradientAngle = 180;

let startTheta = 0;

function animate() {
  startTheta += 0.02;
  applyEllipseLinearGradient(startTheta, deltaTheta, count, ellipseParams, gradientAngle);
  requestAnimationFrame(animate);
}

animate();
