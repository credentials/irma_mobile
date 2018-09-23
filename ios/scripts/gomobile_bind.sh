go_version=$(go version)
if [[ $go_version = *'go1.9.4'* ]]; then
  export CGO_CFLAGS_ALLOW='-fmodules|-fblocks'
fi

# When no GOPATH is defined, try the user's homedir
# This might allow builds from the XCode GUI without additional configuration
if [ -z "$GOPATH" ]; then
	export GOPATH=`echo ~/go`
fi

export PATH="$GOPATH/bin:$PATH"
$GOPATH/bin/gomobile bind -target ios github.com/privacybydesign/irma_mobile/irmagobridge
