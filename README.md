# SecureSurf – Phishing Detection Simulator

SecureSurf is a lightweight, visually appealing, and fully interactive **phishing detection simulation tool** built using HTML, CSS, and JavaScript. Designed with simplicity and educational value in mind, it lets users input URLs and see simulated phishing risk results based on a set of common detection heuristics.

---

## Features

-  **Simulated phishing detection engine** using JavaScript
-  **Login dashboard** for user authentication (mock)
-   Real-time URL analysis with:
  - Domain legitimacy check
  - HTTPS verification
  - Blacklisted keyword scanning
  - URL length analysis
  - Risk score evaluation
-  Fully responsive and modern UI
-  Interactive and user-friendly design
-  Pop-ups and alerts to inform users of phishing risk

---

## Tech Stack

| Layer        | Technology Used |
|--------------|------------------|
| **Frontend** | HTML, CSS, JavaScript |
| **Logic**    | Vanilla JavaScript (No external libraries) |
| **UI Design**| Custom CSS (Animations, Layout, Responsive) |
| **Structure**| Multi-page (Login → Analysis Dashboard) |
| **Assets**   | (Optional) Font Awesome Icons |

---

## Screenshots
![image](https://github.com/user-attachments/assets/1ac6b8fb-ac91-44bf-bad0-ea508d625321)
![image](https://github.com/user-attachments/assets/6202c21e-b7f3-4c33-9ef9-ef99af99ac9f)
![image](https://github.com/user-attachments/assets/075d5d04-48a4-4427-9dc9-1a3cb15d6d41)

---

## How It Works (Logic Overview)

When a user enters a URL, SecureSurf simulates phishing detection by evaluating:

- **Domain Analysis** – Checks for suspicious or misleading domain names.
- **HTTPS Validation** – Verifies whether the URL uses HTTPS.
- **Blacklist Keyword Matching** – Scans for common phishing-related terms (e.g., "login", "secure", "verify").
- **URL Length Check** – Flags overly long URLs, which are often used to mask malicious intent.
- **Risk Scoring** – Based on the combined analysis, a score is calculated and shown as Low, Medium, or High Risk.

>  **Note**: This is a **simulation**. It does not perform real-time phishing detection or use machine learning. Intended for demo and educational purposes.

---

## Future Enhancements (Planned)

-  Real-time phishing detection using a backend + ML model
-  Dashboard to display history of scanned URLs
-  Integration with a trained ML model (e.g., Logistic Regression, Random Forest)
-  User registration & authentication system
-  Backend via **Flask** / **Node.js**
-  Database (MongoDB / Firebase) to store scan results

---

# Future Improvements

-  Add **real-time scanning** of page content  
-  Integrate **browser extension** version  
-  Enhance **ML-based detection** accuracy  
-  Add **database** for phishing URL logging  

---

# Authors

-  **Samarth Varshney**  
-  **Vinayak**  
-  **Ayush Agrawal**
