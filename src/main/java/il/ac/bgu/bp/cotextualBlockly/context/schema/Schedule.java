package il.ac.bgu.bp.cotextualBlockly.context.schema;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "Schedule", query = "SELECT s FROM Schedule s"),
        @NamedQuery(name = "TodaySchedules", query = "SELECT s FROM Schedule s WHERE date(start_date,'unixepoch', 'localtime') = date(current_timestamp)"),
        @NamedQuery(name = "BeforePractice", query = "SELECT s FROM Schedule s where " +
                "(((julianday(time(start_date,'unixepoch', 'localtime'))-julianday(time(current_timestamp)))*24*60) BETWEEN 0 AND 60)\n" +
                "  AND (\n" +
                "    (date(current_timestamp) = date(start_date,'unixepoch', 'localtime'))\n" +
                "    OR (\n" +
                "      (end_repeat is not null ) AND\n" +
                "      (julianday(current_timestamp)<julianday(end_repeat,'unixepoch', 'localtime')) AND (strftime('%w',current_timestamp)=strftime('%w',start_date,'unixepoch', 'localtime'))\n" +
                "    )\n" +
                "  )"),
        @NamedQuery(name = "AfterPractice", query = "SELECT s FROM Schedule s where " +
                "(((julianday(time(current_timestamp ))-julianday(time(end_date,'unixepoch', 'localtime')))*24*60) between 0 and 60) " +
                "AND (" +
                "  (date(current_timestamp) = date(end_date,'unixepoch', 'localtime'))" +
                "  OR (" +
                "    (end_repeat is not null ) AND " +
                "    (julianday(current_timestamp)<julianday(end_repeat,'unixepoch', 'localtime')) AND " +
                "    (strftime('%w',current_timestamp)=strftime('%w',end_date,'unixepoch', 'localtime'))" +
                "  )" +
                ")"),
        @NamedQuery(name = "BeforePracticeFreeLearningLab", query = "SELECT s FROM Schedule s inner join s.lab l WHERE l.freeLearning =true AND " +
                "(((julianday(time(s.start_date,'unixepoch', 'localtime'))-julianday(time(current_timestamp)))*24*60) BETWEEN 0 AND 60)\n" +
                "  AND (\n" +
                "    (date(current_timestamp) = date(s.start_date,'unixepoch', 'localtime'))\n" +
                "    OR (\n" +
                "      (s.end_repeat is not null ) AND\n" +
                "      (julianday(current_timestamp)<julianday(s.end_repeat,'unixepoch', 'localtime')) AND (strftime('%w',current_timestamp)=strftime('%w',s.start_date,'unixepoch', 'localtime'))\n" +
                "    )\n" +
                "  )"),
        @NamedQuery(name = "BeforePracticeLockedLab", query = "SELECT s FROM Schedule s inner join s.lab l WHERE l.isLocked =true AND " +
                "(((julianday(time(s.start_date,'unixepoch', 'localtime'))-julianday(time(current_timestamp)))*24*60) BETWEEN 0 AND 60)\n" +
                "  AND (\n" +
                "    (date(current_timestamp) = date(s.start_date,'unixepoch', 'localtime'))\n" +
                "    OR (\n" +
                "      (s.end_repeat is not null ) AND\n" +
                "      (julianday(current_timestamp)<julianday(s.end_repeat,'unixepoch', 'localtime')) AND (strftime('%w',current_timestamp)=strftime('%w',s.start_date,'unixepoch', 'localtime'))\n" +
                "    )\n" +
                "  )"),
       /* @NamedQuery(name = "BeforePracticeFreeLearningLab", query = "SELECT s FROM Schedule s inner join s.lab l WHERE l.freeLearning =true AND"+
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
        )*/
})

@Table(name = "Schedule")
public class Schedule extends BasicEntity {

    @Column(name = "course")
    public final String course;

    @Column(name = "start_date")
    public final LocalDateTime start_date;

    @Column(name = "end_date" )
    public final LocalDateTime end_date;


    @Column (name = "end_repeat")
    public final LocalDateTime end_repeat;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lab_id", nullable = false)
    public final Lab lab;



    public Schedule(String id, String course, String start_date, String end_date, String end_repeat, Lab lab) {
        super("scdl_"+id);
        this.course = course;
        this.start_date = LocalDateTime.parse(start_date);
        this.end_date = LocalDateTime.parse(end_date);
        this.end_repeat = LocalDateTime.parse(end_repeat);
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

    public int StartDate() {
        return this.start_date.getMinute();
    }

}
