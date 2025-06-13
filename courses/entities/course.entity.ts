import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity, BaseEntityInterface } from '../../../common/base-entity';
import { ArticleCourse } from '../../article-courses/entities/article-course.entity';

export interface CourseInterface extends BaseEntityInterface {
  name?: string;
}

@Entity('courses')
export class Course extends BaseEntity implements CourseInterface {
  @Index({ unique: true })
  @Column()
  name: string;

  /***__RELATIONS__***/
  @OneToMany(() => ArticleCourse, (articleCourse) => articleCourse.course)
  articleCourses: ArticleCourse[];
}
