const quickSort = require("./algorithms/quick-sort");
const { generateNumbers, calculateTimeDiff } = require("./utils");

const ARRAY_SIZES = {
  SMALL: 30,
  MEDIUM: 1000,
  LARGE: 10000,
  XLARGE: 100000,
  XXLARGE: 1000000,
  XXXLARGE: 10000000
};

const TEST_SEQUENCES = {
  RANDOM: {
    SMALL: generateNumbers(ARRAY_SIZES.SMALL),
    MEDIUM: generateNumbers(ARRAY_SIZES.MEDIUM),
    LARGE: generateNumbers(ARRAY_SIZES.LARGE),
    XLARGE: generateNumbers(ARRAY_SIZES.XLARGE),
    XXLARGE: generateNumbers(ARRAY_SIZES.XXLARGE),
    XXXLARGE: generateNumbers(ARRAY_SIZES.XXXLARGE)
  }
};

TEST_SEQUENCES.ASC = Object.entries(TEST_SEQUENCES.RANDOM).reduce(
  (result, [size, randomSequnce]) => {
    return Object.assign(result, {
      [size]: [...randomSequnce].sort((a, b) => a - b)
    });
  },
  {}
);

TEST_SEQUENCES.DESC = Object.entries(TEST_SEQUENCES.RANDOM).reduce(
  (result, [size, randomSequnce]) => {
    return Object.assign(result, {
      [size]: [...randomSequnce].sort((a, b) => b - a)
    });
  },
  {}
);

const result = {};

launchAlgorithm({
  sortFunction: quickSort,
  sortFunctionName: "quickSort",
  result
});

console.log(result);

function launchAlgorithm({ sortFunction, sortFunctionName, result }) {
  console.log(` === ${sortFunctionName} ===`);

  result[sortFunctionName] = {};

  let testSequence, startDate, endDate;

  for (const sequnce in TEST_SEQUENCES) {
    const diffs = [];

    for (const size in ARRAY_SIZES) {
      console.log(`${sequnce} - ${size}`);

      testSequence = [...TEST_SEQUENCES[sequnce][size]];

      startDate = Date.now();

      try {
        sortFunction(testSequence);
      } catch (error) {
        console.error(error.message);
        diffs.push(error.message);
        continue;
      }

      endDate = Date.now();

      diffs.push(calculateTimeDiff(startDate, endDate));
    }
    result[sortFunctionName][sequnce] = diffs;
  }
}
