package de.hkwh.backend.model;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "vehicle")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long v_id;

    @NotNull
    @Column(name = "m_id")
    private long m_id;

    @NotNull
    @Column(name = "license_plate")
    private String licensePlate;

    @Column(name = "battery_level")
    private int batteryLevel;

    @Column(name = "color")
    private String color;


    public Vehicle(long m_id, String licensePlate) {
        this.m_id = m_id;
        this.licensePlate = licensePlate;
    }

    public Vehicle(long m_id, String licensePlate, int batteryLevel, String color) {
        this.m_id = m_id;
        this.licensePlate = licensePlate;
        this.batteryLevel = batteryLevel;
        this.color = color;
    }
}
