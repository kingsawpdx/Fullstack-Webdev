const calculateChange = function calculateChange(cash) {
  if (cash > 100) {
    return "Error: the number is too large";
  } else if (cash < 0) {
    return "Error: please enter a positive number";
  }

  let returnString = cash.toString() + "$ ==> ";

  let dollars = Math.floor(cash);
  let dollar_comma = "";
  let cents = {
    total: 0,
    quarter: { value: 0, comma: 0 },
    dime: { value: 0, comma: 0 },
    nickel: { value: 0, comma: 0 },
    penny: { value: 0, comma: 0 },
  };
  cents["total"] = (cash % 1).toFixed(2) * 100;
  cents["total"] ? (dollar_comma = ", ") : (dollar_comma = "");

  if (dollars == 1) {
    returnString += dollars.toString() + " dollar" + dollar_comma;
  } else if (dollars > 1) {
    returnString += dollars.toString() + " dollars" + dollar_comma;
  }

  cents["quarter"]["value"] = Math.floor(cents["total"] / 25);
  cents["total"] -= cents["quarter"]["value"] * 25;

  cents["dime"]["value"] = Math.floor(cents["total"] / 10);
  cents["total"] -= cents["dime"]["value"] * 10;
  cents["quarter"]["comma"] += 1;

  cents["nickel"]["value"] = Math.floor(cents["total"] / 5);
  cents["total"] -= cents["nickel"]["value"] * 5;
  cents["quarter"]["comma"] += 1;
  cents["dime"]["comma"] += 1;

  cents["penny"]["value"] = Math.floor(cents["total"] / 1);
  cents["total"] -= cents["penny"]["value"] * 1;
  cents["quarter"]["comma"] += 1;
  cents["dime"]["comma"] += 1;
  cents["nickel"]["comma"] += 1;

  for (const key in cents) {
    if (key != "total" && cents[key]["value"]) {
      if (key == "penny") {
        cents[key]["value"] == 1
          ? (returnString += cents[key]["value"] + " penny")
          : (returnString += cents[key]["value"] + " pennies");
      } else {
        cents[key]["value"] > 1
          ? (returnString += cents[key]["value"] + " " + key + "s")
          : (returnString += cents[key]["value"] + " " + key);
        cents[key]["comma"] ? (returnString += ", ") : (returnString += " ");
      }
    }
  }
  return returnString;
};

// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Add additional test cases here
console.log(calculateChange(0.99));
console.log(calculateChange(1.41));
console.log(calculateChange(4.99));
console.log(calculateChange(10.82));

console.log(calculateChange(-1));
console.log(calculateChange(100.1));
