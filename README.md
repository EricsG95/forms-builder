# Dynamic Angular Forms Builder

This project is created to show how we can make use of simple reactive forms to dynamically create a simple form with various controls according to the needs of users. Reactive forms comes with great flexibility and also features that makes working with forms a more enjoyable experience in Angular out of the box.

## Core Design

While working on this project, one key factor that I have taken into consideration, **scalability**. It is necessary for the project to be scalable. In my view, a scalable project is a project that is maintainable and easily extensible.

1. Dynamic form component and dynamic field directive are the keys to achieving such a design above. Component factory resolver is the driving force behind this in allow dynamic rendering of unique component by users possible.

2. A specific JSON data structure that is able to describe the form struture that users desire to compose. This also paramount in cases where we are able to store the structure of created form by users and regenerate it again from the JSON input.

3. The produced JSON data will dictate how the output of the users' form to be. This gives a predictablity to the result and without the need to second guess of what output is to be expected and allowing a simpler validation to be build around it.

Such a design lays a strong foundation to build a project that is scalable and maintainable over a long run and providing a great developer experience and importantly **making new features and future changes cost efficient.**

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
