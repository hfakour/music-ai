# ----- مرحله اول: ساخت (build) -----
    FROM node:22-alpine AS builder

    # تنظیم محل کار
    WORKDIR /app
    
    # فقط package.json و lockfile رو کپی کن (برای کش بهتر)
    COPY package*.json ./
    
    # نصب وابستگی‌ها (هم dev و هم prod)
    RUN npm install
    
    # کپی کل پروژه (بقیه کدها و tsconfig و src)
    COPY . .
    
    # ساخت پروژه با TypeScript
    RUN npm run build
    
    
    # ----- مرحله دوم: اجرای نسخه production -----
    FROM node:22-alpine
    
    # محل کار در کانتینر نهایی
    WORKDIR /app
    
    # فقط پوشه‌ی نهایی کامپایل‌شده و فایل‌های لازم رو کپی کن
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/dist ./dist
    COPY --from=builder /app/node_modules ./node_modules
    
    # اگر env production بخوای
    ENV NODE_ENV=production
    
    # اجرا از فایل build شده
    CMD ["node", "dist/server.js"]
    