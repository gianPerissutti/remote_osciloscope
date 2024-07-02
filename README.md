# Remote Oscilloscope

This project implements a web-based oscilloscope that allows you to visualize electrical signals directly in your web browser.  
The user interface is built with *React*, providing a responsive and interactive experience.
For visualization, the project leverages *Plotly*'s WebGL capabilities, enabling smooth and performant rendering of real-time waveforms.

### Features
 - Real-time signal visualization
 - Adjustable timebase and voltage range
 - Web-based interface for easy access from any device

### Requirements
 - Modern web browser
 - Node.js and npm installed on your system (https://nodejs.org/en/download)

### Installation
 1. **Clone the repository**

    ```bash
    git clone https://github.com/gianPerissutti/remote_osciloscope.git
    ```

 2. **Install dependencies**

    ```bash
    cd remote_osciloscope/front/remote_osc/
    npm install
    cd ../../backend/
    npm install
    ```

### Running the application
 1. **Start the development server for the backend**
    
    Run the following command to start a local development server:
    ```bash
    cd remote_osciloscope/backend/
    npm run dev
    ```

2. **Start the development server for the frontend**

   Run the following command to start a local development server:
    ```bash
    cd remote_osciloscope/front/remote_osc/
    npm run dev
    ```

