/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET: string;
    // Add other environment variables if needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  