package com.example.server.dto;

import com.example.server.model.SenderType;
import java.time.LocalDateTime;

public class ChatHistoryDto {

    private Long chatId;
    private Long tripId;
    private SenderType sender;
    private String message;
    private LocalDateTime createdAt;

    public ChatHistoryDto() {
    }

    public ChatHistoryDto(Long chatId, Long tripId, SenderType sender, String message, LocalDateTime createdAt) {
        this.chatId = chatId;
        this.tripId = tripId;
        this.sender = sender;
        this.message = message;
        this.createdAt = createdAt;
    }

    public Long getChatId() {
        return chatId;
    }

    public void setChatId(Long chatId) {
        this.chatId = chatId;
    }

    public Long getTripId() {
        return tripId;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }

    public SenderType getSender() {
        return sender;
    }

    public void setSender(SenderType sender) {
        this.sender = sender;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
