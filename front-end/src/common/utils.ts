import dayjs from 'dayjs';
import { FilterParam } from "./types/filter.types";

export const flattenTimeToSeconds = (hours: number, minutes: number, seconds:number) => {
    const secondsInHour = 3600;
    const secondsInMinute = 60;
    return (Math.abs(hours) * secondsInHour) + (Math.abs(minutes) * secondsInMinute) + Math.abs(seconds)
}

export const secondsToSecondsMinutesHours = (totalSeconds: number = 0) => {

    const toLocaleString = (num: number) => {
        return num.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
    }

    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const secondsString = toLocaleString(seconds);
    const minutesString = toLocaleString(minutes);
    const hoursString = toLocaleString(hours);


    if (!minutes) {
        return `00:${secondsString}`
    }

    if(!hours){
        return `${minutesString}:${secondsString}`
    }

    return `${hoursString}:${minutesString}:${secondsString}`

}

export const filterArrayToParamString = (filterValueArray: FilterParam[]) => {

    const filterSet = new Set();

    filterValueArray.forEach(({ key, operation, value }) => {


        switch (key) {

            case "duration":

                const timeSplit = value.split(":");

                if (timeSplit.length === 1) {
                    value = `${flattenTimeToSeconds(0, 0, +timeSplit[0])}`
                }

                if (timeSplit.length === 2) {
                    value = `${flattenTimeToSeconds(0, +timeSplit[0], +timeSplit[1])}`
                }

                if (timeSplit.length === 3) {
                    value = `${flattenTimeToSeconds(+timeSplit[0], +timeSplit[1], +timeSplit[2])}`
                }
                break;
            case "releaseDate":
                value = `${dayjs()
                    .set("year", +value)
                    .set("hour", 0)
                    .set("minute", 0)
                    .set("second", 0)
                    .set("milliseconds", 0)
                    .valueOf()}`;
                break;
        }



        filterSet.add(`${key}:${operation}:${value}`)
    });

    return Array.from(filterSet).join('~');
    
}