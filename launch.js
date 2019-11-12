const fs = require("fs");
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

launchAlgorithm({
  sortFunctionName: "standartSort",
  result
});

console.log(result);

fs.writeFileSync("./result.json", JSON.stringify(convertToUIReadableData(result)));

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
        sortFunction
            ? sortFunction(testSequence)
            : testSequence.sort((a, b) => a - b);
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

function convertToUIReadableData(data) {
  const result = [];

  result.push({
    title: "Quick Sort",
    values: [
      ["Number of Elements in Array", "Random Order", "Sorted (ASC)", "Sorted (DESC)"],
      [ARRAY_SIZES.SMALL, data["quickSort"]["RANDOM"][0], data["quickSort"]["ASC"][0], data["quickSort"]["DESC"][0]],
      [ARRAY_SIZES.MEDIUM, data["quickSort"]["RANDOM"][1], data["quickSort"]["ASC"][1], data["quickSort"]["DESC"][1]],
      [ARRAY_SIZES.LARGE, data["quickSort"]["RANDOM"][2], data["quickSort"]["ASC"][2], data["quickSort"]["DESC"][2]],
      [ARRAY_SIZES.XLARGE, data["quickSort"]["RANDOM"][3], data["quickSort"]["ASC"][3], data["quickSort"]["DESC"][3]],
      [ARRAY_SIZES.XXLARGE, data["quickSort"]["RANDOM"][4], data["quickSort"]["ASC"][4], data["quickSort"]["DESC"][4]],
      [ARRAY_SIZES.XXXLARGE, data["quickSort"]["RANDOM"][5], data["quickSort"]["ASC"][5], data["quickSort"]["DESC"][5]],
    ]
  });

  result.push({
    title: "Standart Sort",
    values: [
      ["Number of Elements in Array", "Random Order", "Sorted (ASC)", "Sorted (DESC)"],
      [ARRAY_SIZES.SMALL, data["standartSort"]["RANDOM"][0], data["standartSort"]["ASC"][0], data["standartSort"]["DESC"][0]],
      [ARRAY_SIZES.MEDIUM, data["standartSort"]["RANDOM"][1], data["standartSort"]["ASC"][1], data["standartSort"]["DESC"][1]],
      [ARRAY_SIZES.LARGE, data["standartSort"]["RANDOM"][2], data["standartSort"]["ASC"][2], data["standartSort"]["DESC"][2]],
      [ARRAY_SIZES.XLARGE, data["standartSort"]["RANDOM"][3], data["standartSort"]["ASC"][3], data["standartSort"]["DESC"][3]],
      [ARRAY_SIZES.XXLARGE, data["standartSort"]["RANDOM"][4], data["standartSort"]["ASC"][4], data["standartSort"]["DESC"][4]],
      [ARRAY_SIZES.XXXLARGE, data["standartSort"]["RANDOM"][5], data["standartSort"]["ASC"][5], data["standartSort"]["DESC"][5]],
    ]
  });
  
  return result;
}