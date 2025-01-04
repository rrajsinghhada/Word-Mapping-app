# Text Comparison React App

This is a React-based application that allows users to compare two text inputs. It highlights and scrolls to matching sentences when clicked.

---

## Features
- Input and Output text boxes for comparison.
- Automatically maps matching sentences.
- Scrolls to highlighted input sentences when a corresponding output sentence is clicked.

---

## Prerequisites
Before running this application, ensure you have the following installed:
- **Docker**: [Install Docker](https://www.docker.com/get-started)
- **Node.js** (for local development, optional)

---

## How to Run with Docker

### 1. Clone the Repository
Clone the application repository to your local machine:
```bash
git clone https://github.com/your-repo/text-comparison-app.git
cd text-comparison-app
```

### 2. Build the Docker Image
Build the Docker image using the provided `Dockerfile`:
```bash
docker build -t text-comparison-app .
```

### 3. Run the Docker Container
Start the application inside a Docker container:
```bash
docker run -p 3000:3000 text-comparison-app
```

### 4. Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

---

## Local Development (Without Docker)

### 1. Install Dependencies
Run the following command to install all required dependencies:
```bash
npm install
```

### 2. Start the Development Server
Start the React development server:
```bash
npm start
```

### 3. Access the Application
The application will be accessible at:
```
http://localhost:3000
```

---

## File Structure
```
text-comparison-app/
├── public/
├── src/
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── index.js
├── Dockerfile
├── package.json
└── README.md
```

---

## Dockerfile
Below is the Dockerfile used for the application:
```dockerfile
# Use an official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

---

## Troubleshooting
If you encounter any issues:
1. Ensure Docker is running.
2. Check the Docker container logs using:
   ```bash
   docker logs <container-id>
   ```
3. Ensure port `3000` is not in use by another application.

---

## License
This project is licensed under the MIT License.
