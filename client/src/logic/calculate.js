export default function calculate(state, buttonName) {
  if (buttonName === "+") {
    return parseInt(state.total) + 1
  }

  else if (buttonName === "-") {
    return Math.max(0, parseInt(state.total) - 1);
  }
  
}
