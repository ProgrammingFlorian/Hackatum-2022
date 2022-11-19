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
@Table(name = "vehicle_task")
public class VehicleTask {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long vta_id;

    @NotNull
    @Column(name = "vt_id")
    private long vt_id;

    @NotNull
    @Column(name = "task_name")
    private String taskName;

    @Column(name = "date_time")
    private Timestamp dateTime;

    @Column(name = "from_p_id")
    private long from_p_id;

    @Column(name = "to_p_id")
    private long to_p_id;

    @Column(name = "fulfilled")
    private boolean fulfilled;

}
