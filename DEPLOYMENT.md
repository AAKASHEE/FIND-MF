# Deployment Guide: Render Backend + Vercel Frontend

## Backend Deployment (Render)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Setup Render and Vercel deployment"
   git push
   ```

2. **Deploy on Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repo branch
   - Build command: `npm install`
   - Start command: `npm start`
   - Environment: Node
   - Add Environment Variable:
     - Key: `PORT`
     - Value: `10000` (or let it auto-assign)
   - Click "Deploy"

3. **Get your backend URL**
   - After deployment, copy the Render URL (e.g., `https://location-tracker-backend.onrender.com`)
   - Note this for the frontend setup

## Frontend Deployment (Vercel)

1. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Framework: "Other" (static)
   - Root Directory: `./public`
   - Build Command: (leave empty or set to `echo "Static files"`)
   - Output Directory: `.`

2. **Set Environment Variables**
   - In Vercel Dashboard → Project Settings → Environment Variables
   - Add:
     - Key: `REACT_APP_BACKEND_URL`
     - Value: `https://your-render-url.onrender.com` (from step 1)
   - Redeploy

3. **Test**
   - Open your Vercel URL
   - Click "Continue"
   - Grant location access
   - Should see "Verification successful"

## Backend Updates

Make sure backend `server.js` has CORS enabled (already done):
```javascript
app.use(cors());
```

## Troubleshooting

**"Server connection failed"?**
- Check if Render backend is running (check logs in Render dashboard)
- Verify BACKEND_URL in Vercel environment variables matches your Render URL
- Check browser console for CORS errors

**To update later:**
- Push changes to GitHub
- Both services auto-redeploy on push (if auto-deploy is enabled)
