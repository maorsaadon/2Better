import '@testing-library/jest-native/extend-expect';

jest.mock('@react-native-firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { email: 'UnitTestUser@gmail.com' } })),
}));
jest.mock('@react-native-firebase/firestore', () => ({
  collection: jest.fn(() => ({
    doc: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({ exists: true, data: () => ({ name: 'Test Group - Unit' }) })),
      set: jest.fn(() => Promise.resolve()),
    })),
  })),
}));