package il.ac.bgu.bp.cotextualBlockly.context.schema;

import il.ac.bgu.cs.bp.bpjs.model.BProgram;

import javax.persistence.*;

@Entity
@NamedQueries(value = {
})
public class Sensor extends BasicEntity {
    @Column
    public final int low;
    @Column
    public final int medium;
    @Column
    public final int high;


    // create event if event filed - subscribe / publish subscribe

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

    public void sense(BProgram bprog, Object value) {
        //bprog.enqueueExternalEvent("sensed", /*{"id": this.getID(), "value": value} */);
    }
}
