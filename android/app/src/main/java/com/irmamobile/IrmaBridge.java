package com.irmamobile;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.File;
import java.io.IOException;

import irmagobridge.Irmagobridge;

public class IrmaBridge extends ReactContextBaseJavaModule implements irmagobridge.IrmaBridge {
    public IrmaBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "IrmaBridge";
    }

    @ReactMethod
    public void start() {
        ReactApplicationContext context = getReactApplicationContext();
        File assets = new File(context.getFilesDir().getPath() + "/assets");
        if (assets.mkdir()) { // assets folder was successfully created
            try {
                AssetsCopier.copyRecursively(context, "assets", "irma_configuration");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        } else { // either the assets folder already existed, or it could not be created
            if (!assets.isDirectory())
                throw new RuntimeException("Could not create assets dir");
        }

        try {
            System.out.printf(context.getPackageName());
            PackageInfo p = context.getPackageManager().getPackageInfo(context.getPackageName(), 0);
            Irmagobridge.start(this, p.applicationInfo.dataDir, context.getFilesDir().getPath() + "/assets");
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
