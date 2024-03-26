import { flattenTimeToSeconds } from "./utils"

describe('Utils - Unit Tests', () => {


    describe('fn:flattenTimeToSeconds', () => {

        it.each([
            {
                hours:0,
                minutes: 0,
                seconds: -1,
                expected: 1
            },
            {
                hours: 0,
                minutes: -60,
                seconds: 0,
                expected: 3600
            },
            {
                hours: -2,
                minutes: 0,
                seconds: 0,
                expected: 7200
            },
            {
                hours: -10,
                minutes: 60,
                seconds: 10,
                expected: 39610
            },
            {
                hours: 0,
                minutes: 1.0,
                seconds: 0,
                expected: 60
            },
            {
                hours: 1.99,
                minutes: 0,
                seconds: 0,
                expected: 7164
            },
            {
                hours: 1,
                minutes: 1,
                seconds: 1,
                expected: 3661
            },


        ])('should return time in positive seconds even when provided unexpected numbers', ({ hours, minutes, seconds, expected }) => {

            // WHEN
            const result = flattenTimeToSeconds(hours, minutes, seconds);

            // THEN
            expect(result).toBe(expected)
        })

        
    })

})