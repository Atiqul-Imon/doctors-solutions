# Kalpurush Font Setup Guide

## Download Kalpurush Font

To enable proper Bengali text rendering in prescription PDFs, you need to download and add the Kalpurush font.

### Option 1: Download from GitHub (Recommended)

1. Visit: https://github.com/potasiyam/Kalpurush
2. Download the font files
3. Extract the `.ttf` file (Kalpurush.ttf or kalpurush.ttf)

### Option 2: Download from FontBangla

1. Visit: https://fontbangla.com/font/kalpurush/
2. Download the font file

## Installation Steps

1. **Place the font file:**
   ```bash
   # Create the directory if it doesn't exist
   mkdir -p public/fonts/kalpurush
   
   # Copy Kalpurush.ttf to public/fonts/kalpurush/
   # The file should be at: public/fonts/kalpurush/Kalpurush.ttf
   ```

2. **Verify the file exists:**
   ```bash
   ls -la public/fonts/kalpurush/
   ```

3. **Restart the development server:**
   ```bash
   npm run dev
   ```

## Font File Location

The font file should be placed at:
```
public/fonts/kalpurush/Kalpurush.ttf
```

Or (case-insensitive):
```
public/fonts/kalpurush/kalpurush.ttf
```

## How It Works

- The PDF generation service automatically detects and registers the Kalpurush font
- Bengali text will use Kalpurush font
- English text will use Helvetica font
- If Kalpurush is not found, the system will fallback to Helvetica (Bengali may not render correctly)

## Testing

After adding the font:
1. Go to Settings and configure your prescription details
2. Create a test prescription
3. Print the prescription to verify Bengali text renders correctly

## Troubleshooting

**If Bengali text doesn't render:**
1. Verify the font file exists at `public/fonts/kalpurush/Kalpurush.ttf`
2. Check file permissions (should be readable)
3. Restart the server after adding the font
4. Check server logs for font registration errors

**Font not found error:**
- Ensure the filename is exactly `Kalpurush.ttf` or `kalpurush.ttf`
- Check the file path is correct
- Verify the font file is not corrupted

