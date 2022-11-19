package de.hkwh.backend.model;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "model")
public class Model {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long m_id;

    @NotNull
    @Column(name = "vehicle_class")
    private String vehicleClass;

    @Column(name = "brand")
    private String brand;

    @Column(name = "model")
    private String model;

    @NotNull
    @Column(name = "charging_speed")
    private int chargingSpeed;

    public Model(String vehicleClass, String brand, String model, int chargingSpeed) {
        this.vehicleClass = vehicleClass;
        this.brand = brand;
        this.model = model;
        this.chargingSpeed = chargingSpeed;
    }
}