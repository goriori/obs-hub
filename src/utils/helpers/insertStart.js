export const insertStart = (arr, index) => {
    // Проверяем, является ли индекс допустимым
    if (index < 0 || index >= arr.length) {
        throw new Error('Invalid index');
    }
    // Извлекаем элемент из массива по заданному индексу
    const elementToInsert = arr[index];

    // Создаем новый массив
    const newArr = [elementToInsert];

    // Добавляем элементы из исходного массива в новый массив,
    // пропуская извлеченный элемент
    for (let i = 0; i < arr.length; i++) {
        if (i !== index) {
            newArr.push(arr[i]);
        }
    }

    return newArr;
}