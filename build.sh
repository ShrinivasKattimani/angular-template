#!/bin/bash
grunt build:$1 && cp .tmp/styles/main.css dist/styles/
