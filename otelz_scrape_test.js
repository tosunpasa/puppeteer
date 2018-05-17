const puppeteer = require('puppeteer');
const CREDS = require('./creds');

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();

  const searchUrl = "https://www.otelz.com/tesis/the-green-park-hotel-ankara/IL-10_09.05.2018_10.05.2018_0_1_5-2-0-0-0-0/6772#.WvMHrdNuZ-U";
  console.log("searchUrl --> " + searchUrl);
  await page.goto(searchUrl);
  await page.waitFor(2 * 1000);

  const selector_hotel_name = '#facility-name > h1';
  const selector_hotel_room_type = '#prices-content > div.prices-row.prices-main-row.last-row > div.prices > div:nth-child(1) > div.prices-column.second.text-bigger > div.mobile-room-name.room-trigger';
  const selector_hotel_room_price = '#prices-content > div.prices-row.prices-main-row.last-row > div.prices > div:nth-child(1) > div.prices-column.fifth.tooltip.active > span.price.discount > span.price-value';


  let hotelName = await page.evaluate((sel) => {
    let element = document.querySelector(sel);
    return element ? element.innerHTML : null;
  }, selector_hotel_name);

  let roomType = await page.evaluate((sel) => {
    let element = document.querySelector(sel);
    return element ? element.innerHTML : null;
  }, selector_hotel_room_type);

  let roomPrice = await page.evaluate((sel) => {
    let element = document.querySelector(sel);
    return element ? element.innerHTML : null;
  }, selector_hotel_room_price);

  console.log('hotelName: ', hotelName);
  console.log('roomType: ', roomType);
  console.log('roomPrice: ', roomPrice.replace('&nbsp;',''));

  browser.close();
}

run();
