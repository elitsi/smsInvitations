export default function calculate(state, buttonName) {
  if (buttonName === "+") {
    return {
      total: (Number(state.total) + 1).toString()
    };
  }

  else if (buttonName === "-") {
    return {
        total: (Number(state.total) - 1).toString()
    };
  }
}
