#import "IrmaBridge.h"
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>

@implementation IrmaBridge

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(start) {
  NSString* bundlePath = NSBundle.mainBundle.bundlePath;
  NSString *libraryPath = NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES)[0];
  IrmagobridgeStart(self, libraryPath, bundlePath);
}

RCT_EXPORT_METHOD(dispatch:(NSString *)action) {
  IrmagobridgeReceiveAction(action);
}

-(void)sendEvent:(NSString*)channel message:(NSString*)message{
  [self.bridge.eventDispatcher sendDeviceEventWithName:channel body:message];
}

-(void)debugLog:(NSString*)message {
  NSLog(message);
}

@end
