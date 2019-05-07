package il.ac.bgu.bp.cotextualBlockly.context.schema;

import javax.persistence.*;

@Entity

public class Schedule extends BasicEntity {
    @Column
    public final int id;
    @Column
    public final int start_hour;
    @Column
    public final int end_hour;
    @ManyToOne
    public final Lab lab;

    protected Schedule() {
        super();
        id = 0;
        start_hour =0;
        end_hour=0;
        lab = new Lab();
    }

    public Schedule(int id, int start_hour, int end_hour, Lab lab) {
        this.id = id;
        this.start_hour = start_hour;
        this.end_hour = end_hour;
        this.lab = lab;
    }


}
