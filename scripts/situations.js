const situations = [
    {
        text: "You come upon a cave. Your hear a deep growling from inside the cave. What are you doing",
        scala: "empathy",
        options: [
            {
                text: "You are on an important mission, you keep going",
                value: 1,
            },
            {
                text: "You sneak upon the cave to gather more information",
                value: 3,
            },
            {
                text: "you enter the cave curiously",
                value: 5,
            }
        ]
    },
    {
        text: "You´re distracted for a moment. That’s enough to fall into a big pound of mud you oversaw. Your companions are mockingly laughing loudly. What ist your action?",
        scala: "empathy",
        options: [
            {
                text: "You demand to be freed immediately",
                value: 1,
            },
            {
                text: "you throw some mud at them to make it square",
                value: 3,
            },
            {
                text: "you laugh humorfully with them and try to get out of the hole",
                value: 5,
            }
        ]
    },
    {
        text: "You approach an camp of Ogres, there is no wqay around. Battle is the only option. How will you succed?",
        scala: "orderliness",
        options: [
            {
                text: "You´ll storm their camp and get them by surprise and overwhelming fighting power",
                value: 1,
            },
            {
                text: "You prepare for battle. You get prepared as best as you can but what will happen happens",
                value: 3,
            },
            {
                text: "You have the perfect masterplan. The mage in your entourage tries to losen the bolders on the cliff and the rouge will lay some traps. There is no possibility you´ll lose",
                value: 5,
            }
        ]
    }
]

export {situations};
