curl -O https://storage.googleapis.com/golang/go1.7.1.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.7.1.linux-amd64.tar.gz
mkdir -p ~/go; echo "export GOPATH=$HOME/go" >> ~/.bashrc
rm -rf go1.7.1.linux-amd64.tar.gz
sudo cp /usr/local/go/bin/go /usr/bin/
git clone -b v1.6.7 https://github.com/ethereum/go-ethereum
cd go-ethereum
make all
sudo cp ./build/bin/* /usr/bin/
cd ..
rm -rf go-ethereum
cd ~
wget https://github.com/ethereum/mist/releases/download/v0.9.2/Mist-linux64-0-9-2.zip
