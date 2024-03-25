const readline = require('readline');

// Tax rates and thresholds
const TAX_RATES = [
  { min: 0, max: 24999, rate: 0.1 },
  { min: 25000, max: 49999, rate: 0.15 },
  { min: 50000, max: 99999, rate: 0.2 },
  { min: 100000, max: Infinity, rate: 0.25 }
];

const NHIF_RATES = [
  { min: 0, max: 5999, rate: 150 },
  { min: 6000, max: 7999, rate: 300 },
  { min: 8000, max: 11999, rate: 400 },
  { min: 12000, max: 14999, rate: 500 },
  { min: 15000, max: 19999, rate: 600 },
  { min: 20000, max: 24999, rate: 750 },
  { min: 25000, max: 29999, rate: 850 },
  { min: 30000, max: 34999, rate: 900 },
  { min: 35000, max: 39999, rate: 950 },
  { min: 40000, max: 44999, rate: 1000 },
  { min: 45000, max: 49999, rate: 1100 },
  { min: 50000, max: 59999, rate: 1200 },
  { min: 60000, max: 69999, rate: 1300 },
  { min: 70000, max: 79999, rate: 1400 },
  { min: 80000, max: 89999, rate: 1500 },
  { min: 90000, max: 99999, rate: 1600 },
  { min: 100000, max: 109999, rate: 1700 },
  { min: 110000, max: 119999, rate: 1800 },
  { min: 120000, max: 129999, rate: 1900 },
  { min: 130000, max: 139999, rate: 2000 },
  { min: 140000, max: 149999, rate: 2100 },
  { min: 150000, max: Infinity, rate: 2200 }
];

const NSSF_RATE = 0.06; // 6%

// Function to calculate Pay As You Earn (PAYE) tax
function calculateTax(grossSalary) {
  let tax = 0;
  let taxableIncome = grossSalary;

  for (const rate of TAX_RATES) {
    if (taxableIncome <= 0) {
      break;
    }

    const taxableAmount = Math.min(rate.max, taxableIncome) - rate.min;
    tax += taxableAmount * rate.rate;
    taxableIncome -= taxableAmount;
  }

  return tax;
}

// Function to calculate NHIF deductions
function calculateNHIF(grossSalary) {
  for (const rate of NHIF_RATES) {
    if (grossSalary >= rate.min && grossSalary <= rate.max) {
      return rate.rate;
    }
  }
  return 0;
}

// Function to calculate NSSF deductions
function calculateNSSF(grossSalary) {
  return grossSalary * NSSF_RATE;
}

// Function to calculate net salary
function calculateNetSalary(basicSalary, benefits) {
  const grossSalary = basicSalary + benefits;
  const tax = calculateTax(grossSalary);
  const nhif = calculateNHIF(grossSalary);
  const nssf = calculateNSSF(grossSalary);
  const netSalary = grossSalary - tax - nhif - nssf;

  return {
    grossSalary,
    tax,
    nhif,
    nssf,
    netSalary
  };
}

// Function to prompt the user for basic salary and benefits
function promptForSalary() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    rl.question("Enter basic salary: ", (basicSalary) => {
      rl.question("Enter benefits: ", (benefits) => {
        rl.close();
        const parsedBasicSalary = parseInt(basicSalary);
        const parsedBenefits = parseInt(benefits);
        
        if (isNaN(parsedBasicSalary) || isNaN(parsedBenefits) || parsedBasicSalary < 0 || parsedBenefits < 0) {
          reject("Invalid input! Salary and benefits should be positive numbers.");
        } else {
          resolve({ basicSalary: parsedBasicSalary, benefits: parsedBenefits });
        }
      });
    });
  });
}

// Main function to run the program
async function runProgram() {
  try {
    const salaries = await promptForSalary();
    const result = calculateNetSalary(salaries.basicSalary, salaries.benefits);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

// Call the main function to run the program
runProgram();
