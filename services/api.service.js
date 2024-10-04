import axios from "axios";
import {getKeyValue, TOKEN_DICTIONARY,} from "./storage.service.js";
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const getWeather = async (city) => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token)
    console.log(token)
    if (!token) {
        throw new Error("API DO NOT EXIST , install api key with command -t ")
    }
    const {data} = await axios.get(' https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: 'en',
            units: 'metric'
        },
    })
    console.log(data)
    return data
}

const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '☀'
        case '02':
            return '⛅'
        case '03':
            return '☁'
        case '04':
            return '☁'
        case '09':
            return '🌧'
        case '10':
            return '🌦'
        case '11':
            return '🌩'
        case '13':
            return '❄'
        case '50':
            return '🌫'
    }
}
export {getWeather , getIcon}