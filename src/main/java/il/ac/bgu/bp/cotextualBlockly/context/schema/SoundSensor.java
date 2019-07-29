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

@Table()
public class SoundSensor extends Sensor {
}
