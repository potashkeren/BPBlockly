package il.ac.bgu.bp.cotextualBlockly.context.schema;

import il.ac.bgu.cs.bp.bpjs.model.BProgram;
import org.hibernate.annotations.TypeDef;
import com.vladmihalcea.hibernate.type.range.PostgreSQLRangeType;
import javax.persistence.*;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "Sensor", query = "SELECT s FROM Sensor s"),
        @NamedQuery(name = "UpdateLevel", query = "Update Sensor s set s.level =:level where s=:sensor"),
        @NamedQuery(name = "UpdateLevelById", query = "Update Sensor s set s.level =:level where s.id=:id"),
})


@Table(name = "Sensor")
public class Sensor extends BasicEntity {

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name="lower", column=@Column(name="lowLevelLower")),
            @AttributeOverride(name="upper", column=@Column(name="lowLevelUpper"))
    })
    public final Range lowLevel;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name="lower", column=@Column(name="mediumLevelLower")),
            @AttributeOverride(name="upper", column=@Column(name="mediumLevelUpper"))
    })
    public final Range mediumLevel;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name="lower", column=@Column(name="highLevelLower")),
            @AttributeOverride(name="upper", column=@Column(name="highLevelUpper"))
    })
    public final Range highLevel;

    @Column(name = "currentLevel")
    public Double level;



    public Sensor(String name, double lowLower, double lowUpper, double mediumLower, double mediumUpper, double higeLower, double higeUpper) {
        super(name);
        this.lowLevel = new Range(lowLower,lowUpper);
        this.mediumLevel = new Range(mediumLower,mediumUpper);
        this.highLevel = new Range(higeLower, higeUpper);
        this.level = 0.0;

    }

    public Sensor() {
        this.lowLevel = new Range(0.0,0.0);
        this.mediumLevel = new Range(0.0,0.0);
        this.highLevel = new Range(0.0, 0.0);
        this.level = 0.0;

    }

    public Sensor(String name) {
        super(name);
        this.lowLevel = new Range(0.0,0.0);
        this.mediumLevel = new Range(0.0,0.0);
        this.highLevel = new Range(0.0, 0.0);
        this.level = 0.0;

    }


    public void sense(BProgram bprog, Object value) {
        //bprog.enqueueExternalEvent("sensed", /*{"id": this.getID(), "value": value} */);
    }

}
