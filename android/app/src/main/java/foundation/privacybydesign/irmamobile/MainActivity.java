package foundation.privacybydesign.irmamobile;

import android.os.Bundle;
import irmagobridge.Irmagobridge;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {
    @Override
    protected String getMainComponentName() {
        return "IRMA";
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        Irmagobridge.onStart();
        super.onCreate(savedInstanceState);
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
       return new ReactActivityDelegate(this, getMainComponentName()) {
        @Override
        protected ReactRootView createRootView() {
         return new RNGestureHandlerEnabledRootView(MainActivity.this);
        }
      };
    }
}
