package Selenium;

import java.util.Set;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;



 public class WinodowHandle1 extends WindowHandle{
		public void page2() {
			driver.get("https://amazon.com");
			String PgTitle=driver.getTitle();
			String window=driver.getWindowHandle();
			System.out.println(PgTitle);
			WebDriver driver1=new ChromeDriver();
			driver1.get("https://google.com");
			
		}
	}

