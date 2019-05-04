package il.ac.bgu.bp.cotextualBlockly.context.schema;

import javax.persistence.*;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "Lab", query = "SELECT l FROM Lab l"),
        @NamedQuery(name = "OpenLab", query = "SELECT l FROM Lab l WHERE l.isLocked = false "),
        @NamedQuery(name = "LockedLab", query = "SELECT l FROM Lab l WHERE l.isLocked = true "),
        @NamedQuery(name = "NoPracticeLab", query = "SELECT l FROM Lab l WHERE l.practice = 'noPractice' "),
        @NamedQuery(name = "PracticeLab", query = "SELECT l FROM Lab l WHERE l.practice = 'practice' "),
        @NamedQuery(name = "BeforePracticeLab", query = "SELECT l FROM Lab l WHERE l.practice = 'beforePractice'"),
        @NamedQuery(name = "AfterPracticeLab", query = "SELECT l FROM Lab l WHERE l.practice = 'afterPractice'"),
        @NamedQuery(name = "NonEmptyLab", query = "SELECT l FROM Lab l WHERE l.occupancy > 0"),
        @NamedQuery(name = "EmptyLab", query = "SELECT l FROM Lab l WHERE l.occupancy = 0"),
        @NamedQuery(name = "OpenEmptyLab", query = "SELECT l FROM Lab l WHERE (l.occupancy = 0 AND l.isLocked = false)"),
        @NamedQuery(name = "BeforePracticeOpenLab", query = "SELECT l FROM Lab l WHERE (l.practice = 'beforePractice' AND l.isLocked = false)"),
        @NamedQuery(name = "BeforePracticeLockedLab", query = "SELECT l FROM Lab l WHERE (l.practice = 'beforePractice' AND l.isLocked = true)"),
        @NamedQuery(name = "UpdateLab", query = "Update Lab L set L.isLocked=:val where L=:lab"),
        @NamedQuery(name = "UpdatePractice", query = "Update Lab L set L.practice=:val where L=:lab")
})

public class Lab extends BasicEntity {
    @Column
    public final int capacity;
    @Column
    public final int occupancy;
    @Column
    public final String name = "";
    @Column
    public final boolean isLocked = true;
    @Column
    public  final String practice = "noPractice";
    @OneToOne(cascade = CascadeType.MERGE)
    public final Sensor sensor;

    protected Lab() {
        super();
        capacity =0;
        occupancy=0;
        sensor = new Sensor();
    }

    public Lab(String name ,int capacity, int occupancy) {
        super("lab_"+name);
        this.capacity = capacity;
        this.occupancy = occupancy;
        this.sensor = new Sensor();
    }

    @Override
    public String toString() {
        return  "name:"+ name +", capacity:"+capacity+".";
    }
}


