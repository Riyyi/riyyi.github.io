---
title: "Personal Website"
description: "An open-source content management system, used for this website."
navigation: false
date: "2021-03-03"
img: "/img/personal-website/admin-menu.png"
tags:
  - PHP 7
  - MySQL
  - jQuery
  - Software
---

<small>Open-source content management system.<br>
Repository at
[GitHub](https://github.com/riyyi/website){target="_blank"},
[GitLab](https://gitlab.com/riyyi/website){target="_blank"} or
[Gitea](https://git.riyyi.com/riyyi/website){target="_blank"}.
</small>

This is the CMS that is used for this website! It's written in PHP 7, MySQL and
jQuery, with the libraries Klein.php and Mailer.

Features:

- PHP 7
- Composer
  - [Klein.php](https://github.com/klein/klein.php)
  - [Mailer](https://github.com/txthinking/Mailer)
- MVC design pattern
- MySQL database for storing data
- CMS with CRUD functions for managing data
- ORM for mapping between PHP classes and data
- Login system
   - Stay logged in using cookies
   - Forget password with a generated link send using mail
- Security mitigations
   - Password hashing using BCrypt
   -  Per-user cryptographically secure generated salt
   -  SQL injection protection using prepared statements
   -  XSS
      - Cookies set to 'HttpOnly'
      - Escape rendered user input using: `htmlentities(ENT_QUOTES | ENT_HTML5, 'UTF-8');`
   - CSRF
     - Cookies 'SameSite' set to 'Strict'
     - Token for each session used in POST/PUT/DELETE requests
- Bootstrap
- jQuery

Directory structure:

```
.
├── app
│   ├── classes
│   │   └── <classes>
│   ├── controllers
│   │   └── <controllers>
│   ├── helper.php
│   ├── model
│   │   └── <models>
│   ├── seed.php
│   ├── traits
│   │   └── Log.php
│   └── views
│       └── <views>
├── composer.json
├── config.php
├── config.php.example
├── public
│   ├── index.php
│   └── <files>
├── route.php
├── syncconfig.sh
├── syncconfig.sh.example
└── sync.sh
```

<div class="row">
<div class="col-12 col-lg-6">

Pictured below is the EER (Enhanced entity-relationship) diagram of the MySQL database:
![website database design](/img/personal-website/database-design.png "website database design")

</div>
</div>

Some of the pages of the CMS.

<div class="row">
<div class="col-12 col-lg-6">

Admin menu.
![admin menu](/img/personal-website/admin-menu.png "admin menu")

</div>
<div class="col-12 col-lg-6">

CRUD index page, displaying all the entries of this table, including pagination.
![crud index page](/img/personal-website/crud-index.png "crud index page")

</div>
<div class="col-12 col-lg-6">

CRUD edit page, editing an entry.
![crud edit page](/img/personal-website/crud-edit.png "crud edit page")

</div>
<div class="col-12 col-lg-6">

CRUD show page, show all values of an entry.
![crud show page](/img/personal-website/crud-show.png "crud show page")

</div>
<div class="col-12 col-lg-6">

Login page.
![login page](/img/personal-website/login.png "login page")

</div>
<div class="col-12 col-lg-6">

Password reset page, showing a flash message.
![password reset page](/img/personal-website/reset-password.png "password reset page")

</div>
</div>
