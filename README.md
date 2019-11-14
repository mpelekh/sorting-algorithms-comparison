# Practical analysis of the complexity of sorting algorithms.

## The task is as follows:

Implement and benchmark the performance of three sorting algorithms:
- insertion sort
- quick sort
- one - up to you
- standard sorting method used in the programming language.

Test for three datasets:
- an array of random numbers
- the same array sorted by descending order
- the same array sorted by ascending order.

It is important to consider the results for a small array size (<50) and large (~ 10K-1000K) one. The given numbers are approximate.

The results should be presented in a convenient format:
- tables
- graphs

## Implementation

**Programming Language**: JavaScript

**The following algorithms were implemented:**
- quick sort
- merge sort
- insertion sort
- standard sorting method used in the JavaScript programming language (`Array.prototype.sort`).

**The results are presented in a chart format by the following link:** https://mpelekh.github.io/sorting-algorithms-comparison.

## Development
### Available Scripts

In the project directory, you can run:

### `npm run build`

Launches the foregoing algorithms with the appropriate sequences and keeps the results into `result.json` file.  
Creates the `/dist` directory which can be deployed to web server as the source of static assets.

### `npm run clean`

Removes the `/dist` directory.

### `npm run deploy`

Deploys the comparison results as on `gh-pages`.
