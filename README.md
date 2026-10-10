# 🛒 Bazar Dor — বাজার দর

**Bazar Dor** is a modern grocery price-tracking web application designed to help people in Bangladesh check daily market prices and compare grocery prices easily.

The website provides an organized and user-friendly interface for exploring essential grocery products, monitoring price changes, and viewing detailed market information.

### 🌐 Live Website

**Live Link:** https://bazar-dor-coral-omega.vercel.app

**GitHub Repository:** https://github.com/Afia611/bazar-dor

## 🚀 Features

1. **Daily Grocery Prices:** Browse current prices of essential grocery products in Bangladesh.
2. **Category-Based Browsing:** Explore products by categories such as rice, lentils, and other grocery essentials.
3. **Price Increase and Decrease Sections:** Quickly identify products whose prices have increased or decreased.
4. **Product Details:** View detailed product information and available market price comparisons.
5. **Price Sorting:** Sort products within categories by price from low to high or high to low.
6. **User Authentication:** Sign up and sign in using email and password, with Google and GitHub OAuth integration.
7. **Protected Routes:** Product details and profile pages are accessible only to authenticated users.
8. **User Profile Management:** View profile information and update your display name.
9. **Responsive Design:** Designed for mobile, tablet, and desktop screens.
10. **Loading States and Error Handling:** Skeleton loading interfaces, custom 404 pages, and toast notifications improve the user experience.
11. **Live Price Ticker:** A scrolling ticker highlights grocery price information.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js (App Router) | Full-stack React framework |
| React | User interface development |
| TypeScript | Type-safe development |
| Tailwind CSS | Responsive styling |
| DaisyUI | UI components and styling |
| Better Auth | Authentication and OAuth |
| MongoDB Atlas | User and authentication data storage |
| REST API | Grocery product and price data |
| React Toastify | Toast notifications |
| Vercel | Deployment and hosting |

## 🔐 Authentication

Bazar Dor integrates Better Auth to support email/password authentication and Google and GitHub OAuth.

Authentication is used to protect selected pages and provide personalized user profile features.

## 📱 Main Pages

- **Home:** Grocery price overview, price trends, and product listings.
- **Category:** Category-specific products with sorting options.
- **Product Details:** Detailed information about individual grocery products.
- **Sign In / Sign Up:** User authentication pages.
- **Profile:** View account information.
- **Update Profile:** Edit user display name.

## ⚙️ Installation and Setup

**1. Clone the repository**

```bash
git clone https://github.com/Afia611/bazar-dor.git
```

**2. Navigate to the project**

```bash
cd bazar-dor
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env.local` file in the project root and configure:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Use your own valid credentials. Never commit `.env.local` to GitHub.

**5. Start the development server**

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 🔗 Grocery Price API

The application uses the following API for grocery categories, products, and price information:

https://api.abcz.workers.dev/api/bazardor

## 👩‍💻 Developer

**Afia611**

GitHub: https://github.com/Afia611

## 📄 Project Information

Developed as a Next.js assignment project for Programming Hero.