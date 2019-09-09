package foundation.privacybydesign.irmamobile;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import irmagobridge.Irmagobridge;

public class IrmaBridge extends ReactContextBaseJavaModule implements irmagobridge.IrmaBridge {
    public IrmaBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "IrmaBridge";
    }

    @Override
    public void initialize() {
        ReactApplicationContext context = this.getReactApplicationContext();
        IrmaConfigurationCopier copier = new IrmaConfigurationCopier(context);

        // Start irmago
        try {
            PackageInfo p = context.getPackageManager().getPackageInfo(context.getPackageName(), 0);
            Irmagobridge.start(this, p.applicationInfo.dataDir, copier.destAssetsPath.toString());
        } catch (PackageManager.NameNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @ReactMethod
    public void dispatch(String action) {
        Irmagobridge.receiveAction(action);
    }

    @Override
    public void sendEvent(String channel, String message) {
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(channel, message);
    }

    @Override
    public void debugLog(String message) {
        System.out.printf("Go: %s\n", message);
    }
}
