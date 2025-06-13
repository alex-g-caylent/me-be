import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Reference } from '../../references/entities/reference.entity';
import { Message } from '../../messages/entities/message.entity';

export interface CitationInterface extends BaseEntityInterface {
  text?: string;
  messageId?: string;
}

@Entity('citations')
export class Citation extends BaseEntity implements CitationInterface {
  @Column('text')
  text: string;

  @Column()
  messageId: string;

  /***__RELATIONS__***/
  @ManyToOne(() => Message, (message) => message.citations, {
    onDelete: 'CASCADE',
  })
  message: Message;

  @OneToMany(() => Reference, (reference) => reference.citation)
  references: Reference[];
}
