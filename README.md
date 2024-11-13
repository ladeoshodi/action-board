![GA Logo](readme-assets/GA-logo.png)

# Action Board

##### Task Management Board

## Table of Contents

- [Overview](#overview)
  - [Introduction](#introduction)
  - [Live Project](#live-project)
  - [Technologies](#technologies)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Future Improvements](#future-improvements)

## Overview

### Introduction

Action Board is a task management board designed to help individuals organize tasks, track progress, and work more effectively. This project was developed as part of General Assembly's Software Engineering Immersive (SEI) program. <br>

This project communicates with a separate backend hosted on heroku for data manipulation and storage. <br>

You can find the [backend deployment here](https://github.com/ladeoshodi/action-board-api)

### Live Project

[Play with the live project here](https://action-board.netlify.app)

Demo user login

```
username: demouser@example.com
password: demouser
```

### Technologies

- ![Static Badge](https://img.shields.io/badge/React-black?logo=react)
- ![Static Badge](https://img.shields.io/badge/TypeScript-black?logo=typescript)
- ![Static Badge](https://img.shields.io/badge/BulmaCSS-black?logo=bulma)
- ![Static Badge](https://img.shields.io/badge/Vite-black?logo=vite)
- ![Static Badge](https://img.shields.io/badge/Vitest-black?logo=vitest)

## Features

- User Registration / Login <br>
  ![Action Board Login](readme-assets/actionboard-login.gif)

- Task creation <br>
  ![Action Board Task List](readme-assets/actionboard-createtasklist.gif)

- Task Editing <br>
  ![Action Board Task](readme-assets/actionboard-createtask.gif)

- Drag-and-drop task management <br>
  ![Action Board Task](readme-assets/actionboard-dnd.gif)

- Tags Management <br>
  ![Action Board Task](readme-assets/actionboard-tags.gif)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ladeoshodi/action-board.git
   cd action-board
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```sh
   touch .env
   ```

4. Set environment variable for the proxy server

   ```sh
   VITE_APP_URL=/api
   ```

5. Start the development server

   ```sh
   npm run dev
   ```

6. Run Tests

   ```sh
   npm run test
   ```

## Usage

Open your browser and navigate to `http://localhost:5173` to start using the Action Board.

## Future Improvements

_Possible additional improvements to the project._

- Enable Users to edit a task column name
- Enable Users to drag and drop task columns in any order
- Enable Users to update their personal details
- Enable Users upload images
- Enable Users to filter/search by task tags/name
- Signup email confirmation
- Forgot password flow
- Allow Users to switch from a horizontal to a vertical view of the board
