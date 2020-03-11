module github.com/privacybydesign/irma_mobile

go 1.14

require (
	astuart.co/go-sse v0.0.0-20200223201439-6cc042ab6f6d
	github.com/alexandrevicenzi/go-sse v1.5.0
	github.com/bwesterb/byteswriter v1.0.0
	github.com/bwesterb/go-atum v1.0.3
	github.com/bwesterb/go-exptable v1.0.0
	github.com/bwesterb/go-pow v1.0.0
	github.com/bwesterb/go-xmssmt v1.2.0
	github.com/certifi/gocertifi v0.0.0-20200211180108-c7c1fbc02894
	github.com/dgrijalva/jwt-go v3.2.0+incompatible
	github.com/edsrzf/mmap-go v1.0.0
	github.com/getsentry/raven-go v0.2.1-0.20190619092523-5c24d5110e0e
	github.com/go-errors/errors v1.0.1
	github.com/go-sql-driver/mysql v1.5.0
	github.com/hashicorp/errwrap v1.0.0
	github.com/hashicorp/go-cleanhttp v0.5.1
	github.com/hashicorp/go-multierror v1.0.0
	github.com/hashicorp/go-retryablehttp v0.6.4
	github.com/jasonlvhit/gocron v0.0.0-20191111122648-5c21418a78e8
	github.com/jinzhu/gorm v1.9.12
	github.com/jinzhu/inflection v1.0.0
	github.com/konsorten/go-windows-terminal-sequences v1.0.2
	github.com/lib/pq v1.3.0
	github.com/mattn/go-colorable v0.1.6
	github.com/mattn/go-isatty v0.0.12
	github.com/mgutz/ansi v0.0.0-20170206155736-9520e82c474b
	github.com/minio/blake2b-simd v0.0.0-20160723061019-3f5f724cb5b1
	github.com/minio/sha256-simd v0.1.1
	github.com/mr-tron/base58 v1.1.3
	github.com/multiformats/go-multihash v0.0.13
	github.com/multiformats/go-varint v0.0.5
	github.com/nightlyone/lockfile v1.0.0
	github.com/pkg/errors v0.9.1
	github.com/privacybydesign/gabi v0.0.0-20200306134149-18dd7a01d765
	github.com/privacybydesign/irmago v0.5.0-rc.1.0.20200311101446-0828d8e73771
	github.com/sirupsen/logrus v1.4.2
	github.com/spaolacci/murmur3 v1.1.0
	github.com/templexxx/cpufeat v0.0.0-20180724012125-cef66df7f161
	github.com/templexxx/xor v0.0.0-20191217153810-f85b25db303b
	github.com/timshannon/bolthold v0.0.0-20200310154430-7be3f3bd401d
	github.com/x-cray/logrus-prefixed-formatter v0.5.2
	github.com/x448/float16 v0.8.4
	go.etcd.io/bbolt v1.3.3
	golang.org/x/crypto v0.0.0-20200302210943-78000ba7a073
	golang.org/x/sys v0.0.0-20200302150141-5c8b2ff67527
)

replace astuart.co/go-sse => github.com/sietseringers/go-sse v0.0.0-20200223201439-6cc042ab6f6d

replace github.com/spf13/pflag => github.com/sietseringers/pflag v1.0.4-0.20190111213756-a45bfec10d59

replace github.com/spf13/viper => github.com/sietseringers/viper v1.0.1-0.20200205174444-d996804203c7
