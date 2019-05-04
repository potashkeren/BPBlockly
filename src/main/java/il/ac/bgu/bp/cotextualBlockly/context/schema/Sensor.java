package il.ac.bgu.bp.cotextualBlockly.context.schema;

import javax.persistence.*;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "Triple", query = "SELECT t FROM Triple t")
})
public class Sensor extends BasicEntity {
    @Column
    public final int low;
    @Column
    public final int medium;
    @Column
    public final int high;

    public Sensor(int low) {
        this.low = low;
        medium = 0;
        high =0;
    }

    public Sensor() {
        low = 0;
        medium = 0;
        high =0;
    }
}
