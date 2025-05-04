FROM nginx:alpine

# کپی تنظیمات NGINX
COPY default.conf /etc/nginx/conf.d/default.conf

# کپی فایل‌های build‌شده‌ی فرانت‌اند
COPY ../frontend/dist /usr/share/nginx/html
