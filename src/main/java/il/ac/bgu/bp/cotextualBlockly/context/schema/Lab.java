package il.ac.bgu.bp.cotextualBlockly.context.schema;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "Lab", query = "SELECT l FROM Lab l"),
        @NamedQuery(name = "OpenLab", query = "SELECT l FROM Lab l WHERE l.isLocked = false "),
        @NamedQuery(name = "LockedLab", query = "SELECT l FROM Lab l WHERE l.isLocked = true "),
        @NamedQuery(name = "NonEmptyLab", query = "SELECT l FROM Lab l WHERE l.occupancy > 0"),
        @NamedQuery(name = "EmptyLab", query = "SELECT l FROM Lab l WHERE l.occupancy = 0"),
        @NamedQuery(name = "FreeLearningOpenLab", query = "SELECT l FROM Lab l WHERE l.freeLearning = true AND l.isLocked = false"),
        @NamedQuery(name = "FreeLearningEmptyLab", query = "SELECT l FROM Lab l WHERE (l.occupancy = 0 AND l.freeLearning = true)"),
        @NamedQuery(name = "LabNeedToBeEvacuated", query = "SELECT l FROM Lab l WHERE  l.isEvacuated = true "),
        @NamedQuery(name = "IsOccupied", query = "SELECT l FROM Lab l WHERE (l.capacity - l.occupancy) < 5"),
        @NamedQuery(name = "NotOccupied", query = "SELECT l FROM Lab l WHERE l.occupancy < l.capacity/2 "),
        @NamedQuery(name = "OpenTheLab", query = "Update Lab L set L.isLocked=false where L=:lab"),
        @NamedQuery(name = "CloseTheLab", query = "Update Lab L set L.isLocked=true where L=:lab"),
        @NamedQuery(name = "EvacuateTheLab", query = "Update Lab L set L.isEvacuated=true where L=:lab"),
        @NamedQuery(name = "NotEvacuateTheLab", query = "Update Lab L set L.isEvacuated=false where L=:lab"),
        @NamedQuery(name = "FreeLearningLab", query = "Update Lab L set L.freeLearning=true where L=:lab"),
        @NamedQuery(name = "NotFreeLearningLab", query = "Update Lab L set L.freeLearning=false where L=:lab")
})

public class Lab extends BasicEntity {
    @Column
    public final int capacity;
    @Column
    public final int occupancy;
    @Column
    public final boolean isLocked = true;
    @Column
    public final boolean isEvacuated = false;
    @Column
    public final boolean freeLearning = false;

    protected Lab() {
        super();
        capacity =0;
        occupancy=0;
    }

    public Lab(String name ,int capacity, int occupancy) {
        super("lab_"+name);
        this.capacity = capacity;
        this.occupancy = occupancy;

    }

    @Override
    public String toString() {
        return getId();
    }

    public int getOccupancy() {
        return occupancy;
    }
}


