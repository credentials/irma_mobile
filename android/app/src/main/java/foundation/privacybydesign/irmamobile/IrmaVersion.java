package foundation.privacybydesign.irmamobile;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.content.pm.PackageManager.NameNotFoundException;
import android.content.pm.PackageManager;

import java.util.HashMap;
import java.util.Map;

public class IrmaVersion extends ReactContextBaseJavaModule {
	private final ReactApplicationContext reactContext;

	public IrmaVersion(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "IrmaVersion";
    }

    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> constants = new HashMap<>();
        final PackageManager packageManager = this.reactContext.getPackageManager();
        final String packageName = this.reactContext.getPackageName();
        try {
            constants.put("version", packageManager.getPackageInfo(packageName, 0).versionName);
            constants.put("build", packageManager.getPackageInfo(packageName, 0).versionCode);
        } catch (NameNotFoundException e) {
            // Should not happen, but since the requested info is not critical this is sufficient
            constants.put("version", "");
            constants.put("build", "");
        }
        return constants;
    }
}
