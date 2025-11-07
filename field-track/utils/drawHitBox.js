export default function drawHitBox(x, y, hitbox, color = "white", context) {
        const hb = hitbox;
        context.strokeStyle = color;
        context.strokeRect(
            x + hb.offsetX,
            y + hb.offsetY,
            hb.width,
            hb.height
        );
}