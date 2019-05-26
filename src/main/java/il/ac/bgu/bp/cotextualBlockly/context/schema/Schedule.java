package il.ac.bgu.bp.cotextualBlockly.context.schema;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "Schedule", query = "SELECT s FROM Schedule s WHERE day=current_date"),
        @NamedQuery(name = "BeforePractice", query = "SELECT s FROM Schedule s WHERE CURRENT_TIMESTAMP >= DATE_ADD(start_date, INTERVAL -1 HOUR) AND  CURRENT_TIMESTAMP < start_date"),
        @NamedQuery(name = "LabInPractice", query = "SELECT l FROM Lab l WHERE l.practice = 'practice' "),
        @NamedQuery(name = "AfterPractice", query = "SELECT l FROM Lab l WHERE l.practice = 'afterPractice'"),
        @NamedQuery(name = "BeforePracticeFreeLearningLab", query = "SELECT s FROM Schedule s JOIN s.lab l WHERE s.start_hour >= CURRENT_TIME and  s.end_hour < CURRENT_TIME and l.isLocked = true"),
        @NamedQuery(name = "BeforePracticeLockedLab", query = "SELECT l FROM Lab l WHERE (l.practice = 'beforePractice' AND l.isLocked = true)")

})


public class Schedule extends BasicEntity {
    @Column
    public final String course;
    @Column
    public final Timestamp start_date;
    @Column
    public final Timestamp end_date;
    @Column
    public final Timestamp end_repeat;
    @Column
    public final RepeatTime repeat_time;
    @ManyToOne
    public final Lab lab;



    public Schedule(String id, String course, Timestamp start_date, Timestamp end_date, Timestamp end_repeat, RepeatTime repeat_weekly, Lab lab) {
        super(id);
        this.course = course;
        this.start_date = start_date;
        this.end_date = end_date;
        this.end_repeat = end_repeat;
        this.repeat_time = repeat_weekly;
        this.lab = lab;
    }

    public Schedule() {
        super();
        this.start_date = null;
        this.end_date = null;
        this.end_repeat = null;
        this.repeat_time = RepeatTime.OneTime;
        this.lab = null;
        course = null;
    }
}
