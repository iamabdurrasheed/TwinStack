# Email Setup Guide for TwinStack Solutions

## Setup Web3Forms for Contact Form

### Step 1: Get Your Free API Key

1. Go to [https://web3forms.com](https://web3forms.com)
2. Click "Get Started" or "Get Access Key"
3. Enter your email: `iamrasheed358@gmail.com`
4. Verify your email
5. Copy your Access Key

### Step 2: Configure Environment Variable

1. Open `.env.local` file in your project root
2. Replace the empty value with your access key:
   ```
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_actual_access_key_here
   ```

### Step 3: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Start it again
npm run dev
```

### Step 4: Test the Form

1. Go to http://localhost:3000
2. Scroll to "Get a Quote" section
3. Fill out the form with test data
4. Submit
5. Check your email at iamrasheed358@gmail.com

## How It Works

- When a user fills out the quote form, the data is sent to Web3Forms API
- Web3Forms forwards the email to iamrasheed358@gmail.com
- The form data is also saved in localStorage for the admin panel
- You can view all quote requests in the admin dashboard

## Features

- ✅ No backend required
- ✅ Free up to 250 submissions/month
- ✅ Spam protection included
- ✅ Email notifications
- ✅ Works on Vercel deployment

## For Vercel Deployment

Add the environment variable in Vercel:

1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add: `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
4. Value: Your access key
5. Redeploy

## Alternative: EmailJS Setup (Optional)

If you prefer EmailJS:

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Create email service
3. Create email template
4. Get your credentials
5. Let me know and I'll update the code

---

**Current Configuration:**
- Recipient Email: iamrasheed358@gmail.com
- Form Location: Homepage → "Get a Quote" section
- Admin Panel: View all submissions at /admin/dashboard → Quotes tab
