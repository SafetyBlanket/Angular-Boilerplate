#!/bin/bash

# See: https://github.com/angular/angular-cli/issues/16779
# TLDR; Angular team can't be bothered to support multiple environments via "unapproved"
# methods that the Angular community has been using (Angular.json fileReplacements setting 
# A FEATURE IN WHICH THEY USE WHEN BOOTSTRAPPING NEW PROJECTS IN SETTINGS!!!)
# Because I don't want to rollback the devtools to something really old, this simple tool
# should help set the current environment for the app.

ENVIRONMENT_DIR=$(pwd)/src/environments
REQUESTED_ENVIRONMENT=$ENVIRONMENT_DIR/environment.$1.ts

echo $REQUESTED_ENVIRONMENT

if [ -z $1 ]; then
  echo "Syntax is \"./env.sh <env>\" where <env> is the name of the environment file e.g. <project root>/src/environments/environment.<env>.ts"
  exit 1
elif [ ! -f $REQUESTED_ENVIRONMENT ]; then
  echo "Environment \"$1\" not found!"
  exit 2
fi

echo "Environment loaded: $REQUESTED_ENVIRONMENT => $ENVIRONMENT_DIR/environment.ts"
cp $REQUESTED_ENVIRONMENT $ENVIRONMENT_DIR/environment.ts
