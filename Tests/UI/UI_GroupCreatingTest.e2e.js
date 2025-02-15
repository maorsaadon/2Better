describe('Create Group Test', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    it('should allow a user to create a new group', async () => {
      await element(by.text('Add Group')).tap();
  
      await element(by.id('group_name_field')).typeText('Test Group - UI');
      await element(by.id('group_name_field')).tapReturnKey();
  
      await element(by.text('Select type of sport')).tap();
      await element(by.text('Football')).tap();
  
      await element(by.text('Select city')).tap();
      await element(by.text('Ariel')).tap();
  
      await element(by.id('add_button')).tap();
  
      await expect(element(by.text('MyGroups'))).toBeVisible();
    });
  });