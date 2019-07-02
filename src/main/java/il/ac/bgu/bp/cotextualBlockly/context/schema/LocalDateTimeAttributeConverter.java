package il.ac.bgu.bp.cotextualBlockly.context.schema;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.time.LocalDateTime;
import java.sql.Timestamp;

@Converter(autoApply = true)
public class LocalDateTimeAttributeConverter implements AttributeConverter<LocalDateTime, Long> {

    @Override
    public Long convertToDatabaseColumn(LocalDateTime locDateTime) {
        return locDateTime == null ? null :  Timestamp.valueOf(locDateTime).getTime()/1000;
    }

    @Override
    public LocalDateTime convertToEntityAttribute(Long sqlTimestamp) {
        return sqlTimestamp == null ? null : new Timestamp(sqlTimestamp*1000).toLocalDateTime();
    }
}

