# react-minimal template

- npm install
- npm run start:dev

- name your repo acme-product-managers
- models
  - User
  - Product
  - Product belongs to a User as a manager
- routes
  - GET /api/users
  - GET /api/products
  - PUT /api/products/:id
- suggested client components
  - App.js
  - Nav.js
  - Managers.js
  - Products.js
  - Product.js

ClassNotes:

Client side store as simple as possible

Modify and call thunk to refresh data

Start simple , optimize later

Don’t write more code until you can see data

products pg - Lopping over products but also users, manager only thing they can change
If manager id has not changed , then
Call thunk to go to db
Prod id and manager id only data you need

2 model, No form updating - won’t need componentDidUpdate

3 routes

Will need bodyyparser

Keep track of state within each component - easier
Use redux store
