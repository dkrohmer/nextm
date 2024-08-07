import { browser } from '@wdio/globals';

it('should verify the presence of landing page elements', async () => {
  // Check if the title is correct
  const title = await browser.getTitle();
  expect(title).toBe('nexTM');

  // Check for "Add Product" button
  // const addProductButton = await $('#add-product-button');
  // expect(await addProductButton.isDisplayed()).toBe(true);

  // Check for table headers
  const nameHeader = await $('th=Name');
  const descriptionHeader = await $('th=Description');
  const responsibleHeader = await $('th=Responsible(s)');
  const deadlineHeader = await $('th=Deadline');
  const createdAtHeader = await $('th=Created at');
  const actionsHeader = await $('th=Actions');

  expect(await nameHeader.isDisplayed()).toBe(true);
  expect(await descriptionHeader.isDisplayed()).toBe(true);
  expect(await responsibleHeader.isDisplayed()).toBe(true);
  expect(await deadlineHeader.isDisplayed()).toBe(true);
  expect(await createdAtHeader.isDisplayed()).toBe(true);
  expect(await actionsHeader.isDisplayed()).toBe(true);

  // Check for footer links
  const contributeLink = await $('a=Contrrrribute');
  const discussLink = await $('a=Discuss');
  const donateLink = await $('a=Donate');

  expect(await contributeLink.isDisplayed()).toBe(true);
  expect(await discussLink.isDisplayed()).toBe(true);
  expect(await donateLink.isDisplayed()).toBe(true);
});
