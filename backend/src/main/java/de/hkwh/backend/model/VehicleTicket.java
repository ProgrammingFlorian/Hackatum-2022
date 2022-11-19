package de.hkwh.backend.model;

import com.sun.istack.NotNull;
import lombok.*;
import java.sql.Timestamp;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "vehicle_ticket")
public class VehicleTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long vt_id;

    @NotNull
    @Column(name = "v_id")
    private long v_id;

    @NotNull
    @Column(name = "h_id")
    private long h_id;

    @Column(name = "p_id")
    private long p_id;

    @NotNull
    @Column(name = "checkin_date")
    private Timestamp checkinTimestamp;

    @Column(name = "checkout_date")
    private Timestamp checkoutTimestamp;

    @NotNull
    @Column(name = "isActive")
    private int isActive;

    public VehicleTicket(long v_id, long h_id, Timestamp checkinTimestamp) {
        this.v_id = v_id;
        this.h_id = h_id;
        this.checkinTimestamp = checkinTimestamp;
        this.isActive = 1;
    }
}
