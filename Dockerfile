FROM node:14.15.5 as Builder

# create WORKDIR

WORKDIR /app

COPY . .

# install all the dependencies
RUN yarn install && yarn build && rm -rf node_modules

# building the application


# getting the server for hosting

FROM nginx:alpine

# copy configuration file for nginx
COPY ./nginx_config/default.conf /etc/nginx/conf.d/default.conf

# passing the build to nginx
COPY --from=Builder /build/ /usr/share/nginx/html/

