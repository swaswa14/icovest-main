package com.icovest.backend.userfeature.entity.token;

import com.icovest.backend.userfeature.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserToken {
    @Id
    @SequenceGenerator(
            name = "token_sequence",
            sequenceName = "token_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "token_sequence"
    )
    private Long id;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Instant createdDate;
    @ManyToOne
    private User user;


    @Builder.Default
    private String token = UUID.randomUUID().toString() + UUID.randomUUID().toString();

    @Temporal(TemporalType.TIMESTAMP)
    private Date expiryDate;

    @Enumerated(EnumType.STRING)
    private TokenType tokenType;

//    public boolean isExpired() {
//        return createdDate.getTime() + (long) activeHours * 60 * 60 * 1000 < System.currentTimeMillis();
//    }
}
