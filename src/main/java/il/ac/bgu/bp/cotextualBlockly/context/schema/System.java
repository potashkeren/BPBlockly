package il.ac.bgu.bp.cotextualBlockly.context.schema;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import java.time.LocalDateTime;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "Time", query = "SELECT s FROM System s"),
        @NamedQuery(name = "SpecificTime", query = "SELECT s FROM System s where s.time=:time"),
        @NamedQuery(name = "UpdateTime", query = "Update System s set s.time=:time"),
})
public class System extends BasicEntity {
    @Column
    public LocalDateTime time = LocalDateTime.now();

    public System() {
        super("System");
    }

    @Override
    public String toString() {
        return time.toString();
    }
}
