const GRADES = [
    {
        letter: "S",
        minAverage: 100,
        message: "Incredible. A perfect score. Take a bow, because you did an amazing job.",
        confettiNumber: 500,
        color: "#ffee00",
        playApplause: true,
        fanfareSfx: 'fanfare-perfect'
    },
    {
        letter: "A",
        minAverage: 90,
        message: "Excellent work. A near-perfect run. Have a round of applause.",
        confettiNumber: 250,
        color: "#addb06",
        playApplause: true,
        fanfareSfx: 'fanfare-good'
    },
    {
        letter: "B",
        minAverage: 80,
        message: "Good work. You missed a few, but still pulled through.",
        confettiNumber: 150,
        color: "#0077ff",
        playApplause: false,
        fanfareSfx: 'fanfare-good'
    },
    {
        letter: "C",
        minAverage: 70,
        message: "Not bad, but you can do much better. Always room for improvement.",
        confettiNumber: 20,
        color: "#a230e7",
        playApplause: false,
        fanfareSfx: 'fanfare-okay'
    },
    {
        letter: "D",
        minAverage: 60,
        message: "A bit poor. You can do better than that. Practice some more.",
        confettiNumber: 0,
        color: "#ff9d00",
        playApplause: false,
        fanfareSfx: 'fanfare-poor'
    },
    {
        letter: "F",
        minAverage: 40,
        message: "A failing grade. You were a tad unprepared. Try this quiz again when you're truly ready.",
        confettiNumber: 0,
        color: "#dd0101",
        playApplause: false,
        fanfareSfx: 'fanfare-poor'
    },
    {
        letter: "F-",
        minAverage: 0,
        message: "Not good at all. Hit the books and try this quiz again.",
        confettiNumber: 0,
        color: "#dd0101",
        playApplause: false,
        fanfareSfx: 'fanfare-poor'
    }
];


export const sleep = function (time) {
    return new Promise(resolve => setTimeout(resolve, time));
};


export const shuffle = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

        // swap elements array[i] and array[j]
        // we use "destructuring assignment" syntax to achieve that
        // you'll find more details about that syntax in later chapters
        // same can be written as:
        // let t = array[i]; array[i] = array[j]; array[j] = t
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
};


export const getGradeFromNumber = function (value) {
    for (const grade of GRADES) {
        if (value >= grade.minAverage) {
            return grade;
        }
    }

    return GRADES.slice(-1);
};