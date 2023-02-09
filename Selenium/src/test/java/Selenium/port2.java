package Selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class port2 {
public static void main(String[] args) {
	ChromeOptions options=new ChromeOptions();
	options.setExperimentalOption("debuggerAddress","");
	WebDriver driver=new ChromeDriver();
	driver.findElement(By.name("q")).sendKeys("nexial");
}
}
