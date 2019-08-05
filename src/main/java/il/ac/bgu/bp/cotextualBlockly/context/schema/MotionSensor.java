package il.ac.bgu.bp.cotextualBlockly.context.schema;

import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "MotionSensors", query = "SELECT s FROM MotionSensor s"),
        @NamedQuery(name = "NoMotion", query = "SELECT s FROM MotionSensor s where s.level = 0.0"),
        @NamedQuery(name = "Motion", query = "SELECT s FROM MotionSensor s where s.level = 1.0 "),
        @NamedQuery(name = "StopMotion", query = "Update MotionSensor s set s.level=0.0 where s=:sensor"),
        @NamedQuery(name = "BeginMotion", query = "Update MotionSensor s set s.level=1.0 where s=:sensor"),
        @NamedQuery(name = "UpdateMotion", query = "Update MotionSensor s set s.level =:motionDetected where s=:sensor"),
        @NamedQuery(name = "UpdateMotionById", query = "Update MotionSensor s set s.level =:motionDetected where s.id=:id"),
})

public class MotionSensor extends Sensor {

    public MotionSensor(){
        super();
    }

    // 0.0 - no motion, 1.0 - motion
    public MotionSensor(String name){
        super("motionSensor_"+name);
        this.level = 0.0;

    }
}
