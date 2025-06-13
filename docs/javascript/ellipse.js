export function ellipsePoint(theta, hueCenter, hueRadius, lightnessCenter, lightnessRadius) {
    const h = (hueCenter + hueRadius * Math.cos(theta) + 360) % 360;
    const l = lightnessCenter + lightnessRadius * Math.sin(theta);
    return { h, l };
}

export function applyEllipseLinearGradient(startTheta, deltaTheta, count, ellipseParams, gradientAngle) {
    const { hueCenter, hueRadius, lightnessCenter, lightnessRadius, saturation } = ellipseParams;

    const colors = [];
    for (let i = 1; i <= count; i++) {
        const theta = startTheta + i * deltaTheta;
        const p = ellipsePoint(theta, hueCenter, hueRadius, lightnessCenter, lightnessRadius);
        colors.push(`hsl(${p.h.toFixed(1)}, ${saturation}%, ${p.l}%)`);
    }

    const gradient = `linear-gradient(${gradientAngle}deg, ${colors.join(', ')})`;
    document.body.style.background = gradient;
}
