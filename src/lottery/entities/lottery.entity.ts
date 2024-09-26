import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sorteo')
export class Lottery {
  @PrimaryGeneratedColumn('increment', { name: 'idSorteo' })
  idLottery: number;
  @Column('varchar', { name: 'descripcion', length: 255 })
  descriptionLottery: string;
  @Column('int', { name: 'numero', default: null, nullable: true })
  numberLottery: number;
  @Column('int', { name: 'premio' })
  rewardLottery: number;
  @Column('date', {
    name: 'fechaRegistroSorteo',
    default: () => 'NOW()',
  })
  dateLottery: Date;
  @Column('date', { name: 'fechaFinSorteo' })
  dateEndLottery: Date;
  @Column('bool', { name: 'estado', default: true })
  stateLottery: boolean;
  @ManyToMany(() => User, (user) => user.lottery)
  user: User[];
}
