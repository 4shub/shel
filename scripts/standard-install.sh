#!/bin/bash

# helper functions
command_exists () {
    type "$1" &> /dev/null ;
}

# checks for compatibility before running
check_compatibility() {
    # check for node
    # TODO: Check version compatibility
    if ! command_exists node; then
        echo "Node.JS not installed"
        exit 1
    fi

    # check for mongodb
    if ! command_exists mongod; then
        echo "MongoDB not installed"
        exit 1
    fi
}