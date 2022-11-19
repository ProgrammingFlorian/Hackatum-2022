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
@Table(name = "bookedVehicle")
public class BookedVehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long b_id;

    @NotNull
    @Column(name = "v_id")
    private long v_id;

    @NotNull
    @Column(name = "h_id")
    private long h_id;

    @NotNull
    @Column(name = "checkin_date")
    private Timestamp checkinTimestamp;

    @Column(name = "checkout_date")
    private Timestamp checkoutTimestamp;

    @NotNull
    @Column(name = "isActive")
    private boolean isActive;

    @Column(name = "stellplatz")
    private String stellplatz;

    @Column(name = "priority")
    private int priority;

    public BookedVehicle(long v_id, long h_id, Timestamp checkinTimestamp) {
        this.v_id = v_id;
        this.h_id = h_id;
        this.checkinTimestamp = checkinTimestamp;
        this.isActive = true;
    }
}
