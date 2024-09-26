import { Lottery } from 'src/lottery/entities/lottery.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('solicitudRetiro')
export class WithdrawalRequest {
  @PrimaryGeneratedColumn('increment', { name: 'idSolicitudRetiro' })
  idWithdrawalRequest: number;
  @Column('int', { name: 'idSorteo' })
  idLottery: number;
  @Column('date', {
    name: 'fechaSolicitudRetiro',
    default: () => 'NOW()',
  })
  dateWithdrawalRequest: Date;
  @Column('varchar', { name: 'respuesta', nullable: true, default: null })
  responseWithdrawalRequest: string;
  @Column('date', { name: 'fechaRespuesta', nullable: true, default: null })
  dateResponse: Date;

  @ManyToOne(() => User, (user) => user.withdrawalRequest)
  user: User;
}
