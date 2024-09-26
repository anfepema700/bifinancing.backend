import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('soporteTecnico')
export class TechnicalSupport {
  @PrimaryGeneratedColumn('increment', { name: 'idSoporte' })
  idTechnicalSupport: number;
  @Column('varchar', { name: 'asunto', length: 255 })
  description: string;
  @Column('date', {
    name: 'fechaSolicitud',
    default: () => 'NOW()',
  })
  dateApplication: string;
  @Column('varchar', { name: 'respuesta', length: 255, nullable: true })
  descriptionResult: string;
  @Column('date', { name: 'fechaResultado', nullable: true })
  dateResult: string;
  @ManyToOne(() => User, (user) => user.technicalSupport)
  user: User;
}
