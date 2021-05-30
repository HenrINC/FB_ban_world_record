import server
from selenium import webdriver
import time
browser = webdriver.Chrome()
browser.minimize_window()
def gen(browser):
    browser.get("http://temp-mail.org/en/")
    time.sleep(5)
    return browser.get_cookie("email")["value"].replace("%40","@")
def restart(browser):
    browser.quit()
    browser = webdriver.Chrome()
    browser.minimize_window()
    return browser
def main(data):
    global browser
    response = server.Response(headers = ["Content-Type: application/json",f"Access-Control-Allow-Origin: {data['Referer']}"])#Bypass the cross origin security
    q = data["GET"]["q"]
    print("1")
    if q == "gen":
        response.content = '{"results":[{"status":"Done","email":"'+gen(browser)+'"}]}'
    elif q == "restart":
        browser = restart(browser)
        response.content = "[{'status':'Done'}]"
    elif q == "regen":
        print("2")
        browser = restart(browser)
        print("3")
        response.content = '\n{"status":"Done","email":"'+gen(browser)+'"}'
        print("4")
    elif q == "get":
        print(browser.find_element_by_class_name("inboxSubject small subject-title d-none visable-xs-sm")[1].get_attribute("innerHTML"))
        
    print(response.encode())
    return response.encode()
    
s = server.Server("",2558)
s.serve({"main":main},3)
