package com.icovest.backend.userfeature.entity.token;

import com.icovest.backend.userfeature.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

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
    private Date createdDate;
    @ManyToOne
    private User user;

    @CreationTimestamp
    private int activeHours = 24;
    @Builder.Default
    private String token = UUID.randomUUID().toString();



    public boolean isExpired() {
        return createdDate.getTime() + (long) activeHours * 60 * 60 * 1000 < System.currentTimeMillis();
    }
}
