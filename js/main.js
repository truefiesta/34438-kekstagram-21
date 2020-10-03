"use strict";

const messages = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

const descriptions = [
  `Милый котенок`,
  `Как здрово на природе!`,
  `Наконец, получилось сделать такой кадр!`,
  `Жаль, что экспозицию выставил неправильно`,
  `На этой фотографии я запечатлел счастье`,
  `Если верить прогнозам, то завтра получится сфотографировать рассвет`,
  `Такого тумана никто еще не фотографировал`,
  `Когда закончилась пленка, снимаю на цифровик`,
  `Красивая фотка вышла`,
  `Интересные блики. `,
  `Фоторафировать животных и природу всегда в удовольствие`,
  `Эта фотография получилась именно такой, как я задумал`,
  `Как вам такой сюжет?`,
];

const names = [
  `Артем`, `Елена`, `Максим`, `Саша`, `Дмитрий`,
  `Ника`, `Катя`, `Света`, `Маша`, `Миша`,
  `Тихон`, `Петр`, `Иван`, `Ольга`, `Валерия`,
  `Олесь`, `Оксана`, `Лиза`, `Слава`, `Боря`,
  `Анатолий`, `Вячеслав`, `Мирослава`, `Игорь`, `Андрей`
];

const PHOTOS_NUM = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 1;
const MAX_COMMENTS = 10;

const getRandomItemFromArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateComments = (num) => {
  const arr = [];
  let j = 1;
  for (let i = 0; i < num; i++) {
    if (j > 6) {
      j = 1;
    }

    arr.push({
      avatar: `img/avatar-${j}.svg`,
      message: getRandomItemFromArray(messages),
      name: names[i]
    });

    j++;
  }
  return arr;
};

const generatePhotos = (num) => {
  const arr = [];
  for (let i = 1; i <= num; i++) {
    arr.push({
      url: `photos/${i}.jpg`,
      description: getRandomItemFromArray(descriptions),
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: generateComments(getRandomNumber(MIN_COMMENTS, MAX_COMMENTS))
    });
  }

  return arr;
};

const photos = generatePhotos(PHOTOS_NUM);

// Найдём шаблон, который мы будем копировать.
const picturesContainer = document.querySelector(`.pictures`);
// И найдём элемент, в который мы будем вставлять фото других пользователей.
const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

for (let i = 0; i < photos.length; i++) {
  const pictureElement = pictureTemplate.cloneNode(true);
  const img = pictureElement.querySelector(`.picture__img`);
  img.setAttribute(`src`, photos[i].url);
  img.setAttribute(`alt`, photos[i].description);
  pictureElement.querySelector(`.picture__likes`).textContent = photos[i].likes;
  pictureElement.querySelector(`.picture__comments`).textContent = photos[i].comments.length;

  picturesContainer.appendChild(pictureElement);
}
