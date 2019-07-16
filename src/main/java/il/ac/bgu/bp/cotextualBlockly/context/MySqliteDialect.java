package il.ac.bgu.bp.cotextualBlockly.context;

import java.sql.Types;
import org.hibernate.dialect.SQLiteDialect;
import org.hibernate.type.StandardBasicTypes;

public class MySqliteDialect extends SQLiteDialect {
  public MySqliteDialect() {
    super();
    registerHibernateType(Types.NULL, StandardBasicTypes.STRING.getName());
  }
}