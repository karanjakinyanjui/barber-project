const intSubString = (str, start, end) => {
  return parseInt(str.substring(start, end));
};

function parseTransTime(transTime) {
  const year = intSubString(transTime, 0, 4);
  const month = intSubString(transTime, 4, 6) - 1;
  const day = intSubString(transTime, 6, 8);
  const hour = intSubString(transTime, 8, 10);
  const minute = intSubString(transTime, 10, 12);
  const second = intSubString(transTime, 12, 14);

  return new Date(year, month, day, hour, minute, second);
}

const processTransaction = (transaction) => ({
  ...transaction,
  TransAmount: parseFloat(transaction.TransAmount),
  TransactionTime: parseTransTime(transaction.TransTime),
});

module.exports = { parseTransTime, processTransaction };
