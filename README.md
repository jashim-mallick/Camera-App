# Camero 📸

A demo **Camera Application** built for web and mobile browsers.  
It allows users to capture photos, apply filters, preview images, and manage them in a smooth UI.

----------

## 🚀 Tech Stack

-   **Next.js**
    
-   **React**
    
-   **Tailwind CSS**
    
-   **shadcn/ui**
    
-   **react-webcam**
    
-   **Lucide React**
    
-   **Blob API**
    

----------

## ✨ Features

-   📷 Capture photos using device camera
    
-   🎨 Image filters:
    
    -   Grayscale
        
    -   Sepia
        
    -   Contrast
        
    -   Warm
        
    -   Cool
        
-   🌗 Dark & Light mode support
    
-   🖼️ Thumbnail preview of captured images
    
-   🔄 Switch between front & back camera
    
-   💡 Flash effect on capture
    
-   🗑️ Delete images (from preview / viewer)
    
-   📱 Fully responsive (mobile-first design)
    

----------

## 📸 How It Works

1.  Open the camera
    
2.  Capture multiple photos
    
3.  Apply filters in real-time
    
4.  View images in a carousel viewer
    
5.  Delete or manage images
    

----------

## 🧠 Key Concepts Used

-   MediaStream API (`getUserMedia`)
    
-   Canvas API for image processing
    
-   Blob & Object URL handling
    
-   React custom hooks (`useCamera`)
    
-   Component-based architecture
    

----------

## 📦 Installation

```bash
git clone https://github.com/your-username/camera-app.git
cd camera-app
bun install   # or npm install
bun dev       # or npm run dev

```

----------

## 📁 Project Structure

```
camera-app/
├── public/

├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── Buttons/
│   │   │
│   │   ├── Camera/
│   │   │   ├── Config/
│   │   │   │   └── Filter.ts
│   │   │   │
│   │   │   ├── Logic/
│   │   │   │   └── UseCamera.ts
│   │   │   │
│   │   │   ├── Ui/
│   │   │   │   ├── CameraControl.tsx
│   │   │   │   ├── ImageViewer.tsx
│   │   │   │   └── Thumblin.tsx
│   │   │   │
│   │   │   ├── MobileCamera.tsx
│   │   │   └── Types.ts
│   │   │
│   │   ├── Header/
│   │   │   └── Header.tsx
│   │   │
│   │   ├── Providers/
│   │   │
│   │   └── shadcnui/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── form.tsx
│   │       ├── label.tsx
│   │       └── ThemeToggleButton.tsx
│   │
│   ├── hooks/
│   └── lib/

├── .gitignore
├── .prettierrc
├── bun.lock
├── components.json
├── eslint.config.mjs
├── LICENSE
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json

```

----------

## ⚠️ Notes

-   Camera access requires **HTTPS** on mobile devices
    
-   Image quality depends on device hardware and browser support
    
-   Blob URLs are properly managed to prevent memory leaks
    

----------
## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)


## 📌 Future Improvements

-   📥 Download / Save image
    
-   ☁️ Upload to cloud storage
    
-   🎥 Video recording support
    
-   📐 Advanced filters (AI / ML based)
    

----------

## 👨‍💻 Author

Built with ❤️ by [Md Jashim Mallick](https://https://github.com/jashim-mallick)

----------
