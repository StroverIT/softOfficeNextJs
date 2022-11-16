<------ Work ------>

Navbar:
On navbar are ready just need to add Colors [ x ]
[ x ] Navbar menu is same in every page except in home, where in home in MD or LG is hidden
[ x ] Nav items except home PC == lg{
[ x ] Hamburger
[ x ] SoftOffice
[ x ] Search (showing the search)
[ x ] Login (First icon, second Вход)(Color: primary)
[ x ] Cart (First cart icon, second Количка)(Color: orange)
}
[ x ] Nav items except home Tablet == md{
[ x ] Hamburger
[ x ] Home (No text, only icon)(Color: black)
[ x ] Search (No text, showing the search)(Color: green)
[ x ] Login (No text)(Color: primary)
[ x ] Cart (No text)(Color: orange)
}
[ x ] Nav items except home Mobile < md{
[ x ] Hamburger
[ x ] Home (No text, only icon)(Color: black)
[ x ] Search (No text, only icon)(Color: green)
[ x ] Login (No text, only icon)(Color: primary)
[ x ] Cart (No text, only icon)(Color: orange)
}

Hamburger:
[ x ] Hamburger for all devices
[ x ] Hamburger funcionality
[ x ] Hamburger information

Footer:
[ x ] information
[ x] Links
[ ] social media Icons HYPER LINKS

Home Content:
[ x ] In home is same as navLink.jsx, but BELOW LG is hidden

Pages to create:
[ x ] Home - NOTE: Only need to add our partners
[ X ] Login
[ x ] Forgotten password page

- [ x ] Register
  [x ] after succefuly registration redirect to this page ↓
  [ x ] Verify account page

[ x ] Resend verify code

- [ x ] deliveri page
  [ x] When is not valid format or is not delivery checked can't send delivery

- [ x ] Account
  [ x ] Change password
  [ x ] Personal info
  [ x ] Email
  [ x ] Made orders
  [ x ] Favourites
  [x] Redirect to login page if no account
  [ x] If users is logged in go to /account page

[ x ] Cart
--[ x ] Delivery page
---[ x] Don't allow to go to this page, if is not logged in || pop menu for login or register

- [ x ] Admin panel
  [ x ] Deliveries for home
  [ x ] Delivery for the shop
  [ x ] Redirect if is not admin || not logged in
  [x ] Delivery for EKONT
  [ x] Delivery to OFFICE for EKONT

[ x ] Products
[ x ] Show product

[ x] Rules and privacy
[ x] Terms and contidions

[ x ] About us
[ ] How to buy
[ ] Help
[ x ] Contact page
[ ] Work for us to send CV and inputs

Functionalities:
[ ] Pager or pagination not sure (on where page, section you are)

- [ x ] Connect with restful apis
  [ x] Login
  [x ] register
  [ x] Account
  [x ] Delivery page(When user make a delivery)
  [ x] Admin deliveries page
  [x ] Product page
  [ x] Show product page

- [ x] Toast notification
  [ x] While is pending
  [ x] If succesful (Sometimes need to redirect to other page)
  [ x] If not succesful (Maybe show what is wrong, maybe not. We'll see :D)

- [ x] Auth
  [ x] Check if is admin || not
- [ ] Cart
      [ ] When sometinh is added to the card. Add pending and succesful toast notification
      if(price < 300)
      [ ] Speedy API call
      [ ] Ekont API Call
      if(price > 300)
      [ ] Deliviery on address
      [ ] Get on place
- [ ] Pay
      [ ] Bank Transaction
      [ ] Credit/Debit Card
      [ ] On place
- [ x] Delivery fee

- [ ] Delivery page
      [] Фактура

[x ] Search on write to show products
[ ] On click search to go to different page and show all matched searches
[ x] Show by filter
[ ] Pagination
[ ] News latter
<------ Hints ------>

In every page in main must be a className mb-auto. Except in Authentication pages. So the pages should be in the center

Navigation:
Use effect on change to recalculate the top height of menu
Full width and height. Menu onClick show submenu - Submenu is on menu and left arrow onClick back to the menu
MD or LG is HomeCatecory. Menu onHover show submenu. Out of hover is removing the subMenu
Hamburger:
Only when is not fixed to show the hamburger menu
When is clicked to hide the overflow-Y
SEARCH:
Search Icon when is Below MD on click to open menu for searching
HomePage:
Swiper carousel change the arrows styling

How to create a button in home page, which on click to open hamburger menu ?
Bugs:
Navigation:
When is on lg and FIRST hover, menu is glitching (it's bcs of left:0 and transition to left: (something)).
HomePage Nav:
When is grid-cols-[40%_60%] submenu cannot obtain the full width of the carousel

PRODUCT PAGE ----

aside which have all filters. MD is menu, but below MD make is BUTTON which on click to show fixed menu(Overflow hidden on body ) CREATE ANiMATION ON THE MENU below MD

Product schema

Section - Хартия
imageUrl - LINK or img path
-Articles

    name: BLC
    КатНомер: 1103104
    Типове: [Формат: А4, Опаковка: Пастел 50л.,  Грамаж: 80 g/m2 ]
    Цена: 1.99
    Цветове: [Розово]
    imageUrl: "sections/peturSnimka"

    name: "Петър"
    КатНомер: 1103104
    Типове: [Формат: А4,Опаковка: Наситен, Грамаж: 80 g/m2 ]
    Цена: 2.99
    Цветове: [[Златен, снимка], Розов, Оранжев, Син, Червен]
    imageUrl: "sections/peturSnimka"

-[ ] How to search by:
[ ] КатНомер
[ ]
[] On search how to go to the item || section

[ ]How to upload and get the image
[ ] How to get the filters
[ ] How to filter

- [] Edit
  [ ] On edit on colors to have options to add image [color, img]

Да се показзват в продукт itemId продукти подобни на този
Филтрирането като се цъкне да показзва по този филтър
Например -
3 Л показва само 3 литра
3л, 10л, показва само 3л и 10л

Да се сложи логиката за доставки
Като засега ще има само с личен транспорт и взимане от място

----Pages for integration for new db models----

[] Buy button
-[] section page

- [] product page
  [] Favourite
  -[] product page
  -[] Account page
  [X] Section page (List all products)
  [x] Product page
  [] Cart
  [] Account
  -- [] fav products
  -- [] delivery products
  [] if is not buyable, but to show number
  [] Navigation

  [] Promotion
  -- [] Admin panel create
  -- [] on index to show all promotions
  -- [] if item is on promotion
  [] Delivery back-end logic

--- Ideas for integration ----
item: {
itemLen:
route: item.\_id,
types: item.tipove,
cena: item.price,
isOnPromotion: item.isOnPromotion,
isOnlyNumb: item.isOnlyNumb,
},
article: {
imgUrl,
name: article.nameToDisplay,
route: article.name

},
section: {
name: section.nameToDisplay,
route: section.name
},

section -

1. name
2. nameToDisplay
   subsection -
3. itemsLen
4. img[0].originalname
5. tiput
6. nameToDisplay
7. opisanie,
   item: {
   itemsLen,
   tipove: article.items[0].tipove,
   katNomer: article.items[0].katNomer,
   route: article.items[0].\_id,
   types: article.items[0].tipove,
   cena: article.items[0].cena,
   isOnPromotion: article.items[0].isOnPromotions,
   isOnlyNumb: article.items[0].isOnlyNumb,
   },
   ---cvetove - \_id, cvqt

----- За промоциите -----
promotionalPrice
isOnPromotions

TODO:{
[x]: Add item on promotion - set isOnPromo to true, promotionalPrice and add to collection promotions,
[x]: Personal promotion - all sections with custom promo price if needed
[]: Firm with workers - if worker make a delivery, first admin must confirm it to be valid
}

<!-- Ideas for workers -->

"fullName": "Ivan2",
"email": "ivan1@abv.bg",
"password": "$2a$12$UiToecENWKhC49JZnuu54eQ0i0ctaY3M.31WRFuWh074GS2pQQBZe",
"role":"user",
"addresses": [],
"isVerified": true

https://www.softoffice.bg/products/etiketi - products is not working front-end
https://www.softoffice.bg/products/arhivnaKytiqIKashon - продукти is not working front-end
Самозалеппащи знаци
Хигиенни средства - Дезифенктанти
accoutn admin is not working the image

На търсачка да се излиза секцията - примерно химилаки и да се излиза секция химикалки
под секция да излиза - примерно xerox i да излиза етикети xerox и неговите типове (може би за типовете)

Bug when is selected product and return is static route with back to hartiq
Image is not showing when is uploaded - must restart the server [FIXED]

---- 24.09.2022 -----
Продукти за оправяне

1. Дизайнерската е объркана [x] Проверих и всичко е наред наза
2. Ролков нож също [x] Всичко е така
3. Виж шредерите и тях [x]
4. Подвързваща маш [x]
5. Тонеерите и касетите са си ебали майката [x] - 119 страница довърши надолу []
6. Гилотините въобще ги няма - Доста ги няма и гледай по катномер, първо снимката, после пишеш [x] ВСИЧКО ТОП
7. Не всички пликове ги има
8. Хартия само за нея типът да излиза като Няква глупост
9. На всеки катНомер да е с различна снимка [x]

-----Tasks----- [X]

1. ИН по ДДС [x]
2. С ДДС да ги има навсякъде [x] (Това няма да го правя!!!!)
3. Да може, да се сменя шефа(имейла и неговите работници) [x]. Добави работник [x], махни работник [x] и махни шеф [x]
4. Взема от адрес и вземане от склад [x]
5. Да се оправи табличката - Снимката я иимаш в телефона !!! [x]
6. Вместо да пише "доставка", да пише "поръчка" [x] (Това няма да го правя!!!!)
7. Вместо за вкъщи да е за адрес (това не ти е e-commerce за храни) ! [x]
8. Footera виж линковете и най-долу при "© 2022 SoftOffice™. Всички права запазени.", оправи цветовете ! [x]
   Засега е това xD
9. Оправи промоциите да се вижда само по една, а ако е само една да показва всички специвикации [x]
10. List all promotions EVER xD [x]
11. Custom qty with custom price on product. Search the products!

Продукти които ги няма по катНомер

1. 1211006
2. 1211004
3. 1211054
4. 1211057
5. 1211021
6. 1211025
7. 1211029
8. 1211033
9. 1211037
10. 1211040
11. 1211044
12. 1211046
13. 1211047
14. 1211049
15. 1211051
16. 1211052
17. 1211053

И в промоции да се се променя по катНомер

----- 21.10.2022 - проверяване на продукти които ги няма
1905005 - Пинове, кабари за коркова дъска .91 - 1.5 Канцеларски материали
Щипки, ленти, ролетки за бадж .92 - 1.5 Канцеларски материали
Довърши консумативи за офис техника

Ламинаторир
Чаши , бъркалки и прибории

Да се търси под подсекция
