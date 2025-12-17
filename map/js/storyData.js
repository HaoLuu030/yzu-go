export const storyData = {
    welcome: [
        "So… you finally graduated, huh?",
        "Usually, this is when students pack up their stuff and get the hell out of here.",
        "And then what - straight into unemployment?",
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

        level3: {
            thresholds: [
                { min: 0, key: "low" },
                { min: 100, key: "mid" },
                { min: 300, key: "high" }
            ],
            lines: {
                low: [
                    "Those were flags, not grains of rice!",
                    "Guess your eyesight’s even worse than that old Santa’s.",
                    "Never mind.We’re running out of time, so let’s move straight to the next challenge.",
                    "See Building 2 across the street ?",
                    "Rumor has it there are ghosts over there after midnight.",
                    "Probably just campus folklore, but rumors don’t chase themselves...",
                    "Why don’t you go check if that’s true, alright ?",
                    "Everyone keeps talking about critical thinking.",
                    "Let’s see if you can actually use it."
                ],
                mid: [
                    "Barely acceptable. At this rate, Santa's still going to beat you to it.",
                    "Never mind.We’re running out of time, so let’s move straight to the next challenge.",
                    "See Building 2 across the street ?",
                    "Rumor has it there are ghosts over there after midnight.",
                    "Probably just campus folklore, but rumors don’t chase themselves...",
                    "Why don’t you go check if that’s true, alright ?",
                    "Everyone keeps talking about critical thinking.",
                    "Let’s see if you can actually use it."
                ],
                high: [
                    "You managed to retrieve all the missing flags huh? Not half bad... I guess.",
                    "Never mind.We’re running out of time, so let’s move straight to the next challenge.",
                    "See Building 2 across the street ?",
                    "Rumor has it there are ghosts over there after midnight.",
                    "Probably just campus folklore, but rumors don’t chase themselves...",
                    "Why don’t you go check if that’s true, alright ?",
                    "Everyone keeps talking about critical thinking.",
                    "Let’s see if you can actually use it."
                ]
            }
        },
        level4: {
            thresholds: [
                {min: 0, key: "low"},
                {min: 100, key: "mid"},
                {min: 300, key: "high"}
            ],
            lines: {
                low: [
                    "Honestly, I didn’t expect anything more. People fall for nonsense rumors like this all the time.",
                    "Anyway, I’m exhausted from all that moving around.",
                    "Let's get back to the brainy stuff shall we?",
                    "Ah... the library.",
                    "If you spent four years here and never stressed out in the library...",
                    "congratulations, you somehow skipped the entire student experience.",
                    "So enough talking. Let's get on with your final quiz here.",
                    "But I will be kind enough to give you some hints",
                    "The answers lie around us.",
                    "Let’s see if you can use your brain instead of probability."
                ],
                mid: [
                    "So... that’s what your critical thinking gets you.",
                    "It’s fine. Bravery doesn’t come pre-installed for everyone.",
                    "Anyway, I’m exhausted from all that moving around.",
                    "Let's get back to the brainy stuff shall we?",
                    "Ah... the library.",
                    "If you spent four years here and never stressed out in the library...",
                    "congratulations, you somehow skipped the entire student experience.",
                    "So enough talking. Let's get on with your final quiz here.",
                    "But I will be kind enough to give you some hints",
                    "The answers lie around us.",
                    "Let’s see if you can use your brain instead of probability."
                ],
                high: [
                    "No ghosts, no screams, no dramatic fainting. Just rumors doing what rumors do best.",
                    "Honestly, I was hoping for a little more excitement.",
                    "Anyway, I’m exhausted from all that moving around.",
                    "Let's get back to the brainy stuff shall we?",
                    "Ah... the library.",
                    "If you spent four years here and never stressed out in the library...",
                    "congratulations, you somehow skipped the entire student experience.",
                    "So enough talking. Let's get on with your final quiz here.",
                    "But I will be kind enough to give you some hints",
                    "The answers lie around us.",
                    "Let’s see if you can use your brain instead of probability."
                ],
            }
        },

        level5: {
            thresholds: [
                {min: 0, key: "low"},
                {min: 100, key: "mid"},
                {min: 200, key: "high"}
            ],
            lines: {
                low: [
                    "The fact that you could fail even that quiz is... astonishing",
                    "I can't...",
                    "*Deep breath*",
                    "Lucky for both of us, we’re finally nearing the end of this journey.",
                    "You might want to dust off something from your DSA course to survive what’s next.",
                    "Let’s see if you can tower over everything this time.",
                    "...",
                    "Pun absolutely intended",
                ],
                mid: [
                    "Average.",
                    "Exactly what I expected.",
                    "Anyway, We are finally at the last challenge",
                    "You might want to dust off something from your DSA course to survive what’s next.",
                    "Let’s see if you can tower over everything this time.",
                    "...",
                    "Pun absolutely intended",
                ],
                high: [
                    "Woah… we’ve got a nerd in town.",
                    "A capable one, too.",
                    "Anyway, We are finally at the last challenge",
                    "Time to remind yourself why you survived DSA.",
                    "Let’s see if you can tower over everything this time.",
                    "...",
                    "Pun absolutely intended",
                ],
            }
        },
        level6: {
            thresholds: [
                {min: 0, key: "low"},
                {min: 100, key: "mid"},
                {min: 400, key: "high"}
            ],
            lines: {
                low: [
                    "Professor Qazi has left the chat.",
                    "For reasons we all understand.",
                    "Alright, that’s the end of our journey. Let’s see how you did.",
                ],
                mid: [
                    "More studying wouldn’t hurt.",
                    "Especially if a tech interview ever happens.",
                    "Alright, that’s the end of our journey. Let’s see how you did.",
                ],
                high: [
                    "Well... Not half bad.",
                    "Hope you can perform as well in any future tech interviews.",
                    "Alright, that’s the end of our journey. Let’s see how you did.",
                ],
            }
        }
    },
};
