/**
 * @class Table
 */
export default class Table {
  constructor(data) {
    this.data = data;
    this.table = null;
    this.timerSort = null;

    this.createTableMarkup();
    this.getTable();
  }

  createTableMarkup() {
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

    this.data.forEach((e) => {
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

  getTable() {
    const body = document.querySelector('body');
    body.insertBefore(this.table, body.firstChild);
  }

  sortUp(param) {
    this.clearSortedClass();

    let table;
    const node = this.table.querySelectorAll('.rowItem');
    if (param === 'title') {
      table = [...node].sort((a, b) => {
        const first = a.dataset[param].replace(/ё/, 'е');
        const second = b.dataset[param].replace(/ё/, 'е');
        return first > second ? 1 : -1;
      });
    } else {
      table = [...node].sort((a, b) => (Number(a.dataset[param]) - Number(b.dataset[param])));
    }

    this.table.querySelector(`th.${param}`).classList.add('sorted-up');

    table.forEach((e) => {
      this.table.appendChild(e);
    });
    return true;
  }

  sortDown(param) {
    this.clearSortedClass();

    let table;
    const node = this.table.querySelectorAll('.rowItem');
    if (param === 'title') {
      table = [...node].sort((a, b) => {
        const first = a.dataset[param].replace(/ё/, 'е');
        const second = b.dataset[param].replace(/ё/, 'е');
        return first < second ? 1 : -1;
      });
    } else {
      table = [...node].sort((a, b) => (Number(b.dataset[param]) - Number(a.dataset[param])));
    }
    this.table.querySelector(`th.${param}`).classList.add('sorted-down');

    table.forEach((e) => {
      this.table.appendChild(e);
    });
    return true;
  }

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

  stopSort() {
    clearInterval(this.timerSort);
  }

  clearSortedClass() {
    const cells = this.table.querySelectorAll('th');
    cells.forEach((cell) => {
      cell.classList.remove(...[...cell.classList]
        .filter((o) => o.startsWith('sorted')));
    });
  }
}
