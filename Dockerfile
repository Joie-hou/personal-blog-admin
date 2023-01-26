FROM nginx

#将dist文件中的内容复制到 `/usr/share/nginx/html` 这个目录下面
COPY dist/ /usr/share/nginx/html

#将本地的nginx配置文件替换nginx镜像里的默认配置文件
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8000