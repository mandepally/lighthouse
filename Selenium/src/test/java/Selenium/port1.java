package Selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class port1 {
	public static void main(String[] args) {
		ChromeOptions options = new ChromeOptions();
		options.setExperimentalOption("debuggerAddress","localhost:52627");
		WebDriver driver = new ChromeDriver(options);
		driver.get("https://amazon.com");
		driver.manage().window().maximize();
		driver.findElement(By.id("twotabsearchtextbox")).sendKeys("shoes");
		driver.findElement(By.id("nav-search-submit-button")).click();
	}
}
