# DEEARA - Luxury Fashion E-commerce

A premium, light-themed e-commerce website for DEEARA, a luxury fashion brand specializing in exclusive oversized t-shirts. Built with React, TypeScript, Tailwind CSS, and Supabase.

## ✨ Features

### 🎨 Design & UX
- **Luxury Light Theme**: Ivory, gold, and champagne color palette
- **Premium Typography**: Playfair Display, Cinzel, and Inter fonts
- **Smooth Animations**: Framer Motion for elegant transitions
- **Responsive Design**: Mobile-first approach for all devices
- **Glass Morphism**: Modern UI effects with backdrop blur

### 🛍️ E-commerce Features
- **Product Catalog**: Browse and search oversized t-shirts
- **Shopping Cart**: Real-time cart management with Supabase
- **User Authentication**: Email/password and Google OAuth
- **Wishlist**: Save favorite products
- **Order Tracking**: Real-time order status updates
- **Payment Integration**: Ready for Stripe/Razorpay

### 🔧 Technical Features
- **Real-time Data**: Supabase real-time subscriptions
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **React Router**: Client-side routing
- **Context API**: Global state management
- **Toast Notifications**: User feedback with react-hot-toast

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd deeara-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Copy your project URL and anon key
   - Update `src/lib/supabase.ts` with your credentials

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🗄️ Database Schema

### Tables Structure

#### Products
```sql
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  images TEXT[],
  sizes TEXT[],
  colors TEXT[],
  category TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_limited_edition BOOLEAN DEFAULT false,
  stock_quantity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Cart Items
```sql
CREATE TABLE cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  size TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Orders
```sql
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  shipping_address JSONB,
  billing_address JSONB,
  items JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🎨 Customization

### Colors
The color palette is defined in `tailwind.config.js`:
- `ivory`: #FFFFF0
- `gold`: #D4AF37
- `beige`: #F5F5DC
- `royal-blue`: #4169E1
- `deep-mauve`: #8B4513
- `soft-gold`: #F4E4BC
- `cream`: #FDF5E6
- `champagne`: #F7E7CE

### Fonts
- **Titles**: Playfair Display, Cinzel
- **Body**: Inter, Poppins, Lato

### Animations
Custom animations are defined in `tailwind.config.js`:
- `fade-in`: Smooth opacity transitions
- `slide-up`: Vertical slide animations
- `float`: Gentle floating effect
- `glow`: Pulsing glow effect

## 📱 Pages Structure

1. **Home** (`/`) - Hero section, featured products
2. **Products** (`/products`) - Product catalog with filters
3. **Product Detail** (`/product/:id`) - Individual product view
4. **Cart** (`/cart`) - Shopping cart management
5. **Wishlist** (`/wishlist`) - Saved products
6. **Login** (`/login`) - Authentication
7. **Track Order** (`/track-order`) - Order status
8. **Contact** (`/contact`) - Contact information
9. **Feedback** (`/feedback`) - Customer feedback
10. **Payment** (`/payment`) - Checkout process

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🌟 Premium Features

### Limited Edition Badges
Products marked as limited edition display special badges with animations.

### Stock Alerts
Low stock products show animated alerts to create urgency.

### Currency Detection
Automatic currency detection based on user location.

### Language Support
Multi-language support ready for international expansion.

### PWA Ready
Progressive Web App features for mobile performance.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables for Supabase
3. Deploy automatically on push

### Netlify
1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Set environment variables

### Environment Variables
```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Roadmap

- [ ] Complete product detail page
- [ ] Implement wishlist functionality
- [ ] Add order tracking system
- [ ] Integrate payment gateway
- [ ] Add admin dashboard
- [ ] Implement inventory management
- [ ] Add customer reviews
- [ ] Multi-language support
- [ ] PWA implementation
- [ ] SEO optimization

## 📞 Support

For support, email hello@deeara.com or create an issue in this repository.

---

**DEEARA** - Oversized Royalty. Crafted Exclusively. 👑
