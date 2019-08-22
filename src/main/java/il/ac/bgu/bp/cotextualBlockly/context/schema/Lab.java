package il.ac.bgu.bp.cotextualBlockly.context.schema;

import javax.persistence.*;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "Lab", query = "SELECT l FROM Lab l"),
        @NamedQuery(name = "SpecificLab", query = "SELECT l FROM Lab l where l=:lab"),
        @NamedQuery(name = "OpenLab", query = "SELECT l FROM Lab l WHERE l.isLocked = false "),
        @NamedQuery(name = "LockedLab", query = "SELECT l FROM Lab l WHERE l.isLocked = true "),
        @NamedQuery(name = "NonEmptyLab", query = "SELECT l FROM Lab l WHERE l.realOccupancy > 0"),
        @NamedQuery(name = "EmptyLab", query = "SELECT l FROM Lab l WHERE l.realOccupancy = 0"),
        @NamedQuery(name = "FreeLearningOpenLab", query = "SELECT l FROM Lab l WHERE l.freeLearning = true AND l.isLocked = false"),
        @NamedQuery(name = "FreeLearningEmptyLab", query = "SELECT l FROM Lab l WHERE (l.realOccupancy = 0 AND l.freeLearning = true)"),
        @NamedQuery(name = "LabNeedToBeEvacuated", query = "SELECT l FROM Lab l WHERE  l.isEvacuated = true "),
        @NamedQuery(name = "FullCapacity", query = "SELECT l FROM Lab l WHERE (l.capacity - l.realOccupancy) = 0"),
        @NamedQuery(name = "LowCapacity", query = "SELECT l FROM Lab l WHERE l.occupancy < l.capacity/2 "),
        @NamedQuery(name = "OpenTheLab", query = "Update Lab L set L.isLocked=false where L=:lab"),
        @NamedQuery(name = "CloseTheLab", query = "Update Lab L set L.isLocked=true, L.freeLearning=false where L=:lab"),
        @NamedQuery(name = "EvacuateTheLab", query = "Update Lab L set L.isEvacuated=true where L=:lab"),
        @NamedQuery(name = "NotEvacuateTheLab", query = "Update Lab L set L.isEvacuated=false where L=:lab"),
        @NamedQuery(name = "FreeLearningLab", query = "Update Lab L set L.freeLearning=true where L=:lab"),
        @NamedQuery(name = "NotFreeLearningLab", query = "Update Lab L set L.freeLearning=false where L=:lab"),
        @NamedQuery(name = "UpdateOccupancy", query = "Update Lab L set L.occupancy = L.occupancy+:amount where L=:lab"),
        @NamedQuery(name = "UpdateRealOccupancy", query = "Update Lab L set L.realOccupancy = L.realOccupancy+:amount where L=:lab")
       // @NamedQuery(name = "NoAvailablePlaces", query = "SELECT case when((SUM(capacity-realOccupancy)) < 20) then true else false end FROM Lab WHERE isLocked = FALSE AND freeLearning=TRUE")

})

public class Lab extends BasicEntity {
    @Column
    public final Integer capacity;
    @Column
    public final Integer occupancy;
    @Column
    public final Integer realOccupancy;
    @Column
    public final boolean isLocked = true;
    @Column
    public final boolean isEvacuated = false;
    @Column
    public final boolean freeLearning = false;

    @OneToOne(fetch=FetchType.LAZY)
    public final DoorSensor doorSensor;
    @OneToOne(fetch=FetchType.LAZY)
    public final MotionSensor motionSensor;
    @OneToOne(fetch=FetchType.LAZY)
    public final TemperatureSensor temperatureSensor;
    @OneToOne(fetch=FetchType.LAZY)
    public final SoundSensor soundSensor;
    @OneToOne(fetch=FetchType.LAZY)
    public final VolumeSensor volumeSensor;

/*  @OneToOne(fetch=FetchType.LAZY)
  @JoinColumn(name="ADDRESS_ID")
@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lab_id", nullable = false)*/


    protected Lab() {
        this("",0,0, 0, null, null, null, null, null);
    }

    public Lab(String name, Integer capacity, Integer occupancy, Integer realOccupancy, DoorSensor doorSensor,
               MotionSensor motionSensor, TemperatureSensor temperatureSensor, SoundSensor soundSensor, VolumeSensor volumeSensor) {
        super("lab_"+name);
        this.capacity = capacity;
        this.occupancy = occupancy;
        this.realOccupancy = realOccupancy;
        this.doorSensor = doorSensor;
        this.motionSensor = motionSensor;
        this.temperatureSensor = temperatureSensor;
        this.soundSensor = soundSensor;
        this.volumeSensor = volumeSensor;
    }

    @Override
    public String toString() {
        return getId();
    }

    public Integer getOccupancy() {
        return occupancy;
    }
}


