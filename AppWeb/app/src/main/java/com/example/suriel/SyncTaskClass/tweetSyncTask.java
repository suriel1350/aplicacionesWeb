package com.example.suriel.SyncTaskClass;

import android.app.ProgressDialog;
import android.content.Context;
import android.media.session.MediaSession;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.Toast;

import com.google.api.client.extensions.android.http.AndroidHttp;
import com.google.api.client.json.gson.GsonFactory;
import com.tweet_api.TweetApi;
import com.tweet_api.model.MessagesTweetInput;
import com.tweet_api.model.MessagesCodeMessage;

/**
 * Created by adsoft on 14/11/17.
 */

public class tweetSyncTask extends AsyncTask<String,Void,MessagesCodeMessage> {

    Context context;
    private ProgressDialog pd;
    MessagesCodeMessage respuesta;

    public tweetSyncTask(Context context) {this.context = context; }

    @Override
    protected void onPreExecute()
    {
        super.onPreExecute();
        pd = new ProgressDialog(context);
        pd.setMessage("Login");
        pd.show();
    }




    @Override
    protected MessagesCodeMessage doInBackground(String... params) {

        respuesta = new MessagesCodeMessage();
        try
        {
            TweetApi.Builder builder =
                    new TweetApi.Builder(AndroidHttp.newCompatibleTransport(), new GsonFactory(), null);
            TweetApi service = builder.build();
            MessagesTweetInput log = new MessagesTweetInput();
            //params es una lista de strings que funciona como argv
            //[0] = email, [1] = password
            log.setNombre(params[0]);
            log.setDisponibles(params[1]);
            log.setToken(params[2]);
            log.setUrlImage(params[3]);
            respuesta = service.tweet().insert(log).execute();
        }
        catch (Exception e)
        {
            Log.d("Error al insertar tweet", e.getMessage(), e);
        }
        finally
        {
            return respuesta;
        }
    }


    @Override
    protected void onPostExecute(MessagesCodeMessage messagesTokenMessage)
    {
        pd.dismiss();
        if(respuesta.getCode() == 1)
            Toast.makeText(this.context, "Insert succesfully " + respuesta.getMessage(), Toast.LENGTH_SHORT).show();
        else
            Toast.makeText(this.context,"Error at insert tweet !!!",Toast.LENGTH_SHORT).show();
    }
}

