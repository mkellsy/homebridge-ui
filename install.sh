#!/bin/bash

os=$(uname)
arch=$(uname -m)

node=$(node -v)
node=${node#"v"}

echo "Current Node Version $node"

npm set progress=false

case $os in
    "Linux")
        if command -v dnf > /dev/null; then
            echo "Updating Node"

            dnf update -y nodejs
            node -v
        elif command -v apt-get > /dev/null; then
            apt-get install -y curl tar

            if [[ "$node" < "12.13.0" ]]; then
                case $arch in
                    "x86_64")
                        echo "Updating Node"

                        curl -O https://nodejs.org/dist/v12.13.0/node-v12.13.0-linux-x64.tar.gz
                        tar -xzf ./node-v12.13.0-linux-x64.tar.gz -C /usr/local --strip-components=1 --no-same-owner
                        rm -f ./node-v12.13.0-linux-x64.tar.gz

                        node -v
                        ;;

                    "armv7l")
                        echo "Updating Node"

                        curl -O https://nodejs.org/dist/v12.13.0/node-v12.13.0-linux-armv7l.tar.gz
                        tar -xzf ./node-v12.13.0-linux-armv7l.tar.gz -C /usr/local --strip-components=1 --no-same-owner
                        rm -f ./node-v12.13.0-linux-armv7l.tar.gz

                        node -v
                        ;;

                    "armv8l")
                        echo "Updating Node"

                        curl -O https://nodejs.org/dist/v12.13.0/node-v12.13.0-linux-arm64.tar.gz
                        tar -xzf ./node-v12.13.0-linux-arm64.tar.gz -C /usr/local --strip-components=1 --no-same-owner
                        rm -f ./node-v12.13.0-linux-arm64.tar.gz

                        node -v
                        ;;
                esac
            fi
        fi
        ;;

    "Darwin")
        if [[ "$node" < "12.13.0" ]]; then
            echo "Updating Node"

            curl -O https://nodejs.org/dist/v12.13.0/node-v12.13.0-darwin-x64.tar.gz
            tar -xzf ./node-v12.13.0-darwin-x64.tar.gz -C /usr/local --strip-components=1 --no-same-owner
            rm -f ./node-v12.13.0-darwin-x64.tar.gz

            node -v
        fi
        ;;
esac

echo "Installing HOOBS"

npm cache clean --force
npm install -g npm

npm install -g --unsafe-perm @hoobs/hoobs
hoobs-init
