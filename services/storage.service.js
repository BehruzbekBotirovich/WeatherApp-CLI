import os from "os"; // операционная система
import path from "path"; // работа с путями
import fs from "fs"; // работа с файлами

// Определяем путь к файлу weather-data.json в домашней директории пользователя
const filePath = path.join(os.homedir(), 'weather-data.json');

// Функция для проверки, существует ли файл по указанному пути
const isExist = async (path) => {
    try {
        // Проверяем наличие файла
        await fs.promises.stat(path);
        return true;
    } catch (error) {
        // Если файла нет, вернем false
        return false;
    }
}

// Асинхронная функция для сохранения ключа и значения в файл
const saveKeyValue = async (key, value) => {
    let data = {}; // Используем let, так как позже значение будет перезаписано
    // Проверяем, существует ли файл
    if (await isExist(filePath)) {
        // Если файл существует, читаем его содержимое
        const file = await fs.promises.readFile(filePath);
        data = JSON.parse(file); // Парсим содержимое файла как объект
    }
    // Добавляем или обновляем значение по ключу
    data[key] = value;
    // Записываем обновленные данные обратно в файл
    await fs.promises.writeFile(filePath, JSON.stringify(data));
}
const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city'
}
const getKeyValue = async (key) => {
    if (await isExist(filePath)) {
        const file = await fs.promises.readFile(filePath);
        const data = JSON.parse(file);
        return data[key];
    }
    return undefined;

}
export {saveKeyValue, getKeyValue, TOKEN_DICTIONARY};
