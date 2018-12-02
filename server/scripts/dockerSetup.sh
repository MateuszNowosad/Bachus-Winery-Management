#!/bin/bash

echo "Prepare mysql image"
docker pull mysql/mysql-server:5.7

echo "Start mysql container"
docker run --name=bachus-winery57 -d mysql/mysql-server:5.7
