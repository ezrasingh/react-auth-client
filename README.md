# React Auth Client

This project is designed to be a frontend *Identity Access Management* (IAM) solution focused around **token based** authentication and authorization. For more details checkout [flask-auth](https://github.com/EzraSingh/flask-auth). The goal of this app is to securely provide access to protected user resources over a REST API.

### Views

- */* - Login portal
- */register* - User registration
- */profile* - User profile *
- */profile/update* - Update user profile *
- */logout* - Dereference session *

`* - Requires authentication`

## Development

Install application dependencies:

`npm install`

Run test, preferred for **test-driven** development:

`npm test`

Start application in development mode:

`npm start`

## Staging

* [Serve](https://www.npmjs.com/package/serve) is required for staging

Start staging environment:

`npm run stage`

**NOTE** :
*Staging is the preferred environment for backend development*

## Deploy

* This codebase supports deployment over [Heroku](https://devcenter.heroku.com/articles/getting-started-with-python)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details