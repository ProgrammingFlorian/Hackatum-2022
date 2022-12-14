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

    @Column(name = "next_customer")
    private String nextCustomer;
    @NotNull
    @Column(name = "isActive")
    private int isActive;

    public VehicleTicket(long v_id, long h_id, Timestamp checkinTimestamp, String next) {
        this.v_id = v_id;
        this.h_id = h_id;
        this.checkinTimestamp = checkinTimestamp;
        this.isActive = 1;
        this.nextCustomer = next;
    }

    public VehicleTicket(long v_id, long h_id, long p_id, Timestamp checkinTimestamp, Timestamp checkoutTimestamp, String nextCustomer, boolean isActive) {
        this.v_id = v_id;
        this.h_id = h_id;
        this.p_id = p_id;
        this.checkinTimestamp = checkinTimestamp;
        this.checkoutTimestamp = checkoutTimestamp;
        this.nextCustomer = nextCustomer;
        this.isActive = isActive?1:0;
    }
}
