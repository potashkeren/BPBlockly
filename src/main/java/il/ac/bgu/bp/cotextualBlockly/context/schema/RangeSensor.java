package il.ac.bgu.bp.cotextualBlockly.context.schema;

import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "RangeSensor", query = "SELECT s FROM RangeSensor s"),
        @NamedQuery(name = "LowLevelSensors", query = "SELECT s FROM RangeSensor s WHERE level between lowLevel.lower and lowLevel.upper " ),
        @NamedQuery(name = "MediumLevelSensors", query = "SELECT s FROM RangeSensor s WHERE level between  mediumLevel.lower and mediumLevel.upper"),
        @NamedQuery(name = "HighLevelSensors", query = "SELECT s FROM RangeSensor s WHERE level between highLevel.lower and highLevel.upper"),
})

public class RangeSensor extends Sensor {

    public RangeSensor(){
        super();
    }

    public RangeSensor(String name, Double lowLower, Double lowUpper, Double mediumLower, Double mediumUpper, Double highLower, Double highUpper){
        super(name,lowLower,lowUpper,mediumLower,mediumUpper,highLower,highUpper);
    }
}
