import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { User } from '../../users/entities/user.entity';
import { Message } from '../../messages/entities/message.entity';

export interface ChatInterface extends BaseEntityInterface {
  name?: string;
  userId?: string;
}

@Entity('chats')
export class Chat extends BaseEntity implements ChatInterface {
  @Column()
  name: string;

  @Column()
  userId: string;

  /***__RELATIONS__***/
  @ManyToOne(() => User, (user) => user.chats)
  user: User;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}
