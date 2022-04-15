# Mycelium

php 8.1.3
Laravel v9.6.0
Vue Js 3.2
Vue Router 4.014
Vuex 4.02

## init

```
composer update
```

## API 

```
php artisan serve 
```

Test our API with POSTMAN 

Install the Postman client [here](https://www.getpostman.com/)


[Join our postman workplace](https://app.getpostman.com/join-team?invite_code=9ad63cb07ec5fd84e6a12434513753e3&target_code=155ccacbec729ae26f0417b3e25e1335)


## How it works 

Select the `API requests` collection on postman.

First, login with an email and a password that already exist on the database.

In the body, write the correct login information on the LOGIN page. For example :

```
{
    "email": "aze@example.com", 
    "password": "azeazeaze"
}
```

Once sent, you will receive a token. Use that token to make your requests. 

To do that, go to `Authorization`, select type `Bearer Token`, and paste the token your login information gave you. 

After that, you can make your API CRUD requests without trouble. 

[Postman docs on making requests](https://www.getpostman.com/docs/postman/sending_api_requests/requests)