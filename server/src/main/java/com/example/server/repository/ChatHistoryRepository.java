package com.example.server.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.server.model.ChatHistory;

public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Long> {
    List<ChatHistory> findByTripTripIdOrderByCreatedAtAsc(Long tripId);
}
