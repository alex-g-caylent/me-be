import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { Chat } from '../../chats/entities/chat.entity';
import { Citation } from '../../citations/entities/citation.entity';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

export enum MessageTypesEnum {
  QUESTION = 'question',
  ANSWER = 'answer',
}

export interface MessageInterface extends BaseEntityInterface {
  text?: string;
  chatId?: string;
  type?: MessageTypesEnum;
}

@Entity('messages')
export class Message extends BaseEntity implements MessageInterface {
  @Column('text')
  text: string;

  @Column()
  chatId: string;

  @Column({
    type: 'enum',
    enum: MessageTypesEnum,
  })
  type: MessageTypesEnum;

  /***__RELATIONS__***/
  @ManyToOne(() => Chat, (chat) => chat.messages, {
    onDelete: 'CASCADE',
  })
  chat: Chat;

  @OneToMany(() => Citation, (citation) => citation.message)
  citations: Citation[];

  static scopeSelectForChatMessage(): FindOptionsSelect<Message> {
    return {
      id: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      text: true,
      chatId: true,
      citations: {
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        text: true,
        messageId: true,
        references: {
          id: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          text: true,
          articleId: true,
          page: true,
          citationId: true,
          article: {
            id: true,
            title: true,
          },
        },
      },
    };
  }
}
