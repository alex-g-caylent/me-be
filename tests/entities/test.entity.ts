import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base-entity';

export interface testInterface {
  string: string;
  number: number;
}

@Entity('tests')
export class Test extends BaseEntity {
  @Column()
  string: string;

  @Column()
  number: number;
}
