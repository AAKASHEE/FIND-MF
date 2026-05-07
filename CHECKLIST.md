# Deployment Checklist

## Before Deploying

1. **Backend URL - Update this FIRST**
   - Deploy backend on Render first
   - Copy your Render URL (e.g., `https://your-app.onrender.com`)
   - Update in `public/index.html` line 2:
     ```javascript
     const BACKEND_URL = 'https://your-render-url.onrender.com';
     ```
   - Test: Go to `https://your-render-url.onrender.com/` should show JSON response

## Deployment Steps

### 1. Deploy Backend (Render)
```bash
# Push to GitHub
git add .
git commit -m "Backend ready for Render"
git push

# On Render.com:
- New Web Service
- Connect GitHub repo
- Select main branch
- Build: npm install
- Start: npm start
- Region: Any
- Click Deploy
- Wait for "Live"
- Copy the Render URL
```

### 2. Update Frontend with Backend URL
```bash
# After getting Render URL
# Edit public/index.html line 2 with your Render URL
# Then push
git add public/index.html
git commit -m "Update backend URL"
git push
```

### 3. Deploy Frontend (Vercel)
```bash
# On Vercel.com:
- Add Project
- Import GitHub repo
- Framework: Other
- Root Directory: public
- Click Deploy
- Copy Vercel URL
```

## Test

1. Open Vercel URL in browser
2. Click "Continue"
3. Grant location permission
4. Should see "Verification successful"

## View Collected Locations

- Backend: `https://your-render-url.onrender.com/locations`
- Shows all collected locations as JSON

## Troubleshooting

**Still getting "Server connection failed"?**
1. Check Render dashboard - is backend running? Check logs
2. Verify BACKEND_URL in public/index.html matches your Render URL exactly
3. Test backend directly: `curl https://your-render-url.onrender.com/`
4. Check browser console (F12) for actual error
