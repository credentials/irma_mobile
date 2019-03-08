#import "IrmaVersion.h"
#import <React/RCTBridge.h>

@implementation IrmaVersion

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

- (NSDictionary *)constantsToExport
{
  return @{@"version": [[NSBundle mainBundle] objectForInfoDictionaryKey: @"CFBundleShortVersionString"],
           @"build":   [[NSBundle mainBundle] objectForInfoDictionaryKey:(NSString *)kCFBundleVersionKey],
          };
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end
