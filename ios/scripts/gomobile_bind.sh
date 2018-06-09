go_version=$(go version)
if [[ $go_version = *'go1.9.4'* ]]; then
  export CGO_CFLAGS_ALLOW='-fmodules|-fblocks'
fi

export GOPATH=`echo ~/go`
export PATH="$GOPATH/bin:$PATH"
$GOPATH/bin/gomobile bind -target ios github.com/privacybydesign/irma_mobile/irmagobridge
