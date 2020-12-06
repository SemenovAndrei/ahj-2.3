/**
 * @class Table
 */
export default class Table {
  /**
   * Читает данные из data
   *
   * Создает таблицу согласно разметки
   *
   * @param {Array} data - массив с данными
   */
  constructor(data) {
    this.data = data;
    this.table = null;
    this.timerSort = null;

    this.createTableMarkup(this.data);
    this.createContainer();
    this.getTable();
  }

  /**
   * Создает разметку для таблицы
   *
   * @param {Array} data - массив данных
   */
  createTableMarkup(data) {
    this.table = document.createElement('table');
    this.table.classList.add('table');

    const rowTitle = document.createElement('tr');
    rowTitle.classList.add('rowTitle');
    rowTitle.innerHTML = `
  <th class="id">id</th>
  <th class="title">title</th>
  <th class="year">year</th>
  <th class="imdb">imdb</th>
      `;

    data.forEach((e) => {
      const tr = document.createElement('tr');
      tr.classList.add('rowItem');

      tr.setAttribute('data-id', e.id);
      tr.setAttribute('data-title', e.title);
      tr.setAttribute('data-year', e.year);
      tr.setAttribute('data-imdb', e.imdb);

      tr.innerHTML = `
  <td class="id">#${e.id}</td>
  <td class="title">${e.title}</td>
  <td class="year">(${e.year})</td>
  <td class="imdb">imdb: ${e.imdb.toFixed(2)}</td>
      `;

      this.table.appendChild(tr);
      this.table.insertBefore(rowTitle, this.table.firstChild);
    });
  }

  /**
   * Создает элемент с классом container
   *
   * Записывает его в body
   */
  createContainer() {
    this.container = document.createElement('div');
    this.container.classList.add('container');
    const body = document.querySelector('body');
    body.insertBefore(this.container, body.firstChild);
  }

  /**
   * Очищает this.container
   *
   * Записывает this.table в this.container
   */
  getTable() {
    this.container.innerHTML = '';
    this.container.insertBefore(this.table, this.container.firstChild);
  }

  /**
   * Сортирует массив данных по возрастанию
   *
   * Выводит отсортированную таблицу
   *
   * @param {String} param - параметр для сортировки
   */
  sortUp(param) {
    let dataSorted;
    if (param === 'title') {
      dataSorted = this.data.sort((a, b) => {
        const first = a[param].replace(/ё/, 'е');
        const second = b[param].replace(/ё/, 'е');
        return first > second ? 1 : -1;
      });
    } else {
      dataSorted = this.data.sort((a, b) => (a[param] - b[param]));
    }

    this.createTableMarkup(dataSorted);
    this.getTable();

    this.table.querySelector(`th.${param}`).classList.add('sorted-up');
  }

  /**
   * Сортирует массив данных по убыванию
   *
   * Выводит отсортированную таблицу
   *
   * @param {String} param - параметр для сортировки
   */
  sortDown(param) {
    let dataSorted;
    if (param === 'title') {
      dataSorted = this.data.sort((a, b) => {
        const first = a[param].replace(/ё/, 'е');
        const second = b[param].replace(/ё/, 'е');
        return first < second ? 1 : -1;
      });
    } else {
      dataSorted = this.data.sort((a, b) => (b[param] - a[param]));
    }

    this.createTableMarkup(dataSorted);
    this.getTable();

    this.table.querySelector(`th.${param}`).classList.add('sorted-down');
  }

  /**
   * Запускает сортировку таблицы каждые 2 секунды
   */
  startSort() {
    const param = [];
    const cells = document.querySelectorAll('th');
    cells.forEach((e) => param.push(e.classList.value));

    let index = 0;

    const func = () => {
      this.sortUp(param[index]);

      setTimeout((arg) => {
        this.sortDown(arg);
      }, 2000, param[index]);

      index = index === param.length - 1 ? 0 : index += 1;
    };

    func();
    this.timerSort = setInterval(func, 4000);
  }

  /**
   * Останавливает сортировку
   */
  stopSort() {
    clearInterval(this.timerSort);
  }
}
