# Supabase Setup Guide for DEEARA

This guide will help you set up your Supabase database and connect it to the DEEARA e-commerce project.

## 🚀 Step 1: Supabase Project Setup

1. **Go to Supabase Dashboard**
   - Visit [https://supabase.com](https://supabase.com)
   - Sign in or create an account

2. **Create New Project**
   - Click "New Project"
   - Choose your organization
   - Enter project name: `deeara-ecommerce`
   - Enter database password (save this!)
   - Choose region closest to your users
   - Click "Create new project"

3. **Wait for Setup**
   - Supabase will set up your project (takes 1-2 minutes)
   - You'll be redirected to the dashboard

## 🔑 Step 2: Get Your Credentials

1. **Go to Settings > API**
   - In your Supabase dashboard, click "Settings" in the sidebar
   - Click "API" in the settings menu

2. **Copy Your Credentials**
   - **Project URL**: Copy the URL (looks like `https://xrftkldyqorduxbbjpof.supabase.co`)
   - **Anon Key**: Copy the anon/public key (starts with `e...`)

3. **Update Your Project**
   - Open `src/lib/supabase.ts` in your project
   - Replace the placeholder values with your actual credentials:

```typescript
const supabaseUrl = 'YOUR_PROJECT_URL'
const supabaseAnonKey = 'YOUR_ANON_KEY'
```

## 🗄️ Step 3: Create Database Schema

1. **Open SQL Editor**
   - In your Supabase dashboard, click "SQL Editor" in the sidebar

2. **Run the Setup Script**
   - Copy the entire content from `database-setup.sql` in your project
   - Paste it into the SQL Editor
   - Click "Run" to execute the script

3. **Verify Tables Created**
   - Go to "Table Editor" in the sidebar
   - You should see these tables:
     - `products`
     - `cart_items`
     - `wishlist_items`
     - `orders`
     - `feedback`

## 🔐 Step 4: Configure Authentication

1. **Go to Authentication Settings**
   - Click "Authentication" in the sidebar
   - Click "Settings"

2. **Configure Email Auth**
   - Enable "Enable email confirmations" if you want email verification
   - Set "Site URL" to `http://localhost:3000` for development
   - Add redirect URLs: `http://localhost:3000/**`

3. **Configure Google OAuth (Optional)**
   - Go to "Providers" tab
   - Enable Google provider
   - Add your Google OAuth credentials
   - Set redirect URL to `https://your-project.supabase.co/auth/v1/callback`

## 🛡️ Step 5: Configure Row Level Security (RLS)

The setup script already creates RLS policies, but verify they're working:

1. **Check RLS Status**
   - Go to "Table Editor"
   - Click on each table
   - Verify "RLS" is enabled (green toggle)

2. **Test Policies**
   - Try accessing data as an unauthenticated user
   - Try accessing data as an authenticated user
   - Verify users can only access their own data

## 🧪 Step 6: Test Your Connection

1. **Start Your Development Server**
   ```bash
   npm start
   ```

2. **Test Authentication**
   - Go to `/login` page
   - Try signing up with a test email
   - Verify you can sign in

3. **Test Products**
   - Go to `/products` page
   - Verify products are loading from database
   - Test search and filters

4. **Test Cart**
   - Sign in to your account
   - Try adding products to cart
   - Verify cart persists between sessions

## 🔧 Step 7: Environment Variables (Production)

For production deployment, use environment variables:

1. **Create `.env.local` file**
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. **Update `src/lib/supabase.ts`**
   ```typescript
   const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!
   const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!
   ```

## 📊 Step 8: Monitor Your Database

1. **Check Logs**
   - Go to "Logs" in Supabase dashboard
   - Monitor API requests and errors

2. **Check Storage**
   - Go to "Storage" for file uploads (if needed)
   - Configure storage policies

3. **Check Analytics**
   - Go to "Analytics" to see usage metrics
   - Monitor database performance

## 🚨 Troubleshooting

### Common Issues:

1. **"Invalid API key" error**
   - Double-check your anon key
   - Make sure you're using the anon key, not the service role key

2. **"RLS policy violation" error**
   - Check that RLS policies are correctly set up
   - Verify user authentication status

3. **"Table doesn't exist" error**
   - Run the database setup script again
   - Check table names match exactly

4. **Authentication not working**
   - Verify site URL and redirect URLs
   - Check browser console for errors
   - Ensure email templates are configured

### Getting Help:

- Check Supabase documentation: [https://supabase.com/docs](https://supabase.com/docs)
- Join Supabase Discord: [https://discord.supabase.com](https://discord.supabase.com)
- Check project issues on GitHub

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] Credentials copied and updated
- [ ] Database schema created
- [ ] Sample data inserted
- [ ] Authentication configured
- [ ] RLS policies working
- [ ] Local development working
- [ ] Environment variables set (for production)

## 🎉 You're Ready!

Your DEEARA e-commerce site is now connected to Supabase! You can:

- Add/edit products through the Supabase dashboard
- Monitor user activity and orders
- Scale your database as needed
- Deploy to production with confidence

---

**Need help?** Check the project README or create an issue in the repository. 