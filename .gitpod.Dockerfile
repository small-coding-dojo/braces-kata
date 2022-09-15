FROM clojure:latest

RUN apt update && apt -y upgrade && apt -y install sudo && rm -rf /var/lib/apt/lists/* 

RUN curl -sL install.mob.sh | sudo sh

CMD /bin/bash