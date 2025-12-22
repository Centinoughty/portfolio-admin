# Portfolio Admin

A sleek and powerful admin dashboard for managing your portfolio website. Built with Next.js, TypeScript, and Tailwind CSS, this application provides an intuitive interface to update projects, skills, experience, and handle messages—all in one place.

![Portfolio Admin Dashboard](/public/project-screenshot.png)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

### 🚀 Core Functionality

- **Authentication System**: Secure login/logout with session management
- **Dashboard Overview**: Centralized view of all portfolio sections
- **Real-time Updates**: Instant reflection of changes on your portfolio site

### 📁 Content Management

- **Projects**: Add, edit, and delete portfolio projects with images and descriptions
- **Skills**: Manage technical skills with categories and proficiency levels
- **Experience**: Track work history, education, and achievements
- **Messages**: View and respond to contact form submissions

### 🛠️ Technical Features

- **Modern UI**: Responsive design with Tailwind CSS for mobile and desktop
- **Type-Safe**: Full TypeScript integration for robust development
- **API-Driven**: RESTful API endpoints for seamless data handling
- **File Uploads**: Support for image uploads with cloud storage integration

### 🔧 Developer Experience

- **Hot Reload**: Fast development with Next.js hot module replacement
- **Linting**: ESLint configuration for code quality
- **Modular Components**: Reusable UI components for consistent design
- **Seed Scripts**: Easy database seeding for development

## Installation

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/Centinoughty/portfolio-admin.git
cd portfolio-admin
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env` file in the root directory, and copy the variables from `.env.example` to `.env` file. Fill in the values.

```bash
cp .env.example .env
```

4. **Seed the database**

This adds an admin user to the db.

```bash
npm run seed
```

5. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Getting Started

1. Navigate to the login page and authenticate with your credentials.
2. Access the dashboard to view an overview of your portfolio content.

### Managing Content

- **Projects**: Click on "Projects" in the sidebar to add new projects or edit existing ones. Upload images and provide detailed descriptions.
- **Skills**: Use the "Skills" section to categorize and rate your technical abilities.
- **Experience**: Add work experience, education, and other milestones.
- **Messages**: Review incoming messages from your portfolio contact form.

### API Endpoints

The application provides RESTful API endpoints for all content types:

- `GET/POST/PUT/DELETE /api/projects`
- `GET/POST/PUT/DELETE /api/skills`
- `GET/POST/PUT/DELETE /api/experience`
- `GET/POST/PUT/DELETE /api/messages`

### Deployment

For production deployment:

1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Configure your hosting provider (Vercel, Netlify, etc.) with environment variables.

## Contributing

We welcome contributions! Here's how you can help:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

### Guidelines

- Follow the existing code style and TypeScript conventions
- Write clear, concise commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Issues

- Report bugs or request features using GitHub Issues
- Provide detailed descriptions and steps to reproduce

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using Next.js and TypeScript. Star this repo if you find it useful!
