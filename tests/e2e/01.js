const puppeteer = require('puppeteer');

(async () => {
  
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  page.setDefaultTimeout(10000);
  
  try{
    await page.goto('http://localhost:8080');
  }catch(e){
    console.error(`SERVER NOT READY: ${e}`);
    await browser.close();
    process.exit(1);
  }

  try{
    const [response] = await Promise.all([
      page.waitForNavigation(), // The promise resolves after navigation has finished
      page.click('#contactTableLink'), // Clicking the link will indirectly cause a navigation
    ]);

  }catch(e){
    console.error(`CONTACT TABLE LINK ERROR: ${e}`);
    await browser.close();
    process.exit(1);
  }

  try{
    
    var initialRowCount = (await page.$$('body > main > main > table > tbody > tr')).length;
    
    //console.log("initial: "+initialRowCount);

  }catch(e){
    console.error(`INITIAL ROW COUNT ERROR: ${e}`);
    await browser.close();
    process.exit(1);
  }

  try{
    
    (await page.$$('body > main > main > table > tbody > tr:nth-child(1) > td:nth-child(1) > input')).value = "XXXXX";
    await page.click('body > main > main > table > tbody > tr:nth-child(1) > td:nth-child(4) > button');
    await page.waitForTimeout(2000);

  }catch(e){
    console.error(`INSERT CONTACT: ${e}`);
    await browser.close();
    process.exit(1);
  }

  try{
    
    var finalRowCount = (await page.$$('body > main > main > table > tbody > tr')).length;
    
    //console.log("final: "+finalRowCount);

  }catch(e){
    console.error(`FINAL ROW COUNT ERROR: ${e}`);
    await browser.close();
    process.exit(1);
  }

  if(initialRowCount != finalRowCount-1){
    console.error(`ERROR INSERTING CONTACT: initialRowCount : ${initialRowCount}, finalRowCount : ${finalRowCount} (expected: ${initialRowCount+1})`);
    process.exit(1);
  }

  await page.screenshot({ path: 'final.png' });

  await browser.close();
})();