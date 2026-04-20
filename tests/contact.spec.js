import { test } from '@playwright/test';
import { LoginPage } from '../page/login.po.js';
import { ContactPage } from '../page/contact.po.js';
import { authenticateUser, createEntity } from '../Util/helper.spec.js';
import testData from '../fixtures/loginFixture.json';
import contactTestData from '../fixtures/contactFixture.json';

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto('/');
    await login.login("admin@artstore.com", "1234567");
    await login.verifyValidLogin();
});

test.describe('Contact testcases', () => {

    test('Contact Add test', async ({ page, request }) => {
        const contact = new ContactPage(page);

        await contact.contactAdd("Rajesh", "hamal", "1919-12-12", "hamal@gmail.com", "980000000", "Thamel", "Kathmandu", "Bagmati", "44600", "Nepal");
        await contact.viewContact();

        await contact.validateContactCreated("Rajesh", "hamal", "1919-12-12", "hamal@gmail.com", "98000000", "Thamel", "Kathmandu", "Bagmati", "44600", "Nepal");
    });
    

        test('Contact Delete test', async ({ page, request }) => {
            const Data = {
                "firstName": "Jhon",
                "lastName": "M",
                "birthdate": "1990-06-30",
                "email": "aaaririr@gmail.com",
                "phone": "9898986698",
                "street1": "Add1",
                "city": "City",
                "stateProvince": "stat",
                "postalCode": "12345",
                "country": "Nepal"
        };
        

        const contact = new ContactPage(page);

        const accessToken = await authenticateUser(testData.validUser.username, testData.validUser.password, { request });
        await createEntity(Data, accessToken, '/contacts', { request });

        await page.reload();
        await contact.viewContact();
        await contact.contactEdit(
            contactTestData.firstName,
            contactTestData.lastName,
            contactTestData.birthdate,
            contactTestData.email,
            contactTestData.phone,
            contactTestData.street1,
            contactTestData.city,
            contactTestData.stateProvince,
            contactTestData.postalCode,
            contactTestData.country
        );
        await contact.validateContactCreated(
            contactTestData.firstName,
            contactTestData.lastName,
            contactTestData.birthdate,
            contactTestData.email,
            contactTestData.phone,
            contactTestData.street1,
            contactTestData.city,
            contactTestData.stateProvince,
            contactTestData.postalCode,
            contactTestData.country
        );


    });

});