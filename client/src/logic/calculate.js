export default function calculate(state, buttonName) {
  if (buttonName === "+") {
    return {
      total: (Number(state.total) + 1).toString()
    };
  }

  else if (buttonName === "-") {
    let updated = (Number(state.total) - 1);
    return {
        total: updated >= 0 ? updated.toString() : "0",
    };
  }
}
