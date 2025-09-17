function generateRandomEmail(): string {
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${randomString}@example.com`;
}

function generateRandomDisplayName(): string {
  const randomNum = Math.floor(Math.random() * 10000);
  return `John Doe ${randomNum}`;
}

export const signInUsers = {
  valid: {
    get displayName() {
      return generateRandomDisplayName();
    },
    get email() {
      return generateRandomEmail();
    },
    password: 'Admin1!',
    repeatPassword: 'Admin1!',
  },

  existingEmail: {
    displayName: 'John Doe',
    email: 'John.doe@example.com',
    password: 'PassTheWord1!',
    repeatPassword: 'PassTheWord1!',
  },

  invalidEmail: {
    displayName: 'Invalid Doe',
    email: 'Invalid.doe@example',
    password: 'PassTheWord1!',
    repeatPassword: 'PassTheWord1!',
  },

  forbiddenPassword: {
    displayName: 'Forbidden Doe',
    email: 'forbidden@example.com',
    password: 'Password123!',
    repeatPassword: 'Password123!',
  },

  confirmationMismatch: {
    displayName: 'Mismatch Doe',
    email: 'mismatch@example.com',
    password: 'Mismatch1!',
    repeatPassword: 'Mismatch2!',
  },

  toShortPassword: {
    displayName: 'Short Doe',
    email: 'short@example.com',
    password: '123',
    repeatPassword: '123',
  },

  noUppercasePassword: {
    displayName: 'NoUpper Doe',
    email: 'noupper@example.com',
    password: 'password1!',
    repeatPassword: 'password1!',
  },

  noDigitPassword: {
    displayName: 'NoDigit Doe',
    email: 'nodigit@example.com',
    password: 'Password!',
    repeatPassword: 'Password!',
  },

  noSpecialCharPassword: {
    displayName: 'NoSpecial Doe',
    email: 'nospecial@example.com',
    password: 'Password1',
    repeatPassword: 'Password1',
  },

  toShortDisplayName: {
    displayName: 'A',
    email: 'shortname@example.com',
    password: 'Password1!',
    repeatPassword: 'Password1!',
  },
};
