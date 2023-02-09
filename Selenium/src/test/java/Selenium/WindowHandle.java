package Selenium;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import io.github.bonigarcia.wdm.WebDriverManager;

public class WindowHandle {
 static	String window;
 static WebDriver driver;
public WindowHandle() {
	System.setProperty("webdriver.chrome.driver","C:\\Users\\al5173\\.nexial\\chrome\\chromedriver.exe");
	driver=new ChromeDriver();
	//driver.switchTo().window(window);
	driver.manage().window().maximize();
}
	public static void main(String[] args) {
		WinodowHandle1 ob2=new WinodowHandle1();
		ob2.page2();
		
	}

}
