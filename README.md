# ORM E-Commerce Backend

## Description

This project has no front-end, (please use an application such as Insomnia to query the API) it was a test of CRUD operationality. This RESTful API project simulates a simple server/database for e-commerce.


## Installation

Clone the repository using one of the options below          
        
HTTPS - https://github.com/JaKrau/ORM-E-Commerce-Backend.git        
SSH - git@github.com:JaKrau/ORM-E-Commerce-Backend.git        
GitHuB CLI - gh repo clone JaKrau/ORM-E-Commerce-Backend       

```bash
npm install
```
mysql connections are hidden in a .env file with the following layout. Create and place your login information in this file:

 ```
 DB_NAME ='ecommerce_db'
 DB_USER ='root'
 DB_PW = <password>
 ```
you will also need to source your db with the seed data using 

```bash
 node seeds/index.js
```

At this point your server is seeded and about ready to roll! Enter <node server.js> in your terminal, open Insomnia, and you're ready to query.

## Usage

Walkthrough Video 

[Module_13_Recording.webm](https://github.com/JaKrau/ORM-E-Commerce-Backend/assets/108687237/eb7ee443-9a53-4fd1-9aae-e1989e68cb2c)


## Credits

E-commerce Back End Starter Code 
cloned from git@github.com:coding-boot-camp/fantastic-umbrella.git

This README's structure is courtesy of https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide


## License

Distributed under the MIT License. See LICENSE.txt for more information.

