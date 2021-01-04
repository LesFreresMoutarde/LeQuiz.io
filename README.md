<p style="text-align: center"><img src="logo.png" alt="Logo"></p>

# LeQuiz.io

## Description
LeQuiz.io is a real time multiplayer quiz platform. People can generate quizzes based on various thematics and game options in order to play with their friends.  
This project is powered by Node.JS and React.

### Features

- Generate a quiz
    - Choose game mode
    - Choose questions categories
    - Choose game options (number and type of questions)
    - A random quiz is automatically generated according to the settings chosen with the questions in the database
- In the waiting lobby, change quiz settings and get the room unique code to share it with people who want to join the game
- Play in realtime to the generated quiz
    - Answer the questions
    - See live scores
- At the end of the game, you can generate another quiz and restart a game with all the people in your room

### Upcoming features

- More game modes
- Create, share and play custom quizzes
- Integration of community questions after validation by approvers
- Paid subscription model to access all game modes

## Getting started

### Prerequisites

You need to install some software to run the application:

- [Docker CE](https://www.docker.com/community-edition)
- [Docker Compose](https://docs.docker.com/compose/install)

### Run project

```bash
docker-compose up -d
```
> Notice: Check the `docker-compose.yml` file content. If other containers use the same ports, change yours.

The node dependencies are installed automatically at first startup.

### Access

You should access to:

- Application frontend: [http://127.0.0.1](http://127.0.0.1)
- Application backend (API): [http://127.0.0.1:3000](http://127.0.0.1:3000)
- adminer: [http://127.0.0.1:8080](http://127.0.0.1:8080)
  - system: PostgreSQL
  - host: `database`
  - username: `admin`
  - password: `admin`
  - database: `lequiz-io`
  
> Notice: If you're using Docker Toolbox, change 127.0.0.1 by the IP address of your virtual machine, ie 192.168.99.100

### Fake data

Fake data is generated automatically when the `database` Docker container is started. You can change or remove it in the file `sql/import.sql`.

You can login

- as user with `user1@example.com` to `user9@example.com` or `user1` to `user9`
- as reviewer with `reviewer1@example.com` and `reviewer2@example.com` or `reviewer1` and `reviewer2`
- as admin with `admin1@example.com` or `admin1`
  
For all the demo accounts, the password is `password`

> Note: Users, reviewers and admins have different roles in the database, but as it stands, the higher roles do not have access to additional functionality. This will come later.

### Build

To build the React app (the frontend), run `npm run build` in the `frontend` directory.
