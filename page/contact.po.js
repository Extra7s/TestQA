const { expect } = require("@playwright/test");

exports.ContactPage = class ContactPage {
  constructor(page) {
    this.page = page;

    // Buttons
    this.addContact = '#add-contact';
    this.save = '#submit';
    this.editContact = '#edit-contact';
    this.deleteContact = '#delete';


    this.firstName = '#firstName';
    this.lastName = '#lastName';
    this.dob = '#birthdate';
    this.email = '#email';
    this.phone = '#phone';
    this.address = '#street1';
    this.city = '#city';
    this.state = '#stateProvince';
    this.postal = '#postalCode';
    this.country = '#country';

    this.savedFirstName = '#firstName';
    this.savedLastName = '#lastName';
    this.savedDOB = '#birthdate';
    this.savedEmail = '#email';
    this.savedPhone = '#phone';
    this.savedAddress = '#street1';
    this.savedCity = '#city';
    this.savedState = '#stateProvince';
    this.savedPostal = '#postalCode';
    this.savedCountry = '#country';

    // Table (fixed XPath)
    this.viewCreatedContact = '//th[contains(text(),"Name")]/following::td[2]';
  }

  async contactAdd(firstName, lastName, dateOfBirth, email, phone, address, city, state, postal, country) {
    await this.page.locator(this.addContact).click();

    await this.page.locator(this.firstName).fill(firstName);
    await this.page.locator(this.lastName).fill(lastName);
    await this.page.locator(this.dob).fill(dateOfBirth);
    await this.page.locator(this.email).fill(email);
    await this.page.locator(this.phone).fill(phone);
    await this.page.locator(this.address).fill(address);
    await this.page.locator(this.city).fill(city);
    await this.page.locator(this.state).fill(state);
    await this.page.locator(this.postal).fill(postal);
    await this.page.locator(this.country).fill(country);

    await this.page.locator(this.save).click();
  }

  async validateContactCreated(fName, lName, dob, email, phone, address, city, state, postal, country) {
    // await this.page.locator(this.viewCreatedContact).click();

    const fNameValidation = await this.page.locator(this.savedFirstName);
    const lNameValidation = await this.page.locator(this.savedLastName);
    const dobValidation = await this.page.locator(this.savedDOB);
    const emailValidation = await this.page.locator(this.savedEmail);
    const phoneValidation = await this.page.locator(this.savedPhone);
    const addressValidation = await this.page.locator(this.savedAddress);
    const cityValidation = await this.page.locator(this.savedCity);
    const stateValidation = await this.page.locator(this.savedState);
    const postalValidation = await this.page.locator(this.savedPostal);
    const countryValidation = await this.page.locator(this.savedCountry);

    await expect(fNameValidation).toHaveText(fName);
    await expect(lNameValidation).toHaveText(lName);
    await expect(dobValidation).toHaveText(dob);
    await expect(emailValidation).toHaveText(email);
    await expect(phoneValidation).toHaveText(phone);
    await expect(addressValidation).toHaveText(address);
    await expect(cityValidation).toHaveText(city);
    await expect(stateValidation).toHaveText(state);
    await expect(postalValidation).toHaveText(postal);
    await expect(countryValidation).toHaveText(country);
  }

  async viewContact() {
    await this.page.locator(this.viewCreatedContact).click();
  }

  async contactEdit(firstName, lastName, dateOfBirth, email, phone, address, city, state, postal, country) {
    await this.page.locator(this.editContact).click();

    await this.page.locator(this.firstName).fill(firstName);
    await this.page.locator(this.lastName).fill(lastName);
    await this.page.locator(this.dob).fill(dateOfBirth);
    await this.page.locator(this.email).fill(email);
    await this.page.locator(this.phone).fill(phone);
    await this.page.locator(this.address).fill(address);
    await this.page.locator(this.city).fill(city);
    await this.page.locator(this.state).fill(state);
    await this.page.locator(this.postal).fill(postal);
    await this.page.locator(this.country).fill(country);

    await this.page.locator(this.save).click();
  }

  async contactDelete() {
    // Register the dialog handler BEFORE triggering the click
    this.page.once('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept();
    });

    // Perform the action that triggers the dialog
    await this.page.locator(this.deleteContact).click();
  }
};