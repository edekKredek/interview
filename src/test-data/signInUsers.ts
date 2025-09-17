export const signInUsers = {
  valid: {
    email: 'John.doe@example.com',
    password: 'Password1!',
  },
  valid2: {
    email: 'Jane.doe@example.com',
    password: 'PassToWorldd2!',
  },
  noPassword: {
    email: 'John.doe@example.com',
    password: '',
  },
  noEmail: {
    email: '',
    password: 'Password1!',
  },
  blank: {
    email: '   ',
    password: '   ',
  },
  invalidEmail: {
    email: 'John.doe@com',
    password: 'Password1!',
  },
  emailWithSpaces: {
    email: ' John.doe@example.com ',
    password: 'Password1!',
  },
  emailLowercase: {
    email: 'john.doe@example.com',
    password: 'Password1!',
  },
  sqlInjection: {
    email: "' OR '1'='1",
    password: 'Password1!',
  },
  sqlInjectionWithAt: {
    email: "test@example.com' OR '1'='1",
    password: 'Password1!',
  },
};
