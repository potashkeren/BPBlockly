package il.ac.bgu.bp.cotextualBlockly.context.schema;

import javax.persistence.*;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "DoorSensors", query = "SELECT s FROM DoorSensor s"),
        @NamedQuery(name = "DoorOpen", query = "SELECT s FROM DoorSensor s where s.level = 0.0"),
        @NamedQuery(name = "DoorClose", query = "SELECT s FROM DoorSensor s where s.level = 1.0 "),
        @NamedQuery(name = "OpenTheDoor", query = "Update DoorSensor s set s.level=0.0 where s=:sensor"),
        @NamedQuery(name = "CloseTheDoor", query = "Update DoorSensor s set s.level=1.0 where s=:sensor"),
        @NamedQuery(name = "UpdateDoor", query = "Update DoorSensor s set s.level=:isClose where s=:sensor"),
        @NamedQuery(name = "UpdateDoorById", query = "Update DoorSensor s set s.level=:isClose where s.id=:id"),
})

@Table()
public class DoorSensor extends Sensor {

    public DoorSensor(){
        super();
    }

    //0.0 - door open,  1.0 - door close
    public DoorSensor(String name){
        super("doorSensor_"+name);
        this.level = 1.0;

    }


}
