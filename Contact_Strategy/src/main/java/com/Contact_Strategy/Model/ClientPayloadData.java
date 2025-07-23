package com.Contact_Strategy.Model;

//import jakarta.persistence.Entity;
//import jakarta.persistence.Id;

//@Entity
public class ClientPayloadData {

//    @Id
    int customerId;
    String firstName;
    String middleName;
    String orderDetails;
    String clientStrategyId;
    int phoneNumber1;
    int phoneNumber2;
    String emailId;

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(String orderDetails) {
        this.orderDetails = orderDetails;
    }

    public String getClientStrategyId() {
        return clientStrategyId;
    }

    public void setClientStrategyId(String clientStrategyId) {
        this.clientStrategyId = clientStrategyId;
    }

    public int getPhoneNumber1() {
        return phoneNumber1;
    }

    public void setPhoneNumber1(int phoneNumber1) {
        this.phoneNumber1 = phoneNumber1;
    }

    public int getPhoneNumber2() {
        return phoneNumber2;
    }

    public void setPhoneNumber2(int phoneNumber2) {
        this.phoneNumber2 = phoneNumber2;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    @Override
    public String toString() {
        return "ClientPayloadData{" +
                "customerId=" + customerId +
                ", firstName='" + firstName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", orderDetails='" + orderDetails + '\'' +
                ", clientStrategyId='" + clientStrategyId + '\'' +
                ", phoneNumber1=" + phoneNumber1 +
                ", phoneNumber2=" + phoneNumber2 +
                ", emailId='" + emailId + '\'' +
                '}';
    }
}
