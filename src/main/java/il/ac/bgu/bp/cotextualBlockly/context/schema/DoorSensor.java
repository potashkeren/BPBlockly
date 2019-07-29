package il.ac.bgu.bp.cotextualBlockly.context.schema;

import javax.persistence.*;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "DoorSensors", query = "SELECT s FROM DoorSensor s"),
        @NamedQuery(name = "OpenTheDoor", query = "Update DoorSensor s set s.isLocked=false where s=:lab"),
        @NamedQuery(name = "CloseTheDoor", query = "Update DoorSensor s set s.isLocked=true where s=:lab"),
})

@Table()
public class DoorSensor extends Sensor {

    @Column
    public final boolean isLocked = true;


}
