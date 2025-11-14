# Botifyaut: Employee & User Platform

## Project Description

> Botifyaut is a fullstack web application platform for users and employees. 
> Employees can securely log in to manage their profiles, while admins have oversight over all user data. 
> There are four types of employee roles: 
> Admin (managed by Catta/Caroline), Manager (managed by Elijah), Cook (managed by Bithun) and Robot (managed by Suhana).
> The 'Kitchen' and the 'Robot' branches use the CRUD functionalities for managing their respective orders.
> Analytics part is managed by Caroline. Tests are written for few components by Catta.
> Authorization and Authentication is handled by Google OAuth, done by Elijah and Suhana.
> The backend is built with Node.js/Express, and the frontend uses React (JavaScript).

---

## Installation & Start

Follow these steps to install and run both frontend and backend applications locally.

### Prerequisites

Be sure you have the following installed on your system:

- **Node.js** (latest LTS recommended)
- **npm**

### 1. Backend Setup (`backend`)

1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install all Node packages:
    ```bash
    npm install
    ```
    **Key Node packages used:**
    - **express**: Web framework for handling the API.
    - **dotenv**: For managing environment variables (`.env`).
    - **cors**: Handles Cross-Origin Resource Sharing.
    - **cookie-parser**: For managing HttpOnly cookies.

3.  **Configure Environment Variables**  
    Create a file called **`.env`** inside the `backend` folder and fill in your variables.  
    Example `.env`:
    ```env 
    # Environment variables:
    MONGO_URI=mongodb+srv://elijah71176_db_user:lJcUNUjEgmN33SAz@botifydb.vojcusm.mongodb.net/botifyaut?retryWrites=true&w=majority&appName=BotifyDB
    PORT=5001
    GOOGLE_CLIENT_ID=373200775959-spdo5s2vef4vp0rcdp9ftsp5iimahdnr.apps.googleusercontent.com
    GOOGLE_CLIENT_SECRET=GOCSPX-XXXX
    GOOGLE_CALLBACK_URL=http://localhost:5001/api/auth/google/callback
    JWT_SECRET=mySuperSecretKey123git
    ```
    The server should now run on **http://localhost:5001**.  
    You should see confirmation in the console that the server is connected.

### 2. Frontend Setup (`frontend`)

1.  Open another terminal. Navigate to the frontend folder:
    ```bash
    cd ..
    cd frontend
    ```
2.  Install frontend dependencies:
    ```bash
    npm install
    ```
    **Key frontend packages used:**
    - **react**: UI library
    - **react-router-dom**: For handling client routing
    - **axios** or **fetch**: For HTTP requests to backend

3.  Start the React application:
    ```bash
    npm run dev
    ```
    The application should now open in your browser, usually at **http://localhost:5173**.

---
## Quality Standards

### Responsive Design (RWD)
> The application is designed to be **fully responsive** and function well on both desktop and mobile devices.

### Known Bugs

- Any critical known bugs should be tracked in the repository's Issues tab.

### Upcoming Features

- Planned enhancements and future features for all the roles, representing the actual hierarchy of the company.

---

## License

This project is licensed under the [Apache License 2.0](LICENSE).

---
