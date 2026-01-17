# 🌐 React Dashboard App

A modern, responsive **React + TypeScript Dashboard** built using **React Router**, **React Query**, and **Tailwind CSS**.  
This app demonstrates authentication, data fetching, CRUD operations, and analytics — all wrapped in a clean, user-friendly interface.

🎥 **Live Demo:** [React Dashboard App](https://react-app-98se.vercel.app/)

---

## 🚀 Overview

The **React Dashboard App** provides a unified interface to manage users, notes, weather data, and simple analytics.  
It’s designed as a learning project to demonstrate **state management**, **API integration**, and **component-based architecture** in React.

---

## 📂 Features

### 🔐 1. Login Page

- Simple login form with dummy credentials:
- Simple login form with dummy credentials:

```
Username: admin
Password: password
```

- On successful login → redirects to `/dashboard`.
- Login state managed globally via **Context API** or **Redux**.

---

### 🧑‍💻 2. Dashboard Overview

After logging in, the dashboard displays **four feature cards**:

#### 🧍 User & Posts Manager

- Fetches user data from  
  `https://jsonplaceholder.typicode.com/users`
- Lists all users — click on a user to view detailed info.
- Displays:
  - User details (name, email, address, etc.)
  - **Posts section:** Lists all posts for that user.
  - **To-dos section:** Shows todos with toggle for done/undone (green & line-through for done).
- Todo completion state persists during the session.

---

#### 🗒️ Note Manager

- Add personal notes with:
  - Text input field
  - Priority dropdown (`important`, `normal`, `delayed`)
- Organizes notes into three categorized sections by priority.
- Features:
  - Add and delete notes
  - Change note priority (via dropdown or drag-and-drop)

---

#### 📊 Simple Analytics

- Summarizes key statistics from user data:
  - **Total number of users**
  - **User with most posts**
  - **User with fewest posts**
  - **User with most completed to-dos**
  - **User with fewest completed to-dos**
- Displayed in neat, styled statistic boxes (no charts).

---

#### ☁️ Weather Widget

- Fetches real-time weather data using **OpenWeatherMap API**:
  ```
  https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric
  ```
- Users can search any city to view:
  - City name
  - Temperature (°C)
  - Weather description (e.g., “clear sky”)
  - Humidity
  - Weather icon
- Includes loading and error states:
  - “Fetching weather…”
  - “City not found” or “Error fetching data”

---

## 🛠️ Tech Stack

| Technology              | Purpose                            |
| ----------------------- | ---------------------------------- |
| **React + TypeScript**  | UI and component structure         |
| **React Router**        | Routing between pages              |
| **React Query / Redux** | Data fetching and state management |
| **Tailwind CSS**        | Styling and responsiveness         |
| **OpenWeatherMap API**  | Real-time weather data             |
| **JSONPlaceholder API** | Dummy user, post, and todo data    |

---

## 🧭 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/react-dashboard-app.git
cd react-dashboard-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Environment Variables

Create a `.env` file in the root folder and add your OpenWeatherMap API key:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

### 4. Run the App

```bash
npm run dev
```

Then open your browser and visit:  
👉 `http://localhost:5173`

---

## 👨‍💻 Author

**Mohamed Ahmed**  
A front-end developer passionate about building clean and functional React applications.

📫 Contact: [LinkedIn](https://www.linkedin.com/in/mohamed-ahmed-bb8194219/) • [GitHub](https://github.com/mohamedahmed1452)
