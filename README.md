# Study With Maryam

Pakistan's Smart Education Platform - Complete study material for classes 9-12 and entrance exam preparation (MDCAT, NUMS, NUST, etc.)

## 🚀 Features

- **Comprehensive Notes**: Complete chapter-wise notes for all subjects
- **Past Papers**: Years of solved past examination papers
- **MCQs Bank**: Thousands of practice questions with explanations
- **Entrance Exam Prep**: Dedicated preparation material for MDCAT, NUMS, NUST, etc.
- **Study Tips**: Expert advice and study strategies
- **PDF Support**: Download and view study material as PDFs
- **Mobile Responsive**: Study anywhere on any device
- **SEO Optimized**: Easy to find on search engines

## 📚 Coverage

### Classes
- 9th Class (Matric Part 1)
- 10th Class (Matric Part 2)
- 11th Class (FSc Part 1)
- 12th Class (FSc Part 2)

### Subjects
- English
- Biology
- Physics
- Chemistry
- Mathematics
- Urdu
- Pakistan Studies
- Islamiyat

### Entrance Exams
- MDCAT (Medical & Dental)
- NUMS
- NUST
- FMDC
- AKU
- AMC

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd study-with-maryam
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
study-with-maryam/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Card.jsx
│   │   ├── Button.jsx
│   │   ├── HeroSection.jsx
│   │   ├── SubjectCard.jsx
│   │   ├── PDFViewer.jsx
│   │   └── MCQItem.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Notes.jsx
│   │   ├── PastPapers.jsx
│   │   ├── MCQs.jsx
│   │   ├── StudyTips.jsx
│   │   ├── Contact.jsx
│   │   ├── ClassPage.jsx
│   │   ├── SubjectPage.jsx
│   │   ├── ChapterPage.jsx
│   │   ├── MDCATPage.jsx
│   │   └── NUMSPage.jsx
│   ├── data/                # Sample data
│   │   └── sampleData.js
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Routing Structure

- `/` - Home page
- `/notes` - All notes
- `/past-papers` - Past papers archive
- `/mcqs` - MCQs bank
- `/study-tips` - Study tips and advice
- `/contact` - Contact page
- `/classes/:classId` - Class page (9th, 10th, 11th, 12th)
- `/classes/:classId/:subjectId` - Subject page with chapters
- `/classes/:classId/:subjectId/:chapterId` - Individual chapter notes
- `/entrance-exams/mdcat` - MDCAT preparation
- `/entrance-exams/nums` - NUMS preparation

## 🎨 Components

### Reusable Components
- **Header**: Sticky navigation with search and dropdowns
- **Footer**: 4-column footer with links and contact info
- **Card**: Reusable card component for various content
- **Button**: Styled button with variants
- **HeroSection**: Hero banner with stats
- **SubjectCard**: Subject display card
- **PDFViewer**: PDF viewer with download option
- **MCQItem**: Interactive MCQ component

## 📱 Responsive Design

The website is fully responsive and works seamlessly on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 Customization

### Colors
Edit `tailwind.config.js` to customize colors:
```javascript
colors: {
  primary: '#2563eb',    // Blue
  secondary: '#10b981',  // Green
  accent: '#f59e0b',     // Orange
}
```

### Content
Update content in:
- `src/data/sampleData.js` - Sample data and configurations
- Individual page components for static content

## 📄 License

© 2024 Study With Maryam - All Rights Reserved

## 👥 Contact

- WhatsApp: +92 300 1234567
- Email: contact@studywithmaryam.com

## 🙏 Acknowledgments

Built with ❤️ for Pakistani students

---

**Happy Learning! 📚**
