function somar(a, b) {
  if (typeof a !== "number" || typeof a !== typeof b) {
    return "Erro";
  }
  return a + b;
}

exports.somar = somar;