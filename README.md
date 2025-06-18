PollingApp is a full-stack polling application built with Vite for the frontend and Node.js for the backend.

## Getting Started

> **Note:** You need to run the server and client separately by navigating to each directory and starting them individually.

### Frontend (`/client`)
1. Navigate to the `/client` directory:
    ```bash
    cd client
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. The frontend connects to the backend using the `VITE_URL` environment variable.

### Backend (`/server`)
1. Navigate to the `/server` directory:
    ```bash
    cd server
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file with the following variables:
    ```
    DATABASE_URL=your_database_url
    PORT=your_port
    JWT_SECRET=your_jwt_secret
    ```

This setup allows seamless connectivity between the Vite-powered frontend and the backend API.