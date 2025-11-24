import { boardWidth} from "../entities/physics.js";
import { SCALE } from "./scale.js";

// shiba
const shiba1 = new Image();
const shiba2 = new Image();
const shiba3 = new Image();
const shiba4 = new Image();
const shiba5 = new Image();
const shiba6 = new Image();
shiba1.src = '../assets/img/shiba-1.png';
shiba2.src = '../assets/img/shiba-2.png';
shiba3.src = '../assets/img/shiba-3.png';
shiba4.src = '../assets/img/shiba-4.png';
shiba5.src = '../assets/img/shiba-5.png';
shiba6.src = '../assets/img/shiba-6.png';
// corgi
const corgi1 = new Image();
const corgi2 = new Image();
const corgi3 = new Image();
const corgi4 = new Image();
const corgi5 = new Image();
const corgi6 = new Image();
corgi1.src = '../assets/img/corgi-1.png';
corgi2.src = '../assets/img/corgi-2.png';
corgi3.src = '../assets/img/corgi-3.png';
corgi4.src = '../assets/img/corgi-4.png';
corgi5.src = '../assets/img/corgi-5.png';
corgi6.src = '../assets/img/corgi-6.png';
// cone
const cone = new Image();
cone.src = '../assets/img/cone.png';
// basket ball
const basket_ball = new Image();
basket_ball.src = '../assets/img/basket-ball.png';
// volley
const volley_ball = new Image();
volley_ball.src = '../assets/img/volley-ball.png';
// hurdle
const hurdle = new Image();
hurdle.src = '../assets/img/hurdle.png';
// dave
const dave1 = new Image();
const dave2 = new Image();
const dave3 = new Image();
const dave4 = new Image();
const dave5 = new Image();
const dave6 = new Image();
dave1.src = '../assets/img/dave-1.png';
dave2.src = '../assets/img/dave-2.png';
dave3.src = '../assets/img/dave-3.png';
dave4.src = '../assets/img/dave-4.png';
dave5.src = '../assets/img/dave-5.png';
dave6.src = '../assets/img/dave-6.png';
// john
const john1 = new Image();
const john2 = new Image();
const john3 = new Image();
const john4 = new Image();
const john5 = new Image();
const john6 = new Image();
john1.src = '../assets/img/john-1.png';
john2.src = '../assets/img/john-2.png';
john3.src = '../assets/img/john-3.png';
john4.src = '../assets/img/john-4.png';
john5.src = '../assets/img/john-5.png';
john6.src = '../assets/img/john-6.png';
// cycling man
const cyclingMan1 = new Image();
const cyclingMan2 = new Image();
const cyclingMan3 = new Image();
const cyclingMan4 = new Image();
const cyclingMan5 = new Image();
const cyclingMan6 = new Image();
cyclingMan1.src = '../assets/img/cycling-man-1.png';
cyclingMan2.src = '../assets/img/cycling-man-2.png';
cyclingMan3.src = '../assets/img/cycling-man-3.png';
cyclingMan4.src = '../assets/img/cycling-man-4.png';
cyclingMan5.src = '../assets/img/cycling-man-5.png';
cyclingMan6.src = '../assets/img/cycling-man-6.png';
// goal posts
const goal_post_left = new Image();
goal_post_left.src = '../assets/img/goal-post-left.png';
const goal_post_right = new Image();
goal_post_right.src = '../assets/img/goal-post-right.png';
// clouds
const cloud_1 = new Image();
const cloud_2 = new Image();
const cloud_3 = new Image();
const cloud_4 = new Image();
const cloud_6 = new Image();
const cloud_8 = new Image();
cloud_1.src = '../assets/img/cloud-1.png';
cloud_2.src = '../assets/img/cloud-2.png';
cloud_3.src = '../assets/img/cloud-3.png';
cloud_4.src = '../assets/img/cloud-4.png';
cloud_6.src = '../assets/img/cloud-6.png';
cloud_8.src = '../assets/img/cloud-8.png';




export const obstacleAssets = {
    // test: {
    //     img: basket_ball,
    //     width: boardWidth * SCALE.CART_WIDTH_RATIO,
    //     get height() {
    //         return this.width * SCALE.CART_ASPECT_RATIO;
    //     },
    //     speed: 4,
    //     isAnimated: false,
    //     probability: 1,
    // },
    // test: {
    //     img: basket_ball,
    //     width: boardWidth * SCALE.CART_WIDTH_RATIO,
    //     get height() {
    //         return this.width * SCALE.CART_ASPECT_RATIO;
    //     },
    //     speed: 4,
    //     isAnimated: false,
    //     probability: 1,
    // },

    cone: {
        img: cone,
        width: boardWidth * SCALE.CONE_WIDTH_RATIO,
        get height() {
            return this.width * SCALE.CONE_ASPECT_RATIO;
        },
        speed: 4,
        isAnimated: false,
        probability: 0.2,
    },
    hurdle: {
        img: hurdle,
        width: boardWidth * SCALE.HURDLE_WIDTH_RATIO,
        get height() {
            return this.width * SCALE.HURDLE_ASPECT_RATIO;
        },
        speed: 4,
        isAnimated: false,
        probability: 1,
    },
    shiba: {
        frames: [shiba1, shiba2, shiba3, shiba4, shiba5, shiba6],
        width: boardWidth * SCALE.SHIBA_WIDTH_RATIO,
        get height() {
            return this.width * SCALE.SHIBA_ASPECT_RATIO;
        },
        speed: 6,
        isAnimated: true,
        probability: 0.3,
    },

    corgi: {
        frames: [corgi1, corgi2, corgi3, corgi4, corgi5, corgi6],
        width: boardWidth * SCALE.CORGI_WIDTH_RATIO,
        get height() {
            return this.width * SCALE.CORGI_ASPECT_RATIO;
        },
        speed: 4,
        isAnimated: true,
        probability: 0.4,
    },

    dave: {
        frames: [dave1, dave2, dave3, dave4, dave5, dave6],
        width: boardWidth * SCALE.HUMAN_WIDTH_RATIO,
        get height() {
            return this.width * SCALE.HUMAN_ASPECT_RATIO;
        },
        speed: 6,
        isAnimated: true,
        probability: 0.45,
    },

    john: {
        frames: [john1, john2, john3, john4, john5, john6],
        width: boardWidth * SCALE.HUMAN_WIDTH_RATIO,
        get height() {
            return this.width * SCALE.HUMAN_ASPECT_RATIO;
        },
        speed: 6,
        isAnimated: true,
        probability: 0.5,
    },

    basket_ball: {
        img: basket_ball,
        width: boardWidth * SCALE.CART_WIDTH_RATIO,
        get height() {
            return this.width * SCALE.CART_ASPECT_RATIO;
        },
        speed: 4,
        isAnimated: false,
        probability: 0.8,
    },

    volley_ball: {
        img: volley_ball,
        width: boardWidth * SCALE.CART_WIDTH_RATIO,
        get height() {
            return this.width * SCALE.CART_ASPECT_RATIO;
        },
        speed: 4,
        isAnimated: false,
        probability: 0.9,
    },
    cycling_man: {
        frames: [cyclingMan1, cyclingMan2, cyclingMan3, cyclingMan4, cyclingMan5, cyclingMan6],
        width: boardWidth * SCALE.CYLING_MAN_WIDTH_RATIO,
        get height() {
            return this.width * SCALE.CYLING_MAN_ASPECT_RATIO;
        },
        speed: 8,
        isAnimated: true,
        probability: 1,
    }
}

export const midgroundAssets = {
    goal_post_left: {
        img: goal_post_left,
        width: boardWidth * SCALE.GOAL_POST_WIDTH_RATIO,
        get height() {
            return this.width * SCALE.GOAL_POST_ASPECT_RATIO;
        },
        speed: 3,
        probability: 0.5
    },

    goal_post_right: {
        img: goal_post_right,
        width: boardWidth * SCALE.GOAL_POST_WIDTH_RATIO,
        get height() {
            return this.width * SCALE.GOAL_POST_ASPECT_RATIO;
        },
        speed: 3,
        probability: 1
    }
}

export const backgroundAssets = {
    cloud_1: {
        img: cloud_1,
        width: boardWidth * SCALE.BIG_CLOUD_WIDTH_RATIO,
        get height() {
            return this.width * SCALE.BIG_CLOUD_ASPECT_RATIO;
        },
        speed: 3.5,
        probability: 0.2
    },
    cloud_2: {
        img: cloud_2,
        width: boardWidth * SCALE.BIG_CLOUD_WIDTH_RATIO,
        get height() {
            return this.width * SCALE.BIG_CLOUD_ASPECT_RATIO;
        },
        speed: 3.5,
        probability: 0.4
    },

    cloud_3: {
        img: cloud_3,
        width: boardWidth * SCALE.BIG_CLOUD_WIDTH_RATIO,
        get height() {
            return this.width * SCALE.BIG_CLOUD_ASPECT_RATIO;
        },
        speed: 3.5,
        probability: 0.6
    },

    cloud_4: {
        img: cloud_4,
        width: boardWidth * SCALE.MID_CLOUD_WIDTH_RATIO,
        get height() {
            return this.width * SCALE.MID_CLOUD_ASPECT_RATIO;
        },
        speed: 3.5,
        probability: 0.8
    },

    cloud_6: {
        img: cloud_6,
        width: boardWidth * SCALE.BIG_CLOUD_WIDTH_RATIO,
        get height() {
            return this.width * SCALE.BIG_CLOUD_ASPECT_RATIO;
        },
        speed: 3.5,
        probability: 1
    },

}

