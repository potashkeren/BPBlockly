package il.ac.bgu.bp.cotextualBlockly.context.schema;


import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "VolumeSensors", query = "SELECT s FROM VolumeSensor s"),
        @NamedQuery(name = "UpdateVolume", query = "Update VolumeSensor s set s.level =:level where s=:sensor"),
})

public class VolumeSensor extends RangeSensor  {

    public VolumeSensor(){
        super();
    }

    public VolumeSensor(String name, double lowLower, double lowUpper, double mediumLower, double mediumUpper, double highLower, double highUpper){
        super("volumeSensor_"+name,lowLower,lowUpper,mediumLower,mediumUpper,highLower,highUpper);
    }
}
