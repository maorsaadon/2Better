describe('Login Test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should log in successfully and navigate to HomeScreen', async () => {
    await element(by.id('username_field')).typeText('UnitTestUser@gmail.com');
    await element(by.id('username_field')).tapReturnKey();

    await element(by.id('password_field')).typeText('password123');
    await element(by.id('password_field')).tapReturnKey();

    await element(by.id('login_button')).tap();

    await expect(element(by.id('home_screen'))).toBeVisible();
  });
});