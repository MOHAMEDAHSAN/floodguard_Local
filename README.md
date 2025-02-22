# FloodGuard ~ Flood Simulation Model

FloodGuard is a flood simulation and emergency response platform that predicts flood impact and assists in emergency resource allocation.

## Deployed Links
- **Frontend App:** [FloodGuard on Vercel](https://floodguard-three.vercel.app/)
- **Backend API:** [FloodGuard Backend on Render](https://flood-20.onrender.com)

## References & Features
- **[Vanta.js](https://www.vantajs.com/)** for cloud-moving live wallpaper.
- **[OpenCage API](https://opencagedata.com/)** for location insights such as latitude and longitude, used in weather prediction and chatbot alerts.
- **[WeatherAPI](https://www.weatherapi.com/)** for weather/location insights such as temperature, UV index, rainfall, wind speed, etc.
- **[Vercel](https://vercel.com/)** for hosting and deployment of the app.
- **[Supabase](https://supabase.com/)** (via Vercel) for backend management and database relations for helpline forms submitted by the public and user authentication.
- **Chatbot 'Nova'** using DeepSeek API and OpenCage location insights to assist users.

## Admin Credentials (for demo purposes)
- **Email:** abishaioff@gmail.com  
- **Password:** abi866733  
*(New admin accounts cannot be created currently, but public users can sign up and fill the helpline form.)*

## Backend Implementation
- **Render + Flask (CORS)** for model execution without localhost dependencies, enabling usage anywhere.
- Initial response may take up to 50 seconds due to free package limitations.
- Model converted into `.h5` and `.pkl` formats for deployment.

## Technologies Used
- **Frontend:** HTML, CSS, React, TypeScript
- **Backend:** Flask, Supabase, OpenCage API, WeatherAPI

## Project Overview
FloodGuard is designed as a flood simulation and emergency response system with two portals:
1. **Admin Portal (Government Officials):**
   - Predicts flood impact using an ensemble model of **Random Forest** and **LSTM**.
   - Static Parameters (fixed over time):
     - Elevation (cm)
     - Impervious Percentage (%)
     - Drainage Capacity (m³/h)
     - Average Slope
   - Temporal Parameters (vary daily):
     - Rainfall (mm)
     - Temperature (°C)
     - Antecedent Precipitation (mm)
     - River Level (m)
     - Groundwater Depth (m)
   - Predicts **Water Level Rise** for the next 5 cumulative days.
   - The dataset is simulated for Tamil Nadu, India as a sample.
   - Dashboard aggregates helpline form data, prioritizing responses based on severity.

2. **Public Portal (Citizens):**
   - Helpline form to submit emergency details (e.g., number of people in the household, medical conditions, water level, etc.).
   - Data is stored in the database and used for priority-based emergency responses.

## Faster Local Version
Since the deployed version has some response delays, you can use the **local version** for immediate results.

**GitHub Repo:** [FloodGuard Local](https://github.com/MOHAMEDAHSAN/floodguard_local)

### Setup Instructions
#### Frontend
1. Clone the repository:
   ```bash
   git clone https://github.com/MOHAMEDAHSAN/floodguard_local.git
   ```
2. Navigate to the project folder:
   ```bash
   cd floodguard_local
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

#### Backend (Flask API)
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the model server:
   ```bash
   python backend/wapp.py
   ```

Now, you can explore FloodGuard locally with **faster response times**!

