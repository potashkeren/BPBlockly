package il.ac.bgu.bp.cotextualBlockly.context.schema;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.Instant;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "Schedule", query = "SELECT s FROM Schedule s WHERE date(start_date) = current_date"),
        @NamedQuery(name = "BeforePractice", query = "SELECT s FROM Schedule s where " +
                "(cast((julianday(time(start_date))-julianday(time(current_timestamp)))*24*60 as integer) between 0 and 60) " +
                "AND (" +
                "  (date(current_timestamp) = date(start_date))" +
                "  OR (" +
                "    (end_repeat is not null ) AND " +
                "    (julianday(current_timestamp)<julianday(end_repeat)) AND " +
                "    (strftime('%w',current_timestamp)=strftime('%w',start_date))" +
                "  )" +
                ")"),
        @NamedQuery(name = "AfterPractice", query = "SELECT s FROM Schedule s where " +
                "(cast((julianday(time(current_timestamp ))-julianday(time(end_date)))*24*60 as integer) between 0 and 60) " +
                "AND (" +
                "  (date(current_timestamp) = date(end_date))" +
                "  OR (" +
                "    (end_repeat is not null ) AND " +
                "    (julianday(current_timestamp)<julianday(end_repeat)) AND " +
                "    (strftime('%w',current_timestamp)=strftime('%w',end_date))" +
                "  )" +
                ")"),
        @NamedQuery(name = "BeforePracticeFreeLearningLab", query = "SELECT s FROM Schedule s inner join s.lab l WHERE l.freeLearning =true AND"+
                "(cast((julianday(time(s.start_date))-julianday(time(current_timestamp)))*24*60 as integer) between 0 and 60) " +
                "AND (" +
                "  (date(current_timestamp) = date(s.start_date))" +
                "  OR (" +
                "    (s.end_repeat is not null ) AND " +
                "    (julianday(current_timestamp)<julianday(s.end_repeat)) AND " +
                "    (strftime('%w',current_timestamp)=strftime('%w',s.start_date))" +
                "  )" +
                ")"),
        @NamedQuery(name = "BeforePracticeLockedLab", query = "SELECT s FROM Schedule s inner join s.lab l WHERE l.isLocked =true AND"+
                "(cast((julianday(time(s.start_date))-julianday(time(current_timestamp)))*24*60 as integer) between 0 and 60) " +
                "AND (" +
                "  (date(current_timestamp) = date(s.start_date))" +
                "  OR (" +
                "    (s.end_repeat is not null ) AND " +
                "    (julianday(current_timestamp)<julianday(s.end_repeat)) AND " +
                "    (strftime('%w',current_timestamp)=strftime('%w',s.start_date))" +
                "  )" +
                ")"
        )
})

@Table(name = "Schedule")
public class Schedule extends BasicEntity {

    @Column(name = "course")
    public final String course;

    @Column(name = "start_date")
    public final Timestamp start_date;

    @Column(name = "end_date" )
    public final Timestamp end_date;

    @Column (name = "end_repeat")
    public final Timestamp end_repeat;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lab_id", nullable = false)
    public final Lab lab;



    public Schedule(String id, String course, String start_date, String end_date, String end_repeat, Lab lab) {
        super("scdl_"+id);
        this.course = course;
        long startDate = Instant.parse(start_date).toEpochMilli()* 1000 * 60;
        this.start_date = new Timestamp(startDate-startDate%(60*1000));
        this.end_date = new Timestamp(Instant.parse(end_date).toEpochMilli());
        this.end_repeat =new Timestamp(Instant.parse(end_repeat).toEpochMilli());
        this.lab = lab;
    }

    public Schedule() {
        super();
        this.start_date = null;
        this.end_date = null;
        this.end_repeat = null;
        this.lab = null;
        course = null;
    }

    public int StartDate(){
        return (int)start_date.getTime();
    }

    public int EndDate(){
        return (int)end_date.getTime();
    }

    //Queries not in use
//    @NamedQuery(name = "LabInPractice", query = "SELECT l FROM Lab l WHERE l.practice = 'practice' "),
}
