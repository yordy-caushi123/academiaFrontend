import time
from selenium import webdriver

url = 'https://www.djangoproject.com/'
options = webdriver.ChromeOptions()
options.add_argument('--window-size=1024,768')
options.add_argument('--headless')
options.add_argument("--hide-scrollbars")
options.add_argument('--disable-gpu')

browser = webdriver.Chrome(options=options)
browser.get(url)
time.sleep(2)  # esperamos que cargue todo con un tiempo moderado

height = browser.execute_script(
    "return Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight )")
print(height)
browser.close()

# realizamos la captura con el "alto" que hemos obtenido
options = webdriver.ChromeOptions()
options.add_argument('--no-sandbox')
options.add_argument(f'--window-size=1024,{height}')
options.add_argument('--headless')
options.add_argument("--hide-scrollbars")
options.add_argument('--disable-gpu')
options.add_argument('--ignore-certificate-errors')

browser = webdriver.Chrome("C:/Users/admin/AppData/Local/Programs/Python/Python37/drivers/chromedriver", options=options)
browser.get(url)
browser.save_screenshot('django_fullpage.png')
