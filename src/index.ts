import { Day } from './day';
import day0 from './day0';
import day1 from './day1';
import day2 from './day2';
import day3 from './day3';
import day4 from './day4';
import day5 from './day5';
import day6 from './day6';
import day7 from './day7';
import day8 from './day8';
// MORE IMPORTS HERE

const days: Day[] = [
    day0,
    day1,
    day2,
    day3,
    day4,
    day5,
    day6,
    day7,
    day8
    // MORE DAYS HERE
];

async function runDay(dayId: number) {
  const resultPart1 = await days[dayId].partOne();
  console.log("Part 1 result:\n");
  console.log(resultPart1);

  console.log("\n");

  const resultPart2 = await days[dayId].partTwo();
  console.log("Part 2 result:\n");
  console.log(resultPart2);
}

console.log("\n\n\n   ADVENT OF CODE 2022 \n\n");
const params = process.argv.splice(2);
if (params.length) {
  runDay(parseInt(params[0], 10));
} else {
  console.log(`Usage: npm run start [day]`);
  console.log(`Available days: [ ${days.map((x) => x.id).join(", ")} ]`);
}
