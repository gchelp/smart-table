import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
          .forEach((elementName) => {                        // Перебираем по именам
            elements[elementName].append(                    // в каждый элемент добавляем опции
                ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                          .map(name => {                        // используйте name как значение и текстовое содержимое
                                                        // @todo: создать и вернуть тег опции
                          })
            )
         })

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === "clear") {
            const field = action.dataset.field;          // получаем имя поля фильтра
            const input = action.parentElement.querySelector('input'); // ищем input рядом с кнопкой

            if (input) {
                input.value = '';                        // очищаем поле ввода
            }  

            if (field in state) {
                state[field] = '';                       // очищаем значение в состоянии фильтров
            }
        }


        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}