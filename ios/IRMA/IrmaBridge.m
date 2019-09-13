#import "IrmaBridge.h"
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>

@implementation IrmaBridge

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(start) {
  NSString* bundlePath = NSBundle.mainBundle.bundlePath;
  NSString *libraryPath = NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES)[0];
  // Mark librarypath as non-backup
  NSURL* URL= [NSURL fileURLWithPath: libraryPath];

  NSError *error = nil;
  BOOL success = [URL setResourceValue: [NSNumber numberWithBool: YES]
                              forKey: NSURLIsExcludedFromBackupKey error: &error];
  if(!success){
    NSLog(@"Error excluding %@ from backup %@", [URL lastPathComponent], error);
  }

  IrmagobridgeStart(self, libraryPath, bundlePath);
}

RCT_EXPORT_METHOD(dispatch:(NSString *)action) {
  IrmagobridgeReceiveAction(action);
}

-(void)sendEvent:(NSString*)channel message:(NSString*)message {
  [self sendEventWithName:channel body:message];
}

-(NSArray<NSString *> *)supportedEvents {
  return @[@"irmago", @"log"];
}

-(void)debugLog:(NSString*)message {
#if DEBUG
  [self sendEvent:@"log" message:message];
#endif
}

@end
