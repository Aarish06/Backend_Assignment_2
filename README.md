## Project Overview

# Library Management system- Backend API

I have used CRUD oprations, Swagger, Joi and express along with OpenAI documentation
- This api helps create, delete , update and list the library branches
- It helps manage employees assigned to those branches

# Instructions for installtion

- Step-1: Clone the Repository

:- Open git bash
:- git clone https://github.com/Aarish06/Backend_Assignment_2.git
:- cd Backend_Assignment_2

- Step-2: Install Dependecies

:- npm install
:- .env will install required all dependencies and environment variable setup.
:- The API will open on http://localhost:3000

- Step-3: API Examples

POST Request 
fetch("http://localhost:3000/api/v1/employees", {
     method: "POST",
      body: JSON.stringify( { name: "Aarish",
       position: "Manager",
        email: "aarishbansal06@gmail.com@gmail.com"
         })
        });

# Link to the documentation
https://aarish06.github.io/Backend_Assignment_2/

# Local Documentation Access
- In docs/index.html

# Local Web Access
- http://localhost:3000/api-docs

# CORS

- It protected API from unwanted external websites while still allowing frontend and tools to access it.
- It controls who is allowed to access the API. 
- Protects against unwanted cross-origin requests.

# Helmet

- Helmet improves API’s security without adding complexity, making it a safer backend for real-world use.
- Adds security headers to protect the API from common attacks. Makes the backend safer with minimal effort.

