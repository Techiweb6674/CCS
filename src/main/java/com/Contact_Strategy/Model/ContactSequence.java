package com.Contact_Strategy.Model;

public class ContactSequence {
    String channel;
    String payload;
    int waitTime;

    public ContactSequence(String Channel, String payload, int i) {
       this.channel=Channel;
       this.payload=payload;
       this.waitTime=i;
    }
//
//    public ContactSequence(String email, String emailPayload, int i) {
//    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }

    public int getWaitTime() {
        return waitTime;
    }

    public void setWaitTime(int waitTime) {
        this.waitTime = waitTime;
    }
}
