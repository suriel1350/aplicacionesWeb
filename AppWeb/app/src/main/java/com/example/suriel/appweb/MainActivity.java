package com.example.suriel.appweb;

import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.usuarios_api.model.MessagesTokenMessage;

import java.util.concurrent.ExecutionException;
import com.example.suriel.SyncTaskClass.loginSyncTask;


public class MainActivity extends AppCompatActivity {

    Button btnLogin;
    EditText edtEmail;
    EditText edtPassword;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnLogin = (Button) findViewById(R.id.login);
        edtEmail = (EditText) findViewById(R.id.edtEmail);
        edtPassword = (EditText) findViewById(R.id.edtPassword);

        btnLogin.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {

                String email =  edtEmail.getText().toString().trim();
                String password = edtPassword.getText().toString().trim();

                if ((email.length() == 0) || (password.length() == 0))
                {
                    Toast.makeText(MainActivity.this,
                            "Necesitas ingresar tu correo y contraseña para iniciar sesión.",
                            Toast.LENGTH_SHORT).show();
                    return;
                }

                String[] params = {email, password};
                Toast.makeText(MainActivity.this, "Email: " + email + " Password: " + password, Toast.LENGTH_LONG).show();
                AsyncTask<String, Void, MessagesTokenMessage> execute =
                        new loginSyncTask(MainActivity.this).execute(params);
                String Token = new String();



                /*LoginTask(LoginActivity.this).execute(params);*/
                try {
                    Token = execute.get().getToken();
                    //Toast.makeText(LoginActivity.this,"Token: "+execute.get().getToken(),Toast.LENGTH_SHORT).show();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (ExecutionException e){
                    e.printStackTrace();
                }
                finally
                {
                    if(Token != null)
                    {
                        Intent intent = new Intent(MainActivity.this, TweetActivity.class);
                        intent.putExtra("Token",Token);
                        startActivity(intent);
                    }

                }
            }
        });
    }
}
