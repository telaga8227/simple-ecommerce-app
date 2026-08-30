# Simple E-Commerce Application

A clean, responsive, and functional e-commerce web application designed to simulate a smooth online shopping user experience.

---

##  Features

* Home Page : A welcoming landing view containing contextual introduction elements and intuitive navigation headers.
* Products Interface : Displays a clean gallery layout populated with multiple product cards.
* Interactive Shopping Cart : Allows real-time interaction where clicking **Add to Cart* updates and dynamically tracks chosen items.
* User Session Management : Includes straightforward user routing features including dedicated Login / Logout behaviors.
* Add to Cart: Users can seamlessly add products to their shopping cart from the product details view.
* Dynamic Quantity Adjustments:
  * Increase Quantity: Allows users to easily increment item counts within the cart layout, automatically updating the line-item subtotal.
  * Decrease Quantity: Allows users to decrement item counts within the cart layout, automatically reducing the line-item subtotal.
* *Remove Cart Items:* A dedicated "Remove" action completely deletes a specific product from the cart array, instantly recalculating the final checkout total.
* *Real-time Synchronization:* The shopping cart badge and total price dynamically reflect any additions, quantity shifts, or item removals instantly.

## Product Filtering (Filters Group)

* Text Search Input:* Live text searching allows users to type queries and instantly filter out matching product name or brand

---

##  Project Architecture

text
mern-e-commerce/
|- backend/          # Server logic, API controllers, and database models
|- frontend/         # React client, UI components, and CSS styles
  |- src/
        |-- components/
        │   |- Admin/
        │   |- AllProducts/
        │   |- Cart/
        |   |- CartItem/
        |   |- FiltersGroup/
        │   |- Header/
        │   |- Home/
            |- LoginForm/
            |- Products/
            |- ProductCard/
            |- ProtectedRoute/
            |- NotFound/
            |- RegisterForm/
        |-- context
        |--App.js

---

##  Tech Stack

* Frontend : HTML, CSS, JavaScript, React.js
* Backend : Node.js, Express.js, MongoDB
* Version Control : GitHub

---
