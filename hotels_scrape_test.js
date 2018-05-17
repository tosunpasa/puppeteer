const puppeteer = require('puppeteer');
const CREDS = require('./creds');

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();

  const searchUrl = "https://tr.hotels.com/ho219288/?as-srs-report=HomePage%7CAutoS%7CHOTEL%7Cankara%20hotel%7C0%7C0%7C0%7C6%7C4%7C6%7C219288&q-check-out=2018-05-12&tab=description&q-room-0-adults=2&YGF=2&q-check-in=2018-05-11&MGT=1&WOE=6&WOD=5&ZSX=0&SYE=3&q-room-0-children=0";
  console.log("searchUrl --> " + searchUrl);
  await page.goto(searchUrl);
  await page.waitFor(2 * 1000);

  const selector_hotel_name = '#property-header > div > div.vcard > h1';
  const selector_hotel_room_type = '#rooms-and-rates > ul > li:nth-child(1) > div.room-info > div > h3';
  const selector_hotel_room_price = '#rooms-and-rates > ul > li:nth-child(1) > div.rateplans > div:nth-child(1) > div.pricing > div.offers-and-prices > div.prices > div.price.special-deal > ins';


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
