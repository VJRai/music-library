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
        return `${secondsString}`
    }

    if(!hours){
        return `${minutesString}:${secondsString}`
    }

    return `${hoursString}:${minutesString}:${secondsString}`

}

export const filterArrayToParamString = (filterValueArray: FilterParam[]) => {

    const filterSet = new Set();

    filterValueArray.forEach(({ key, operation, value }) => {
        filterSet.add(`${key}:${operation}:${value}`)
    });

    return Array.from(filterSet).join('~');
    
}