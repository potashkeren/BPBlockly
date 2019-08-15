package il.ac.bgu.bp.cotextualBlockly.context.schema;

import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "SoundSensors", query = "SELECT s FROM SoundSensor s"),
        @NamedQuery(name = "UpdateSound", query = "Update SoundSensor s set s.level =:level where s=:sensor"),
})


public class SoundSensor extends RangeSensor {

    public SoundSensor(){
        super();
    }

    public SoundSensor(String name, Double lowLower, Double lowUpper, Double mediumLower, Double mediumUpper, Double highLower, Double highUpper){
        super("soundSensor_"+name,lowLower,lowUpper,mediumLower,mediumUpper,highLower,highUpper);
    }
}
