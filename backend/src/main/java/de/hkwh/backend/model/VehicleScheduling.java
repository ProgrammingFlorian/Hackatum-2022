package de.hkwh.backend.model;
import com.sun.istack.NotNull;
import lombok.*;
import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "vehicle_scheduling")
public class VehicleScheduling {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long vs_id;

    @NotNull
    @Column(name = "vt_id")
    private long vt_id;

    @NotNull
    @Column(name = "p_id")
    private long p_id;

    @Column(name = "queue_position")
    private int queuePosition;

    @Column(name = "charging_start")
    private Timestamp chargingStart;

    @Column(name = "charging_end")
    private Timestamp chargingEnd;

    @Column(name = "battery_level_start")
    private int batteryLevelStart;
}
