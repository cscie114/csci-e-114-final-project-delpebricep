import { GRADES } from "./constants";

// Creates a promise and resolves it when the timeout ends.
export const sleep = function (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
};

/*
    Takes an array and shuffles its elements.
    Makes use of Drustenfield's shuffling algorithm.

    Sourced from this tutorial:
    https://www.tutorialspoint.com/How-to-randomize-shuffle-a-JavaScript-array
*/
export const shuffle = function (array) {
    // For each element, starting from the last one:
    for (let i = array.length - 1; i > 0; i--) {
        // Choose a random index from 0 to i.
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

        // Store the "i"th element's value in a temp variable.
        let temp = array[i];

        // Swap elements i and j.
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
};

// Given a numbered value, returns its corresponding grade.
export const getGradeFromNumber = function (value) {
    for (const grade of GRADES) {
        if (value >= grade.minAverage) {
            return grade;
        }
    }

    return GRADES.slice(-1);
};