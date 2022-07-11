<------ Work ------>

Navbar:
On navbar are ready just need to add Colors [ x ]
[ x ] Navbar menu is same in every page except in home, where in home in MD or LG is hidden
[ x ] Nav items except home PC == lg{
[ x ] Hamburger
[ x ] IvdaGeoLogo
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
[ ] Links
[ ] social media Icons HYPER LINKS

Home Content:
[ x ] In home is same as navLink.jsx, but BELOW LG is hidden

Pages to create:
[ x ] Home - NOTE: Only need to add our partners
[ X ] Login
[ x ] Forgotten password page

- [ x ] Register
  [ ] after succefuly registration redirect to this page ↓
  [ x ] Verify account page

[ x ] Resend verify code

- [ x ] deliveri page
  [ ] When is not valid format or is not delivery checked can't send delivery

- [ x ] Account
  [ x ] Change password
  [ x ] Personal info
  [ x ] Email
  [ x ] Made orders
  [ x ] Favourites
  [] Redirect to login page if no account
  [ ] If users is logged in go to /account page

[ x ] Cart
--[ x ] Delivery page
---[ ] Don't allow to go to this page, if is not logged in || pop menu for login or register

- [ ] Admin panel
      [ ] Deliveries for home
      [ ] Delivery for the shop
      [ ] Redirect if is not admin || not logged in

[ x ] Products
[ x ] Show product

[ ] Rules and privacy
[ ] Terms and contidions

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
  [ ] Delivery page(When user make a delivery)
  [ ] Admin deliveries page
  [ ] Product page
  [ ] Show product page

- [ ] Toast notification
      [ ] While is pending
      [ ] If succesful (Sometimes need to redirect to other page)
      [ ] If not succesful (Maybe show what is wrong, maybe not. We'll see :D)

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
- [ ] Delivery fee
      [ ] In Sofia - 20 lv
      [ ] Outside Sofiq less than 100 km - 80 lv
      [ ] Outside Sofiq more than 100 km - 180 lv

[ ] Search on write to show products
[ ] On click search to go to different page and show all matched searches
[ ] Show by filter
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
