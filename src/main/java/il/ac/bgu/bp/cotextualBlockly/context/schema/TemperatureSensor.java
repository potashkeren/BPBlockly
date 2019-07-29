package il.ac.bgu.bp.cotextualBlockly.context.schema;

import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "TemperatureSensors", query = "SELECT s FROM TemperatureSensor s"),
        @NamedQuery(name = "UpdateTemperature", query = "Update TemperatureSensor s set s.level =:level where s=:sensor"),
})

@Table()
public class TemperatureSensor extends Sensor {
}
