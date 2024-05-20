function dateFormat(value: Date) {
  return value.toLocaleString("pt-BR", {
    dateStyle: "short",
  });
}

export { dateFormat };
