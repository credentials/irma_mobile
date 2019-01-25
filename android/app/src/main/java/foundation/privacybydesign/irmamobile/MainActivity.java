package foundation.privacybydesign.irmamobile;

import com.reactnativenavigation.NavigationActivity;

public class MainActivity extends NavigationActivity {
  @Override
  public void invokeDefaultOnBackPressed() {
      moveTaskToBack(true);
  }
}
