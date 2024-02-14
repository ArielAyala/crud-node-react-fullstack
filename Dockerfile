FROM jamielsharief/mysql:latest

ENV MYSQL_ROOT_PASSWORD=12345

ENV MYSQL_DATABASE=mydb

EXPOSE 3306

VOLUME /var/lib/mysql

CMD ["mysqld"]