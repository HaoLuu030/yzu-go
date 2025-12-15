export const storyData = {
    welcome: [
        "So… you finally graduated, huh?",
        "Usually, this is when students pack up their stuff and get the hell out of here.",
        "And then what—straight into unemployment?",
        "Not so fast. Before you’re allowed to leave, we need to make sure you actually meet YZU’s standards.",
        "There’s one last challenge waiting for you.",
        "So go on - pack up your things. We’ll see if you’re really ready to graduate."
    ],

    postLevel: {
        level1: {
            thresholds: [
                { min: 0, key: "low" },
                { min: 500, key: "mid" },
                { min: 1500, key: "high" },
            ],
            lines: {
                low: [
                    "Yikes. If packing is this hard, graduation might be a bit early for you.",
                    "Still, you made it through, so we’re not stopping here.",
                    "Let’s move on to the next challenge.",
                    "Being a good student isn’t just about the mind - it’s about the body too. You know?",
                    "And nothing works the body like a good run.",
                    "Let’s see if you can move faster than you packed.",
                    "Oh - and watch out for others on the track, will you? You’re not the only one using it."
                ],
                mid: [
                    "So, you got it done. Not exactly fast, but good enough.",
                    "Let’s move on to the next challenge.",
                    "Being a good student isn’t just about the mind - it’s about the body too. You know?",
                    "And nothing works the body like a good run.",
                    "Let's see if all that PE lessons did you any good.",
                    "Oh - and watch out for others on the track, will you? You’re not the only one using it."
                ],
                high: [
                    "Wow, already done? Guess you couldn’t wait to get out of here, huh?",
                    "Let’s move on to the next challenge.",
                    "Being a good student isn’t just about the mind - it’s about the body too. You know?",
                    "And nothing works the body like a good run.",
                    "All that speed packing… let’s see if your legs can keep up.",
                    "Oh - and watch out for others on the track, will you? You’re not the only one using it."
                ]
            }
        },

        level2: {
            thresholds: [
                { min: 0, key: "low" },
                { min: 100, key: "mid" },
                { min: 500, key: "high" },
            ],
            lines: {
                low: [
                    "Yeah... ",
                    "Maybe don’t mention this to your PE teacher. Let’s not break his heart.",
                    "Anyway, let's see...",
                    "I heard that some flags in building 7 have gone missing",
                    "Must be the Santa Claus!",
                    "I have been seeing him all over campus recently.",
                    "Doesn't matter. I will deal with that scoundrel myself later.",
                    "So your job now is to go gather the flags, alright?"
                ],
                mid: [
                    "Mediocer. Just like your GPA.",
                    "Anyway, let's see...",
                    "I heard that some flags in building 7 have gone missing",
                    "Must be the Santa Claus!",
                    "I have been seeing him all over campus recently.",
                    "Doesn't matter. I will deal with that scoundrel myself later.",
                    "So your job now is to go gather the flags, alright?"
                ],
                high: [
                    "Holy hell! You nearly turned that Shiba into a speed bump.",
                    "Guess you are in a hurry to get out of here huh?",
                    "Anyway, let's see...",
                    "I heard that some flags in building 7 have gone missing",
                    "Must be the Santa Claus!",
                    "I have been seeing him all over campus recently.",
                    "Doesn't matter. I will deal with that scoundrel myself later.",
                    "So your job now is to go gather the flags, alright?"
                ]
            }
        },
    },
};
