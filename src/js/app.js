import Table from './Table';
import data from './dataList';

const table = new Table(data);
table.startSort();

// testing stopSort()

// setTimeout(() => {
//   table.stopSort();
// }, 16000);
