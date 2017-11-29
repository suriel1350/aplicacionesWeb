package com.example.suriel.appweb;

import android.content.Intent;
import android.media.session.MediaSession;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.suriel.SyncTaskClass.loginSyncTask;
import com.example.suriel.SyncTaskClass.tweetSyncTask;
import com.tweet_api.model.MessagesCodeMessage;
import com.tweet_api.model.MessagesTweetInput;

import java.util.concurrent.ExecutionException;


public class TweetActivity extends AppCompatActivity {

    Button btnTweet;
    EditText edtNombre;
    EditText edtDisponibles;
    EditText edtPrecio;
    EditText edtUrlImage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tweet);

        btnTweet = (Button) findViewById(R.id.btnTweet);
        edtNombre = (EditText) findViewById(R.id.edtNombre);
        edtDisponibles = (EditText) findViewById(R.id.edtDisponibles);
        edtPrecio =(EditText) findViewById(R.id.edtPrecio);
        edtUrlImage = (EditText) findViewById(R.id.edtUrlImage);
        edtUrlImage.setText("https://image.flaticon.com/icons/png/512/195/195180.png");

        btnTweet.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {

                String nombre =  edtNombre.getText().toString().trim();
                String disponibles = edtDisponibles.getText().toString().trim();
                String precio = edtPrecio.getText().toString().trim();
                String urlImage = edtUrlImage.getText().toString().trim();


                if ((nombre.length() == 0) || (disponibles.length() == 0 || (precio.length() == 0)))
                {
                    Toast.makeText(TweetActivity.this,
                            "Necesitas ingresar un nombre, disponibles y precio.",
                            Toast.LENGTH_SHORT).show();
                    return;
                }

                Intent intent = getIntent();
                String token = intent.getStringExtra("Token");


                Toast.makeText(TweetActivity.this, nombre + " , " +  disponibles + " " + precio + " " + token,
                        Toast.LENGTH_LONG).show();

                String[] params = {nombre, disponibles, token, urlImage};
                Toast.makeText(TweetActivity.this, "Nombre: " + nombre + " disponibles: " + disponibles + " precio: " + precio, Toast.LENGTH_LONG).show();

                AsyncTask<String, Void, MessagesCodeMessage> execute =
                        new tweetSyncTask(TweetActivity.this).execute(params);
                String Message = new String();



                /*LoginTask(LoginActivity.this).execute(params);*/
                try {
                    Message = execute.get().getMessage();
                    //Toast.makeText(LoginActivity.this,"Token: "+execute.get().getToken(),Toast.LENGTH_SHORT).show();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (ExecutionException e){
                    e.printStackTrace();
                }
                finally
                {

                    if(Message != null) {

                        Toast.makeText(TweetActivity.this," Message: "+ Message,Toast.LENGTH_SHORT).show();

                        //Intent myIntent = new Intent(TweetActivity.this, TweetActivity.class);

                        //myIntent.putExtra("Message: ", Message);
                        //startActivity(intent);
                    }

                }
            }
        });
    }
}
