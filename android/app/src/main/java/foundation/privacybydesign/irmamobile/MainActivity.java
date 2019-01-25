package foundation.privacybydesign.irmamobile;

import com.reactnativenavigation.NavigationActivity;
import com.reactnativenavigation.utils.CommandListenerAdapter;

public class MainActivity extends NavigationActivity {
  @Override
  public void invokeDefaultOnBackPressed() {
      if (!navigator.handleBack(new CommandListenerAdapter())) {
          super.onBackPressed();
      }
  }
}
