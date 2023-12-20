import { BaseEntity } from '../../core/entities/base.entity';

interface IInstructorProps {
  name: string;
}

export class instructor extends BaseEntity<IInstructorProps> {}
