export function decimalToLetter(num: number): string {
  const ASCII_LOWERCASE_A = 97;
  const ASCII_LOWERCASE_Z = 122;

  if (num < 0 || num > ASCII_LOWERCASE_Z - ASCII_LOWERCASE_A) {
    throw new Error("Number must be between 0 and 25");
  }

  const asciiValue = ASCII_LOWERCASE_A + num;
  return String.fromCharCode(asciiValue);
}
