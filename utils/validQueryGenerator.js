function validQueryGenerator(ALLOWED_FIELDS, userId = null, id, data) {
  const entries = Object.entries(data).filter(([key]) =>
    ALLOWED_FIELDS.includes(key),
  );

  if (entries.length === 0) {
    throw new BadRequestError("No valid fields to update");
  }

  const setClause = entries
    .map(([key], index) => `${key} = $${index + 1}`)
    .join(", ");

  const values = entries.map(([, value]) => value);

  if (userId) values.push(userId);
  values.push(id);

  return [setClause, values];
}
