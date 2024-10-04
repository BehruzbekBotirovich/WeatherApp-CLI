import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
    console.log(chalk.bgRed("ERROR_" + error))
}

const printSuccess = (text) => {
    console.log(chalk.bgGreen(" OK_ " + text));
}
const printHelp = () => {
    console.log(dedent`
    ${chalk.bgCyan("Welcome to the Weather!")}
    -s [CITY} for  define city,
    -h for help
    -t [API_TOKEN] for token 
     `);
}

const printWeather = (response, icon) => {
    console.log(dedent`
    ${chalk.bgYellowBright("Weather!")} City weather is ${response.name}
    ${icon} ${response.weather[0].description}
    Temperature: ${response.main.temp} (Feels like ${response.main.feels_like})
    Humidity: ${response.main.humidity} %
    Wind speed: ${response.wind.speed} m/s
    `);

}
export {
    printError, printSuccess, printHelp , printWeather
}