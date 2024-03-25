
function calculateGrade(marks) {
    if (marks >= 80 && marks <= 100) {
      return 'A';
    } else if (marks >= 60 && marks < 80) {
      return 'B';
    } else if (marks >= 50 && marks < 60) {
      return 'C';
    } else if (marks >= 40 && marks < 50) {
      return 'D';
    } else if (marks >= 0 && marks < 40) {
      return 'E';
    } else {
      return 'Invalid marks';
    }
  }
  
  function getAndCalculateGrade() {
    let marks = parseInt(prompt("Enter student marks (between 0 and 100):"));
    
    if (isNaN(marks) || marks < 0 || marks > 100) {
      console.log("Invalid input! Marks should be between 0 and 100.");
    } else {
      let grade = calculateGrade(marks);
      console.log(`Grade: ${grade}`);
    }
  }
  
  getAndCalculateGrade();
  