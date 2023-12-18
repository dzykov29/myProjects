import { isValidEmail } from './validation';

test('Проверка email должна пропускать корректные значения', () => {
  expect(isValidEmail('email@mail.ru')).toBe(true);
});

test('Не должно быть пробелов', () => {
  expect(isValidEmail('name sutname@mail.ru')).toBe(false);
});
