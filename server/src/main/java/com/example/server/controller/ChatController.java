package com.example.server.controller;

import com.example.server.dto.ChatHistoryDto;
import com.example.server.model.ChatHistory;
import com.example.server.model.SenderType;
import com.example.server.model.Trip;
import com.example.server.repository.ChatHistoryRepository;
import com.example.server.repository.TripRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/trips/{tripId}/chats")
@CrossOrigin(origins = "*")
public class ChatController {

    private final ChatHistoryRepository chatHistoryRepository;
    private final TripRepository tripRepository;

    public ChatController(ChatHistoryRepository chatHistoryRepository, TripRepository tripRepository) {
        this.chatHistoryRepository = chatHistoryRepository;
        this.tripRepository = tripRepository;
    }

    @PostMapping
    public ResponseEntity<?> saveChatMessage(@PathVariable Long tripId, @RequestBody ChatHistoryDto dto) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found with id: " + tripId));

        ChatHistory chat = new ChatHistory();
        chat.setTrip(trip);
        chat.setSender(dto.getSender() != null ? dto.getSender() : SenderType.USER);
        chat.setMessage(dto.getMessage());

        ChatHistory saved = chatHistoryRepository.save(chat);
        return ResponseEntity.ok(mapToDto(saved));
    }

    @GetMapping
    public List<ChatHistoryDto> getChatHistory(@PathVariable Long tripId) {
        return chatHistoryRepository.findByTripTripIdOrderByCreatedAtAsc(tripId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private ChatHistoryDto mapToDto(ChatHistory chat) {
        return new ChatHistoryDto(
                chat.getChatId(),
                chat.getTrip().getTripId(),
                chat.getSender(),
                chat.getMessage(),
                chat.getCreatedAt()
        );
    }
}
