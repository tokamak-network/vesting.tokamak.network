import store from '@/store/index.js';
import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
const adapter = new LocalStorage('db');
const db = low(adapter);

export function getPendingTransactions () {
  const user = store.state.user;
  const networkId = store.state.networkId;
  const pendingTransactions = db.get(`pending-transactions-${user}-${networkId}`).value();
  if (pendingTransactions) {
    return pendingTransactions;
  } else {
    return [];
  }
}

export function setPendingTransactions (pendingTransactions=[]) {
  const user = store.state.user;
  const networkId = store.state.networkId;
  db.set(`pending-transactions-${user}-${networkId}`, pendingTransactions)
    .write();
}
