package com.icovest.backend.userfeature.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Embeddable
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Usdt {
    private static final String CURRENCY = "USDT";

    private BigDecimal balance;

}
