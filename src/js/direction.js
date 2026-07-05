// Zet een richtingsvector om in een rotatiehoek (radialen), afgerond op de
// dichtstbijzijnde van 8 richtingen (top-down 8-way facing).
//
// SPRITE_FACING_OFFSET: onze sprites kijken standaard naar beneden bij
// rotation 0. Kijkt jouw plaatje standaard een andere kant op? Verhoog dit
// getal met Math.PI / 2 per kwartslag totdat het klopt.
const SPRITE_FACING_OFFSET = Math.PI / 2;

export function facingRotation(vector) {
    if (vector.x === 0 && vector.y === 0) return 0;
    const angle = Math.atan2(-vector.y, -vector.x) - SPRITE_FACING_OFFSET;
    const step = Math.PI / 4;
    return Math.round(angle / step) * step;
}
