package de.hkwh.backend.model;

import com.sun.istack.NotNull;
import lombok.*;
import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "hub")
public class Hub {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long h_id;

    @NotNull
    @Column(name = "hub_name")
    private String hubName;

    @NotNull
    @Column(name = "address")
    private String address;

    @Column(name = "manager")
    private String manager;

    public Hub(String hubName, String address, String manager) {
        this.hubName = hubName;
        this.address = address;
        this.manager = manager;
    }
}
