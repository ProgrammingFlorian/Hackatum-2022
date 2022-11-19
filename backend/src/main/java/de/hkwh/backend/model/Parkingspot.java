package de.hkwh.backend.model;

import com.sun.istack.NotNull;
import lombok.*;
import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "parking_spot")
public class Parkingspot {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long p_id;

    @Column(name = "h_id")
    private long h_id;

    @NotNull
    @Column(name = "spot_name")
    private String spotName;

    @Column(name = "hasWallbox")
    private int hasWallbox;

    @Column(name = "chargingSpeed")
    private int chargingSpeed;

    @Column(name = "isFree")
    private int isFree;

    public Parkingspot(long h_id, String spotName, boolean hasWallbox, boolean isFree) {
        this.h_id = h_id;
        this.spotName = spotName;
        this.hasWallbox = hasWallbox ? 1:0;
        this.isFree = isFree ? 1:0;
    }
}
