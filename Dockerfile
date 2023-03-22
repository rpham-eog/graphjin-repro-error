FROM dosco/graphjin:v3.0.12
WORKDIR /

COPY config/ /config/
CMD ["serve"]