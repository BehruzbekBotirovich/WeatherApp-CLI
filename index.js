import getArgs from './helpers/args.js';
import {printSuccess, printError, printHelp, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getIcon, getWeather} from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError("Token do not exist ")
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token saved successfully.');
    } catch (error) {
        printError(error.message);
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError("City do not exist ")
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City ' + city + ' was saved successfully.');
    } catch (error) {
        printError(error.message);
    }
}


const getForecast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const response = await getWeather(city)
        printWeather(response , getIcon(response.weather[0].icon));
    } catch (error) {
        if (error.response.status === 404) {
            printError("CITY NOT FOUND!!! BAD RESPONSE")
        } else if (error.response.status === 401) {
            printError("INVALID TOKEN! setup token with command -t")
        } else {
            printError(error.message)
        }
    }
}

const startCLI = () => {
    const args = getArgs(process.argv);
    // console.log(args) //  {t:true}
    // console.log(process.argv)
    if (args.h) {
        //help
        return printHelp();
    }
    if (args.s) {
        // save
        return saveCity(args.s);
    }
    if (args.t) {
        //token
        return saveToken(args.t)
    } else {
        //error
        console.log("--------------------")
    }
    // $env:ENV="1234" terminalga env qoshish
    return getForecast()
}
startCLI();