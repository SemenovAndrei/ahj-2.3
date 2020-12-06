import Table from '../Table';
import data from '../dataList';

const table = new Table(data);
table.createTableMarkup(table.data);
table.createContainer();
table.getTable();

describe('sortUp()', () => {
  test('sort by ID', () => {
    table.sortUp('id');
    const array = table.table.querySelectorAll('td.id');
    const result = [];
    array.forEach((e) => result.push(e.textContent));

    expect(result).toEqual(['#25', '#26', '#27', '#223', '#1047']);
  });

  test('sort by TITLE', () => {
    table.sortUp('title');
    const array = table.table.querySelectorAll('td.title');
    const result = [];
    array.forEach((e) => result.push(e.textContent));

    expect(result).toEqual([
      'Крёстный отец', 'Крёстный отец 2', 'Криминальное чтиво', 'Побег из Шоушенка', 'Тёмный рыцарь',
    ]);
  });
});

describe('sortDown()', () => {
  test('sort by ID', () => {
    table.sortDown('id');
    const array = table.table.querySelectorAll('td.id');
    const result = [];
    array.forEach((e) => result.push(e.textContent));

    expect(result).toEqual(['#1047', '#223', '#27', '#26', '#25']);
  });

  test('sort by TITLE', () => {
    table.sortDown('title');
    const array = table.table.querySelectorAll('td.title');
    const result = [];
    array.forEach((e) => result.push(e.textContent));

    expect(result).toEqual([
      'Тёмный рыцарь', 'Побег из Шоушенка', 'Криминальное чтиво', 'Крёстный отец 2', 'Крёстный отец',
    ]);
  });
});
