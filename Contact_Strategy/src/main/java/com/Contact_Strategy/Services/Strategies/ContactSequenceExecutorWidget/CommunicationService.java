package com.Contact_Strategy.Services.Strategies.ContactSequenceExecutorWidget;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class CommunicationService {
    private final HttpClient client = HttpClient.newHttpClient();
    public String callIVR(String payload) throws Exception {
      return sendPost("/voice", payload);
    }
    public String callSms(String payload) throws Exception {
       return sendPost("/sms", payload);
    }
    public String callEmail(String payload) throws Exception {
       return sendPost("/email", payload);
    }
    private String sendPost(String url, String payload) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(payload))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("Response Body: " + response.body());
        return response.body();
    }
}
