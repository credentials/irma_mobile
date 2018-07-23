package foundation.privacybydesign.irmamobile;

import com.facebook.react.bridge.ReactApplicationContext;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class AssetsCopier {
    public static void copyRecursively(ReactApplicationContext context, String path) throws IOException {
        String assets[] = context.getAssets().list("irma_configuration/" + path);
        if (assets.length == 0) {
            copyFile(context, path);
        } else {
            ensureDirExists(context, context.getFilesDir().getPath() + "/assets/irma_configuration/" + path);
            for (String asset : assets)
                copyRecursively(context, path + "/" + asset);
        }
    }

    public static void ensureDirExists(ReactApplicationContext context, String path) throws IOException {
        File dir = new File(path);
        if (!dir.exists() && !dir.mkdir())
            throw new IOException("Could not create dir " + dir.getPath());
    }

    public static boolean isDir(ReactApplicationContext context, String path) throws IOException {
        return context.getAssets().list("irma_configuration/" + path).length > 0;
    }

    private static void copyFile(ReactApplicationContext context, String path) throws IOException {
        InputStream in = context.getAssets().open("irma_configuration/" + path);
        String newFileName = context.getFilesDir().getPath() + "/assets/irma_configuration/" + path;
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
