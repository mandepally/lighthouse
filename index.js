
const puppeteer = require('puppeteer');
const fs = require('fs');
const constants = require('lighthouse/lighthouse-core/config/constants.js');
const { startFlow } = require('lighthouse/lighthouse-core/fraggle-rock/api.js');
const config = require('lighthouse/lighthouse-core/config/desktop-config.js');
const { generateReport } = require('lighthouse/report/generator/report-generator.js')


let categories = (process?.argv[3]?.indexOf(',') > -1 ? process?.argv[3]?.split(',') : ([process?.argv[3]] ? [process?.argv[3]] : ""));
let outputType = (process?.argv[4]?.indexOf(',') > -1 ? process?.argv[4]?.split(',') : ([process?.argv[4]] ? [process?.argv[4]] : ""));
let isMobile = process?.argv[5] == "mobile" ? true : false;
let isDesktop = process?.argv[5] == "desktop" ? true : false;
let widthAndHeight = process?.argv[6]?.indexOf(',') > -1 ? process?.argv[6]?.split(',') : ((process?.argv[6] != "" || process.argv[6] != undefined) ? "single value" : "");
let fileNameInitials = process?.argv[7] ? process?.argv[7] : "";

console.log("categories : " + categories);
console.log("outputType : " + outputType);
console.log("output path for report and file name initials : " + fileNameInitials);
console.log(" Desktop mode : " + isDesktop);
console.log(" mobile mode : " + isMobile);
console.log("width and height " + widthAndHeight[0], widthAndHeight[1]);

// desktop config to generate report
let desktopConfig = { config };
desktopConfig.config.settings.onlyCategories = categories;
desktopConfig.config.settings.output = outputType;


// mobile config to generate report
const mobileConfig = {
  config: {
    extends: 'lighthouse:default',
    settings: {
      formFactor: 'mobile',
      onlyCategories: categories,
      throttling: constants.throttling.mobileSlow4G,
      screenEmulation: constants.screenEmulationMetrics.mobile,
      emulatedUserAgent: constants.userAgents.mobile,
      output: outputType
    }
  }
};

if (categories == "" && outputType == "" && (!isMobile && !isDesktop) && fileNameInitials == "") {
  console.log("Category, output type, output path, device, width and height of the page are manadatory.");
  console.log("For ex.  node <path of node js app> <port no.> <category> <output type> <desktop or mobile mode> <output path for report>")
  process.exit(0);
}

if (categories == "") {

  console.log("Categories are not specified like accessiblity,seo,best-practices in command line args.");
  process.exit(0);
}

if (outputType == "") {
  console.log("Category, output type, output path, device, width and height of the page are manadatory.");
  console.log("For ex.  node <path of node js app> <port no.> <category> <output type> <desktop or mobile mode> <width,height> <output path for report>");
  console.log("Output type like html,json is not specified in command line args.");
  process.exit(0);
}

if (!isMobile && !isDesktop) {
  console.log("Category, output type, output path, device, width and height of the page are manadatory.");
  console.log("For ex.  node <path of node js app> <port no.> <category> <output type> <desktop or mobile mode> <width,height> <output path for report>");
  console.log("Desktop or mobile is not specified in command line args.");
  process.exit(0);
}
if (widthAndHeight == "single value" || widthAndHeight == "") {
  console.log("Category, output type, output path, device, width and height of the page are manadatory.");
  console.log("For ex.  node <path of node js app> <port no.> <category> <output type> <desktop or mobile mode> <width,height> <output path for report>");
  console.log("width and height is not specified in command line arguments.");
  process.exit(0);
}

if (fileNameInitials == "") {
  console.log("Category, output type, output path, device, width and height of the page are manadatory.");
  console.log("For ex.  node <path of node js app> <port no.> <category> <output type> <desktop or mobile mode> <width,height> <output path for report>");
  console.log("Output path is not specified in command line args.");
  process.exit(0);
}

if (widthAndHeight.length > 1) {
  desktopConfig.config.settings.screenEmulation = {
    mobile: false,
    width: !isNaN(widthAndHeight[0]) ? widthAndHeight[0] : 1350,
    height: !isNaN(widthAndHeight[0]) ? widthAndHeight[0] : 940,
    deviceScaleFactor: 1,
    disabled: false,
  };
}


(async () => {
  try {

    /*  getting port from command line arguments and preparing url to connect already opened browser through nexial. */
    const browserURL = 'http://127.0.0.1:' + process.argv[2];

    // connecting using connect method by passing browserURL
    const browser = await puppeteer.connect({
      browserURL
    });

    // getting already opned page in the browser
    const pages = await browser.pages();




    // getting active tab status
    const activeTabStatus = await Promise.all(pages.map(async (p) => {
      const state = await p.evaluate(() => document.webkitHidden);
      return !state;
    }));

    const currentPage = await pages.filter((_v, index) => activeTabStatus[index])[0];


    // const handle = await currentPage.evaluateHandle(() => ({ window, document }));
    // const properties = await handle.getProperties();
    // const windowHandle = properties.get('window');
    // const documentHandle = properties.get('document');
    // var result = await currentPage.evaluate(win => win, windowHandle);

    // console.log(result)
    // created flow object for desktop and mobile
    if (isDesktop) {
      const flowDesktop = await startFlow(currentPage, desktopConfig);
      await flowDesktop.snapshot();
      generateLighthouseReport(fileNameInitials + "_desktop.html", await flowDesktop.generateReport());
      generateLighthouseReport(fileNameInitials + "_desktop.json", await generateReport(await flowDesktop.createFlowResult(), 'json'));
    }

    if (isMobile) {
      const flowMobile = await startFlow(currentPage, mobileConfig);
      await flowMobile.snapshot();
      generateLighthouseReport(fileNameInitials + "_mobile.html", await flowMobile.generateReport());
      generateLighthouseReport(fileNameInitials + "_mobile.json", await generateReport(await flowMobile.createFlowResult(), 'json'));
    }


    await process.exit(0);
  }
  catch (error) {
    // handle error
    console.error(error);
    process.exit(0);
  }

})();

async function generateLighthouseReport(path, result) {
  fs.writeFileSync(path, result);
}