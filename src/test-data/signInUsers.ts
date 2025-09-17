export const signInUsers = {
  valid: {
    username: 'student',
    password: 'Password123',
  },
  noPassword: {
    username: 'student',
    password: '',
  },
  noEmail: {
    username: '',
    password: 'Password123',
  },
  blank: {
    username: '   ',
    password: '   ',
  },
  invalidUsername: {
    username: '!@#$%^&*()_+',
    password: 'Password123',
  },
  userWithSpaces: {
    username: ' student ',
    password: 'Password123',
  },
  userUppercase: {
    username: 'STUDENT',
    password: 'Password123',
  },
  sqlInjection: {
    username: "' OR '1'='1",
    password: 'Password123Password123',
  },
  sqlInjectionWithAt: {
    username: "student' OR '1'='1",
    password: 'Password1!',
  },
};
