# Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js and TailwindCSS.

## Features

- Responsive design with a sticky side navbar
- Dark mode support
- Sections for Home, About Me, Blog/Notes, AI Touches, and Contact
- Interactive elements like an "Ask Me Anything" bot and AI-generated art gallery
- Built with Next.js App Router and TailwindCSS

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Installation

#### Option 1: Using the setup script (Recommended)

1. Clone the repository
2. Run the setup script:

```bash
node setup.js
```

This script will install all dependencies and set up the project for you.

#### Option 2: Manual installation

1. Clone the repository
2. Install dependencies:

```bash
npm install --no-fund
# or
yarn install
```

### Running the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Deployment on Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Create a Vercel account if you don't have one
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect that you're using Next.js and set up the build configuration for you
4. Click "Deploy" and your site will be live in minutes

## Customization

- Update the personal information in the About page
- Replace placeholder images with your own in the public/images directory
- Customize the color scheme in tailwind.config.js
- Add your own blog posts and projects

## Troubleshooting

### Dependency Warnings

If you encounter deprecation warnings during installation, they are generally safe to ignore as they don't affect the functionality of the application. The included `.npmrc` file should help minimize these warnings.

### Build Errors

If you encounter build errors, try the following:

1. Clear the npm cache: `npm cache clean --force`
2. Delete the node_modules folder and package-lock.json file
3. Run the setup script again: `node setup.js`

## License

This project is open source and available under the [MIT License](LICENSE).