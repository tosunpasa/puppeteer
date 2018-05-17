const puppeteer = require('puppeteer');
const CREDS = require('./creds');

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();

  const searchUrl = "https://www.booking.com/hotel/cl/ankara.en-gb.html?label=gen173nr-1FCAEoggJCAlhYSDNYBGjkAYgBAZgBLrgBB8gBDNgBAegBAfgBC5ICAXmoAgM;sid=e28c18bdab6a928d50c3b0152bc0267a;all_sr_blocks=33432405_89163945_0_41_0;bshb=2;checkin=2018-05-10;checkout=2018-05-11;dest_id=-904540;dest_type=city;dist=0;group_adults=2;hapos=1;highlighted_blocks=33432405_89163945_0_41_0;hpos=1;room1=A%2CA;sb_price_type=total;srepoch=1525776288;srfid=3cc118c283b28766eeed695f67f09febf09db6a3X1;srpvid=065d4b8f01f50087;type=total;ucfs=1&#hotelTmpl";
  console.log("searchUrl --> " + searchUrl);
  await page.goto(searchUrl);
  await page.waitFor(2 * 1000);

  const selector_hotel_name = '#hp_hotel_name';
  const selector_hotel_room_type = '#hprt-form > table > tbody > tr:nth-child(1) > td.hprt-table-cell.-first.hprt-table-cell-roomtype > div > div.hprt-roomtype-block.hprt-roomtype-name > a.hprt-roomtype-link > span.hprt-roomtype-icon-link';
  const selector_hotel_room_price = '#hprt-form > table > tbody > tr:nth-child(1) > td.hprt-table-cell.hprt-table-cell-price > div > div.hprt-price-price > span';


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
