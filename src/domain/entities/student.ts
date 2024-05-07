import { BaseEntity } from '@/core/entities/base.entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

interface IStudentProps {
  name: string;
}

export class Student extends BaseEntity<IStudentProps> {
  static create(props: IStudentProps, id: UniqueEntityId) {
    const student = new Student(props, id);
    return student;
  }
}
