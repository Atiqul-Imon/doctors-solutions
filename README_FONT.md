# Kalpurush Font Setup for Bengali Prescriptions

## Quick Setup

1. **Download Kalpurush Font:**
   - Visit: https://github.com/potasiyam/Kalpurush
   - Download `Kalpurush.ttf` file

2. **Place the font file:**
   ```bash
   mkdir -p public/fonts/kalpurush
   # Copy Kalpurush.ttf to public/fonts/kalpurush/
   ```

3. **Verify:**
   ```bash
   ls public/fonts/kalpurush/Kalpurush.ttf
   ```

4. **Restart server:**
   ```bash
   npm run dev
   ```

## Font File Location

The font must be placed at:
```
public/fonts/kalpurush/Kalpurush.ttf
```

## How It Works

- The system automatically detects and uses Kalpurush for Bengali text
- English text uses Helvetica
- If Kalpurush is not found, it falls back to Helvetica (Bengali may not render correctly)

## Testing

After setup:
1. Configure your prescription settings at `/dashboard/settings`
2. Create a test prescription with Bengali text
3. Print the prescription to verify Bengali rendering

## Notes

- The font file is excluded from git (see `.gitignore`)
- You need to add the font file manually or via deployment scripts
- For production, ensure the font file is included in your deployment

