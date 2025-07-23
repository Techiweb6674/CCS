package com.Contact_Strategy.Services.Strategies.ContactSequenceExecutorWidget;

import com.Contact_Strategy.Model.ContactSequence;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class SequenceExecutor {

    @Autowired
    CommunicationService communicationService;

    public String executeSequence(List<ContactSequence> sequence) throws Exception {
        for(ContactSequence seq: sequence){
            switch (seq.getChannel()){
                case "ivr" -> {
                    return communicationService.callIVR(seq.getPayload());
                }
                case "sms" -> {
                    return communicationService.callSms(seq.getPayload());
                }
                case "email" -> {
                    return communicationService.callEmail(seq.getPayload());
                }
            }
            try{
                Thread.sleep(seq.getWaitTime() * 1000L);
            }catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
        return "";
    }
}
