package foundation.privacybydesign.irmamobile;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.chirag.RNMail.RNMail;
import com.RNFetchBlob.RNFetchBlobPackage;
import io.sentry.RNSentryPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import org.irmacard.cardemu.BuildConfig;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.rnfs.RNFSPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNMail(),
          new RNFSPackage(),
          new RNFetchBlobPackage(),
          new RNSentryPackage(MainApplication.this),
          new RNI18nPackage(),
          new RCTCameraPackage(),
          new IrmaBridgePackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
