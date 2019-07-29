package il.ac.bgu.bp.cotextualBlockly.context.schema;

import il.ac.bgu.cs.bp.bpjs.model.BProgram;
import org.hibernate.annotations.TypeDef;
import com.vladmihalcea.hibernate.type.range.PostgreSQLRangeType;
import com.vladmihalcea.hibernate.type.range.Range;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "Sensor", query = "SELECT s FROM Sensor s"),
        @NamedQuery(name = "LowLevelSensors", query = "SELECT s FROM Sensor s WHERE level between lowLevelLower and lowLevelUpper " ),
        @NamedQuery(name = "MediumLevelSensors", query = "SELECT s FROM Sensor s WHERE level between  mediumLevelLower and mediumLevelUpper"),
        @NamedQuery(name = "HighLevelSensors", query = "SELECT s FROM Sensor s WHERE level between highLevelLower and highLevelUpper"),
        @NamedQuery(name = "UpdateLevel", query = "Update Sensor s set s.level =:level where s=:sensor"),
})
@Table(name = "Sensor")
@TypeDef(
        typeClass = PostgreSQLRangeType.class,
        defaultForType = Range.class
)
public class Sensor extends BasicEntity {

/*    @Column(name = "lowLevel")
    public final Range<BigDecimal> lowLevelRange;

    @Column(name = "mediumLevel")
    public final Range<BigDecimal> mediumLevelRange;

    @Column(name = "highLevel")
    public final Range<BigDecimal> highLevelRange;*/

    @Column(name = "lowLevelLower")
    public final double lowLevelLower;

    @Column(name = "lowLevelUpper")
    public final double lowLevelUpper;

    @Column(name = "mediumLevelLower")
    public final double mediumLevelLower;

    @Column(name = "mediumLevelUpper")
    public final double mediumLevelUpper;

    @Column(name = "highLevelLower")
    public final double highLevelLower;

    @Column(name = "highLevelUpper")
    public final double highLevelUpper;

    @Column(name = "currentLevel")
    public final Double level;




    public Sensor(String name, double lowLower, double lowUpper, double mediumLower, double mediumUpper, double higeLower, double higeUpper) {
        super("sensor_"+name);
        this.lowLevelLower = lowLower;
        this.lowLevelUpper = lowUpper;
        this.mediumLevelLower = mediumLower;
        this.mediumLevelUpper = mediumUpper;
        this.highLevelLower = higeLower;
        this.highLevelUpper = higeUpper;
        this.level = 0.0;
    }

    public Sensor() {
        this.lowLevelLower = 0.0;
        this.lowLevelUpper = 0.0;
        this.mediumLevelLower = 0.0;
        this.mediumLevelUpper = 0.0;
        this.highLevelLower = 0.0;
        this.highLevelUpper = 0.0;
        level = 0.0;

    }


    public void sense(BProgram bprog, Object value) {
        //bprog.enqueueExternalEvent("sensed", /*{"id": this.getID(), "value": value} */);
    }

}
