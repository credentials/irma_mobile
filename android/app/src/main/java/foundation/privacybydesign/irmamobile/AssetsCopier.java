package foundation.privacybydesign.irmamobile;

import com.facebook.react.bridge.ReactApplicationContext;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class AssetsCopier {
    public static void copyRecursively(ReactApplicationContext context, String base, String path) throws IOException {
        String assets[] = context.getAssets().list(path);
        if (assets.length == 0) {
            copyFile(context, base, path);
        } else {
            File dir = new File(context.getFilesDir().getPath() + "/" + base + "/" + path);
            if (!dir.exists() && !dir.mkdir())
                throw new IOException("Could not create dir " + dir.getPath());
            for (String asset : assets)
                copyRecursively(context, base, path + "/" + asset);
        }
    }

    private static void copyFile(ReactApplicationContext context, String base, String path) throws IOException {
        InputStream in = context.getAssets().open(path);
        String newFileName = context.getFilesDir().getPath() + "/" + base + "/" + path;
        OutputStream out = new FileOutputStream(newFileName);
        byte[] buffer = new byte[1024];
        int read;
        while ((read = in.read(buffer)) != -1)
            out.write(buffer, 0, read);
        in.close();
        out.flush();
        out.close();
    }
}
