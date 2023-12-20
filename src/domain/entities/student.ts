import { BaseEntity } from '../../core/entities/base.entity';

interface IStudentProps {
  name: string;
}

export class Student extends BaseEntity<IStudentProps> {}
