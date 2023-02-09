package Selenium;	
import java.io.File;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class SwitchBrowser {

	public static void main(String[] args) {
        String driverPath = StringUtils.joinWith(File.separator, System.getProperty("user.home"), ".nexial", "chrome",
                                             "chromedriver.exe");
        System.setProperty("webdriver.chrome.driver", driverPath);

        ChromeDriver driver = new ChromeDriver();
        Capabilities c =  driver.getCapabilities();
        
        Map<String,Object> m = c.asMap();
        m.forEach((Key,Value)-> System.out.println("Key is: "+Key+" - "+"value is: "+Value));

        driver.get("https://www.google.com");
        System.out.println("Driver handle initially is " + driver.getWindowHandle());

        String x = StringUtils.substringBetween(m.get("goog:chromeOptions").toString(), "{debuggerAddress=", "}");
        switchBrowser(x);

    }

    private static void switchBrowser(String x) {
        System.out.println("x is " + x);
        ChromeOptions o = new ChromeOptions();
        o.setExperimentalOption("debuggerAddress", x);
        WebDriver driver = new ChromeDriver(o);
        System.out.println("Driver handle after change is " + driver.getWindowHandle());
        System.out.println("title is " + driver.getTitle());
        driver.findElement(By.name("q")).sendKeys("Meher Baba");
    }
}
