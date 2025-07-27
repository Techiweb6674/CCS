package com.Contact_Strategy.Controller;

import com.Contact_Strategy.Model.ClientPayloadData;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactStrategyController {




    @GetMapping("/")
    public String Home(){
        return "Hello Sandeep";
    }
    @PostMapping("/clientPayloadData")
    public ClientPayloadData getClientData(@RequestBody ClientPayloadData data){
        System.out.println(data);
        return data;
    }
}
