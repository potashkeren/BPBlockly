package il.ac.bgu.bp.cotextualBlockly.context.schema;

import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "MotionSensors", query = "SELECT s FROM MotionSensor s"),
        @NamedQuery(name = "UpdateMotion", query = "Update MotionSensor s set s.level =:level where s=:sensor"),
})

@Table()
public class MotionSensor extends Sensor {
}
