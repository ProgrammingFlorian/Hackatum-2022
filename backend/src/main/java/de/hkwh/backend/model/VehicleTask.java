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

    public static String MOVE_VEHICLE_KEY = "move_vehicle";
    public static String CLEAN_VEHICLE_KEY = "clean_vehicle";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long vta_id;

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
    private int fulfilled;

    public VehicleTask(long vt_id, String taskName, Timestamp dateTime, long from_p_id, long to_p_id, boolean fulfilled) {
        this.vt_id = vt_id;
        this.taskName = taskName;
        this.dateTime = dateTime;
        this.from_p_id = from_p_id;
        this.to_p_id = to_p_id;
        this.fulfilled = fulfilled?1:0;
    }
}
