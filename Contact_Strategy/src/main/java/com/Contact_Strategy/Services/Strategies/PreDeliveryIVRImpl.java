package com.Contact_Strategy.Services.Strategies;

import com.Contact_Strategy.Model.ContactSequence;
import com.Contact_Strategy.Services.Strategies.ContactSequenceExecutorWidget.SequenceExecutor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PreDeliveryIVRImpl implements PreDeliveryIVR{
    @Autowired
    SequenceExecutor sequenceExecutor;
    public String contactSequence() throws Exception {
        String voicePayload="";
        String emailPayload="";
        String smsPayload ="";
        List<ContactSequence> contactSequence = List.of(
                new ContactSequence("ivr", voicePayload, 5),
                new ContactSequence("email", emailPayload, 5),
                new ContactSequence("sms", smsPayload, 5)
        );
        return sequenceExecutor.executeSequence(contactSequence);
    }
}
