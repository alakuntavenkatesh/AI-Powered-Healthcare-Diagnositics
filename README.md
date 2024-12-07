# AI Powered Healthcare Diagnostics

## Overview
**AI Powered Healthcare Diagnostics** is an intelligent medical chatbot designed to assist users in identifying potential health conditions based on their symptoms. Built using a **Deep Neural Network (DNN)** model and executed on the **Django framework**, this system leverages advanced AI techniques to predict diseases, provide detailed descriptions, and suggest treatment options.

---

## Features
- **Symptom Analysis**: Accepts multiple symptoms from the user to analyze potential health conditions.
- **Disease Prediction**: Uses a trained DNN model to predict the most probable disease based on the provided symptoms.
- **Detailed Information**:
  - Disease name
  - Description of the disease
  - Suggested treatment options
- **User-Friendly Interface**: Provides an intuitive chat-based interaction for symptom input and results.

---

## Technology Stack
- **Backend**: Django Framework
- **AI Model**: Deep Neural Network (DNN)
- **Frontend**: HTML, CSS, JavaScript
- **Database**: SQLite (for storing user interactions and historical data)
- **Deployment**: Localhost or web server using Django

---

## Setup and Installation

### Prerequisites
1. **Python 3.8 or higher** installed on your system.
2. Virtual environment tool such as **venv** or **virtualenv**.
3. **Django Framework** installed via pip.
4. Pre-trained DNN model file (`model.h5` or similar).
5. Required Python packages listed in `requirements.txt`.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/alakuntavenkatesh/AI-Powered-Healthcare-Diagnositics/
   ```
2. Navigate to the project directory
   ```bash
   cd Medibot
   ```
3. Set up a virtual environment
   ```bash
   python -m venv env
  source env/bin/activate  # For Linux/Mac
  env\Scripts\activate     # For Windows
  ```
4.Install required dependencies:
  ```bash
  pip install -r requirements.txt
  ```
5. Start the Django development server:
   ```bash
   python manage.py runserver
  ```

