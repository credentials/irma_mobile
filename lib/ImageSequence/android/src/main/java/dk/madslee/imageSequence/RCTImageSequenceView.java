package dk.madslee.imageSequence;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.drawable.AnimationDrawable;
import android.graphics.drawable.BitmapDrawable;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.ImageView;

import org.apache.commons.io.IOUtils;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.concurrent.RejectedExecutionException;
import java.lang.reflect.Field;

public class RCTImageSequenceView extends ImageView {
    private Integer framesPerSecond = 24;
    private Boolean loop = false;
    private Boolean started = false;

    private AsyncTask activeTask = null;
    private ArrayList<byte[]> imagesData = new ArrayList<byte[]>();
    private Boolean isSetup = false;

    private MyAnimationDrawable animationDrawable;
    private RCTResourceDrawableIdHelper resourceDrawableIdHelper;

    public RCTImageSequenceView(Context context) {
        super(context);

        resourceDrawableIdHelper = new RCTResourceDrawableIdHelper();
    }

    // Overrides AnimationDrawable's render to load Bitmaps when needed, instead of up front
    private class MyAnimationDrawable extends AnimationDrawable {

        Context context;
        ArrayList<byte[]> imagesData;

        Field mCurFrameField;

        public MyAnimationDrawable(Context context, ArrayList<byte[]> imagesData) {
            super();

            this.context = context;
            this.imagesData = imagesData;

            try {
                this.mCurFrameField = this.getClass().getSuperclass().getDeclaredField("mCurFrame");
                this.mCurFrameField.setAccessible(true);
            } catch(Exception e) {}
        }

        @Override
        public void draw(Canvas canvas) {
            int currentFrame = 0;
            try {
                currentFrame = this.mCurFrameField.getInt(this);
            } catch (Exception e) {}

            InputStream in = new ByteArrayInputStream(this.imagesData.get(currentFrame));
            BitmapDrawable drawable = new BitmapDrawable(this.context.getResources(), in);

            drawable.setBounds(this.getBounds());
            drawable.draw(canvas);
        }

        protected void onAnimationFinish() {
        }
    }

    // Task that retrieves image data for all paths/uris specified
    private class RetrieveImagesTask extends AsyncTask<Object, Void, ArrayList<byte[]>> {
        private final ArrayList<String> uris;

        private Exception e = null;

        public RetrieveImagesTask(ArrayList<String> uris) {
            this.uris = uris;
        }

        @Override
        protected ArrayList<byte[]> doInBackground(Object... params) {
            ArrayList<byte[]> imagesData = new ArrayList<byte[]>(this.uris.size());
            try {
                for(String uri : this.uris) {
                    imagesData.add(retrieveImageData(uri));
                }
            } catch (Exception e) {
                this.e = e;
            }

            return imagesData;
        }

        protected void onPostExecute(ArrayList<byte[]> imagesData) {
            if (!isCancelled() && this.e == null) {
                onTaskCompleted(this, imagesData);
            }
        }
    }

    // Called when RetrieveImagesTask is finished
    private void onTaskCompleted(RetrieveImagesTask retrieveImagesTask, ArrayList<byte[]>imagesData) {
        this.imagesData = imagesData;
        this.activeTask = null;

        this.setupAnimationDrawable();
    }

    // Retrieves image data either from file path or remote server (in debug)
    private byte[] retrieveImageData(String uri) throws MalformedURLException, IOException {
        InputStream in;

        if (uri.startsWith("http")) {
            in = new URL(uri).openStream();
        } else {
            int id = resourceDrawableIdHelper.getResourceDrawableId(this.getContext(), uri);
            in = this.getContext().getResources().openRawResource(id);
        }

        return IOUtils.toByteArray(in);
    }

    // Called when the images prop changes
    public void setImages(ArrayList<String> uris) {
        // Cancel any retrieving task that might have been running
        if(this.activeTask != null) {
            this.activeTask.cancel(true);
        }

        // Preliminarily load the first image
        if(uris.size() > 0) {
            try {
                byte[] imageData = this.retrieveImageData(uris.get(0));
                this.setupInitialDrawable(imageData);
            } catch(Exception e) { }
        }

        // Setup a new task to retrieve the images
        this.imagesData = new ArrayList<byte[]>();
        this.activeTask = new RetrieveImagesTask(uris);

        try {
            this.activeTask.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR, new Object[0]);
        } catch (RejectedExecutionException e){
            Log.e("rn-image-sequence", "RetrieveImagesTask failed" + e.getMessage());
            this.activeTask = null;
        }
    }

    // Called when the `framesPerSecond` prop changes
    public void setFramesPerSecond(Integer framesPerSecond) {
        this.framesPerSecond = framesPerSecond;
        this.setupAnimationDrawable();
    }

    // Called when the `loop` prop changes
    public void setLoop(Boolean loop) {
        this.loop = loop;
        this.setupAnimationDrawable();
    }

    // Called when the `started` prop changes
    public void setStarted(Boolean started) {
        if(!this.started && this.isSetup) {
            this.started = started;
            this.animationDrawable.start();
        }
    }

    // Setup the first frame as simple drawable (before all other frames have loaded)
    private void setupInitialDrawable(byte[] imageData) {
        InputStream in = new ByteArrayInputStream(imageData);
        BitmapDrawable drawable = new BitmapDrawable(this.getResources(), in);

        this.setImageDrawable(drawable);
    }

    private void setupAnimationDrawable() {
        this.isSetup = false;
        if(this.imagesData.size() == 0) {
            this.setImageDrawable(null);
            return;
        }

        this.animationDrawable = new MyAnimationDrawable(this.getContext(), this.imagesData);

        InputStream in = new ByteArrayInputStream(imagesData.get(0));
        BitmapDrawable drawable = new BitmapDrawable(this.getResources(), in);
        for(int i = 0; i < this.imagesData.size(); i++) {
            this.animationDrawable.addFrame(drawable, 1000 / this.framesPerSecond);
        }

        this.animationDrawable.setOneShot(!this.loop);
        this.setImageDrawable(this.animationDrawable);
        
        this.isSetup = true;
        if(this.started) {
            this.animationDrawable.start();
        }
    }
}
