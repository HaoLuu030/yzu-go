import {HITBOX_CONFIG} from './hitBoxConfig.js';

export default function createHitBox(type, width, height) {
    const cfg = HITBOX_CONFIG[type] || {};
    return {
        offsetX: width * (cfg.offsetX ?? 0),
        offsetY: height * (cfg.offsetY ?? 0),
        width: width * (cfg.widthFactor?? 1),
        height: height * (cfg.heightFactor ?? 1)
    };
}