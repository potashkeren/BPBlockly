package il.ac.bgu.bp.cotextualBlockly.context.schema;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Range {

    @Column(name = "lower")
    public final Double lower;

    @Column(name = "upper")
    public final Double upper;

    public Range(Double lower, Double upper) {
        this.lower = lower;
        this.upper = upper;
    }

    public Range() {
        this.lower = 0.0;
        this.upper = 0.0;
    }
}
