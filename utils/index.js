/**
 * current function is used to randomly generate numbers
 * @param  {int} amount - amount of items to henerate
 * @return {[int]} numbers - the sequence of numbers with length equal to amount
 */
function generateNumbers(amount) {
  const arr = [];

  for (var i = 0; i < amount; i++) {
    arr[i] = Math.floor(Math.random() * amount + 1);
  }

  return arr;
}

function calculateTimeDiff(timestamp1, timestamp2) {
  return (timestamp2 - timestamp1) / 1000;
}

module.exports = { generateNumbers, calculateTimeDiff };
