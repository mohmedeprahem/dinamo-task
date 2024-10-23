# dinamo-task

## Description

This project is a e-commerce demo built using NestJS, providing essential functionalities for a e-commerce platform.

**Technologies**: NestJS, TypeScript, PostgreSQL and JWT.

## Feature

1. Authentication & Authorization:

Secure authentication using JWT tokens for both Sign Up and Login.
Authorization implemented via Guards, ensuring role-based access for users and vendors.

2. User Management:

- Apply as Vendor API: A user can transition their account to a vendor role while still maintaining user functionalities.
- Users can log in and perform actions as both a vendor and a regular user.
3. Product APIs:

- Full CRUD operations for products: Create, ReadAll, ReadOne, Update, and Delete.
- APIs provide seamless management of product inventory for vendors.
4. Cart Management:

- Users can Add and Remove products from their cart.
- A dedicated API to Read the contents of the cart for easy tracking and checkout.
5. Swagger UI Integration:

- Integrated Swagger UI at http://localhost:3000/api for easy testing and exploration of the available APIs.
6. Security Enhancements:

- Environment variables (.env) are used to handle sensitive configurations securely. Although pushed to the repo for ease of use during testing, it demonstrates best practices for configurable setups.

## Documentation

- System Design [here](https://docs.google.com/document/d/1i_loEyJ8e4tEm-UEDrStU316-Uq0X4vVgKRpGql2EsQ/edit?usp=sharing)

## Getting Started

1. **Installation**: Clone the repository and install dependencies.

```bash
git clone <link>
cd dinamo-task
npm install
```

3. **Running the Application**: Start the NestJS application.

```bash
npm run start:div
```

4. **Contribution**: Contributions are welcome! If you find any issues or would like to add new features, feel free to open a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Thanks to the NestJS team for providing an excellent framework for building web applications.
- Special thanks to the contributors of libraries and tools used in this project.
