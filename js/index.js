// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  
  while(fruitsList.firstChild) {
    fruitsList.removeChild(fruitsList.firstChild);
  }

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild

    // Определяем какой класс, отвечающий за цвет рамки, будем добавлять к li
    let colorClass;
    if(fruits[i].color === "фиолетовый") {colorClass = "fruit_violet"}
    else if(fruits[i].color === "зеленый") {colorClass = "fruit_green"}
    else if(fruits[i].color === "розово-красный") {colorClass = "fruit_carmazin"}
    else if(fruits[i].color === "желтый") {colorClass = "fruit_yellow"}
    else if(fruits[i].color === "светло-коричневый") {colorClass = "fruit_lightbrown"}

    const customLi = document.createElement("li");
    customLi.className = (`fruit__item ${colorClass}`);
    customLi.innerHTML = `<div class="fruit__info"><div>index: ${i}</div><div>kind: ${fruits[i].kind}</div><div>color: ${fruits[i].color}</div><div>weight (кг): ${fruits[i].weight}</div></div>`;
    fruitsList.appendChild(customLi);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)

    let lengthArr = fruits.length;
    let randomInt = getRandomInt(0, lengthArr - 1);
    let temp = fruits.splice(randomInt, 1);
    result.push.apply(result, temp); 
  }

  if(fruits === result) alert("Порядок не изменился")
  else fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let min = parseInt(document.querySelector('.minweight__input').value);
  let max = parseInt(document.querySelector('.maxweight__input').value);
  
  let result = fruits.filter((item) => {
     // TODO: допишите функцию
  
    return ((min <= item.weight) && (max >= item.weight));
  });
  fruits = result;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  const priority = ["розово-красный", "желтый", "зеленый", "фиолетовый", "светло-коричневый"];

  const priority1 = priority.indexOf(a.color);
  const priority2 = priority.indexOf(b.color);
  
  return priority1 > priority2;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    const n = arr.length;

    // внешняя итерация по элементам
    for (let i = 0; i < n - 1; i++) {
      // внутренняя итерация для перестановки элемента в конец массива
      for (let j = 0; j < n - 1 - i; j++) {
         // сравниваем элементы
        if (comparation(arr[j], arr[j + 1])) {
           // сравниваем элементы
          [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
        }
      }
    }
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    function partition(arr, start, end) {
      // Берем последний элемент в качестве стержня
      const pivot = arr[end];
      let index = start;
      for (let i = start; i < end; i++) {
        if (comparation(pivot, arr[i])) {
          // Замена элементов
          [arr[i], arr[index]] = [arr[index], arr[i]];
          // Переход к следующему элементу
          index++;
        }
      }  
      //  Помещаем значение pivot в середину
      [arr[index], arr[end]] = [arr[end], arr[index]];
      return index;
    }

    // алгоритм быстрой сортировки
    // Создаем массив, который мы будем использовать в качестве стека, используя функции push() и pop()
    let stack = [];

    // Добавление всего исходного массива в качестве "несортированного подмассива"
    stack.push(0);
    stack.push(arr.length - 1);

    // Явной функции peek() не существует
    // Цикл повторяется до тех пор, пока у нас есть несортированные подмассивы
    while(stack[stack.length - 1] >= 0) {

      // Извлечение верхнего несортированного подмассива
      let end = stack.pop();
      let start = stack.pop();

      let pivotIndex = partition(arr, start, end);

      //Если есть несортированные элементы "слева" от pivot,
      // мы добавляем этот подмассив в стек, чтобы мы могли отсортировать его позже
      if (pivotIndex - 1 > start){
        stack.push(start);
          stack.push(pivotIndex - 1);
      }

      //Если есть несортированные элементы "справа" от pivot,
      // мы добавляем этот подмассив в стек, чтобы мы могли отсортировать его позже
      if (pivotIndex + 1 < end){
        stack.push(pivotIndex + 1);
          stack.push(end);
      }
    }
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  sortKind = sortKind === 'bubbleSort' ? 'quickSort' : 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  let temp;
  let fruit = {
  "kind": kindInput.value,
  "color": colorInput.value,
  "weight": parseInt(weightInput.value),
  }
  if (fruit.kind === "") {
    temp = "kind";
    alert(`Вы не заполнили поле ${temp}`)}
  else if (fruit.color === "") {
    temp = "color";
    alert(`Вы не заполнили поле ${temp}`)}
  else if (Number.isNaN(fruit.weight)) {
    temp = "weight";
    alert(`Вы не заполнили поле ${temp}`)}
  else 
  fruits.push(fruit);
  display();
});
