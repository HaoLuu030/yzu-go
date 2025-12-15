export function detectCollision(a, b) {
    const hitboxA = a.hitbox;
    const hitboxB = b.hitbox;

    if (!hitboxA || !hitboxB) return false; // avoid crash

    const ax = a.x + hitboxA.offsetX;
    const ay = a.y + hitboxA.offsetY;
    const bx = b.x + hitboxB.offsetX;
    const by = b.y + hitboxB.offsetY;

    return (
        ax < bx + hitboxB.width &&
        ax + hitboxA.width > bx &&
        ay < by + hitboxB.height &&
        ay + hitboxA.height > by
    );
}
