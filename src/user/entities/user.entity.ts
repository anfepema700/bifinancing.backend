import { Lottery } from 'src/lottery/entities/lottery.entity';
import { TechnicalSupport } from 'src/technical-support/entities/technical-support.entity';
import { WithdrawalRequest } from 'src/withdrawal-request/entities/withdrawal-request.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn('increment', { name: 'idUsuario' })
  idUser: number;
  @Column('varchar', { name: 'usuario', unique: true })
  user: string;
  @Column('varchar', { name: 'contrasena' })
  password: string;
  @Column('varchar', { name: 'nombres' })
  name: string;
  @Column('varchar', { name: 'apellidos' })
  lastName: string;
  @Column('varchar', { name: 'telefono' })
  phone: string;
  @Column('enum', { name: 'rol', enum: ['admin', 'user'], default: 'user' })
  role: string;
  @Column('bool', { name: 'estado', default: true })
  state: boolean;
  @Column('int', { name: 'saldo', default: 0 })
  balance: number;
  @OneToMany(
    () => TechnicalSupport,
    (TechnicalSupport) => TechnicalSupport.user,
  )
  technicalSupport: TechnicalSupport[];

  @OneToMany(
    () => WithdrawalRequest,
    (WithdrawalRequest) => WithdrawalRequest.user,
  )
  withdrawalRequest: WithdrawalRequest[];

  @ManyToMany(() => Lottery, (lottery) => lottery.user)
  @JoinTable({
    name: 'sorteosUsuarios',
    joinColumn: {
      name: 'idUsuario',
      referencedColumnName: 'idUser',
    },
    inverseJoinColumn: {
      name: 'idSorteo',
      referencedColumnName: 'idLottery',
    },
  })
  lottery: Lottery[];
}
