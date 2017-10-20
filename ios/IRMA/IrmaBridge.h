#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Irmagobridge/Irmagobridge.h>

@interface IrmaBridge : RCTEventEmitter <RCTBridgeModule, IrmagobridgeIrmaBridge>

@end
