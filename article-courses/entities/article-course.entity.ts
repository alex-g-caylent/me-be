import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { Article } from '../../articles/entities/article.entity';
import { Course } from '../../courses/entities/course.entity';

export interface ArticleCourseInterface extends BaseEntityInterface {
  articleId?: string;
  courseId?: string;
}

@Entity('article_courses')
@Index(['articleId', 'courseId'], { unique: true })
export class ArticleCourse
  extends BaseEntity
  implements ArticleCourseInterface
{
  @Column()
  articleId: string;

  @Column()
  courseId: string;

  /***__RELATIONS__***/
  @ManyToOne(() => Article, (article) => article.articleCourses, {
    onDelete: 'CASCADE',
  })
  article: Article;

  @ManyToOne(() => Course, (course) => course.articleCourses, {
    onDelete: 'CASCADE',
  })
  course: Course;
}
