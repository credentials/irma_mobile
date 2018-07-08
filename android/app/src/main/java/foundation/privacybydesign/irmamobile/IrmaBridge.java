package foundation.privacybydesign.irmamobile;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

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
        String assetsPath = context.getFilesDir().getPath() + "/assets";

        // For each scheme, compare its timestamps in the bundle assets and in our assets folder
        // if the latter does not exist or its value is lower than the one from the bundle assets,
        // copy the scheme out of the bundle to the assets dir
        try {
            AssetsCopier.ensureDirExists(context, assetsPath);
            AssetsCopier.ensureDirExists(context, assetsPath + "/irma_configuration");

            String schemes[] = context.getAssets().list("irma_configuration");
            for (String scheme : schemes) {
                if (!AssetsCopier.isDir(context, scheme))
                    continue; // Skip files (eg. READMEs)
                String schemePath = assetsPath + "/irma_configuration/" + scheme;
                AssetsCopier.ensureDirExists(context, schemePath);

                boolean shouldCopy;
                String oldPath = schemePath + "/timestamp";
                if (!new File(oldPath).exists()) {
                    shouldCopy = true;
                } else {
                    long oldTimestamp = readTimestamp(new FileInputStream(oldPath));
                    long newTimestamp = readTimestamp(context.getAssets().open("irma_configuration/" + scheme + "/timestamp"));
                    shouldCopy = oldTimestamp < newTimestamp;
                }
                if (shouldCopy) {
                    System.out.printf("Copying scheme %s from assets\n", scheme);
                    AssetsCopier.copyRecursively(context, scheme);
                    System.out.printf("Done copying scheme %s from assets\n", scheme);
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // Start irmago
        try {
            System.out.println(context.getPackageName());
            PackageInfo p = context.getPackageManager().getPackageInfo(context.getPackageName(), 0);
            Irmagobridge.start(this, p.applicationInfo.dataDir, assetsPath);
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

    private static long readTimestamp(InputStream stream) throws IOException {
        return Long.parseLong(new BufferedReader(new InputStreamReader(stream)).readLine());
    }
}
