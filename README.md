# 💰 Budget Tracker Web App

A beautiful and functional budget tracking web application built with Flask, featuring a modern responsive design and real-time transaction management.

## ✨ Features

- **💰 Real-time Balance Tracking** - See your current balance at a glance
- **📊 Income & Expense Management** - Add and track all your financial transactions
- **📈 Visual Statistics** - Beautiful charts showing total income vs expenses
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **💾 Data Persistence** - Your data is automatically saved and persists between sessions
- **🎨 Modern UI/UX** - Clean, intuitive interface with smooth animations

## 🚀 Live Demo

[Deploy this app to see it in action!](#deployment)

## 🛠️ Tech Stack

- **Backend**: Python Flask
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with modern design principles
- **Icons**: Font Awesome
- **Data Storage**: JSON file-based storage
- **Deployment**: Ready for Heroku, Railway, Render, and more

## 📁 Project Structure

```
budget/
├── budget_api.py          # Main Flask application
├── requirements.txt       # Python dependencies
├── Procfile              # Heroku deployment config
├── .gitignore            # Git ignore rules
├── budget_data.json      # Data storage file
├── static/
│   ├── style.css         # Main stylesheet
│   └── script.js         # Frontend JavaScript
└── templates/
    └── index.html        # Main HTML template
```

## 🚀 Quick Start

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/budget-tracker.git
   cd budget-tracker
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python budget_api.py
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

## 🌐 Deployment

### Option 1: Deploy to Heroku (Recommended)

1. **Install Heroku CLI**
   ```bash
   # Download from: https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create and deploy**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   heroku create your-budget-app-name
   git push heroku main
   ```

4. **Open your app**
   ```bash
   heroku open
   ```

### Option 2: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Choose "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Python and deploys!

### Option 3: Deploy to Render

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `gunicorn budget_api:app`
6. Click "Create Web Service"

## 📱 How to Use

1. **Add Income**: Enter amount and description, click "Add Income"
2. **Add Expense**: Enter amount and description, click "Add Expense"
3. **View Balance**: Your current balance is displayed prominently
4. **Track History**: See all your transactions in chronological order
5. **Clear Data**: Use the "Clear All" button to reset everything

## 🔧 API Endpoints

The app also provides a REST API:

- `GET /` - Main web interface
- `GET /balance` - Get current balance
- `GET /transactions` - Get all transactions
- `POST /income` - Add income transaction
- `POST /expense` - Add expense transaction
- `DELETE /clear` - Clear all data

## 🎨 Customization

### Colors and Styling
Edit `static/style.css` to customize:
- Color scheme
- Fonts
- Layout spacing
- Animations

### Functionality
Modify `static/script.js` to add:
- New features
- Different data formats
- Additional validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Font Awesome for the beautiful icons
- Flask community for the excellent web framework
- Modern CSS techniques for responsive design

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the deployment documentation
- Review the code comments for guidance

---

**Made with ❤️ for better financial management**
